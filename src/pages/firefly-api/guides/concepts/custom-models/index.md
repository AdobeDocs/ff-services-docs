---
title: Custom Models Overview
description: Use Custom Models to generate image variations that align with your brand.
contributors:
  - 'https://github.com/bishoysefin'
  - 'https://github.com/Aeabreu-hub'
hideBreadcrumbNav: true
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
og:
  title: Custom Models Overview
  description: Use Custom Models to generate image variations that align with your brand.
twitter:
  card: summary
  title: Custom Models Overview
  description: Use Custom Models to generate image variations that align with your brand.
---

# Custom Models

Use Firefly's Custom Models API to generate brand-aligned image variations at scale. This page explains concepts relevant to custom models.

## Overview

With custom models, you can capture and replicate distinctive brand aesthetics, characters, objects, or compositional arrangements.
These models are trained and referenced when generating new images, helping to scale brand-consistent visuals.

## Training modes

Custom models are configured to learn different aspects of visual design:

* **Subject Models:** These focus on representing specific characters, products, or objects.
For example, a subject model ensures that your brand mascot is depicted accurately in any scenario.

* **Style Models:** These emphasize aesthetic qualities like color palettes, patterns, brush stroke techniques, or illustrative cues, ensuring that all generated visuals share a consistent, recognizable style aligned with your brand's look and feel.

## Asset IDs

Custom models are assets hosted securely by Adobe, offering easy organization, versioning, and reuse. Each custom model has a unique asset ID.

With Asset IDs you can manage multiple models by tracking updates and maintaining a clear record of styles, subjects, or structures captured in versions over time.

Provide the asset ID in your API requests so that the generated images include the appropriate model's learned characteristics.

## Image generation with a custom model

Leverage a custom model to generate images by using the `/v3/images/generate-async` endpoint and including the header `x-model-version`. This specifies the model version used for generating the image.

### Example requests

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

#### cURL

```bash
curl --request POST 'https://firefly-api.adobe.io/v3/images/generate-async' \
--header 'x-model-version: image3_custom' \
...
--data "{
    \"prompt\": \"An almond seed in a warm setting\",
    \"customModelId\": \"${CUSTOM_MODEL_ID}\"
  }"
```

#### Python

```python
def generate_images_with_custom_model(access_token, custom_model_id):
    url = 'https://firefly-api.adobe.io/v3/images/generate-async'
    headers = {
      'x-model-version':'image3_custom',
      ...
    }

    data = {
        "prompt": "An almond seed in a warm setting",
        "customModelId": custom_model_id
    }

    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    result = response.json()
    print("Generate Image Response:", result)
    return result

```

#### JavaScript

```js
async function generateImagesWithCustomModel(accessToken, customModelId) {
  const config = {
    method: "post",
    url: "https://firefly-api.adobe.io/v3/images/generate-async",
    headers: {
    "x-model-version":"image3_custom",
    ...
  },
  data: JSON.stringify({
      "prompt": "An almond seed in a warm setting",
      "customModelId": customModelId
    })
  };

  const response = await axios.request(config);
  return response.data;
}
```
