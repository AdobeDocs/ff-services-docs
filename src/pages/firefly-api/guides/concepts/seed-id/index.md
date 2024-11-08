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

Use seed IDs to generate images similar to one another across multiple requests.

Whenever Firefly generates an image, by default it starts in a brand new random state. This random starting state contributes to what makes each image unique. This is great when you want to generate a wide variety of images, but there may be times when you want to generate images that are similar to one another. For example, when Firefly generates an image with a certain prompt that you find to be amazing, and now you wish to try out different generated styles while keeping the image more consistent, Seed IDs can help you achieve this.

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

Now, let's say we like the image of the puppy with its paws holding up the book. We can use the seed ID (`733755163`) from that image to generate more images that are similar to it. Let's first demonstrate what happens if we replace `"numVariations" : 4` with `"seeds": [733755163]`:

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/generate' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'x-api-key: PASTE_YOUR_CLIENT_ID_HERE' \
--header 'Authorization: Bearer PASTE_YOUR_ACCESS_TOKEN_HERE' \
--data '{
    "prompt": "puppy reading a book while pondering life",
    "seeds": [733755163]
}'
```

With no new instructions for how generate the image, we receive an image back that looks similar our prior puppy with the same prompt and same seed:

TODO PUPPY IMAGE 2

Now, in practice we won't be interested in generating lots of images of the same puppy. Rather, now that we know we can keep the puppy consistent, we will begin exploring different styles with it:

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/generate' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'x-api-key: PASTE_YOUR_CLIENT_ID_HERE' \
--header 'Authorization: Bearer PASTE_YOUR_ACCESS_TOKEN_HERE' \
--data '{
    "prompt": "puppy reading a book while pondering life",
    "seeds": [733755163]
}'
```
