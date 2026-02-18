---
description: Generate Firefly product landing page markdown from pasted PRD (wiki/Confluence) content
globs: src/pages/index.md, **/overview*.md, **/index.md
alwaysApply: false
---

# Generate Firefly Landing Page from PRD Content

You help create Firefly Services product landing pages in markdown from pasted Product Requirements Document (PRD) content. The output follows the pattern of successful Firefly landing pages (e.g. [Audio/Video Firefly Services](https://developer-stage.adobe.com/audio-video-firefly-services/?aio_internal)): sections organized by service, questioning headers, use-cases and features in marketing language, and optional discovery/CTA blocks.

Use this rule when:

1. The user pastes PRD or wiki content and asks to create or draft a landing/overview page.
2. The user asks to convert Confluence/wiki content into a Firefly overview page.
3. The user asks to generate marketing-style overview copy from functional/non-functional requirements.

## Reference: Target landing page pattern

- **Hero**: Page title and short tagline (e.g. "Audio/Video APIs offer automated audio/video content production at scale with AI.").
- **Overview**: One short paragraph describing the product/APIs as a collection and value.
- **Explore / Discover**: Optional block linking to individual APIs or Getting Started (use theme blocks where applicable).
- **Per-service sections**: Each API or service gets its own H2. Within each section:
  - **"What is this API?"** (or "What is [Service name]?") — questioning header; bullet list of capabilities or options.
  - **"Why choose [X]?"** or **"Features"** — benefit-focused bullets or numbered list (marketing language).
  - Optional short paragraph of context (e.g. Reframe "This API uses technology similar to...").
- **Call-to-action**: Optional closing section (e.g. "Ready to try it?" with link to Getting Started).
- **Tone**: Benefit-focused, clear, marketing-appropriate; avoid raw requirement IDs (P0, N1) and jargon in body copy.

## Handling pasted PRD content

### Source content (typical PRD / wiki structure)

- **Overview** — Use for hero tagline and main product overview.
- **Goals** — Use to shape "Why choose?" and value propositions.
- **Functional Requirements (FR)** / **Non-Functional Requirements (NFR)** — Map to "What can you do?" and feature bullets; do not list as "FR 1, P0" in the page.
- **Appendix / FAQ** — Use for "Common questions" or fold answers into body; optional FAQ section.
- **Jira link, Product Lead, etc.** — Omit from the generated page.

### What to strip from pasted content

- Confluence/wiki chrome: "Skip to sidebar", "Page tree", "Create", "Search", "Profile", space shortcuts, breadcrumbs.
- Navigation and labels: "Edit View inline comments", "Save for later", "Watch", "Share", "Send page", "Pages…", "Like", "Powered by Atlassian", "Report a bug".
- Table-of-contents or page-tree lists that are navigation, not body content.
- Raw requirement tables (e.g. "1 P0", "N0 P0") unless you turn them into plain-language bullets.

### What to keep and transform

- **Overview** → Hero text and first overview paragraph.
- **Goals** → "Why choose?" and benefit bullets.
- **Functional / non-functional requirements** → "What is this API?" and feature lists in user/benefit language.
- **FAQ** → Optional "Common questions" section or inline answers.

## Structure and formatting rules

1. **Metadata**: Include valid front matter per [eval-md-content](.cursor/rules/eval-md-content.mdc): `title`, `description`, `keywords`, and `hideBreadcrumbNav: true` if appropriate for a landing page.
2. **Headings**: Prefer questioning headers for use-cases and features (e.g. "What is this API?", "Why choose Reframe v2?", "What can you do?"). Use sentence case.
3. **One section per service**: If the PRD covers multiple APIs or services, create one H2 per service; use consistent sub-structure (What is…, Why choose… / Features).
4. **Lists**: Use bullets for capabilities/options; use numbered lists when order or steps matter (e.g. "How it works").
5. **Links**: Use relative paths for in-repo links (e.g. `[Getting Started](guides/getting-started/index.md)`). Follow path rules from eval-md-content (relative to path prefix, include `.md` where applicable).
6. **Theme blocks**: Use Hero and Discover-style blocks when the theme supports them (see [aio-theme Writing Enhanced Markdown](https://github.com/adobe/aio-theme?tab=readme-ov-file#writing-enhanced-markdown)). Example:
   - `<Hero slots="heading, text"/>` then `# Title` and tagline.
   - `<DiscoverBlock slots="heading, link, text"/>` for "Get Started" / "Try the API" cards.
7. **Alerts**: Use inline alert component for notes, tips, or warnings (see eval-md-content and aio-theme InlineAlert).
8. **Voice**: Microsoft Writing Style Guide; Adobe standards override when specified in eval-md-content. Complete sentences with periods for descriptions; no trailing periods in response-like labels if you add any.

## Output format

- Emit GitHub-flavored Markdown only (no Confluence markup).
- After generating, briefly state what you used from the PRD (e.g. Overview, Goals, FRs) and what you added or inferred (e.g. "Why choose?" from goals, feature list from FRs).
- If the PRD mentions a single API, produce one main "What is…" and one "Why choose?" (or "Features") section; if multiple APIs, repeat the pattern per API.

## Example section shape (single API)

```markdown
## [API Name] API

Short one- or two-sentence intro if needed.

### What is this API?

The [API Name] API allows you to:

* **Capability one** — brief benefit.
* **Capability two** — brief benefit.
* **Capability three** — brief benefit.

### Why choose [API Name]?

* **Benefit one** — one line.
* **Benefit two** — one line.
```

When the user pastes PRD content, strip wiki chrome, then fill this structure from Overview, Goals, and FRs/NFRs using marketing language and questioning headers.
