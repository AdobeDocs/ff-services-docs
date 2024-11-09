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

# Understanding Firefly API Seed IDs

Use seed IDs to generate images similar to one another across multiple HTTP requests

Whenever Firefly generates an image, by default it starts in a brand new random state. This random starting state contributes to what makes each image unique.

This is great when you want to generate a wide variety of images, but there may be times when you want to generate images that are similar to one another. For example, when Firefly generates an image with a certain prompt that you find to be amazing, and now you wish to try out different generated styles while keeping the image more consistent, use a seed ID.

The best way to understand the advanced power of seed IDs is to see them in action. Let's first generate images without seeds specified (which means that Firefly will randomly generate them for us):

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/generate' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'x-api-key: PASTE_YOUR_CLIENT_ID_HERE' \
--header 'Authorization: Bearer PASTE_YOUR_ACCESS_TOKEN_HERE' \
--data '{
    "prompt": "a futuristic future cityscape with flying cars",
    "numVariations": 4
}'
```

The above request will return a response that looks something like this:

```bash
{
    "size": {
        "width": 2048,
        "height": 2048
    },
    "outputs": [
        {
            "seed": 1065791981,
            "image": {
                "url": "https://pre-signed-firefly-prod.s3-accelerate.amazonaws.com/images/asdf-1234..."
            }
        },
        {
            "seed": 733755163,
            "image": {
                "url": "https://pre-signed-firefly-prod.s3-accelerate.amazonaws.com/images/qwer-1234..."
            }
        },
        {
            "seed": 1658106736,
            "image": {
                "url": "https://pre-signed-firefly-prod.s3-accelerate.amazonaws.com/images/zxcv-1234..."
            }
        },
        {
            "seed": 1842533538,
            "image": {
                "url": "https://pre-signed-firefly-prod.s3-accelerate.amazonaws.com/images/uiop-1234..."
            }
        }
    ],
    "contentClass": "photo"
}
```

That that fourth, lower-right image is our favorite. Now let's use its seed ID of `1842533538` to iterate on it further. By keeping the prompt and seed ID the same, we are telling firefly that want future image generations to be similar to this image that we like. This allows us to use all Firefly's other generation options such as style presets, size, reference images, and more, while keeping the image consistent with the one we liked.

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

Firefly generates the following image for us. Notice how many similarities from the image with the same seed are retained, but we've nudged the generation with [style presets](../styles/index.md) towards "landscape photography" and "science fiction" styles.

