"""Minimal hermes_cli.web_server auth contract stub for plugin CI tests.

The PWA plugin is tested outside the Hermes monorepo, where hermes_cli is not
installed. Production imports the real helper; CI imports this stub via unittest
-discovery's test path and still exercises the authenticated route dependency.
"""

import secrets

from fastapi import HTTPException, Request

_SESSION_HEADER_NAME = "X-Hermes-Session"
# Random per-process value: tests read it from this module, nothing is hardcoded.
_SESSION_TOKEN = secrets.token_urlsafe(16)


def _require_token(request: Request) -> None:
    token = request.headers.get(_SESSION_HEADER_NAME) or request.cookies.get("hermes_session")
    if token != _SESSION_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")
