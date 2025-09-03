---
title: Using Adobe Developer Console for Firefly API Authentication
description: >-
  Learn how to use Adobe Developer Console to manage resources and credentials
  for authenticating with Adobe Firefly APIs.
keywords:
  - Adobe Developer Console
  - Firefly API Authentication
  - Manage Resources and Credentials
  - OAuth 2.0
  - API Security
  - Access Tokens
  - Client ID
  - Client Secret
  - Identity Management
  - Secure API Access
  - Token-Based Authentication
  - Generate Token
  - Authentication Best Practices
  - Server-to-Server Authentication
  - Secret Rotation
  - Access Token Refresh
  - I/O Management API
  - Secure Storage
  - Token Management
  - Scope Limitation
contributors:
  - 'https://github.com/bishoysefin'
hideBreadcrumbNav: true
og:
  title: Using Adobe Developer Console for Firefly API Authentication
  description: >-
    Learn how to use Adobe Developer Console to manage resources and credentials
    for authenticating with Adobe Firefly APIs.
twitter:
  card: summary
  title: Using Adobe Developer Console for Firefly API Authentication
  description: >-
    Learn how to use Adobe Developer Console to manage resources and credentials
    for authenticating with Adobe Firefly APIs.
---

# Adobe Developer Console

Use Adobe Developer Console to manage resources and credentials

## Overview

The **Adobe Developer Console** is an administration interface that enables developers to manage Adobe's APIs and services. To securely access Adobe's APIs, including the Firefly API, your application must authenticate using OAuth 2.0 protocols. This involves obtaining an access token that grants your application permissions to interact with Adobe's services.

## Getting Started for Firefly APIs

You will need:

- An [Adobe Developer Console](https://developer.adobe.com/) account.
- A [project](https://developer.adobe.com/developer-console/docs/guides/projects/projects-empty/) with Firefly API [OAuth Server-to-Server credentials set up](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/).
- Access to your Client ID and Client Secret from the Developer Console.

## Access Tokens

[Generating access tokens](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/#api-overview) can be accomplished either directly from the Developer Console UI or programmatically.

To generate an access token programatically, refer to the [Authentication guide](../authentication/index.md).

## Best Practices

- **Token Management:** Access tokens are valid for 24 hours. Implement a mechanism to refresh tokens before they expire to maintain uninterrupted access.
- **Scope Limitation:** Request only the scopes necessary for your application's functionality to adhere to the principle of least privilege.
- **Secure Storage:** Store your Client ID, Client Secret, and access tokens securely to prevent unauthorized access.

## Managing Secrets

### Rotating Secrets

You can rotate your client secret as needed. For some, this means rotating client secrets every few months. For others, this may mean rotating secrets every day.

Rotating your secret is highly recommended in case of a leak or unauthorized access. Furthermore, rotating client secrets periodically is an industry-standard practice that strengthens your application security posture. Similar to access tokens, you can rotate your client secret in the Developer Console UI or using an API.

**Org admins**: Navigate to your project in Adobe Developer Console. Click the **Add to Project** button and select **API** and then add **I/O Management API** to your project. This API will allow your credential to read, delete, and generate new client secrets. You will need to configure the credential name before saving it.

In order to successfully rotate secrets without contacting the org admin, developers will need the following:

- `orgId`
- `projectId`
- `credentialId`
- Access token

Navigate to the OAuth server-to-server credential overview page. Copy the `orgId`, `projectId`, and `credentialId` from the URL by comparing it to the templated URL below:

```bash
https://developer.adobe.com/console/projects/{orgId}/{projectId}/credentials/{credentialId}/details/oauthservertoserver
```

Next, you need an access token. To generate an access token, use the following command. Make sure to include scopes that the I/O Management API requires in the `scope` parameter:

```bash
curl -X POST 'https://ims-na1.adobelogin.com/ims/token/v3' \
-H 'Content-Type: application/x-www-form-urlencoded'
-d 'client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&grant_type=client_credentials&scope=AdobeID,openid,read_organizations,additional_info.projectedProductContext,additional_info.roles,adobeio_api,read_client_secret,manage_client_secrets'
```

### List All Secrets

```bash
curl -X GET 'https://api.adobe.io/console/organizations/{orgId}/credentials/{credentialId}/secrets' \
     -H 'Authorization: Bearer {ACCESS_TOKEN}' \
     -H 'x-api-key: {CLIENT_ID}'
```

### Generate a New Secret

Make the following request. The API response will contain the `client_secret` that was added to the project and its `uuid`. You can find it again later on the Developer Console UI. After you generate a new secret, update your application to use the new secret.

```bash
curl -X POST 'https://api.adobe.io/console/organizations/{orgId}/credentials/{credentialId}/secrets' \
     -H 'Authorization: Bearer {ACCESS TOKEN}' \
     -H 'x-api-key: {CLIENT ID}'
```

### Delete a secret

To delete a secret, first call the API to list all client secrets for your credential. Grab the value of the `uuid` field for your older secret that you wish to delete. Call the following API to delete the old `client_secret` from your credential by passing the `uuid` in the URL.

```bash
curl -X DELETE 'https://api.adobe.io/console/organizations/{orgId}/credentials/{credentialId}/secrets/{uuid}' \
     -H 'Authorization: Bearer {ACCESS TOKEN}' \
     -H 'x-api-key: {CLIENT ID}'
```

<InlineAlert variant="warning" slots="text" />

Once a client secret is deleted, you cannot restore it. Therefore, be certain you have replaced the old client secret with the new one in all locations.
