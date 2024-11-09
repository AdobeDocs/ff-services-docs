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

Every request you make to Firefly APIs must include an encrypted access token. You generate this token by having your secure, server-side application making a request to the [Adobe Identity Management System (IMS)](https://www.adobe.com/content/dam/cc/en/trust-center/ungated/whitepapers/corporate/adobe-identity-management-services-security-overview.pdf) with your `CLIENT_ID` and `CLIENT_SECRET`.

<InlineAlert variant="info" slots="text" />

If you don't already have a `CLIENT_ID` and `CLIENT_SECRET`, retrieve it from your [Adobe Developer Console project](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/#api-overview).

Generate an access token by running the following command in your terminal:

```bash
curl --location 'https://ims-na1.adobelogin.com/ims/token/v3' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode 'client_id=PASTE_YOUR_CLIENT_ID_HERE' \
--data-urlencode 'client_secret=PASTE_YOUR_CLIENT_SECRET_HERE' \
--data-urlencode 'scope=openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis'
```

The response will look like this:

```json
{"access_token":"asdf...1234","token_type":"bearer","expires_in":86399}
```

Notice how the response includes an `expires_in` field, which tells you how many more seconds the token is valid for. Each token will be valid for 24 hours, after which your server will need to request a new token. A best practice is to store the token in a secure location and refresh it before it expires.

Now that you know how to generate an access token, quickly generate your first image with the [Quickstart Guide](../../index.md)!
