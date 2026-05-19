---
description: Points to /api-eval, /api-review, and /api-fix skills for OpenAPI JSON in static/
globs: static/**/*.json
alwaysApply: false
---

# API spec skills (`/api-eval`, `/api-review`, `/api-fix`)

Agent skills for OpenAPI JSON under `static/`. Resolve the spec path with [_shared/resolve-api-spec.md](../skills/_shared/resolve-api-spec.md) — **no** `petstore.json` default.

| Command | Skill | Edits? |
|---------|-------|--------|
| **`/api-eval`** | [api-eval/SKILL.md](../skills/api-eval/SKILL.md) | No — audit findings |
| **`/api-review`** | [api-review/SKILL.md](../skills/api-review/SKILL.md) | No — description catalog tables |
| **`/api-fix`** | [api-fix/SKILL.md](../skills/api-fix/SKILL.md) | Yes — Redocly lint + structure fixes |

**Agent:** [api-spec-reviewer.md](../agents/api-spec-reviewer.md) — runs lint + api-fix after OpenAPI edits.

**Lint:** `npm run lint:openapi -- static/your-spec.json` · `npm run lint:openapi:all`

**FFS style guide wiki:** [Firefly Services API Style Guide](https://wiki.corp.adobe.com/display/GenAI/Firefly+Services+API+Style+Guide)
