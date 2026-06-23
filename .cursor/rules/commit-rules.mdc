---
alwaysApply: true
---
# Git commit messages

Always apply this rule. When you draft or generate a git commit message (for example in the Source Control commit box or when asked in Agent chat), follow this format.

## Subject line (first line only)

- Around **50 characters or fewer**.
- Summarize the change in **imperative mood** (e.g. “Add…”, “Fix…”, “Refactor…”).

## Blank line

Leave one **blank line** after the subject before the body.

## Body (detailed description)

- Wrap lines at about **72 characters** (including the bullet prefix and space).
- Use **bullet lines** for the explanation. Each bullet must start with exactly one of these markers:

### `📖` (adds)

Use when the change **adds** something new: new files, new sections, new features, new headers, net-new lines, or other greenfield content.

### `✏️` (modifies)

Use when the change **modifies** existing work: edits to existing lines, updates to existing sections, refactors of existing code, or changes to current content.

### `🆕` (TOC / feature registration)

Use the single character **🆕** when the change **adds an entry** to a repository **table of contents** or **navigation config** file (for example `TOC.md`, `config.md`, or similar) that **registers a new feature, topic, or page**. This usually means a new item appears in the doc or site nav because of that edit.

### `🗑️` (removes)

Use the single character **🗑️** when **entire content is removed** from a page or file—not a light edit, but a full deletion. Typical cases:

- A **section** removed (content under a heading marked with `#` through `######`)
- An **image** removed (for example `![…](…)` or asset reference dropped entirely)
- A **code block** removed (fenced or indented block gone completely)
- A **component** or include removed (for example Experience League shortcodes, includes, or custom MDX-style blocks)

Do **not** use **🗑️** for small wording tweaks inside a section; use **✏️** for those. Use **🗑️** when the heading (and everything under it), the image, the block, or the component no longer appears at all.

Apply **📖**, **✏️**, **🆕**, or **🗑️** to every body bullet that matches the definitions above.

## Template

Fill in the placeholders (do not leave angle brackets in the final message):

```
<Summarize change(s) in around 50 characters or less>

<More detailed explanatory description of the change wrapped into about 72
characters with bullets. >
```

## Examples

```text
Add AJO for GenStudio extensibility topic

- 📖 Add journey-optimizer-for-genstudio.md and screenshot assets.
- 🆕 Add Journey Optimizer for GenStudio to help/extensibility/TOC.md.
- ✏️ Link the topic from use-templates.md and extensibility home.md.
```

```text
Trim obsolete troubleshooting page

- 🗑️ Remove duplicate H2 “Known issues” and its bullets from activation/troubleshooting.md.
- 🗑️ Drop outdated screenshot help/assets/legacy-flow.png from the repo.
```