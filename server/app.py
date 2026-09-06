import os

from dotenv import load_dotenv

load_dotenv(override=True)  # .env always wins locally; no-op in production (no .env file there)

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

import db
from auth import check_password, issue_token, require_admin

app = Flask(__name__)

allowed_origins = [o.strip() for o in os.environ.get("ALLOWED_ORIGIN", "*").split(",") if o.strip()]
CORS(app, origins=allowed_origins or "*")

limiter = Limiter(get_remote_address, app=app, storage_uri="memory://")

db.init_db()


def _validate_project_payload(payload: dict) -> tuple[dict | None, str | None]:
    title = (payload.get("title") or "").strip()
    if not title:
        return None, "O título é obrigatório."

    stack = payload.get("stack") or []
    if not isinstance(stack, list) or not all(isinstance(item, str) for item in stack):
        return None, "stack deve ser uma lista de textos."

    try:
        position = int(payload.get("position", 0))
    except (TypeError, ValueError):
        return None, "position deve ser um número."

    data = {
        "title": title,
        "tag": (payload.get("tag") or "").strip(),
        "description": (payload.get("description") or "").strip(),
        "stack": [s.strip() for s in stack if s.strip()],
        "live_url": (payload.get("liveUrl") or "").strip() or None,
        "github_url": (payload.get("githubUrl") or "").strip() or None,
        "featured": bool(payload.get("featured", False)),
        "position": position,
    }
    return data, None


@app.get("/api/health")
def health():
    return jsonify({"status": "ok"})


@app.get("/api/projects")
def get_projects():
    return jsonify(db.list_projects())


@app.post("/api/admin/login")
@limiter.limit("10 per minute")
def login():
    payload = request.get_json(silent=True) or {}
    if check_password(payload.get("password", "")):
        return jsonify({"token": issue_token()})
    return jsonify({"error": "Senha incorreta"}), 401


@app.get("/api/admin/projects")
@require_admin
def admin_list_projects():
    return jsonify(db.list_projects())


@app.post("/api/admin/projects")
@require_admin
def admin_create_project():
    data, error = _validate_project_payload(request.get_json(silent=True) or {})
    if error:
        return jsonify({"error": error}), 400
    return jsonify(db.create_project(data)), 201


@app.put("/api/admin/projects/<int:project_id>")
@require_admin
def admin_update_project(project_id: int):
    data, error = _validate_project_payload(request.get_json(silent=True) or {})
    if error:
        return jsonify({"error": error}), 400
    updated = db.update_project(project_id, data)
    if not updated:
        return jsonify({"error": "Projeto não encontrado"}), 404
    return jsonify(updated)


@app.delete("/api/admin/projects/<int:project_id>")
@require_admin
def admin_delete_project(project_id: int):
    if not db.delete_project(project_id):
        return jsonify({"error": "Projeto não encontrado"}), 404
    return "", 204


if __name__ == "__main__":
    app.run(debug=True, port=int(os.environ.get("PORT", 5000)))
