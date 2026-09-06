"""Database access layer — plain psycopg, no ORM.

Keeps things close to how the Estoque Fácil backend is built: a small
number of explicit SQL statements, an idempotent init step (safe to run
on every boot), and simple functions the routes call directly.
"""

import os

import psycopg
from psycopg.rows import dict_row

DATABASE_URL = os.environ["DATABASE_URL"]


def get_connection() -> psycopg.Connection:
    return psycopg.connect(DATABASE_URL, row_factory=dict_row, autocommit=True)


def init_db() -> None:
    """Creates the projects table if it doesn't exist yet, and seeds the
    Estoque Fácil project on a brand-new, empty database. Safe to call on
    every server start."""
    with get_connection() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS projects (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                tag TEXT NOT NULL DEFAULT '',
                description TEXT NOT NULL DEFAULT '',
                stack TEXT[] NOT NULL DEFAULT '{}',
                live_url TEXT,
                github_url TEXT,
                featured BOOLEAN NOT NULL DEFAULT FALSE,
                position INTEGER NOT NULL DEFAULT 0,
                created_at TIMESTAMPTZ NOT NULL DEFAULT now()
            )
            """
        )

        # Added after the table already existed in production — plain ALTER
        # with IF NOT EXISTS keeps this idempotent, same as the CREATE above.
        conn.execute(
            "ALTER TABLE projects ADD COLUMN IF NOT EXISTS images TEXT[] NOT NULL DEFAULT '{}'"
        )

        (count,) = conn.execute("SELECT count(*) FROM projects").fetchone().values()
        if count == 0:
            conn.execute(
                """
                INSERT INTO projects
                    (title, tag, description, stack, github_url, featured, position)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """,
                (
                    "Estoque Fácil",
                    "Sistema SaaS de gestão de estoque",
                    "Plataforma para gerenciamento de estoque, produtos, movimentações, "
                    "fornecedores, relatórios e indicadores. Desenvolvida com arquitetura "
                    "separando Front-End e Back-End, com suporte a múltiplos usuários e "
                    "empresas.",
                    ["React", "JavaScript", "Python", "Flask", "PostgreSQL"],
                    "https://github.com/jardelmaciel/estoque-facil",
                    True,
                    0,
                ),
            )


def list_projects() -> list[dict]:
    with get_connection() as conn:
        rows = conn.execute(
            "SELECT * FROM projects ORDER BY position ASC, id ASC"
        ).fetchall()
    return [_serialize(row) for row in rows]


def create_project(data: dict) -> dict:
    with get_connection() as conn:
        row = conn.execute(
            """
            INSERT INTO projects (title, tag, description, stack, images, live_url, github_url, featured, position)
            VALUES (%(title)s, %(tag)s, %(description)s, %(stack)s, %(images)s, %(live_url)s, %(github_url)s, %(featured)s, %(position)s)
            RETURNING *
            """,
            data,
        ).fetchone()
    return _serialize(row)


def update_project(project_id: int, data: dict) -> dict | None:
    data = {**data, "id": project_id}
    with get_connection() as conn:
        row = conn.execute(
            """
            UPDATE projects
            SET title = %(title)s,
                tag = %(tag)s,
                description = %(description)s,
                stack = %(stack)s,
                images = %(images)s,
                live_url = %(live_url)s,
                github_url = %(github_url)s,
                featured = %(featured)s,
                position = %(position)s
            WHERE id = %(id)s
            RETURNING *
            """,
            data,
        ).fetchone()
    return _serialize(row) if row else None


def delete_project(project_id: int) -> bool:
    with get_connection() as conn:
        result = conn.execute("DELETE FROM projects WHERE id = %s", (project_id,))
    return result.rowcount > 0


def _serialize(row: dict) -> dict:
    return {
        "id": row["id"],
        "title": row["title"],
        "tag": row["tag"],
        "description": row["description"],
        "stack": row["stack"] or [],
        "images": row["images"] or [],
        "liveUrl": row["live_url"],
        "githubUrl": row["github_url"],
        "featured": row["featured"],
        "position": row["position"],
    }
