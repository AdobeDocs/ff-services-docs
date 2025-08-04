---
title: Changelog - InDesign APIs
description: Stay updated with the latest features, improvements, and bug fixes for Adobe InDesign APIs.
hideBreadcrumbNav: true
keywords:
  - InDesign API
  - changelog
  - release notes
  - updates
  - new features
  - bug fixes
---

# Changelog

## Overview

This page contains the release notes and version history for Adobe InDesign APIs. Stay updated with the latest features, improvements, and bug fixes.

### August 4, 2025

#### New features

**Remap Links API**

- Added new `/v3/remap-links` endpoint for remapping file-based links to AEM links.
- Supports batch link remapping operations. Ideal for customers working with AEM using Adobe Asset Link (AAL).
- [Explore the API documentation][1]

**Custom Scripts API enhancements**

- **List Custom Scripts**: New `GET /v3/scripts` endpoint to retrieve all registered scripts.
- **Get Script Details**: New `GET /v3/scripts/{script_name}` endpoint for individual script information.
- **Delete Custom Scripts**: New `DELETE /v3/scripts/{script_name}` endpoint for script deletion management.
- [Explore the API documentation][2]

#### Documentation updates

- Added comprehensive [User data handling][3] documentation.
- Enhanced API reference with detailed examples.
- Improved error code documentation and troubleshooting guides.

<!-- Links -->
[1]: ../api/remaplinks.md
[2]: ../api/scripts.md
[3]: ../help/usage_notes/index.md#user-data-handling
