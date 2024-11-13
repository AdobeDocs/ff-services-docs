---
title: Structure Image Reference - Adobe Firefly APIs
description: A guide to using structure image reference with the Firefly Image Model APIs.
keywords:
  - Structure Image Reference
  - Adobe Firefly Services
  - Firefly API
  - Developer documentation
contributors:
  - https://github.com/hollyschinsky
hideBreadcrumbNav: true
---

# Structure Image Reference

Use Structure Image Reference to generate images based on a specific outline and depth

![a picture of a puppy dressed as a renaissance artist](../../images/puppy-renaissance-artist.jpeg)

Use `structure.imageReference` with Firefly's [Generate Images API](../../api/image_generation/V3/) to generate images based on a specific outline and depth. To show this in action, let's use the above photo as a structure image reference to generate a new image.

## Upload Your Structure Image Reference

First, right click on the image above and download it to your desktop.

Next, upload your structure image reference to Firefly. You can use the following `curl` command to upload the image:

```bash
curl --location 'https://firefly-api-enterprise-stage.adobe.io/v2/storage/image' \
--header 'Content-Type: image/webp' \
--header 'Accept: application/json' \
--header "x-api-key: $FIREFLY_CLIENT_ID" \
--header "Authorization: $FIREFLY_ACCESS_TOKEN" \
--data '@/Users/YourLocalMachineUserName/Desktop/puppy-renaissance-artist.webp'
```

This request will return the `uploadId` of your structure image reference:

```json
todo
```

## Generate Images Using Your Structure Image Reference

Now that you have uploaded your structure image reference, you can use it to generate new images. Use the following `curl` command to generate a new image based on the structure image reference:

```bash

```

# Image Model Styles

Use style presets to customize the look and feel of your generated images

![a picture of a puppy dressed as a renaissance artist](../../images/puppy-renaissance-artist.jpeg)

Use style `presets` with Firefly's [Generate Images API](../../api/image_generation/V3/) or [Generate Object Composite API](../../api/generate-object-composite/) to give your generated images a specific visual style or mood.

Begin exploring Firefly's many style `presets` with the code snippet below, and then read the [Using Content Class and Style Presets](../../how-tos/using-content-class-style-preset.md) guide for more tips on how to expertly use this powerful feature.

### Generating Images with Style Presets

<InlineAlert variant="info" slots="text" />

If you don't already have a Firefly "client ID" and "access token", learn how to retrieve them in the [Authentication Guide](../authentication/index.md) before reading further. **Securely store these credentials and never expose them in client-side or public code.**

First, open a secure terminal and `export` your "client ID" and "access token" as environment variables:

```bash
export FIREFLY_CLIENT_ID=asdf...123
export FIREFLY_ACCESS_TOKEN=qwer...456
```

Next, run this command:

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/generate' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $FIREFLY_CLIENT_ID" \
--header "Authorization: Bearer $FIREFLY_ACCESS_TOKEN" \
--data '{
    "prompt": "a puppy dressed as a renaissance artist",
    "numVariations": 4,
    "style": {
        "presets": [
            "bw", "fantasy", "dramatic_light"
        ]
    }
}'
```

### Specifying Style Strength

To influence how impactful your presets are on the image generation, add a `strength` value between `1` and `100` to your style object. When "strength" is not specified, it defaults to a value of `50`. Below we show how to set the "strength" value to `100` to make our style presets more pronounced:

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/generate' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $FIREFLY_CLIENT_ID" \
--header "Authorization: Bearer $FIREFLY_ACCESS_TOKEN" \
--data '{
    "prompt": "a puppy dressed as a renaissance artist",
    "numVariations": 4,
    "style": {
        "presets": [
            "bw", "fantasy", "dramatic_light"
        ],
        "strength": 100
    }
}'
```

