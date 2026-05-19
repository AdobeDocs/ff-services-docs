---
description: OpenAPI tags, standard error responses, and authentication parameters
globs: static/**/*.json
alwaysApply: false
---

# API reference — tags, errors, auth

## Tags

- Descriptive sentence-case names with descriptions.
- Order logically; core operations first (e.g. "Common operations").
- No empty tag arrays; avoid generic tags (`API`, product name only).

## Standard error responses

Include where appropriate:

| Code | Description |
|------|-------------|
| 400 | Bad Request or Input Validation Error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Requested Resource Was Not Found |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

Use Title Case, no periods on response descriptions.

## Error schema

- `error_code` (snake_case, gateway-aligned) and optional `message` on error payloads.

## Authentication

- Document `Authorization` (Bearer) as required.
- Document `x-api-key` as optional where Cluster Gateway applies.
- Consistent parameter naming across operations.

## Versioning

- Summaries include version: `Remove background v1`, `Get status - v2`.
- Beta: `v2 (beta)`; lowercase `vN`.
