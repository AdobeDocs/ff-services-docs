---
title: Tutorial
description: This guide explains rate limiting for the Adobe Firefly API.
contributors:
  - https://github.com/nimithajalal
---

# Refreshing Access Tokens for Adobe Firefly API

## Objective

Learn how to refresh access tokens for Adobe Firefly API to maintain continuous access to the API resources without requiring the user to reauthenticate.

## Prerequisites

Basic understanding of RESTful APIs
Access to Adobe Firefly API
Client ID and client secret for authentication
Steps:

## Understand Token Expiry

Access tokens issued by the Adobe Firefly API have a limited lifespan. It's important to monitor the expiry time of your tokens to avoid disruptions in your application's functionality.
Implement Token Refresh Logic:

Before your access token expires, initiate a token refresh request to obtain a new access token. Use the /oauth/token endpoint for this purpose.
Include your client ID and client secret in the request body, along with the refresh token.
Example request body:
```js
{
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "refresh_token": "YOUR_REFRESH_TOKEN",
  "grant_type": "refresh_token"
}
```

## Handle the Response

If the token refresh request is successful, the API will return a new access token along with a new refresh token (if applicable).
Update your application's authentication credentials with the new access token and refresh token (if provided).
Error Handling:

If the token refresh request fails, handle the error appropriately based on the response from the API.
Common errors include expired refresh tokens or invalid client credentials.

## Testing

Test your token refresh logic in a controlled environment to ensure that it works as expected.
Verify that your application can seamlessly continue accessing Adobe Firefly API resources without requiring manual reauthentication.

## Summary

Refreshing access tokens for Adobe Firefly API is essential for maintaining continuous access to API resources. By implementing token refresh logic in your application, you can ensure uninterrupted access to the API without the need for users to reauthenticate frequently.
