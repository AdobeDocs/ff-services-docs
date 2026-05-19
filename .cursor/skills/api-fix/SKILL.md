---
name: api-fix
description: Fixes Redocly lint errors and api-ref-structure.mdc inconsistencies on an OpenAPI JSON spec. Use when the user invokes /api-fix or asks to fix API lint or structure issues. Does not apply FFS style guide or copy fixes.
---

# `/api-fix` — Fix lint and structure

## Scope

Apply **mechanical** fixes from two sources:

1. **Redocly lint** — issues reported by `npm run lint:openapi -- <path>`
2. **Structure** — inconsistencies with [api-ref-structure.mdc](../../rules/api-ref-structure.mdc)

Do **not** apply FFS style guide changes, copy edits, description punctuation, internal IDs, examples polish, or `api-ref-schema` / `api-ref-copy` findings unless Redocly flags them.

## Steps

1. **Resolve target spec** — [_shared/resolve-api-spec.md](../_shared/resolve-api-spec.md).

2. **Run lint** — Record all errors/warnings.

3. **Structure pass** — Load [api-ref-structure.mdc](../../rules/api-ref-structure.mdc). Fix:
   - Top-level **section order**: `openapi` → `info` → `servers` → `security` → `tags` → `paths` → `components`
   - Missing **`info.license`** (Adobe Creative API License boilerplate)
   - **Validity** issues lint may not cover: broken `$ref`, duplicate schema names (when clearly wrong)
   - Reorder keys only; do not rewrite endpoint or schema semantics

4. **Lint pass** — Fix each Redocly finding with minimal change. Cite rule/message.

5. **Re-run lint** until zero errors (warnings per [reference.md](reference.md)).

6. **Re-check structure** — Confirm section order and license after lint edits.

7. **Report** — Separate what was fixed under **Lint** vs **Structure**. If clean but style/copy issues remain, say: *Run `/api-eval` for style guide and documentation findings.*

## Out of scope

- FFS async shapes, `error_code` alignment, tags, summaries, public-facing text
- `anyOf`/type-array cleanup unless Redocly flags it
- Large refactors of file organization beyond section reorder and license

## Reference

See [reference.md](reference.md) for Redocly rules and structure checklist.
