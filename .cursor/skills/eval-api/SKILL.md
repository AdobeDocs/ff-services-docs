---
name: eval-api
description: Audits an OpenAPI JSON spec (Redocly lint, OpenAPI version, FFS style guide, copy rules). Read-only — no file edits. Use when the user invokes /eval-api or asks to evaluate or audit an API spec.
---

# `/eval-api` — Audit OpenAPI spec

## When to run

- User invokes `/eval-api`, "evaluate API spec", or "audit OpenAPI".
- **Do not edit files.** Findings only.

## Steps

1. **Resolve target spec** — Follow [_shared/resolve-api-spec.md](../_shared/resolve-api-spec.md). Print `**Target spec:** \`path\`` in the output header.

2. **Layer 1 — Redocly lint** — Run:
   ```bash
   npm run lint:openapi -- <resolved-path>
   ```
   List every error/warning with path/line. Tag each as **`fix-api-eligible`** (`→ fix with /fix-api`).

3. **Layer 2 — OpenAPI version** — Read `openapi` field. Audit 3.0 vs 3.1 rules per [api-ref-schema.mdc](../../rules/api-ref-schema.mdc) ($ref, type arrays, anyOf/null). Flag issues lint may miss.

4. **Layer 3 — FFS style guide** — Load [api-ref-ffs-styleguide.mdc](../../rules/api-ref-ffs-styleguide.mdc) and [ffs-styleguide-checklist.md](ffs-styleguide-checklist.md). Flag **significant** contract inconsistencies only.

5. **Layer 4 — Documentation** — Load `api-ref-copy`, `api-ref-examples`, `api-ref-tags-errors`. Check descriptions, examples, tags, **public-facing text** (no Jira/FFENT/codenames).

6. **Output format**
   - **Summary** — counts by layer and severity
   - **Redocly lint** — numbered list (`fix-api-eligible`)
   - **OpenAPI version** — findings
   - **FFS style guide** — findings (wiki section if helpful)
   - **Documentation / copy** — findings; suggest `/review-api` for full catalog
   - Reminder: `/fix-api` = lint only; copy/style = `/review-api` or `update refs N,M,…`

## Severity

- **error** — lint / invalid OpenAPI
- **high** — style guide or public-facing text violation
- **medium** — doc/copy inconsistency
- **low** — suggestion

## Review completion checklist

- [ ] Lint output included
- [ ] OpenAPI version checked
- [ ] FFS checkpoints reviewed
- [ ] Public-facing text (no internal IDs)
- [ ] No file edits made
