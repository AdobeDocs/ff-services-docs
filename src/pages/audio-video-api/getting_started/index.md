---
title: Reframe API Authentication
description: Learn how to authenticate your requests to the Reframe API.
contributors:
  - 'https://github.com/AEAbreu-hub'
keywords:
  - API documentation
  - REST API
og:
  title: Reframe API Authentication
  description: Learn how to authenticate your requests to the Reframe API.
twitter:
  card: summary
  title: Reframe API Authentication
  description: Learn how to authenticate your requests to the Reframe API.
---

# Authentication

## Overview

Every request made to Firefly APIs must include an encrypted access token. Your secure, server-side application retrieves an access token by making a request to the Adobe Identity Management System (IMS) with your Client ID and Client Secret.

### Prerequisites

Before you start, work with your Adobe representative to set up the following:

- An Adobe Developer Console account.
- A project with Firefly API OAuth Server-to-Server credentials set up.
- Access to your Client ID and Client Secret from the Adobe Developer Console project. Securely store these credentials and never expose them in client-side or public code.

<InlineAlert variant="info" slots="text" />

During the private beta phase, Client ID and Client Secret may be provisioned directly by the onboarding team.

## Retrieve an access token

Generate access tokens by sending a POST request to the IMS endpoint, using your Client ID and Client Secret:

```shell
curl -X POST 'https://ims-na1.adobelogin.com/ims/token/v3' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'grant_type=client_credentials&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&scope=openid,AdobeID,firefly_enterprise'
```

The response will look something like this:

```shell
{"access_token":"yourAccessToken123asdf","token_type":"bearer","expires_in":86399}
```

The response includes an `"expires_in"` field indicating how long the access token is valid, in seconds. Each access token is valid for 24 hours. Then your secure server-side application will need to request a new token.

It's best to securely store the token and refresh it before it expires.

<InlineAlert variant="help" slots="header, text1" />

Use standard OAuth2 libraries to automate token generation through the IMS endpoint.

To maximize security and efficiency, choose an OAuth 2.0 library that aligns with your application's needs. Since your projects likely use OAuth libraries already for other API integrations, leverage these same libraries to handle automatic token renewal.

With the access token ready, you can now [make a call to the Reframe API](/guides/quickstart).
