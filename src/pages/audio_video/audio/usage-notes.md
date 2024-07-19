---
title: Usage Notes - Adobe Audio APIs
description: Usage notes and rate limits for the Adobe Audio APIs.
contributors:
  - https://github.com/hollyschinsky
---

# Audio Services - Usage Notes

This guide details current support and usage limits for the Adobe Audio APIs (Audio Services).

## Input Audio Content Types

The following `content_type` values are supported for use with the Enhance Speech API:

- `audio/aac`
- `audio/flac`
- `audio/m4a`
- `audio/mp4`
- `audio/mpeg`
- `audio/mpeg4-generic`
- `audio/ogg`
- `audio/opus`
- `audio/vnd.dlna.adts`
- `audio/vorbis`
- `audio/wav`
- `audio/x-aac`
- `audio/x-aiff`
- `audio/x-flac`
- `audio/x-m4a`
- `audio/x-wav`

## Request Limits

To ensure you enjoy equitable peak performance with the APIs, Adobe places limits on the volume, frequency, and concurrency of API calls, and monitors your API usage to proactively contact you and resolve any risks to API performance. We currently limit the rate of API requests per minute to the following:

**Enhance Speech**: 

- Creation endpoints (`POST /audio_services/v1/assets` and `POST /audio_services/v1/assets/:id/speech_enhancements`): 100 requests per minute
- All other endpoints: 500 requests per minute
- No daily request limit

You may encounter a HTTP 429 ``Too Many Requests`` error if your usage exceeds either the per-minute, or per day limit. We recommend using the `'retry-after'` header to determine the number of seconds you should wait before trying again.

<InlineAlert variant="warning" slots="text1" />

These usage limits apply to **your entire organization**<br/>

<!-- <InlineAlert variant="info" slots="text1, text2, text3" />

Bear in mind that the following usage limits apply to **your entire organization**:

**4** requests **per minute**

**9000** requests **per day**

You may encounter a HTTP 429 "Too Many Requests" error if your usage exceeds either the per-minute, or per day limit. We recommend using the 'retry-after' header to determine the number of seconds you should wait before trying again.

We appreciate that these limits may not be ideal for certain use cases. Please contact us at firefly-professional-services-support@adobe.com, so that we can partner with you on setting the optimal thresholds for your account. -->
