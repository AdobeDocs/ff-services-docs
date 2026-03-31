---
name: gcam
description: "Stages all changes with git add -A, drafts a commit message per the user’s Git commit rules, prints it for review, then waits for the user to edit the message and choose (1) commit or (2) reject. Use when the user invokes /gcam or the gcam skill, asks for stage-all with review before commit, or interactive commit with approve/reject."
---

# `/gcam` — Stage all, propose message, review, then commit or reject

## When to run

Apply when the user wants **staging plus a proposed commit message** but **no commit until they approve**—for example **`/gcam`**, “gcam”, “stage all and let me edit the commit message”, or “propose a commit then I’ll choose commit or reject”.

Do **not** run when the user wants an immediate commit with no review—use the **`gc`** skill (`/gc`) instead.

## Steps (first message)

1. **Repo root** — Run from the git root (`git rev-parse --show-toplevel` if needed).

2. **Stage everything** — Run:

   ```bash
   git add -A
   ```

3. **Inspect the staged set** — Use `git status` and `git diff --cached` / `--stat` so the draft message matches what is staged.

4. **Draft the commit message** using **User Rules → Git commit messages** (same rules as **`gc`**: imperative ~50-character subject, blank line, body bullets with **📖** / **✏️**, ~72-character wrap). See [.cursor/skills/gc/SKILL.md](../gc/SKILL.md) for the full template and examples.

5. **Present for review** — Output the message in a **single fenced code block** labeled clearly so the user can copy and edit it, for example:
   - **Proposed commit message** (copy/edit below)

6. **Pause for user decision** — Do **not** run `git commit` yet. End with a short prompt like:

   - Review the proposed message above. You may reply with an **edited** full message in a code block if you want changes.
   - Then choose:
     - **`1`** or **`commit`** — Commit using the **final** message (your edited version if you sent one; otherwise the proposal).
     - **`2`** or **`reject`** — Do **not** commit. Staged files stay staged unless you ask to unstage.

7. **If nothing is staged** after `git add -A`, say so and stop (same as **`gc`**).

## Steps (user’s follow-up message)

Interpret the reply:

| User intent | Action |
|-------------|--------|
| **`1`**, **`commit`**, or equivalent **and** (optional) a **full** commit message in a code block | Commit with that message. If they chose **1** but **no** new message, use the **last proposed** message from the previous turn. |
| **`2`**, **`reject`**, or equivalent | Do **not** run `git commit`. Confirm that the commit was skipped. **Staged changes remain staged** by default. |
| **Edited message only** (code block) **without** 1 or 2 | Ask them to reply with **`1`** (commit with that text) or **`2`** (reject). |
| **Ask to unstage** after reject | Run `git reset HEAD` (or `git restore --staged .` if appropriate for their Git version/workflow) from repo root and confirm. |

**Commit command** — Use `git commit -F` with a temp file, or multiple `-m`, so newlines and bullets are preserved.

**After a successful commit** — Report short hash, subject, and brief summary.

## Safety

- Never **`--no-verify`** unless the user asks after a hook failure.
- If **hooks fail** on commit, show output and wait for next instruction.

## Relationship to `/gc`

| Command | Behavior |
|---------|----------|
| **`/gc`** (`gc`) | Stage all → commit in one flow (no approval step). |
| **`/gcam`** (this skill, `gcam`) | Stage all → propose message → user reviews → **1** commit or **2** reject. |
