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

![an illustration of a cat coding on a laptop](./images/coding-cat.jpeg)

<InlineAlert variant="info" slots="text" />

If you don't already have a Firefly "client ID" and "access token", learn how to retrieve them in the [Authentication Guide](../authentication/index.md) before reading further. **Securely store these credentials and never expose them in client-side or public code.**

### 1. Export your client ID and access token

Open a secure terminal and `export` your "client ID" and "access token" as environment variables:

```bash
export FIREFLY_CLIENT_ID=PASTE_YOUR_CLIENT_ID_HERE
export FIREFLY_ACCESS_TOKEN=PASTE_YOUR_ACCESS_TOKEN
```

### 2. Call the Firefly Generate Images API

Next, call the [Firefly Generate Images API](./api/image_generation/V3/) with the `access_token` and `CLIENT_ID`:

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

### 3. View the generated image

Open the URL in your browser to see the image you generated with Firefly 🎉

### 4. Next steps

Visit the [Firefly Generate Images API documentation](./api/image_generation/V3/) to learn more about the rich customization options available to you, including the ability to specify image style, structure, intensity, geographic locale, size, and more 🚀
