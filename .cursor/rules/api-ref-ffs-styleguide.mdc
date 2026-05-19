---
description: Firefly Services API Style Guide checkpoints for api-eval (not api-fix)
globs: static/**/*.json
alwaysApply: false
---

# Firefly Services API Style Guide (eval only)

**Wiki:** [Firefly Services API Style Guide](https://wiki.corp.adobe.com/display/GenAI/Firefly+Services+API+Style+Guide)

Use with `/api-eval` only. `/api-fix` does **not** apply these unless Redocly flags them.

**Offline checklist:** [.cursor/skills/api-eval/ffs-styleguide-checklist.md](../skills/api-eval/ffs-styleguide-checklist.md)

## Scope

Stateless Firefly Services RPC APIs. POST → async; GET (collections, status) → sync.

## HTTP and URLs

- POST operations: async 202 pattern.
- URL shape: `https://{subdomain}.adobe.io/v{version}/{operation-name}`.
- POST paths: verb-led, hyphenated (e.g. `/v2/generate-object-composite`).
- GET collections: plural nouns.

## Async 202 response

Required: `jobId`, `statusUrl`. Optional: `cancelUrl`. URLs: `…/v{version}/status/{jobId}`.

## Status polling (GET)

- `status`: `not_started`, `running`, `succeeded`, `failed`, `partially_succeeded`, `canceled`.
- `jobId` on all status responses.
- Failed: `error_code` or `errors[]` per Error Codes wiki.

## Errors

- 4xx/5xx and job failures: `error_code` required; `message` optional.
- Codes from [Error Codes wiki](https://wiki.corp.adobe.com/display/GenAI/API+Style+Guide%3A+Error+Codes).

## JSON conventions

- Property names: camelCase (except `error_code`).
- American English spellings.
- Suffixes: `*Date`, `*MediaType`, `*LocaleCode`, `*Folder`; plural names for arrays.
- Date-times: ISO 8601 with `Z`; locales: `en-US`.
- Media types: `enum` in OpenAPI spec.
- Omit null properties in responses (no `anyOf` with null for optional fields).

## Resource objects

Only: `url`, `uploadId`, or ACPC-related properties; optional `storageType` for Azure/Dropbox output URLs.

## source / destination

Recommended wrapper pattern for binary inputs/outputs with peer metadata.

## POST → async (Jan 2026)

Product POST endpoints should use the async calling pattern.

## Severity

- **error** — invalid OpenAPI or lint failure
- **high** — style guide contract violation
- **medium** — doc/copy vs modular rules
- **low** — suggestion
