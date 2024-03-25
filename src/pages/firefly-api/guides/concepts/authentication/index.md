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

Server-to-server authentication credentials lets your application’s server generate access tokens and make API calls on behalf of your application. This is sometimes referred to as “two-legged OAuth”.

For your application to generate an access token, an end-user does not need to sign in or provide consent to your application. Instead, your application can use its credentials (client id and secrets) to authenticate itself and generate access tokens. Your application can then use the generated access token to call Adobe API and services on its behalf.

## Access tokens

Each access token is valid for 24 hours. To adhere with OAuth best practices, you should generate a new token every 23 hours. Generating access tokens can be accomplished either directly from the Developer Console UI or programmatically.

To generate access tokens programmatically, send a POST request to the following endpoint:

```bash
curl -X POST 'https://ims-na1.adobelogin.com/ims/token/v3' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'grant_type=client_credentials&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&scope=openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis'
```

The required parameters are:

* `client_id`: Client ID from Console
* `client_secret`: Client secret from Console
* `scope`: `firefly_api`, `ff_apis`, `openid`, `AdobeID`, `session`, `additional_info`, `read_organizations`

Automate your token generation by calling the IMS endpoint above using standard OAuth2 libraries. Using industry-standard libraries is the quickest and most secure way of integrating with OAuth. We recommend developers diligently pick the OAuth 2.0 library that works best for their application. Your teams' projects are likely leveraging OAuth libraries already to connect with other APIs. Use these libraries to automatically generate tokens when they expire.

The token endpoint also returns an expiry date and the token itself (when decoded) contains the expiry time.

## Client secrets

You can rotate your client secret as needed, according to your company’s security posture/compliance. For some, this means rotating client secrets every few months. For others, this may mean rotating secrets every day.

Rotating your secret is highly recommended in case of a leak or unauthorized access. Furthermore, rotating client secrets periodically is an industry-standard practice that strengthens your application security posture. Similar to access tokens, you can rotate your client secret in the Developer Console UI or using an API.

Org admins: Navigate to your project in Adobe Developer Console. Click the **Add to Project** button and select **API** > add **I/O Management API** to your project. This API will allow your credential to read, delete, and generate new client secrets. You will need to configure the credential name before saving it.

In order to successfully rotate secrets without contacting the org admin, developers will need the following:

* `orgId`
* `projectId`
* `credentialId`
* Access token

Navigate to the OAuth server-to-server credential overview page. Copy the `orgId`, `projectId`, and `credentialId` from the URL by comparing it to the templated URL below:

__<https://developer.adobe.com/console/projects/{orgId}/{projectId}/credentials/{credentialId}/details/oauthservertoserver>__

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
