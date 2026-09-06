import os

from dotenv import load_dotenv

load_dotenv(override=True)  # .env always wins locally; no-op in production (no .env file there)

import cloudinary
import cloudinary.uploader
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from werkzeug.exceptions import RequestEntityTooLarge

import db
from auth import check_password, issue_token, require_admin

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 8 * 1024 * 1024  # 8MB por upload

allowed_origins = [o.strip() for o in os.environ.get("ALLOWED_ORIGIN", "*").split(",") if o.strip()]
CORS(app, origins=allowed_origins or "*")

limiter = Limiter(get_remote_address, app=app, storage_uri="memory://")

cloudinary.config(
    cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME"),
    api_key=os.environ.get("CLOUDINARY_API_KEY"),
    api_secret=os.environ.get("CLOUDINARY_API_SECRET"),
    secure=True,
)

MAX_IMAGES_PER_PROJECT = 5
ALLOWED_IMAGE_TYPES = {"image/png", "image/jpeg", "image/webp", "image/gif"}

db.init_db()


@app.errorhandler(RequestEntityTooLarge)
def handle_large_file(_error):
    return jsonify({"error": "Arquivo muito grande (máximo 8MB)"}), 413


def _validate_project_payload(payload: dict) -> tuple[dict | None, str | None]:
    title = (payload.get("title") or "").strip()
    if not title:
        return None, "O título é obrigatório."

    stack = payload.get("stack") or []
    if not isinstance(stack, list) or not all(isinstance(item, str) for item in stack):
        return None, "stack deve ser uma lista de textos."

    images = payload.get("images") or []
    if not isinstance(images, list) or not all(isinstance(item, str) for item in images):
        return None, "images deve ser uma lista de URLs."
    images = [item.strip() for item in images if item.strip()][:MAX_IMAGES_PER_PROJECT]

    try:
        position = int(payload.get("position", 0))
    except (TypeError, ValueError):
        return None, "position deve ser um número."

    data = {
        "title": title,
        "tag": (payload.get("tag") or "").strip(),
        "description": (payload.get("description") or "").strip(),
        "stack": [s.strip() for s in stack if s.strip()],
        "images": images,
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


@app.post("/api/admin/upload")
@require_admin
def admin_upload_image():
    file = request.files.get("file")
    if not file or not file.filename:
        return jsonify({"error": "Nenhum arquivo enviado"}), 400
    if file.mimetype not in ALLOWED_IMAGE_TYPES:
        return jsonify({"error": "Formato de imagem não suportado (use PNG, JPG, WEBP ou GIF)"}), 400

    try:
        result = cloudinary.uploader.upload(file, folder="portfolio", resource_type="image")
    except Exception:
        return jsonify({"error": "Falha ao enviar a imagem"}), 502

    return jsonify({"url": result["secure_url"]}), 201


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
