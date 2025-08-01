---
title: Changelog - InDesign APIs
description: Stay updated with the latest features, improvements, and bug fixes for Adobe InDesign APIs.
---

# Changelog

This page contains the release notes and version history for Adobe InDesign APIs. Stay updated with the latest features, improvements, and bug fixes.

## Latest Updates

### New Features

#### **Remap Links API**
- Added new `/v3/remap-links` endpoint for remapping file-based links to AEM links
- Supports batch link remapping operations
- Ideal for customers working with AEM using Adobe Asset Link (AAL)
- [View API Documentation](../api/remaplinks.md)

#### **Custom Scripts API Enhancements**
- **List Custom Scripts**: New `GET /v3/scripts` endpoint to retrieve all registered scripts
- **Get Script Details**: New `GET /v3/scripts/{script_name}` endpoint for individual script information  
- **Delete Custom Scripts**: New `DELETE /v3/scripts/{script_name}` endpoint for script deletion management
- [View API Documentation](../api/scripts.md)

### Documentation Updates
- Added comprehensive [User Data Handling](../Help/user-data-handling.md) documentation
- Enhanced API reference with detailed examples
- Improved error code documentation and troubleshooting guides