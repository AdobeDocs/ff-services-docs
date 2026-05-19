# api-fix — Redocly reference

## Commands

```bash
npm run lint:openapi -- static/your-product-spec.json
npm run lint:openapi:all
```

Config: [redocly.yaml](../../../redocly.yaml) at repo root (`extends: recommended`, `static/` root).

## Common Redocly fixes

| Issue | Typical fix |
|-------|-------------|
| Invalid `$ref` | Correct path or add missing schema |
| Sibling to `$ref` (e.g. `title`) | Remove sibling; move `title` to referenced schema |
| Spec structure | Fix per rule message only — do not reorder sections unless lint requires it |
| Invalid media type / schema | Align `content` and schema per Redocly message |

## Not in api-fix scope

- FFS style guide (api-eval)
- Description punctuation, public-facing text (api-review / manual edit)
- Adding `info.license` unless lint flags missing license
