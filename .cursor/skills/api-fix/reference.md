# api-fix — Reference

## Commands

```bash
npm run lint:openapi -- static/your-product-spec.json
npm run lint:openapi:all
```

Config: [redocly.yaml](../../../redocly.yaml) at repo root.

## Structure ([api-ref-structure.mdc](../../rules/api-ref-structure.mdc))

| Check | Action |
|-------|--------|
| Section order | Reorder top-level keys: openapi, info, servers, security, tags, paths, components |
| Missing license | Add `info.license` with Adobe Creative API License name and URL |
| Broken `$ref` | Correct path or add missing schema |
| Duplicate schema names | Rename or deduplicate in `components.schemas` |
| JSON syntax | Fix parse errors |

## Common Redocly fixes

| Issue | Typical fix |
|-------|-------------|
| Invalid `$ref` | Correct path or add missing schema |
| Sibling to `$ref` (e.g. `title`) | Remove sibling; move `title` to referenced schema |
| Invalid media type / schema | Align per Redocly message |

## Not in api-fix scope

- FFS style guide (api-eval)
- Description punctuation, public-facing text (api-review / manual edit)
- Schema anyOf simplification (api-ref-schema) unless lint flags it
