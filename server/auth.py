"""Single-admin auth: one password (env var), issues a short-lived JWT.

There's no user table — this backend has exactly one admin (Jardel), so a
full auth system would be overkill. The password is compared with a
constant-time check to avoid timing attacks, and the login route is rate
limited in app.py to slow down brute-forcing.
"""

import hmac
import os
from datetime import datetime, timedelta, timezone
from functools import wraps

import jwt
from flask import jsonify, request

ADMIN_PASSWORD = os.environ["ADMIN_PASSWORD"]
JWT_SECRET = os.environ["JWT_SECRET"]
TOKEN_TTL_HOURS = 12


def check_password(password: str) -> bool:
    return hmac.compare_digest(password or "", ADMIN_PASSWORD)


def issue_token() -> str:
    payload = {
        "sub": "admin",
        "exp": datetime.now(timezone.utc) + timedelta(hours=TOKEN_TTL_HOURS),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")


def require_admin(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        header = request.headers.get("Authorization", "")
        if not header.startswith("Bearer "):
            return jsonify({"error": "Não autenticado"}), 401

        token = header.removeprefix("Bearer ").strip()
        try:
            jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Sessão expirada, faça login novamente"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Token inválido"}), 401

        return fn(*args, **kwargs)

    return wrapper
