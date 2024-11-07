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
  - https://github.com/hollyschinsky
hideBreadcrumbNav: true
---

# Quickstart Guide

Generate your first image with Firefly Services

![an illustration of a cat coding on a laptop](./images/cat-coding.jpeg)

### 1. Generate an access token

First, create an [access token](./concepts/authentication/index.md) using the `CLIENT_ID` and `CLIENT_SECRET` that you either received from a teammate or [generated on your own in the Adobe Developer Console](../guides/get-started.md/#gaining-access-to-the-adobe-developer-console).

```bash
curl --location 'https://ims-na1.adobelogin.com/ims/token/v3' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode 'client_id=CLIENT_ID' \
--data-urlencode 'client_secret=CLIENT_SECRET' \
--data-urlencode 'scope=openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis'
```

### 2. Call the Firefly Generate Images API

Next, use this newly created `ACCESS_TOKEN` along with your `CLIENT_ID` to call the [Firefly Generate Images API](./api/image_generation/V3/):

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/generate' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'x-api-key: CLIENT_ID' \
--header 'Authorization: ACCESS_TOKEN' \
--data '{
    "prompt": "a realistic illustration of a cat dressed as a renaissance artist coding software on a laptop"
}'
```

Your response will look something like this:

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

### 3. View the generated image

Open the URL in your browser to see the image you generated with Firefly Services 🎉

### 4. Next steps

Visit the [Firefly Generate Images API documentation](./api/image_generation/V3/) to learn more about the rich customization options available to you, including the ability to specify image style, structure, intensity, geographic locale, size, and more 🚀
