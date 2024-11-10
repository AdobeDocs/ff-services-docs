---
title: Seed IDs - Adobe Firefly API
description: This guide explains usage of Seed IDs for the Adobe Firefly API.
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
  - https://github.com/amandahuarng
  - https://github.com/nimithajalal
  - https://github.com/hollyschinsky
hideBreadcrumbNav: true
---

# Understanding Firefly API Seeds

Use seeds to generate images similar to one another across multiple HTTP requests

Whenever Firefly generates an image, by default it begins the process by picking a random value called a "seed". This random value contributes to what makes each image unique, which is great when you want to generate a wide variety of images

However, there may be times when you want to generate images that are similar to one another across multiple HTTP requests. For example, when Firefly generates an image that you want to modify using Firefly's other options (such as style presets, reference images, etc.), use that image's seed in future HTTP requests to limit the randomness of future images and hone in on the image you want.

The best way to understand the power of seeds is to see them in action:

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/generate' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'x-api-key: PASTE_YOUR_CLIENT_ID_HERE' \
--header 'Authorization: Bearer PASTE_YOUR_ACCESS_TOKEN_HERE' \
--data '{
    "prompt": "a futuristic future cityscape with flying cars",
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

Let's generate variations of this image by using its `seed` of `1842533538` in our next request. By using the same seed as the prior request, we tell Firefly that we want future image generations to be similar to this image. This allows us to use all Firefly's other generation options such as style presets, size, reference images, and more, while keeping the more image consistent with the one we like.

Below, let's generate a variation of our favorite image that has "landscape photography" and "science fiction" [style presets](../styles/index.md) applied to it.

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/generate' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'x-api-key: PASTE_YOUR_CLIENT_ID_HERE' \
--header 'Authorization: Bearer PASTE_YOUR_ACCESS_TOKEN_HERE' \
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

Our response looks like this:

```json
{
    "size": {
        "width": 2048,
        "height": 2048
    },
    "outputs": [
        {
            "seed": 388281090,
            "image": {
                "url": "https://pre-signed-firefly-prod.s3-accelerate.amazonaws.com/images/dfgh-1234..."
            }
        }
    ],
    "contentClass": "art"
}
```

And has this generated image:

![a variation of futuristic city 1](../../images/seeded-city-1.jpeg)

Notice how many similarities from the image with the same seed are retained, but we've influenced this generation with [style presets](../styles/index.md) towards "landscape photography" and "science fiction" styles.
