---
title: Seeds - Adobe Firefly API
description: This guide explains usage of Seeds in the Adobe Firefly API.
keywords:
  - Adobe Firefly Services
  - Seed ID
  - Firefly API
  - Developer documentation
  - Seed ID concepts
  - Data seeding
  - Test data generation
  - Seed data management
  - Seed ID usage
  - Seed ID generation
  - Test environments
  - Development environments
  - Mock data
  - Data initialization
  - Data seeding strategies
  - Seed ID best practices
  - Data population
  - Test automation
  - Seed data generation tools
  - Data integrity testing
  - Firefly data
contributors:
  - https://github.com/bishoysefin
hideBreadcrumbNav: true
---

# Understanding Firefly API Seeds

Use seeds to generate images similar to one another across multiple HTTP requests

||
| --- | --- | --- |
| ![original image](../../images/seed-concept-original-image.jpeg) <p style="text-align:center">Original Image</p> | ![same seed variation](../../images/seed-concept-same-seed-regeneration.jpeg) <p style="text-align:center">Same Seed Regeneration</p> | ![different seed variation](../../images/seed-concept-different-seed-regeneration.jpeg) <p style="text-align:center">Different Seed Regeneration</p>

## Overview

Whenever Firefly generates an image, by default it begins the process by picking a random number called a `seed`. This random number contributes to what makes each image unique, which is great when you want to generate a wide variety of images

However, there may be times when you want to generate images that are similar to one another across multiple HTTP requests. For example, when Firefly generates an image that you want to modify using Firefly's other options (such as style presets, reference images, etc.), use that image's `seed` in future HTTP requests to limit the randomness of future images and hone in on the image you want.

## Prerequisites

If you don't already have a Firefly **Client ID** and **Access Token**, learn how to retrieve them in the [Authentication Guide](../authentication/index.md) before reading further. **Securely store these credentials and never expose them in client-side or public code.**

## Experience Seeds in Action

First, open a secure terminal and `export` your **Client ID** and **Access Token** as environment variables:

```bash
export FIREFLY_SERVICES_CLIENT_ID=yourClientIdAsdf123
export FIREFLY_SERVICES_ACCESS_TOKEN=yourAccessTokenAsdf123
```

Next, run the following `curl` command to generate an image:

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/generate' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $FIREFLY_SERVICES_CLIENT_ID" \
--header "Authorization: Bearer $FIREFLY_SERVICES_ACCESS_TOKEN" \
--data '{
    "prompt": "a futuristic future cityscape with flying cars"
}'
```

The above request will return a response like this:

```json
{
    "size": {
        "width": 2048,
        "height": 2048
    },
    "outputs": [
        {
            "seed": 1842533538,
            "image": {
                "url": "https://pre-signed-firefly-prod.s3-accelerate.amazonaws.com/images/asdf-1234..."
            }
        }
    ],
    "contentClass": "photo"
}
```

![a picture of a futuristic city 1](../../images/seedless-city-1.jpeg)

Let's generate similar variations of this image by using its `seed` of `1842533538` in our next request. This allows us to use Firefly's other generation options such as style presets, size, reference images, and more, while keeping the image consistent with the previously generated image.

Below, let's generate an image variation has "landscape photography" and "science fiction" [style presets](../style-presets/index.md) applied to it.

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/generate' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $FIREFLY_SERVICES_CLIENT_ID" \
--header "Authorization: Bearer $FIREFLY_SERVICES_ACCESS_TOKEN" \
--data '{
    "prompt": "a futuristic future cityscape with flying cars",
    "seeds": [
        1842533538
    ],
    "style": {
        "presets": [
            "landscape_photography", "science_fiction"
        ]
    }
}'
```

Your response will look like this:

```json
{
    "size": {
        "width": 2048,
        "height": 2048
    },
    "outputs": [
        {
            "seed": 1842533538
            "image": {
                "url": "https://pre-signed-firefly-prod.s3-accelerate.amazonaws.com/images/dfgh-1234..."
            }
        }
    ],
    "contentClass": "art"
}
```

Notice below how many similarities there are between these two images that were generated from the same seed.

||
| --- | --- |
| ![a picture of a futuristic city 1](../../images/seedless-city-1.jpeg) <p style="text-align:center">Original Image</p> | ![a variation of futuristic city 1](../../images/seeded-city-1.jpeg) <p style="text-align:center">Same Seed Image Variation</p>
