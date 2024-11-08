---
title: Authentication
description: A guide to authentication for Adobe Firefly API
keywords:
  - Adobe Firefly Services
  - Authentication
  - Firefly API
  - Credentials
  - Server-to-server
  - Developer documentation
  - Authentication concepts
  - Authorization
  - Identity verification
  - OAuth
  - API security
  - Access tokens
  - Client secret
  - Authentication methods
  - User authentication
  - Client authentication
  - Authentication flow
  - Token-based authentication
  - Single sign-on (SSO)
  - Generate token
  - Firefly access
  - Identity management
  - Secure API access
  - Authentication protocols
  - Authentication best practices
contributors:
  - https://github.com/amandahuarng
  - https://github.com/nimithajalal
  - https://github.com/hollyschinsky
hideBreadcrumbNav: true
---

# Authentication

Understand Firefly API's enterprise-level authentication pattern

Firefly API's server-to-server OAuth authentication pattern allows your server-side application to generate 24-hour access tokens that call Firefly APIs, rather than directly relying on API keys. This modern security pattern is often referred to as "two-legged OAuth".

## Prerequisites

Before you begin, ensure you have:

* An [Adobe Developer Console](https://developer.adobe.com/console/786177/home) account.
* A [project](https://developer.adobe.com/developer-console/docs/guides/projects/projects-empty/) with Firefly API [OAuth Server-to-Server credentials set up](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/).
* Access to your Client ID and Client Secret from the Developer Console.

## Access tokens

[Generating access tokens](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/#api-overview) can be accomplished either directly from the Developer Console UI or programmatically.

To generate an access token, send a `POST` request to the Adobe Identity Management System (IMS) token endpoint.

### Authentication Endpoint:

```bash
https://ims-na1.adobelogin.com/ims/token/v3
```

### Required Parameters:

* `client_id`: Client ID from Console
* `client_secret`: Client secret from Console
* `scope`: `firefly_api`, `ff_apis`, `openid`, `AdobeID`, `session`, `additional_info`, `read_organizations`

### Example Request

```bash
curl -X POST 'https://ims-na1.adobelogin.com/ims/token/v3' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'grant_type=client_credentials&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&scope=openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis'
```

Replace `{CLIENT_ID}` and `{CLIENT_SECRET}` with your actual credentials.

### Response:

``` bash
{
    "access_token": "ey1...JQ",
    "token_type": "bearer",
    "expires_in": 86399
}
```

The token endpoint returns an expiry timeframe in seconds, a token type and the token itself.

Access tokens and the `client_id` are required to authenticate your API requests. See the [Quickstart Page](../../index.md) to make your first request!
