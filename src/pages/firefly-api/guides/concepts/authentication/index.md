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

Learn how to make requests to Firefly APIs

To call Firefly APIs, you need send an encrypted access token with each API request which prove you have the right to access Firefly.

Access tokens are generated using the modern OAuth authentication pattern, where your secure server-side application sends a request to the Adobe Identity Management System (IMS) with your `CLIENT_ID` and `CLIENT_SECRET`, and receives an access token that is valid for 24 hours:


```bash
curl --location 'https://ims-na1.adobelogin.com/ims/token/v3' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode 'client_id=PASTE_YOUR_CLIENT_ID_HERE' \
--data-urlencode 'client_secret=PASTE_YOUR_CLIENT_SECRET_HERE' \
--data-urlencode 'scope=openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis'
```

<InlineAlert variant="info" slots="text" />

If you don't already have a `CLIENT_ID` and `CLIENT_SECRET`, you can find it in your [Adobe Developer Console project](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/#api-overview).

The response will look like this:

```json
{"access_token":"asdf...1234","token_type":"bearer","expires_in":86399}
```

Notice how the response includes an `expires_in` field, which tells you how many more seconds the token is valid for. Each token will be valid for 24 hours, after which your server will need to request a new token.

Now that you understand how to generate an access token, see the [Quickstart Page](../../index.md) to make your first request!
