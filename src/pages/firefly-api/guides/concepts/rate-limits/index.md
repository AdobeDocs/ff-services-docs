---
title: Rate Limits - Adobe Firefly API
description: This guide explains rate limiting for the Adobe Firefly API.
keywords:
  - Adobe Firefly Services
  - Rate limits
  - Firefly API
  - Developer documentation
  - Rate limiting concepts
  - API usage limits
  - Throttling
  - Rate limiting policies
  - Quotas
  - Request limits
  - API rate limiting strategies
  - Rate limit enforcement
  - Rate limit management
  - Usage quotas
  - Rate limit headers
  - Rate limit monitoring
  - Scalability considerations
  - Performance optimization
  - Rate limiting configurations
  - Rate limit exceptions
  - Client access
  - Concurrency
  - Monitors usage
  - API Usage
  - API performance
contributors:
  - https://github.com/amandahuarng
  - https://github.com/nimithajalal
  - https://github.com/hollyschinsky
hideBreadcrumbNav: true
---

# Rate Limits

To ensure our customers enjoy equitable peak performance with Firefly APIs, Adobe places limits on the volume, frequency, and concurrency of API calls, and monitors your API usage to proactively contact you and resolve any risks to API performance. 

## Overview

Our API imposes rate limits on how often a user or client can access our services within a specified period.

## Why do we have rate limits?

Rate limits are standard practice for APIs, and they serve several important purposes:

- **Preventing abuse**: Limiting the number of requests from a user prevents malicious users or bots from overwhelming the API, maintaining stability and avoiding disruptions.
- **Ensuring fair usage**: Setting limits provides all users equal access to resources, preventing any user or organization from monopolizing the API's capacity.
- **Managing server load**: Control over the request processing rate prevents server overload and ensures consistent user performance.
- **Protecting against downtime**: Limiting excessive usage helps avoid server downtime, keeping the API available and responsive to legitimate users.
- **Controlling costs**: Limiting resource consumption helps control costs for users, organizations, or applications, especially when API usage is tied to a pricing plan.

## How do these rate limits work?

Rate limits are measured in two ways: requests per minute (RPM) and requests per day (RPD). 

We limit the rate of API requests by the minute, and day.

<InlineAlert variant="info" slots="text1, text2, text3" />

It's important to note that rate limits are imposed at the organization level, not the user level. This means that all users within an organization share the same rate limits. The limits are as follows:

**4** requests **per minute**

**9000** requests **per day**

You may encounter a HTTP 429 "Too Many Requests" error if your usage exceeds either the per-minute, or per day limit. We recommend using the 'retry-after' header to determine the number of seconds you should wait before trying again.

We appreciate that these limits may not be ideal for certain use cases. Please contact us at firefly-professional-services-support@adobe.com, so that we can partner with you on setting the optimal thresholds for your account.
