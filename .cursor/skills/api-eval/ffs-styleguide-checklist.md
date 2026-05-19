# FFS API Style Guide — eval checklist

Source: [Firefly Services API Style Guide](https://wiki.corp.adobe.com/display/GenAI/Firefly+Services+API+Style+Guide)

Related wiki pages:

- [Error Codes](https://wiki.corp.adobe.com/display/GenAI/API+Style+Guide%3A+Error+Codes)
- [Pagination](https://wiki.corp.adobe.com/display/GenAI/API+Style+Guide%3A+Pagination)
- [ACP Integration](https://wiki.corp.adobe.com/display/GenAI/API+Style+Guide%3A+ACP+Integration)
- [Asynchronous Events](https://wiki.corp.adobe.com/display/GenAI/API+Style+Guide%3A+Asynchronous+Events)
- [Checklist](https://wiki.corp.adobe.com/display/GenAI/API+Style+Guide+checklist)

## Eval layers

1. Redocly lint (`npm run lint:openapi -- <path>`) — mark `api-fix-eligible`
2. OpenAPI version validity (3.0 vs 3.1)
3. FFS style guide (this checklist)
4. Doc modular rules (`api-ref-copy`, examples, tags)

## Checklist

- [ ] Stateless RPC scope; POST async, GET sync
- [ ] POST paths verb-led, hyphenated; GET collections plural nouns
- [ ] `Authorization` required; `x-api-key` optional where documented
- [ ] 202 body: `jobId`, `statusUrl`; optional `cancelUrl`
- [ ] Status enum: `not_started`, `running`, `succeeded`, `failed`, `partially_succeeded`, `canceled`
- [ ] Errors use `error_code`; optional `message`
- [ ] JSON camelCase (except `error_code`); American English
- [ ] `*Date`, `*MediaType`, `*LocaleCode`, `*Folder` naming
- [ ] ISO 8601 date-times; `en-US` locales
- [ ] Media types as OpenAPI `enum`
- [ ] Optional fields omitted, not `null` unions
- [ ] Resource objects: `url`, `uploadId`, or ACPC props only
- [ ] `source` / `destination` pattern where applicable
- [ ] POST endpoints use async pattern
