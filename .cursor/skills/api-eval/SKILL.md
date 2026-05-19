---
name: api-eval
description: Audits an OpenAPI JSON spec (Redocly lint, OpenAPI version, FFS style guide, copy rules). Read-only — no file edits. Use when the user invokes /api-eval or asks to evaluate or audit an API spec.
---

# `/api-eval` — Audit OpenAPI spec

## When to run

- User invokes `/api-eval`, "evaluate API spec", or "audit OpenAPI".
- **Do not edit files.** Findings only.

## Steps

1. **Resolve target spec** — Follow [_shared/resolve-api-spec.md](../_shared/resolve-api-spec.md). Print `**Target spec:** \`path\`` in the output header.

2. **Layer 1 — Redocly lint** — Run:
   ```bash
   npm run lint:openapi -- <resolved-path>
   ```
   List every error/warning with path/line. Tag each as **`api-fix-eligible`** (`→ fix with /api-fix`).

3. **Layer 2 — Structure** — Load [api-ref-structure.mdc](../../rules/api-ref-structure.mdc). Flag section order, missing license, broken `$ref`, duplicate schema names. Tag as **`api-fix-eligible`**.

4. **Layer 3 — OpenAPI version** — Read `openapi` field. Audit 3.0 vs 3.1 rules per [api-ref-schema.mdc](../../rules/api-ref-schema.mdc) ($ref, type arrays, anyOf/null). Flag issues lint may miss.

5. **Layer 4 — FFS style guide** — Load [api-ref-ffs-styleguide.mdc](../../rules/api-ref-ffs-styleguide.mdc) and [ffs-styleguide-checklist.md](ffs-styleguide-checklist.md). Flag **significant** contract inconsistencies only.

6. **Layer 5 — Documentation** — Load `api-ref-copy`, `api-ref-examples`, `api-ref-tags-errors`. Check descriptions, examples, tags, **public-facing text** (no Jira/FFENT/codenames).

7. **Output format**
   - **Summary** — counts by layer and severity
   - **Redocly lint** — numbered list (`api-fix-eligible`)
   - **Structure** — numbered list (`api-fix-eligible`)
   - **OpenAPI version** — findings
   - **FFS style guide** — findings (wiki section if helpful)
   - **Documentation / copy** — findings; suggest `/api-review` for full catalog
   - Reminder: `/api-fix` = lint + `api-ref-structure`; copy/style = `/api-review` or `update refs N,M,…`

## Severity

- **error** — lint / invalid OpenAPI
- **high** — style guide or public-facing text violation
- **medium** — doc/copy inconsistency
- **low** — suggestion

## Review completion checklist

- [ ] Lint output included
- [ ] Structure (api-ref-structure) checked
- [ ] OpenAPI version checked
- [ ] FFS checkpoints reviewed
- [ ] Public-facing text (no internal IDs)
- [ ] No file edits made
