---
title: Quickstart
description: A quickstart guide to the Adobe Firefly API
keywords:
  - Adobe Firefly Services
  - Firefly API guides
  - Developer documentation
  - Firefly API documentation
  - Quickstart
  - Firefly usage examples
  - Firefly API Key
  - Firefly example curl
  - Firefly content
  - Firefly generate
  - Example request
  - Example response
  - How-to guides
  - Firefly tutorial
  - Code samples
  - Getting started with Firefly API
  - API reference
  - Access token
  - Client ID
  - API Key
  - Firefly scope
  - Service scope
  - Firefly configuration guides
  - Text to image
  - Firefly endpoint
  - Use cases
  - Troubleshooting tips
  - Authentication
  - Authorization
  - Credentials
contributors:
  - https://github.com/bishoysefin
hideBreadcrumbNav: true
---

# Quickstart Guide

Generate your first image with Firefly Services

![an illustration of a cat coding on a laptop](./images/cat-coding.jpeg)

## Prerequisites

If you don't already have a Firefly API **Client ID** and **Client Secret**, retrieve them from your [Adobe Developer Console project](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/#api-overview) before reading further. **Securely store these credentials and never expose them in client-side or public code.**

## Retrieve an Access Token

Open a secure terminal and `export` your **Client ID** and **Client Secret** as environment variables so that your later commands can access them:

```bash
export FIREFLY_SERVICES_CLIENT_ID=yourClientIdAsdf123
export FIREFLY_SERVICES_CLIENT_SECRET=yourClientSecretAsdf123
```

Run the following command to generate an access token:

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
{"access_token":"yourAccessTokenAsdf123","token_type":"bearer","expires_in":86399}
```

Export this access token so that the next script can conveniently access it:

```bash
export FIREFLY_SERVICES_ACCESS_TOKEN=yourAccessTokenAsdf123
```

## Generate an Image

Next, call the [Firefly Generate Images API](./api/image_generation/V3/):

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/generate' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $FIREFLY_SERVICES_CLIENT_ID" \
--header "Authorization: Bearer $FIREFLY_SERVICES_ACCESS_TOKEN" \
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

## View the Generated Image

Open the URL in your browser to see the image you generated with Firefly 🎉

## Deepen Your Understanding

Visit the [Firefly Generate Image API tutorial](./how-tos/firefly-generate-image-api-tutorial.md) to learn more about the rich customization options available to you 🚀
