---
title: Changelog - InDesign API
description: Release notes and version history for InDesign APIs
---

# Changelog

This page contains the release notes and version history for Adobe InDesign APIs. Stay updated with the latest features, improvements, and bug fixes.

**New Features**
- **Remap Links API**: Added new `/v3/remap-links` endpoint for remapping file-based links to AEM URLs
  - Supports batch link remapping operations
  - Includes AEM token authentication for seamless integration
  - Ideal for customers working with AEM using Adobe Asset Link (AAL)

**Custom Scripts API Enhancements**
- **List Custom Scripts**: New `GET /v3/scripts` endpoint to retrieve all registered scripts
  - Pagination support for large script collections
  - Returns script metadata including versions and registration dates
- **Get Script Details**: New `GET /v3/scripts/{script_name}` endpoint for individual script information
  - Includes download URLs and execution URLs
  - Provides comprehensive script metadata
- **Delete Custom Scripts**: New `DELETE /v3/scripts/{script_name}` endpoint for script management
  - Removes all versions of the specified script
  - Supports cleanup and lifecycle management

**Documentation Updates**
- Added comprehensive User Data Handling documentation
- Enhanced API reference with detailed examples
- Improved error code documentation and troubleshooting guides

