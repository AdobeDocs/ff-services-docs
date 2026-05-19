---
description: OpenAPI file structure, section order, license, and JSON validity
globs: static/**/*.json
alwaysApply: false
---

# API reference — structure

## Section order

Top-level keys in this order:

1. `openapi` (version, always first)
2. `info` (include `license` when missing)
3. `servers`
4. `security`
5. `tags`
6. `paths`
7. `components` (always last)

## License boilerplate

When `info.license` is missing, add:

```json
"license": {
  "name": "Adobe Creative API License",
  "url": "https://www.adobe.com/content/dam/cc/en/legal/terms/enterprise/pdfs/PSLT-AdobeCreativeAPI-WW-2024v2.pdf"
}
```

## Validity

- Valid JSON syntax.
- All `$ref` paths resolve to existing schemas.
- No duplicate schema names in `components.schemas`.
- Verify `openapi` version (3.0.x vs 3.1.x) before applying version-specific schema rules.

## File organization

- Group related endpoints (operation + status) together.
- Organize schemas by function or alphabetically.
- Consistent indentation.
