---
title: Rate Limits - Adobe Firefly API
description: This guide explains rate limiting for the Adobe Firefly API.
contributors:
  - https://github.com/amandahuarng
---
# Rate Limits

To ensure our customers enjoy equitable peak performance with Firefly APIs, Adobe places limits on the volume, frequency, and concurrency of API calls, and monitors your API usage to proactively contact you and resolve any risks to API performance.

We limit the rate of API requests by the minute, and day.

<InlineAlert variant="info" slots="text1, text2, text3" />

Bear in mind that the following usage limits apply to **your entire organization**:

**4** requests **per minute**

**9000** requests **per day**

You may encounter a HTTP 429 "Too Many Requests" error if your usage exceeds either the per-minute, or per day limit. We recommend using the 'retry-after' header to determine the number of seconds you should wait before trying again.

We appreciate that these limits may not be ideal for certain use cases. Please contact us at firefly-professional-services-support@adobe.com, so that we can partner with you on setting the optimal thresholds for your account.
