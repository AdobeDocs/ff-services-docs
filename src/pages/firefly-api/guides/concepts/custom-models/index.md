---
title: Custom Models
description: Use Custom Models to generate image variations that align with your brand
keywords:

contributors:
  - https://github.com/bishoysefin
hideBreadcrumbNav: true
---

# Custom Models

Use Firefly Custom Models to generate brand-aligned image variations at scale.

## Overview

This documentation explains concepts relevant to the Adobe Firefely Custom Models API. With Custom Models, you can capture and replicate distinctive brand aesthetics, characters, objects, or compositional arrangements. Once trained, these models can be referenced when generating new images—helping you scale brand-consistent visuals while reducing manual effort.

## Training Modes

Custom Models can be set to learn different aspects of visual design:

* **Subject Models:** Focus on representing specific characters, products, or objects. For example, if your brand features a mascot, a subject model ensures that this mascot is accurately depicted in any scenario.

* **Style Models:** Emphasize aesthetic qualities like color palettes, patterns, brush stroke techniques, or illustrative cues. This ensures that all generated visuals share a consistent, recognizable style aligned with your brand’s look and feel.

## Asset IDs

Custom Models are stored as assets hosted securely by Adobe, enabling easy organization, versioning, and reuse. Each custom model is assigned a unique Asset ID. This identifier is key to:

* **Referencing in Image Generation:** By providing the Asset ID in your API requests, you ensure that the generated images originate from the appropriate model’s learned characteristics.
* **Version Control and Tracking:** Asset IDs enable you to manage multiple models, track updates, and maintain a clear record of various styles, subjects, or structures you’ve captured over time.

## Performing CM Image Generation

To perform CM inference using the `/v3/images/generate-async` endpoint, it is mandatory to include a header named `x-model-version`. This header specifies the model version that will be used for generating the image.

### Required Header

* **Header Name:** `x-model-version`
* **Value:** Specifies the version of the model to be used for image generation. Currently, the only supported value is `image3_custom`.


### Supported Values

| Model Version Value | Description                      |
|---------------------|----------------------------------|
| `image3_custom`     | Current supported model version. |

### Example Request

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

#### cURL

```bash
curl --request POST 'https://firefly-api.adobe.io/v3/images/generate-async' \
--header 'x-model-version: image3_custom' \
...
--data "{
    \"prompt\": \"An almond seed in a warm setting\",
    \"customModelId\": \"$CUSTOM_MODEL_ID\"
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