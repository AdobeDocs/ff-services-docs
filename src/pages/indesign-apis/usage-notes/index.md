---
title: InDesign Technical Usage Notes
description: A page with usage notes information about support, known limitations, and troubleshooting for InDesign APIs.
hideBreadcrumbNav: true
keywords:
  - InDesign API
  - technical notes
  - usage guidelines
  - troubleshooting
  - limitations
---

# Technical Usage Notes

## Overview

Here you'll find InDesign API support information and troubleshooting guidance. This document covers storage types, file limits, encoding requirements, and data handling practices.

## Supported storage types

InDesign APIs currently support the following storage types for assets:

- AWS S3
- Dropbox
- Azure

## File size limit

The maximum supported file size is 1GB.

## Maximum number of assets in a single payload

The maximum number of assets (input + output) that can be passed in a single payload is 99.

## CSV encoding support

The Data Merge API supports UTF-16BE encoding for CSV files. This encoding is required for languages or characters that need multi-byte representation. For plain English characters, the CSV will work correctly even without this encoding.

## API retry

For reliability and stability, we've added a retry mechanism for all API calls. Here are some recommendations around how to handle a retry:

- Only retry requests that have a 5xx response code. A 5xx error response indicates there was a problem processing the request on the server. Don't retry requests for any other response code.

- Implement an exponential back-off retry strategy with 3 retry attempts.

## Allowed origins and domains

Only a specific set of origins/domains are supported.

Please reach out to Adobe in order to whitelist any alternative origins/domains you may be using.

## Rate limits

To maintain API stability and fair usage across clients, the following limits are enforced:

- Soft limit: 250 requests per minute across all endpoints. Once this limit is crossed, you may experience slower responses.

- Hard limit: 350 requests per minute. Requests beyond this limit are rejected.

## Custom Scripts API - ZIP file size limit

For the Custom Scripts API, the maximum allowed size for a Custom Script ZIP upload is 5MB.

## Additional help topics

For the latest updates, new features, and bug fixes, check our [changelog][1].

## User data handling

Our primary focus is to ensure transparency in how we handle User Generated Content (UGC). Here's how different types of UGC are managed:

### 1. Input assets (e.g., files submitted for processing)

- Stored temporarily on the local system during processing.
- Deleted immediately after processing is complete.

### 2. Processed documents (output assets)

- If the user provides a pre-signed URL, the output is uploaded there.
- If not, the system uploads the output to a presigned URL backed by our internal Azure blob storage and retains it for 12 hours only.

### 3. Metadata

The system stores minimal metadata about:

- **Inputs**: source URL and file size.
- **Outputs**: file name, size, and upload location.

This metadata is stored in the database.

### 4. Scripts

- Customer-submitted scripts are stored permanently.
- Users can view and delete their registered scripts at any time.

### 5. Security measures

All data is stored and processed with appropriate security measures to prevent unauthorized access and ensure confidentiality.

<!-- Links -->
[1]: ../changelog/index.md