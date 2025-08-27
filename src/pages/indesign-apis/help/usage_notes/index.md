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

# Technical usage notes

## Overview

Here you'll find InDesign API support information and troubleshooting guidance. This document covers storage types, file limits, encoding requirements, and data handling practices.

For the latest updates, new features, and bug fixes, [check InDesign's changelog][1].

## API limitations

### Rate limits

To maintain API stability and fair usage across clients, the following limits are enforced:

* Soft limit: 250 requests per minute across all endpoints. Once this limit is crossed, you may experience slower responses.

* Hard limit: 350 requests per minute. Requests beyond this limit are rejected.

### File size

For the Custom Scripts API, the maximum allowed size for a Custom Script ZIP upload is 5MB.

Otherwise, the maximum supported file size is 1GB.

### Assets

The number of assets (input + output) that can be passed in a single payload is 99.

### Origins and domains

Only a specific set of origins/domains are supported.

Please reach out to Adobe to whitelist any alternative origins/domains you may be using.

## Supported storage types

InDesign APIs currently support the following storage types for assets:

* AWS S3
* Dropbox
* Azure

## CSV encoding support

The Data Merge API supports UTF-16BE encoding for CSV files. This encoding is required for languages or characters that need multi-byte representation. For plain English characters, the CSV will work correctly even without this encoding.

## API retry

For reliability and stability, we've added a retry mechanism for all API calls. Here are the recommendations:

* Only retry requests that have a 5xx response code. A 5xx error response indicates a problem processing the request on the server. Don't retry requests for any other response code.

* Implement an exponential back-off retry strategy with 3 retry attempts.

## User data handling

Ensuring transparency in the way we handle User Generated Content (UGC) is our priority. Here's how different types of UGC are managed:

### Input assets

This refers to files that have been submitted for processing.

* Stored temporarily on the local system during processing.
* Deleted after processing is complete.

### Processed documents

This refers to the output assets.

* If the user provides a pre-signed URL, the output is uploaded there.
* If not, the system uploads the output to a presigned URL backed by our internal Azure blob storage and retains it for 12 hours only.

### Metadata

The system stores minimal metadata about:

*Inputs*

* Source URL
* File size

*Outputs*

* File name
* File size
* Upload location

This metadata is stored in the database.

### Scripts

* Customer-submitted scripts are stored permanently.
* Users can view and delete their registered scripts at any time.

### Security measures

All data is stored and processed under appropriate security measures to prevent unauthorized access and ensure confidentiality.

<!-- Links -->
[1]: ../../changelog/index.md
