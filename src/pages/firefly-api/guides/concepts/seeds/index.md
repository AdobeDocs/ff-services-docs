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
  - 'https://github.com/bishoysefin'
  - 'https://github.com/aeabreu-hub'
hideBreadcrumbNav: true
og:
  title: Seeds - Adobe Firefly API
  description: This guide explains usage of Seeds in the Adobe Firefly API.
twitter:
  card: summary
  title: Seeds - Adobe Firefly API
  description: This guide explains usage of Seeds in the Adobe Firefly API.
---

# Understanding Firefly API Seeds

Use seeds to generate similar AI images across multiple API requests.
Learn about seeds and how they're used with Firefly AI.

||
| --- | --- | --- |
| ![original image](../../images/seed-concept-original-image.jpeg) <p style="text-align:center">Original Image</p> | ![same seed variation](../../images/seed-concept-same-seed-regeneration.jpeg) <p style="text-align:center">Same Seed Variation</p> | ![different seed variation](../../images/seed-concept-different-seed-regeneration.jpeg) <p style="text-align:center">Different Seed Variation</p>

## About seeds

Whenever Firefly AI generates an image it begins that process by picking a random number called a "seed". In the context of AI, the seed is a starting value or series of values for a random number generator (RNG) to help vary the generated results.

Computer programs are completely deterministic, so they can't create true randomness. A random seed facilitates [pseudorandomness](https://en.wikipedia.org/wiki/Pseudorandomness) with AI so that generated images are different even when other parameters remain the same. Using the same seed, prompt, and other presets, would generate the same image every time.

When Firefly generates an image that you want to preserve and modify more precisely using Firefly's other image options (such as style presets, reference images, etc.), you'll use that image's seed to limit the variations and hone in on the image you want.

## Concepts in action

<InlineAlert variant="warning" slots="header, text" />

Prerequisites

You'll need a Firefly **Client ID** and **Access Token** for this exercise. Learn how to retrieve them in the [Authentication Guide](../authentication/index.md). **Securely store these credentials and never expose them in client-side or public code.**

### Find the seed

1. First, open a secure terminal and `export` your **Client ID** and **Access Token** as environment variables:

```bash
export FIREFLY_SERVICES_CLIENT_ID=yourClientIdAsdf123
export FIREFLY_SERVICES_ACCESS_TOKEN=yourAccessTokenAsdf123
```

2. Run the following command to generate an AI image of a futuristic city with a unique seed:

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/generate-async' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $FIREFLY_SERVICES_CLIENT_ID" \
--header "Authorization: Bearer $FIREFLY_SERVICES_ACCESS_TOKEN" \
--data '{
    "prompt": "a futuristic future cityscape with flying cars"
}'
```

The request returns a rapid response for the async job:

```json
{   
    "jobId":"<YOUR_JOB_ID>",
    "statusUrl":"https://firefly-epo854211.adobe.io/v3/status/urn:ff:jobs:...",
    "cancelUrl":"https://firefly-epo854211.adobe.io/v3/cancel/urn:ff:jobs:..."
}
```

3. Use the `jobId` to check the status of the job:

```bash
curl -X GET "https://firefly-api.adobe.io/v3/status/<YOUR_JOB_ID>" \
    -H "x-api-key: $FIREFLY_SERVICES_CLIENT_ID" \
    -H "Authorization: Bearer $FIREFLY_SERVICES_ACCESS_TOKEN" \
    -H "Content-Type: application/json"
```

After Firefly successfully generates the image, the JSON response for the final status will contain the image seed in `outputs`, along with other details.

Below is an example of our sample image response and the image it generated:

```json
{ 
    "status": "succeeded", 
    "jobId": "urn:ff:jobs:epo854211:783e1c22-5a15-4a01-ab2b-32966a06ce6c", 
    "result": { 
        "size": { 
            "width": 2048, 
            "height": 2048 
        }, 
        "outputs": [
            { 
                "seed": 1842533538, // Here is the seed for our generated image
                "image": { 
                    "url": "https://pre-signed-firefly-prod.s3-accelerate.amazonaws.com/images/asdf-1234..." 
                } 
            }
        ], 
        "contentClass": "art" 
    } 
}
```

![a picture of a futuristic city 1](../../images/seedless-city-1.jpeg)

### Generate a seed image

Use Firefly's other image generation options (like style presets or size) while keeping the results consistent with the original generated image.
Generate similar cityscapes by using its seed:

```1842533538```

||
| --- | --- |
| ![a picture of a futuristic city 1](../../images/seedless-city-1.jpeg) <p style="text-align:center">Original Image</p> | ![a variation of futuristic city 1](../../images/seeded-city-1.jpeg) <p style="text-align:center">Same Seed Image with Preset Variation</p>

1. Use the command below to generate an image variation of our cityscape. This variation has "landscape photography" and "science fiction" [style presets](../style-presets/index.md) applied to it. Or include other options to experiment with new results.

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/generate-async' \
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

The request returns a rapid response for the async job:

```json
{   
    "jobId":"<YOUR_JOB_ID>",
    "statusUrl":"https://firefly-epo854211.adobe.io/v3/status/urn:ff:jobs:...",
    "cancelUrl":"https://firefly-epo854211.adobe.io/v3/cancel/urn:ff:jobs:..."
}
```

2. Use the `jobId` to see the result:

```bash
curl -X GET "https://firefly-api.adobe.io/v3/status/<YOUR_JOB_ID>" \
    -H "x-api-key: $FIREFLY_SERVICES_CLIENT_ID" \
    -H "Authorization: Bearer $FIREFLY_SERVICES_ACCESS_TOKEN" \
    -H "Content-Type: application/json"
```

The differences are obvious, but you'll also notice the similarities. Those characteristics come from the seed.
