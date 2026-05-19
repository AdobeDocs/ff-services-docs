---
description: OpenAPI schema patterns — anyOf, $ref, naming, OpenAPI 3.0 vs 3.1
globs: static/**/*.json
alwaysApply: false
---

# API reference — schemas

## Naming

- Schemas: PascalCase, descriptive (e.g. `RemoveBackgroundRequest`).
- Properties: camelCase.
- Paths: descriptive kebab-case (e.g. `/v2/remove-background`).

## anyOf

- **Do not** use `anyOf` when the only alternative is `null` — omit from `required` instead.
- **Do not** use `anyOf` with a single option — use direct `$ref` or type.
- **Valid anyOf:** multiple real type alternatives (not null-only).

## OpenAPI 3.1 only

- Simplify primitive `anyOf` to type arrays: `"type": ["string", "array", "null"]`.
- OpenAPI **3.0** does not support multi-value type arrays — do not apply 3.1 patterns to 3.0 files.

## $ref siblings

- **Remove** `title` as sibling to `$ref` (ignored by tools, linter errors).
- **Keep** `description`, `deprecated`, `example` siblings where tools support them.
- Put titles on the referenced schema definition instead.

## Organization

- Group related schemas; avoid duplicates; use `$ref` (DRY).
