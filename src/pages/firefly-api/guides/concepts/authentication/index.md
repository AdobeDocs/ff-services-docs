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

## Overview

Every request made to Firefly APIs must include an encrypted access token. Your secure, server-side application retrieves an access token by making a request to the [Adobe Identity Management System (IMS)](https://www.adobe.com/content/dam/cc/en/trust-center/ungated/whitepapers/corporate/adobe-identity-management-services-security-overview.pdf) with your "client ID" and "client secret".

## Retrieve your "client ID" and "client secret"

If you don't already have a Firefly "client ID" and "client secret", retrieve them from your [Adobe Developer Console project](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/#api-overview) before reading further. **Securely store these credentials and never expose them in client-side or public code.**

## Retrieve an access token

First, open a secure terminal and `export` your "client ID" and "client secret" as environment variables so that your later commands can access them:

```bash
export FIREFLY_CLIENT_ID=asdf...123
export FIREFLY_CLIENT_SECRET=qwer...456
```

Next, run the following command to generate an access token:

```bash
curl --location 'https://ims-na1.adobelogin.com/ims/token/v3' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode "client_id=$FIREFLY_CLIENT_ID" \
--data-urlencode "client_secret=$FIREFLY_CLIENT_SECRET" \
--data-urlencode 'scope=openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis'
```

The response will look like this:

```json
{"access_token":"asdf...1234","token_type":"bearer","expires_in":86399}
```

Notice how the response includes an `expires_in` field, which informs you of how many more seconds the access token is valid for. Each access token is valid for 24 hours, after which your secure server-side application will need to request a new token. A best practice is securely store the token and refresh it before it expires.

Export your access token as an environment variable:

```bash
export FIRELY_ACCESS_TOKEN=asdf...1234
```

## Generate an image


Next, call the [Firefly Generate Images API](./api/image_generation/V3/):

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/generate' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $FIREFLY_CLIENT_ID" \
--header "Authorization: Bearer $FIREFLY_ACCESS_TOKEN" \
--data '{
    "prompt": "a realistic illustration of a cat coding"
}'
```

The response will look like this:

```json
{
    "size": {
        "width": 2048,
        "height": 2048
    },
    "outputs": [
        {
            "seed": 1779323515,
            "image": {
                "url": "https://pre-signed-firefly-prod.s3-accelerate.amazonaws.com/images/asdf-12345?lots=of&query=params..."
            }
        }
    ],
    "contentClass": "art"
}
```
