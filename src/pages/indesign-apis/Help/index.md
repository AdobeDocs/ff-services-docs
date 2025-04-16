---
title: Help page for InDesign APIs
description: This is the help page for support and troubleshooting.
---

# Troubleshooting and Support

Here you'll find InDesign API support information.

## Supported Storage Types
InDesign APIs currently support the following storage types for assets:
- AWS S3
- Dropbox
- Azure

## File Size Limit
The maximum supported file size is 1GB.

## Maximum Number of Assets in a Single Payload
The maximum number of assets (input + output) that can be passed in a single payload is 99.

## CSV Encoding Support
The Data Merge API supports UTF-16BE encoding for CSV files. This encoding is required for languages or characters that need multi-byte representation. For plain English characters, the CSV will work correctly even without this encoding.

## API retry

 For reliability and stability, we've added a retry mechanism for all API calls. Here are some recommendations around how to handle a retry:

  - Only retry requests that have a 5xx response code. A 5xx error response indicates there was a problem processing the request on the server. DO not retry requests for any other response code.

  - Implement an exponential back-off retry strategy with 3 retry attempts.

## Allowed origins and domains

Only a specific set of origins/domains are supported. 

Please reach out to Adobe in order to whitelist any alternative origins/domains you may be using.
