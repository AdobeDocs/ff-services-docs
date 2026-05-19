# Resolve OpenAPI spec path

Use this procedure for `/api-eval`, `/api-review`, and `/api-fix`. **Do not** default to `petstore.json` or create placeholder specs.

## Resolution order

1. **Explicit path** — From the user message, `@` file reference, or skill argument (repo-relative or absolute). Use if the file exists and contains a top-level `"openapi"` field.

2. **Active editor** — If the user has a JSON file open that is an OpenAPI spec, use that path.

3. **Discover under `static/`** — Glob `static/**/*.json`. For each file, confirm OpenAPI (top-level `"openapi"` in the first ~30 lines).
   - **One match** → use it; print `**Target spec:** \`path\`` at the start of skill output.
   - **Multiple matches** → list paths and **ask the user to choose one** (or "all" only for `npm run lint:openapi:all`). Do not guess.
   - **Zero matches** → report that no OpenAPI spec was found under `static/`; ask for a path. **Do not create a file.**

4. **Redocly block hint (optional)** — If step 3 is ambiguous and `src/pages/api/index.md` exists, read `RedoclyAPIBlock` `src="..."` as a hint. Still confirm with the user when multiple specs exist.

## Lint commands

After resolving a single spec:

```bash
npm run lint:openapi -- <resolved-path>
```

For every OpenAPI file under `static/` (user requested only):

```bash
npm run lint:openapi:all
```

`npm run lint:openapi` with no path argument: show usage — pass a spec path after `--`.
