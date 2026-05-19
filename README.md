# Adobe Firefly Services API Documentation

This repo is the central hub repository for Firefly Services API documentation. Each Firefly Services API has its own repository, which is a spoke repository to this monorepo.

Please see the [ADP Developer Site Documentation](https://developer-stage.adobe.com/dev-docs-reference/).

## OpenAPI spec skills (Cursor)

For OpenAPI JSON under `static/` in spoke repos (product-specific filenames, not a fixed `petstore.json`):

| Command | Purpose |
|---------|---------|
| `/api-eval` | Audit: Redocly lint + OpenAPI version + [FFS API Style Guide](https://wiki.corp.adobe.com/display/GenAI/Firefly+Services+API+Style+Guide) + copy rules (no edits) |
| `/api-review` | Catalog descriptions in ref-numbered tables with proposed fixes (no edits) |
| `/api-fix` | Fix **Redocly lint** and **api-ref-structure** issues |

Lint: `npm run lint:openapi -- static/your-spec.json` · `npm run lint:openapi:all`

Details: [.cursor/rules/api-ref-skills.mdc](.cursor/rules/api-ref-skills.mdc)
