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

Whenever Firefly generates an image, by default it starts in a brand new random state. This randomness contributes to what makes each image unique, which is great when you want to generate a wide variety of images

However, there may be times when you want to generate images that are similar to one another across multiple HTTP requests. For example, when Firefly generates an image that you want to modify using Firefly's other options (such as style presets, reference images, etc.), use seed IDs to limit the randomness of future generations to hone in on the image you want.

The best way to understand the advanced power of seed IDs is to see them in action. Let's walk through an example:

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
            "seed": 1065791981,
            "image": {
                "url": "https://pre-signed-firefly-prod.s3-accelerate.amazonaws.com/images/uiop-1234..."
            }
        }
    ],
    "contentClass": "photo"
}
```

Notice above how each image has a `seed` value. This `seed` value is a unique identifier for the random state that Firefly used to generate that image. If you like one of the images generated, you can use the `seed` value to generate more images that are similar to it.

||
| --- | --- |
| ![a picture of a futuristic city 1](../../images/seedless-city-1.jpeg) | ![a picture of a futuristic city 2](../../images/seedless-city-2.jpeg) |
| ![a picture of a futuristic city 3](../../images/seedless-city-3.jpeg) | ![a picture of a futuristic city 4](../../images/seedless-city-4.jpeg) |

That that first image in the upper-left inspires me, and now I want to now use some more of Firefly's features to generate variations of it. To do this, in our next request we will specify that Firefly generate an image with the seed ID of `1842533538` to iterate on it further. By keeping the seed ID the same, we tell Firefly that we want future image generations to be similar to this image that we like. This allows us to use all Firefly's other generation options such as style presets, size, reference images, and more, while keeping the image consistent with the one we liked.

In the example below, we instruct Firefly to generate an image similar to the one we like by specifying its seed ID, but want an image generation variation by using the "landscape photography" and "science fiction" style presets.

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

Firefly responds with this JSON:

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

With a URL containing this image:

![a variation of futuristic city 1](../../images/seeded-city-1.jpeg)

Notice how many similarities from the image with the same seed are retained, but we've nudged the generation with [style presets](../styles/index.md) towards "landscape photography" and "science fiction" styles.
