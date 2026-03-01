"""Сохраняет лид из формы расчёта проекта 5628 в базу данных."""
import json
import os

import psycopg2  # noqa: F401 — psycopg2-binary


def handler(event: dict, context) -> dict:
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}

    try:
        body = json.loads(event.get("body") or "{}")
    except Exception:
        return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Invalid JSON"})}

    name = (body.get("name") or "").strip()
    phone = (body.get("phone") or "").strip()

    if not name or not phone:
        return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "name and phone required"})}

    contact_way = (body.get("contact_way") or "Телефон").strip()
    comment = (body.get("comment") or "").strip()
    estimate = (body.get("estimate") or "").strip()
    project = (body.get("project") or "5628").strip()

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        """INSERT INTO t_p72692264_neptune_design.leads
           (project, name, phone, contact_way, comment, estimate)
           VALUES (%s, %s, %s, %s, %s, %s) RETURNING id""",
        (project, name, phone, contact_way, comment, estimate),
    )
    lead_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({"ok": True, "id": lead_id}),
    }