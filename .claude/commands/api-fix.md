---
description: Fix Redocly lint errors and api-ref-structure issues on an OpenAPI JSON spec (edits the file).
argument-hint: "[path to spec under static/]"
---

Read @.cursor/skills/api-fix/SKILL.md and follow it to fix Redocly lint errors
and `api-ref-structure.mdc` inconsistencies. Resolve the spec path with
@.cursor/skills/_shared/resolve-api-spec.md (no `petstore.json` default); use
`$ARGUMENTS` as the spec path when provided.

Scope: lint + structure only. Do not apply FFS style-guide or copy edits — those
belong to `/api-eval` and `/api-review`.
