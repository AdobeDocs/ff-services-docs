---
title: Technical Usage Notes
description: >-
  This documentation provides technical limitations and workarounds for the
  Video Reframe API.
contributors:
  - 'https://github.com/AEAbreu-hub'
keywords:
  - API documentation
  - REST API
og:
  title: Technical Usage Notes
  description: >-
    This documentation provides technical limitations and workarounds for the
    Video Reframe API.
twitter:
  card: summary
  title: Technical Usage Notes
  description: >-
    This documentation provides technical limitations and workarounds for the
    Video Reframe API.
---

# Technical Usage Notes

This information can assist developers in optimizing their API implementation and understanding service boundaries.

Please note that specifications and limitations may be subject to change as the service evolves.

## Supported media properties

| Attribute | Input | Output |
|-----------|--------|--------|
| Formats | Video: .mp4, .mov; Image: .png, .gif | .mp4 |
| Upload/Download type | Pre-signed URLs to individual videos, overlays | Pre-signed URLs to individual videos |
| Video Duration (Max) | 30 minutes | Same as source |
| Video Size (Max) | 10 GB | Same as source |
| Video Codecs | H.265/HEVC (only 4:2:0), H.264/AVC | Same as source |
| Color Properties | BT 601, BT 709, BT 2020, BT 2020 HLG, BT 2020 PQ | Same as source |
| Frame Rate | 24, 25, 29.97, 30, 50, 59.94, 60 | Same as source |
| 4K Support | Yes | Yes |

## Performance characteristics

| Configuration                                     | Estimated Render Time                 |
|-------------------------------                    |---------------------------------------|
| 1 Aspect Ratio, no scene edit detection applied   | ~0.5x video length  |
| 3 Aspect Ratios, no scene edit detection applied  | ~0.6x video length |
| 1 Aspect Ratio, with scene edit detection         | ~1.4x video length        |

## Request limits

To ensure equitable peak performance, Adobe limits the volume, frequency, and concurrency of API calls. We monitor usage and proactively contact you to resolve any risks to performance.

The rate of API requests are limited to:

- Reframe Processing Endpoint (/reframe): Max of 2 requests per minute.
- Status Check Endpoint (/status): Max of 100 requests per minute.

You may encounter a HTTP 429 "Too Many Requests" error if your usage exceeds either the per minute, or per day limits.
We recommend using the 'retry-after' header to determine the number of seconds you should wait before trying again.
