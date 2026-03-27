---
name: gc-commit
description: Stages all working-tree changes with git add -A, then commits with a message that follows the repository user’s Git commit rules (short imperative subject, blank line, body bullets with 📖/✏️). Use when the user invokes /gc, asks to “gc”, or asks to stage everything and commit with the project commit-message format.
---

# `/gc` — Stage all and commit

## When to run

Apply this skill only when the user clearly wants a full-repo stage-and-commit in one step (for example `/gc`, “run gc”, or “stage all changes and commit”).

Do not run if the user only asked for a message draft with no commit, or if they want to stage specific paths only—confirm scope first.

For **review before commit** (proposed message, then user chooses commit or reject), use the **`gc-commit-review`** skill ([`/gc!`](../gc-commit-review/SKILL.md)) instead.

## Steps

1. **Confirm repo root** — Run commands from the workspace git root (the directory that contains `.git`). If unsure, run `git rev-parse --show-toplevel` and `cd` there.

2. **Stage everything** — Run:
   ```bash
   git add -A
   ```
   This stages saved changes to tracked files, new files, and removals. Unsaved editor buffers are not in git until the user saves.

3. **Inspect what will be committed** — Use `git status` and, if needed, `git diff --cached --stat` (or full `--cached`) so the message matches the actual change set.

4. **Write the commit message** using the **User Rules → Git commit messages** format (see below). Base the subject and bullets on the staged diff, not on assumptions.

5. **Commit** — Prefer a single commit with a multi-line message. For example, write the message to a file and commit:
   ```bash
   git commit -F /path/to/commit-msg.txt
   ```
   Or use multiple `-m` arguments: first `-m` for the subject line, second `-m` for the body (paragraph with bullet lines).

6. **Report** — Show the user the short hash, subject line, and a one-line summary of what was committed.

## Commit message format (required)

Follow the user’s Git commit rules exactly:

### Subject line (first line only)

- About **50 characters or fewer**
- **Imperative mood** (e.g. “Add…”, “Fix…”, “Update…”)
- **No** trailing period on the subject line

### Blank line

- One **blank line** after the subject before the body

### Body (detailed description)

- Wrap body lines at about **72 characters** where practical
- Use **bullet lines**; each bullet must start with exactly one of:
  - **📖** — net-new content: new files, new sections, new features, new headers, greenfield lines
  - **✏️** — modifications: edits to existing lines, updates to sections, refactors, changes to current content
- Apply **📖** or **✏️** to **every** body bullet so additions vs edits are explicit

### Template

```
<Imperative summary in ~50 characters or less>

<Optional wrapped paragraph; bullets below.>

- 📖 …
- ✏️ …
```

If the change is trivial (one kind of edit), a single bullet may be enough.

## Safety

- If there is **nothing to commit** after `git add -A`, say so and do not create an empty commit unless the user explicitly asks for it.
- If **pre-commit hooks fail**, show the hook output and do not force `--no-verify` unless the user asks.

## Examples

**Small fix (body can be one bullet):**

```
Fix null check in status loader

- ✏️ Guard against missing payload before mapping rows.
```

**Mixed feature:**

```
Add export dialog for CSV results

- 📖 Add ExportCsvDialog component and CSV helper.
- ✏️ Wire export action into results toolbar.
```

(Adjust bullets to match the real diff and the 📖/✏️ rules.)
