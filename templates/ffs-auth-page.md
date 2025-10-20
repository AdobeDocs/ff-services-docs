---
title: {API or feature} Authentication
description: Learn how to set up and authenticate a project to use {API or feature} API.
hideBreadcrumbNav: true
keywords:
- authentication
- access token
- OAuth
- Adobe IMS
- API security
---
# Authentication

Learn how to authenticate requests to {API or feature} API.

## Overview

Every request made to {API or feature} API must include an encrypted access token.

Your secure, server-side application retrieves an access token by making a request to the [Adobe Identity Management System (IMS)][1] with your **Client ID** and **Client Secret**.

## Prerequisites

This tutorial assumes you have worked with your Adobe representative and have the following:

- An [Adobe Developer Console][2] account.
- A [project][3] with Content Authenticity API [OAuth Server-to-Server credentials set up][4].
- Access to your **Client ID** and **Client Secret** from the [Adobe Developer Console project][5]. Securely store these credentials and never expose them in client-side or public code.

## Retrieve an access token

A temporary access token validates calls to the API. You can [generate an access token can directly in the Developer Console][8], or programmatically by following the steps below.

1. Open a secure terminal and export your **Client ID** and **Client Secret** as environment variables so that later commands can access them:

  ```bash
  export {API or feature}_FF_SERVICES_CLIENT_ID=<Your_Client_ID>
  export {API or feature}_FF_SERVICES_CLIENT_SECRET=<Your_Client_Secret>
  ```

2. Run the following command to generate an access token:

  ```bash
  curl --location 'https://ims-na1.adobelogin.com/ims/token/v3' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'grant_type=client_credentials' \
  --data-urlencode "client_id={API or feature}_FF_SERVICES_CLIENT_ID" \
  --data-urlencode "client_secret={API or feature}_FF_SERVICES_CLIENT_SECRET" \
  --data-urlencode 'scope={relevant_scopes}'
  ```

  The response will look like this:

  ```json
  {
      "access_token": "exampleAccessTokenAsdf123",
      "token_type": "bearer",
      "expires_in": 86399
  }
  ```

  The response includes an `expires_in` field that specifies the length of time, in seconds, that the access token is valid. After the access token expires, your application must request a new token.

3. Export your access token as an environment variable:

  ```bash
  export {API or feature}_FF_SERVICES_ACCESS_TOKEN=<Your_Access_Token>
  ```

## Make your first API call

{If applicable, include a verification call to the specific API.}

<!-- Links -->
[1]: https://www.adobe.com/content/dam/cc/en/trust-center/ungated/whitepapers/corporate/adobe-identity-management-services-security-overview.pdf
[2]: https://developer.adobe.com/
[3]: https://developer.adobe.com/developer-console/docs/guides/projects/projects-empty/
[4]: https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/
[5]: https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/#api-overview
[8]: https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s#generate-token
