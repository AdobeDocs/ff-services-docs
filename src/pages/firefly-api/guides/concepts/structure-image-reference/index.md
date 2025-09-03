---
title: Structure Image Reference - Adobe Firefly APIs
description: A guide to using structure image reference with the Firefly Image Model APIs.
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
  - Structure Image Reference
  - Adobe Firefly Services
  - Firefly API
contributors:
  - 'https://github.com/bishoysefin'
hideBreadcrumbNav: true
og:
  title: Structure Image Reference - Adobe Firefly APIs
  description: >-
    A guide to using structure image reference with the Firefly Image Model
    APIs.
twitter:
  card: summary
  title: Structure Image Reference - Adobe Firefly APIs
  description: >-
    A guide to using structure image reference with the Firefly Image Model
    APIs.
---

# Structure Reference Images

Use Structure Reference to generate images with structural similarities.

||
| --- | --- |
| ![mountain](../../images/structure-image-reference-mountain.jpeg) <p style="text-align:center">Structure Reference Image</p> | ![volcano](../../images/structure-image-reference-volcano.jpeg) <p style="text-align:center">Generated Image</p>

## Understanding Firefly's Structure Reference

Structure Reference uses a reference image to apply structural characteristics (like image outline and depth) to newly generated images with different details, styles, or moods. This feature, along with [Firefly's Style Reference](../style-image-reference/index.md), gives you more control of image generation beyond the text prompt.

Firefly's Image APIs implement this feature by using the `structure` parameter, with two properties:

* `strength`: A value between `1` and `100` that determines how closely the generated image resembles the reference image. When `strength` isn't specified, the default value is `50`.
* `imageReference`: An object containing the source for the reference image.

## Concepts in action

<InlineAlert variant="warning" slots="header, text" />

Before you start

You'll need a Firefly **Client ID** and **Access Token** for this exercise. Learn how to retrieve them in the [Authentication Guide](../authentication/index.md). **Securely store these credentials and never expose them in client-side or public code.**

### Specifying strength

Use the `strength` value to influence the resemblance of newly generated images.

1. First, let's use the reference image of the mountain from the example at the top of this page. Right-click the "Structure Reference Image" and save it to your desktop.

2. Next, upload the saved image to Firefly's storage API. Be sure to edit the `--data-binary` path in the command below:

```bash
curl --location 'https://firefly-api.adobe.io/v2/storage/image' \
--header 'Content-Type: image/webp' \
--header 'Accept: application/json' \
--header "x-api-key: $FIREFLY_SERVICES_CLIENT_ID" \
--header "Authorization: Bearer $FIREFLY_SERVICES_ACCESS_TOKEN" \
--data-binary '@/Users/<YOUR_MACHINE_USER_NAME>/Desktop/structure-image-reference-mountain.webp'
```

The response will look like this:

```json
{"images":[{"id":"0eb8584a-b850-4c4c-a234-185d6378ecb6"}]}  //Your images.id here will be unique
```

3. Export the ID so that the next script can easily access it:

```bash
export FIREFLY_UPLOAD_ID=<YOUR_images.id>
```

4. Generate a new image based on the uploaded image. Use the command below to see how the `strength` parameter influences the resemblance of the generated image.
   Start with a `strength` value of `100`, then experiment with other values.

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/generate-async' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $FIREFLY_SERVICES_CLIENT_ID" \
--header "Authorization: Bearer $FIREFLY_SERVICES_ACCESS_TOKEN" \
--data '{
  "numVariations": 4,
  "prompt": "a photo of a volcano",
  "structure": {
    "strength": 100,
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

5. Use the `jobId` to see the result:

<InlineAlert variant="info" slots="header, text" />

NOTE

The `numVariations` value creates four generated images that will be easy to compare. Four URLs are returned in the response.

```bash
curl -X GET "https://firefly-api.adobe.io/v3/status/<YOUR_JOB_ID>" \
    -H "x-api-key: $FIREFLY_SERVICES_CLIENT_ID" \
    -H "Authorization: Bearer $FIREFLY_SERVICES_ACCESS_TOKEN" \
    -H "Content-Type: application/json"
```
