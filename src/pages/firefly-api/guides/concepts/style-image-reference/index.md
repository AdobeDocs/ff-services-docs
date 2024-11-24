---
title: Style Image Reference - Adobe Firefly APIs
description: A guide to using style image reference with the Firefly Image Model APIs.
keywords:
  - Style Image Reference
  - Adobe Firefly Services
  - Firefly API
  - Developer documentation
contributors:
  - https://github.com/bishoysefin
hideBreadcrumbNav: true
---

# Style Image Reference

Use Style Image Reference to generate images based on specific styles, colors, artistic methods, or mood.

||
| --- | --- |
| ![mountain](../../images/style-image-reference-mountain.jpeg) <p style="text-align:center">Style Image Reference</p> | ![dog](../../images/style-image-reference-dog.jpeg) <p style="text-align:center">Generated Image</p>

### Specifying Strength

To influence how impactful your reference image is during the image generation process, add a `strength` value between `1` and `100` to your style object. When "strength" is not specified, it defaults to a value of `50`.

## Experience Style Image Reference in Action

<InlineAlert variant="info" slots="text" />

If you don't already have a Firefly "client ID" and "access token", learn how to retrieve them in the [Authentication Guide](../authentication/index.md) before reading further. **Securely store these credentials and never expose them in client-side or public code.**

First, open a secure terminal and `export` your "client ID" and "access token" as environment variables:

```bash
export FIREFLY_SERVICES_CLIENT_ID=yourClientIdAsdf123
export FIREFLY_SERVICES_ACCESS_TOKEN=yourAccessTokenAsdf123
```

Next, save the image of the mountain to your computer's Desktop.

Next, upload your saved image to Firefly's storage API:

```bash
curl --location 'https://firefly-api.adobe.io/v2/storage/image' --header 'Content-Type: image/webp' --header 'Accept: application/json' --header "x-api-key: $FIREFLY_SERVICES_CLIENT_ID" --header "Authorization: Bearer $FIREFLY_SERVICES_ACCESS_TOKEN" --data-binary '@/Users/PLACEHOLDER_FOR_YOUR_MACHINE_USER_NAME/Desktop/style-image-reference-mountain.webp'
```

You will receive a response that looks like this:

```json
{"images":[{"id":"0eb8584a-b850-4c4c-a234-185d6378ecb6"}]}
```

Export it so that the next script can easily access it:

```bash
export FIREFLY_UPLOAD_ID=asdf123YourUploadIdFromPreviousStep
```

Finally, generate a new image based on the uploaded image:

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/generate' \
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
