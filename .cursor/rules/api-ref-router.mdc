---
description: Route OpenAPI JSON work to api-eval, api-review, or api-fix skills
globs: static/**/*.json
alwaysApply: false
---

# API reference router

When editing or reviewing OpenAPI JSON under `static/`, use the right skill. Load modular rules only when needed.

## Task routing

| User intent | Skill | Edits? |
|-------------|-------|--------|
| `/api-eval`, evaluate, audit | [api-eval](../skills/api-eval/SKILL.md) | No — findings only |
| `/api-review`, catalog descriptions | [api-review](../skills/api-review/SKILL.md) | No — tables for manual review |
| `/api-fix`, fix lint or structure | [api-fix](../skills/api-fix/SKILL.md) | Yes — **lint + api-ref-structure** |

Resolve the spec path with [_shared/resolve-api-spec.md](../skills/_shared/resolve-api-spec.md). Do **not** assume `petstore.json`.

## Non-negotiable description rule

- **HTTP response `description`** (status lines): Title Case, **no** trailing period (e.g. `Internal Server Error`).
- **All other descriptions** (operations, parameters, schemas, headers): complete sentences **with** periods.

## Modular rules (load on demand)

- `api-ref-structure.mdc` — section order, license, JSON/$ref
- `api-ref-copy.mdc` — summaries, punctuation, public-facing text
- `api-ref-schema.mdc` — anyOf, type arrays, $ref/title
- `api-ref-examples.mdc` — Redocly examples
- `api-ref-tags-errors.mdc` — tags, errors, auth
- `api-ref-ffs-styleguide.mdc` — Firefly Services API Style Guide (api-eval only)

Legacy monolith: `eval-API-ref.mdc` (deprecated stub).
