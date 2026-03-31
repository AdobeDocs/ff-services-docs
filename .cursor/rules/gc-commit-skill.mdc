---
description: Points agents and contributors to gc (/gc) and gcam (/gcam) skills for staging and commits with the repo Git message format. Use when the user mentions /gc, /gcam, quick commit, review before commit, or gc / gcam skills.
globs:
alwaysApply: true
---

# Quick commit (`/gc` and `/gcam`) — project skills

These **Agent skills** use **User Rules → Git commit messages** (imperative ~50-character subject, blank line, body bullets with **📖** for new work and **✏️** for edits).

## Where they live

| Command | Skill | Purpose |
|--------|--------|--------|
| **`/gc`** | [.cursor/skills/gc/SKILL.md](.cursor/skills/gc/SKILL.md) | Stage all (`git add -A`) → commit in one flow. |
| **`/gcam`** | [.cursor/skills/gcam/SKILL.md](.cursor/skills/gcam/SKILL.md) | Stage all → **proposed message for review** → user chooses **(1) commit** or **(2) reject** (no commit on reject; staging kept unless user asks to unstage). |

## When to use which

- **`/gc`** — User wants **stage everything and commit** immediately with the standard message format.
- **`/gcam`** — User wants to **see and optionally edit** the commit message first, then **commit** or **reject**.

## When not to use

- **Partial paths only** or **no staging** — confirm scope; these skills default to **all** saved changes via `git add -A`.
- **Message only, no staging** — draft a message without running the full skill unless they ask to stage.

For message structure and examples, see **gc**’s `SKILL.md`; **gcam** references the same format.
