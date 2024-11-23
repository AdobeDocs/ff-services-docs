---
title: Adobe Developer Console
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
  - https://github.com/bishoysefin
  - https://github.com/mikemajzoub
hideBreadcrumbNav: true
---

# Adobe Developer Console

Use Adobe Developer Console to manage resources and credentials

## Overview

The **Adobe Developer Console** is a centralized platform that enables developers to integrate Adobe's suite of APIs and services. To securely access Adobe's APIs, including the Firefly API, your application must authenticate using OAuth 2.0 protocols. This involves obtaining an access token that grants your application permission to interact with Adobe's services.

## Getting Started for Firefly APIs

You will need:

- An [Adobe Developer Console](https://developer.adobe.com/console/786177/home) account.
- A [project](https://developer.adobe.com/developer-console/docs/guides/projects/projects-empty/) with Firefly API [OAuth Server-to-Server credentials set up](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/).
- Access to your Client ID and Client Secret from the Developer Console.

## Access tokens

[Generating access tokens](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/#api-overview) can be accomplished either directly from the Developer Console UI or programmatically.

To generate an access token programatically, refer to the [Authentication guide!](../authentication/index.md)

## Best Practices

- **Token Management:** Access tokens are valid for 24 hours. Implement a mechanism to refresh tokens before they expire to maintain uninterrupted access.
- **Scope Limitation:** Request only the scopes necessary for your application's functionality to adhere to the principle of least privilege.
- **Secure Storage:** Store your Client ID, Client Secret, and access tokens securely to prevent unauthorized access.

## Managing Client secrets

### Rotating secrets

You can rotate your client secret as needed, according to your company’s security posture/compliance. For some, this means rotating client secrets every few months. For others, this may mean rotating secrets every day.

Rotating your secret is highly recommended in case of a leak or unauthorized access. Furthermore, rotating client secrets periodically is an industry-standard practice that strengthens your application security posture. Similar to access tokens, you can rotate your client secret in the Developer Console UI or using an API.

**Org admins**: Navigate to your project in Adobe Developer Console. Click the **Add to Project** button and select **API** > add **I/O Management API** to your project. This API will allow your credential to read, delete, and generate new client secrets. You will need to configure the credential name before saving it.

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

### List all secrets

```bash
curl -X GET 'https://api.adobe.io/console/organizations/{orgId}/credentials/{credentialId}/secrets' \
     -H 'Authorization: Bearer {ACCESS_TOKEN}' \
     -H 'x-api-key: {CLIENT_ID}'
```

### Generate new secret

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

Once a client secret is deleted, you cannot restore it. So be extra sure you have replaced the old client secret with the new one in all locations.
