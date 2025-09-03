---
title: Authentication
description: Learn how to authenticate requests to Firefly APIs
keywords:
  - Firefly API Authentication
  - Server-to-Server Authentication
  - OAuth
  - API Security
  - Access Tokens
  - Client ID
  - Client Secret
  - Identity Management
  - Secure API Access
  - Token-Based Authentication
  - Generate Access Token
  - Authentication Best Practices
contributors:
  - 'https://github.com/bishoysefin'
hideBreadcrumbNav: true
og:
  title: Authentication
  description: Learn how to authenticate requests to Firefly APIs
twitter:
  card: summary
  title: Authentication
  description: Learn how to authenticate requests to Firefly APIs
---

# Authentication

Learn how to authenticate requests to Firefly APIs

## Overview

Every request made to Firefly APIs must include an encrypted access token. Your secure, server-side application retrieves an access token by making a request to the [Adobe Identity Management System (IMS)](https://www.adobe.com/content/dam/cc/en/trust-center/ungated/whitepapers/corporate/adobe-identity-management-services-security-overview.pdf) with your **Client ID** and **Client Secret**.

## Prerequisites

This tutorial assumes you have worked with your Adobe Representative and have the following:

* An [Adobe Developer Console](https://developer.adobe.com/) account.
* A [project](https://developer.adobe.com/developer-console/docs/guides/projects/projects-empty/) with Firefly API [OAuth Server-to-Server credentials set up](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/).
* Access to your Client ID and Client Secret from the [Adobe Developer Console project](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/#api-overview). Securely store these credentials and never expose them in client-side or public code.

## Retrieve an access token

First, open a secure terminal and `export` your **Client ID** and **Client Secret** as environment variables so that your later commands can access them:

```bash
export FIREFLY_SERVICES_CLIENT_ID=<your_Client_ID>
export FIREFLY_SERVICES_CLIENT_SECRET=<your_Client_Secret>
```

Next, run the following command to generate an access token:

```bash
curl --location 'https://ims-na1.adobelogin.com/ims/token/v3' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode "client_id=$FIREFLY_SERVICES_CLIENT_ID" \
--data-urlencode "client_secret=$FIREFLY_SERVICES_CLIENT_SECRET" \
--data-urlencode 'scope=openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis'
```

The response will look like this:

```json
{"access_token":"yourExampleTokenAsdf123","token_type":"bearer","expires_in":86399}
```

Notice how the response includes an `expires_in` field, which informs you of how many more seconds the access token is valid for. Each access token is valid for 24 hours, after which your secure server-side application will need to request a new token. A best practice is securely store the token and refresh it before it expires.

Export your access token as an environment variable:

```bash
export FIREFLY_SERVICES_ACCESS_TOKEN=yourExampleTokenAsdf123
```

Ready to put your API authentication to use? Continue to the [Generate Images API][1] guide.

[1]: ../../how-tos/firefly-generate-image-api-tutorial.md
