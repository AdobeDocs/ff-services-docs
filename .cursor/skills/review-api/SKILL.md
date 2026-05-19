---
name: review-api
description: Catalogs user-readable OpenAPI text in ref-numbered tables with possible issues and proposed content. Read-only unless user asks to update specific refs. Use when the user invokes /review-api or asks to review API descriptions.
---

# `/review-api` — Description catalog

## When to run

- User invokes `/review-api`, "review API descriptions", or "catalog schema descriptions".
- **Do not edit the JSON** unless the user later asks to `update refs N,M,…` (that is not `/fix-api`).

## Steps

1. **Resolve target spec** — [_shared/resolve-api-spec.md](../_shared/resolve-api-spec.md). Print `**Target spec:** \`path\``.

2. **Collect text** — Walk the spec in document order. Assign **Ref** `1`, `2`, `3`, … to every user-readable `description` and `title` (where Redocly shows it).

3. **Evaluate copy** — Load [api-ref-copy.mdc](../../rules/api-ref-copy.mdc). Fill **Possible issues** and **Proposed content** (when issues exist).

4. **Emit sectioned tables** — One table per section below. **Location is always the last column.**

### Table columns

| Ref | Text (excerpt) | Possible issues | Proposed content | Location |
|-----|----------------|-------------------|------------------|----------|

- **Text (excerpt):** ~80–120 chars; truncate with `…`.
- **Possible issues:** tags like `Missing period`, `Internal ID`, `Title Case on non-response`; `—` if none.
- **Proposed content:** customer-safe rewrite when issues exist; `—` if OK or no safe proposal.
- **Location:** JSON path + line number (e.g. `` `components/schemas/Foo.description` · L201 ``).

### Section order

1. Info and tags
2. Operations (summary, description)
3. Parameters and request bodies
4. Responses and headers
5. **Schemas** (primary focus)
6. Examples (prose in example strings only)

5. **Footer**
   - Total ref count
   - *Lint → `/fix-api`. Copy → **Proposed content** or `update refs 3, 7, 12` (not `/fix-api`).*

## Batch follow-up

- `update refs 3, 7, 12` — Apply **Proposed content** at **Location** paths; preserve meaning. Not `/fix-api`.
