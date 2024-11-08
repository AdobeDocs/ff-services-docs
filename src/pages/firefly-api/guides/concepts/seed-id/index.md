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

Optionally use seed IDs to generate images similar to one another across multiple requests.

Whenever Firefly generates an image, by default it starts in a random state. This randomness contributes to what makes each image unique. This is great when you want to generate a wide variety of images, but there may be times when you want to generate images that are similar to one another. For example, you may want to create a series of images that share consistent styles and characteristics. This is where seed IDs come in.

The best way to understand the advanced power of seed IDs is to see them in action. Let's first generate images without seeds specified (which means that Firefly will randomly generate them for us):

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/generate' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'x-api-key: PASTE_YOUR_CLIENT_ID_HERE' \
--header 'Authorization: Bearer PASTE_YOUR_ACCESS_TOKEN_HERE' \
--data '{
    "prompt": "puppy reading a book while pondering life",
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
With images like this:

## TODO

Now, let's say we like that cartoon puppy. We can use the seed ID (`90387871`) from that image to generate more images that are similar to it. To do this, we simply add the `seed` parameter to the request first request:

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/generate' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'x-api-key: PASTE_YOUR_CLIENT_ID_HERE' \
--header 'Authorization: Bearer PASTE_YOUR_ACCESS_TOKEN_HERE' \
--data '{
    "prompt": "puppy reading a book while pondering life",
    "numVariations": 4
}'
```
