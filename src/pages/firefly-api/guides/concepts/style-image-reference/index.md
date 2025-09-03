---
title: Style Image Reference - Adobe Firefly APIs
description: A guide to using style image reference with the Firefly Image Model APIs.
keywords:
  - Adobe Firefly API
  - generative AI
  - AI image generation
  - text-to-image
  - image generation
  - creative AI
  - REST API
  - AI models
  - generative content
  - AI art generation
  - creative automation
  - content creation
  - Style Image Reference
  - Adobe Firefly Services
  - Firefly API
contributors:
  - 'https://github.com/bishoysefin'
  - 'https://github.com/aeabreu-hub'
hideBreadcrumbNav: true
og:
  title: Style Image Reference - Adobe Firefly APIs
  description: A guide to using style image reference with the Firefly Image Model APIs.
twitter:
  card: summary
  title: Style Image Reference - Adobe Firefly APIs
  description: A guide to using style image reference with the Firefly Image Model APIs.
---

# Style Reference Images

Use Style References images to generate variations based on specific styles, colors, artistic methods, or mood.

||
| --- | --- |
| ![mountain](../../images/style-image-reference-mountain.jpeg) <p style="text-align:center">Style Reference Image</p> | ![dog](../../images/style-image-reference-dog.jpeg) <p style="text-align:center">Generated Image</p>

## Using a Style Reference

Use an existing image as a Style Reference to guide the look and feel of generated image variations. Style reference can help develop a consistent look across a variety of generated assets.

This feature, along with a [Structure Reference][1], gives you more control of image generation beyond the text prompt.

### Specifying strength

To influence how strong your reference image's effect is during the image generation process, add a `strength` value between `1` and `100` to your style object. When strength isn't specified, it defaults to a value of `50`.

## Concepts in action

Let's use a style reference image to generate a few image variations.

<InlineAlert variant="warning" slots="header, text" />

Before you start

You'll need a Firefly **Client ID** and **Access Token** for this exercise. Learn how to retrieve them in the [Authentication Guide][2]. **Securely store these credentials and never expose them in client-side or public code.**

1. Open a secure terminal and `export` your **Client ID** and **Access Token** as environment variables:

```bash
export FIREFLY_SERVICES_CLIENT_ID=<your_client_id>
export FIREFLY_SERVICES_ACCESS_TOKEN=<your_access_token>
```

2. Save the image of the mountain at the top of this page to your computer's desktop as *style-image-reference-mountain.webp*. We'll generate a few image variations using this style.

3. Upload your saved image to Firefly's storage API by calling the endpoint below. Be sure to update the `--data-binary` path to point to your saved image:

```bash
curl --location 'https://firefly-api.adobe.io/v2/storage/image' \
--header 'Content-Type: image/webp' \
--header 'Accept: application/json' \
--header "x-api-key: $FIREFLY_SERVICES_CLIENT_ID" \
--header "Authorization: Bearer $FIREFLY_SERVICES_ACCESS_TOKEN" \
--data-binary '@/Users/<YOUR_MACHINE_USERNAME>/Desktop/style-image-reference-mountain.webp'
```

You'll receive a response with an ID that looks like this:

```json
{"images":[{"id":"0eb8584a-b850-4c4c-a234-185d6378ecb6"}]}
```

4. Export the `id` so that the next script can access it:

```bash
export FIREFLY_UPLOAD_ID=<your_upload_id>
```

5. Generate a new image based on the uploaded image:

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/generate-async' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $FIREFLY_SERVICES_CLIENT_ID" \
--header "Authorization: Bearer $FIREFLY_SERVICES_ACCESS_TOKEN" \
--data '{
  "numVariations": 4,
  "prompt": "a friendly dog",
  "style": {
    "imageReference": {
      "source": {
        "uploadId": "'$FIREFLY_UPLOAD_ID'"
      }
    }
  }
}'
```

The request returns a rapid response for the asynchronous job:

```json
{   
    "jobId":"<YOUR_JOB_ID>",
    "statusUrl":"https://firefly-epo854211.adobe.io/v3/status/urn:ff:jobs:...",
    "cancelUrl":"https://firefly-epo854211.adobe.io/v3/cancel/urn:ff:jobs:..."
}
```

6. Use the `jobId` to see the result:

<InlineAlert variant="info" slots="header, text" />

NOTE

The `numVariations` value creates four generated images that will be easy to compare. Four URLs are returned in the response.

```bash
curl -X GET "https://firefly-api.adobe.io/v3/status/<YOUR_JOB_ID>" \
    -H "x-api-key: $FIREFLY_SERVICES_CLIENT_ID" \
    -H "Authorization: Bearer $FIREFLY_SERVICES_ACCESS_TOKEN" \
    -H "Content-Type: application/json"
```

<!-- Links -->
[1]: ../structure-image-reference/index.md
[2]: ../authentication/index.md
