---
name: fix-api
description: Fixes only issues reported by Redocly lint on an OpenAPI JSON spec. Use when the user invokes /fix-api or asks to fix API lint or Redocly errors. Does not apply style guide or copy fixes.
---

# `/fix-api` — Fix Redocly lint errors only

## Hard boundary

Fix **only** issues explicitly reported by:

```bash
npm run lint:openapi -- <resolved-path>
```

Do **not** apply FFS style guide changes, copy edits, license boilerplate, section reorder, anyOf cleanup, or eval-api findings unless Redocly also reports them.

## Steps

1. **Resolve target spec** — [_shared/resolve-api-spec.md](../_shared/resolve-api-spec.md).

2. **Run lint** — If clean, report success and stop.

3. **Fix each finding** — Minimal change per violation. Note Redocly rule/message for the user.

4. **Re-run lint** until zero errors (treat configured warnings per [reference.md](reference.md)).

5. If lint is clean but style/copy issues remain, say: *Lint clean. Run `/eval-api` for style guide and documentation findings.*

## Out of scope

- Async shape, `error_code` alignment, punctuation, internal IDs, examples — unless a custom Redocly rule flags them.

## Reference

See [reference.md](reference.md) for Redocly rule notes.
