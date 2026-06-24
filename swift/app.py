import mimetypes
from pathlib import Path

ROOT = Path(".")

async def app(scope, receive, send):
    if scope["type"] != "http":
        return

    path = scope["path"]
    if path == "/":
        path = "/index.html"

    file_path = (ROOT / path.lstrip("/")).resolve()

    # Prevent directory traversal
    try:
        file_path.relative_to(ROOT.resolve())
    except ValueError:
        await _respond(send, 404, b"text/plain", b"Not found")
        return

    if not file_path.exists() or not file_path.is_file():
        await _respond(send, 404, b"text/plain", b"Not found")
        return

    mime, _ = mimetypes.guess_type(str(file_path))
    body = file_path.read_bytes()
    await _respond(send, 200, (mime or "application/octet-stream").encode(), body)

async def _respond(send, status, content_type, body):
    await send({
        "type": "http.response.start",
        "status": status,
        "headers": [
            [b"content-type", content_type],
            [b"content-length", str(len(body)).encode()],
        ],
    })
    await send({"type": "http.response.body", "body": body})
