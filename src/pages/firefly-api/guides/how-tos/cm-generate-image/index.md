---
title: Custom Models Generate Image API Tutorial
description: >-
  Learn how to list your custom models and then generate images using a selected
  custom model with the Firefly Generate Image API.
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
contributors:
  - 'https://github.com/bishoysefin'
hideBreadcrumbNav: true
og:
  title: Custom Models Generate Image API Tutorial
  description: >-
    Learn how to list your custom models and then generate images using a
    selected custom model with the Firefly Generate Image API.
twitter:
  card: summary
  title: Custom Models Generate Image API Tutorial
  description: >-
    Learn how to list your custom models and then generate images using a
    selected custom model with the Firefly Generate Image API.
---

# Custom Models Generate Image API Tutorial

Learn to generate images using a Firefly Custom Model.

||
| --- | --- |
| ![trained-custom-model](./images/customModelTrained.png) <p style="text-align:center">Custom Image Model</p> | ![generated-image](./images/almond.png) <p style="text-align:center">Output Image</p> |

## Overview

In this tutorial you will:

- List custom models that are available.
- Generate images using a specific custom model, with the custom parameters: prompt, style presets, and image size.

Depending on your learning style, you may prefer to walk through this tutorial step-by-step or [jump immediately to the full source code](#implementation-example) at the bottom of this webpage.

## Introduction

Imagine you work at a global fragrance company and are creating an on-brand marketing campaign. This season introduced a new fad in the world of scent: almonds. The people want almond candles, almond soap, almond scrubs, and almond perfume. There's almond in every product in the new line. The pitch for this new trend with legumes is they're clean, natural, and (somehow) cozy, and comfortable.

So, let's make some images.

## Getting started

### Credentials

1. Retrieve a Firefly Services **Client ID** and **Client Secret** from your [Adobe Developer Console project](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/#api-overview). **Securely store these credentials and never expose them in client-side or public code.**

### Set up your environment

Along with the cURL commands, this tutorial offers code samples in JavaScript and Python.

1. Set up an environment by running the following in a secure terminal:

<CodeBlock slots="heading, code" repeat="2" languages="Python, JavaScript" />

JavaScript

```bash
mkdir cm-generate-image-api-tutorial
cd cm-generate-image-api-tutorial
npm init --y
npm install axios qs
touch index.js
```

Python

```bash
mkdir cm-generate-image-api-tutorial
cd cm-generate-image-api-tutorial
python -m pip install requests
touch main.py
```

### Retrieve an access token

1. Open a secure terminal and `export` your Client ID and Client Secret as environment variables to use later.

```bash
export CUSTOM_MODELS_CLIENT_ID=<yourClientId>
export CUSTOM_MODELS_CLIENT_SECRET=<yourClientSecret>
```

2. Generate an access token.

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

#### cURL

```bash
curl --location 'https://ims-na1.adobelogin.com/ims/token/v3' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode "client_id=$CUSTOM_MODELS_CLIENT_ID" \
--data-urlencode "client_secret=$CUSTOM_MODELS_CLIENT_SECRET" \
--data-urlencode 'scope=openid,AdobeID,firefly_api,ff_apis'
```

#### Python

```python
def retrieve_access_token():
    client_id = os.environ['CUSTOM_MODELS_CLIENT_ID']
    client_secret = os.environ['CUSTOM_MODELS_CLIENT_SECRET']

    token_url = 'https://ims-na1.adobelogin.com/ims/token/v3'
    payload = {
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret,
        'scope': 'openid,AdobeID,firefly_api,ff_apis'
    }

    response = requests.post(token_url, data=payload)
    response.raise_for_status()
    token_data = response.json()
    print("Access Token Retrieved")
    return token_data['access_token']
```

#### JavaScript

```js
async function retrieveAccessToken() {
  const data = qs.stringify({
    grant_type: 'client_credentials',
    client_id: process.env.CUSTOM_MODELS_CLIENT_ID,
    client_secret: process.env.CUSTOM_MODELS_CLIENT_SECRET,
    scope: 'openid,AdobeID,firefly_api,ff_apis',
  });

  const config = {
    method: 'post',
    url: 'https://ims-na1.adobelogin.com/ims/token/v3',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log('Access Token Retrieved');
    return response.data.access_token;
  } catch (error) {
    console.error('Error retrieving access token:', error.response.data);
  }
}
```

The response will look like this:

```json
{"access_token":"yourAccessTokenAsdf123","token_type":"bearer","expires_in":86399}
```

3. Export the access token to use later.

```bash
export CUSTOM_MODELS_ACCESS_TOKEN=<yourAccessToken>
```

## Find a custom model

Remember those pitch requirements? Clean, natural, cozy, and comfortable. So, all the images for our campaign should align with these characteristics.

Do we have a custom model suitable for that? Let's check.

1. List all the available models by calling the endpoint below.

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

cURL

```bash
curl --request GET 'https://firefly-api.adobe.io/v3/custom-models' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $CUSTOM_MODELS_CLIENT_ID" \
--header "Authorization: Bearer $CUSTOM_MODELS_ACCESS_TOKEN"
```

Python

```python
def list_custom_models(access_token):
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': os.environ['CUSTOM_MODELS_CLIENT_ID'],
        'Authorization': f'Bearer {access_token}'
    }

    response = requests.get(
        'https://firefly-api.adobe.io/v3/custom-models',
        headers=headers
    )
    response.raise_for_status()
    models_response = response.json()
    print("List Custom Models Response:", models_response)
    return models_response
```

JavaScript

```js
async function listCustomModels(accessToken) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key": process.env.CUSTOM_MODELS_CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  };

  const config = {
    method: "get",
    url: "https://firefly-api.adobe.io/v3/custom-models",
    headers: headers,
  };

  try {
    const response = await axios.request(config);
    console.log("List Custom Models Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during listCustomModels:", error);
  }
}
```

The response will look like this:
<!--TODO: Update response-->

```json
{
    "custom_models": [
        {
            "version": "1",
            "assetName": "Warm Custom Model.ffcustommodel",
            "size": 16513991265,
            "etag": "\"e7ee78220f4d46ceb766758e0e300a51\"",
            "trainingMode": "style",
            "assetId": "urn:aaid:sc:VA6C2:bc1f46cd-be98-4a7b-9ffe-1111111111",
            "mediaType": "application/vnd.adobe.ffmodel+dcx",
            "createdDate": 1733928288871,
            "modifiedDate": 1733928294741,
            "publishedState": "published",
            "baseModel": {
                "name": "clio_v2",
                "version": "2.0.0"
            },
            "samplePrompt": "A bean generated in a warm setting with brown colours",
            "displayName": "Warm Custom Model",
            "conceptId": ""
        }
    ],
    "_links": {
        "page": {
            "href": "/v3/custom-models?start={start}&limit={limit}",
            "rel": "page",
            "templated": true
        }
    },
    "total_count": 1
}
```

It looks like we have a suitable model, a Warm Custom Model! Let's choose this model to generate our images.

2. To use a custom model, you'll need the custom model ID. Find the custom model ID in the response object, labeled `assetId`.
3. Export this ID for use later.

```bash
export CUSTOM_MODEL_ID=urn:aaid:sc:VA6C2:bc1f46cd-be98-4a7b-9ffe-1111111111
```

## Generate your images

Time to put the AI to work. Let's use the Custom Model ID to generate images with our custom model!

1. Use Firefly's Generate Image API to generate product images. With our custom model to consider, include the header `x-model-version: image3_custom` in your request, as this tells the system to use our custom model for image generation.

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

cURL

```bash
curl --request POST 'https://firefly-api.adobe.io/v3/images/generate-async' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'x-accept-mimetype: image/jpeg' \
--header 'x-model-version: image3_custom' \
--header "x-api-key: $CUSTOM_MODELS_CLIENT_ID" \
--header "Authorization: Bearer $CUSTOM_MODELS_ACCESS_TOKEN" \
--data "{
    \"numVariations\": 2,
    \"seeds\": [66080, 82683],
    \"size\": {\"width\": 2048,\"height\": 2048},
    \"prompt\": \"An almond seed in a warm setting\",
    \"contentClass\": \"photo\",
    \"visualIntensity\": 6,
    \"style\": {
        \"presets\": [\"painting\"],
        \"strength\": 50
    },
    \"promptBiasingLocaleCode\": \"en-US\",
    \"customModelId\": \"$CUSTOM_MODEL_ID\"
  }"
```

Python

```python
def generate_images_with_custom_model(access_token, custom_model_id):
    url = 'https://firefly-api.adobe.io/v3/images/generate-async'
    headers = {
        'Accept': 'application/json',
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
        'x-accept-mimetype': 'image/jpeg',
        'x-model-version':'image3_custom',
        'x-api-key': os.environ['CUSTOM_MODELS_CLIENT_ID'],
    }

    data = {
        "numVariations": 2,
        "seeds": [66080, 82683],
        "size": {"width": 2048, "height": 2048},
        "prompt": "An almond seed in a warm setting",
        "contentClass": "photo",
        "visualIntensity": 6,
        "style": {
            "presets": ["painting"],
            "strength": 50
        },
        "promptBiasingLocaleCode": "en-US",
        "customModelId": custom_model_id
    }

    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    result = response.json()
    print("Generate Image Response:", result)
    return result

```

JavaScript

```js
async function generateImagesWithCustomModel(accessToken, customModelId) {
  const config = {
    method: "post",
    url: "https://firefly-api.adobe.io/v3/images/generate-async",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "x-accept-mimetype": "image/jpeg",
      "x-model-version":"image3_custom",
      "x-api-key": process.env.CUSTOM_MODELS_CLIENT_ID,
    },
    data: JSON.stringify({
      "numVariations": 2,
      "seeds": [66080, 82683],
      "size": { "width": 2048, "height": 2048 },
      "prompt": "An almond seed in a warm setting",
      "contentClass": "photo",
      "visualIntensity": 6,
      "style": {
        "presets": ["painting"],
        "strength": 50
      },
      "promptBiasingLocaleCode": "en-US",
      "customModelId": customModelId
    })
  };

  const response = await axios.request(config);
  return response.data;
}
```

The response will look something like this:

```json
{
  "jobId": "urn:ff:jobs:EXAMPLE85125:2dc3bd5f-1606-4658-8781-111111111",
  "statusUrl": "https://firefly-epo852211.adobe.io/v3/status/urn:ff:jobs:EXAMPLE85125:2dc3bd5f-1606-4658-8781-111111111",
  "cancelUrl": "https://firefly-epo852211.adobe.io/v3/cancel/urn:ff:jobs:EXAMPLE85125:2dc3bd5f-1606-4658-8781-111111111"
} 
```

### Check the image generation status

1. Use the Get Status endpoint to get the image generation job status. Here is an example of how to do this.

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

cURL

```bash
curl --location 'https://firefly-epo852211.adobe.io/v3/status/urn:ff:jobs:EXAMPLE85125:2dc3bd5f-1606-4658-8781-111111111' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $CUSTOM_MODELS_CLIENT_ID" \
--header "Authorization: Bearer $CUSTOM_MODELS_ACCESS_TOKEN" 
```

Python

```python
def check_job_status(status_url, access_token):
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': os.environ['CUSTOM_MODELS_CLIENT_ID'],
        'Authorization': f'Bearer {access_token}',
    }

    status_url = status_url
    response = requests.get(status_url, headers=headers)
    response.raise_for_status()
    return response.json()
```

JavaScript

```js
async function checkJobStatus(status_url, accessToken) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-key': process.env.CUSTOM_MODELS_CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await axios.get(status_url, { headers: headers });
  return response.data;
}
```

## Implementation example

Review the full implementation example below to learn more.

You'll need to [set up your environment](#set-up-your-environment) before running this code.

<InlineAlert variant="warning" slots="header, text" />

Example code is NOT production ready

Because this code is for educational purposes only, it IS NOT production-ready and requires additional error handling, logging, and security measures before it can be used in a live application.

<CodeBlock slots="heading, code" repeat="2" languages="Python, JavaScript" />

Python

```python
import os
import time
import requests
import sys

client_id = os.environ['CUSTOM_MODELS_CLIENT_ID']
client_secret = os.environ['CUSTOM_MODELS_CLIENT_SECRET']

def retrieve_access_token():
    token_url = 'https://ims-na1.adobelogin.com/ims/token/v3'

    payload = {
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret,
        'scope': 'openid,AdobeID,firefly_api,ff_apis'
    }

    response = requests.post(token_url, data=payload)
    response.raise_for_status()
    token_data = response.json()
    print("Access Token Retrieved")
    return token_data['access_token']

def list_custom_models(access_token):
    url = 'https://firefly-api.adobe.io/v3/custom-models'
    headers = {
        'Authorization': f'Bearer {access_token}',
        'x-api-key': os.environ['CUSTOM_MODELS_CLIENT_ID'],
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    response = requests.get(url, headers=headers)
    response.raise_for_status()
    models_response = response.json()
    print("List Custom Models Response:", models_response)
    return models_response

def generate_image_async(access_token, custom_model_id):
    url = 'https://firefly-api.adobe.io/v3/images/generate-async'
    headers = {
        'Accept': 'application/json',
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
        'x-accept-mimetype': 'image/jpeg',
        'x-model-version':'image3_custom',
        'x-api-key': os.environ['CUSTOM_MODELS_CLIENT_ID'],
    }

    data = {
        "numVariations": 2,
        "seeds": [66080, 82683],
        "size": {"width": 2048, "height": 2048},
        "prompt": "Laika running over rolling green hills with a big vibrant sun in the background",
        "negativePrompt": "red",
        "contentClass": "photo",
        "visualIntensity": 6,
        "style": {
            "presets": ["painting"],
            "strength": 50
        },
        "promptBiasingLocaleCode": "en-US",
        "customModelId": custom_model_id
    }

    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    result = response.json()
    print("Generate Image Async Response:", result)

    status_url = result.get('statusUrl')
    if not status_url:
        print("No status_url returned. Cannot poll status.")
        sys.exit(1)

    return status_url

def check_job_status(status_url, access_token):
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': os.environ['CUSTOM_MODELS_CLIENT_ID'],
        'Authorization': f'Bearer {access_token}',
    }

    try:
        status = 'running'
        while status not in ['succeeded', 'failed']:
            time.sleep(5)  # Wait for 5 seconds before checking status again
            response = requests.get(status_url, headers=headers)
            response.raise_for_status()
            status_response = response.json()
            status = status_response.get('status', 'unknown')
            print(f'Job Status: {status}')

        if status == 'succeeded':
            print('Image generation completed successfully!')
            print('Check the returned response for the image URLs or artifacts.')
        else:
            print('Image generation failed.')

    except requests.exceptions.RequestException as error:
        error_message = error.response.text if error.response else str(error)
        print('Error checking job status:', error_message)
        sys.exit(1)

def main():
    # Step 1: Retrieve Access Token
    access_token = retrieve_access_token()

    # Step 2: List Custom Models
    models_response = list_custom_models(access_token)

    if models_response and 'custom_models' in models_response and len(models_response['custom_models']) > 0:
        # Select the first model
        custom_model_id = models_response['custom_models'][0].get('repo:assetId')
        print("Using Custom Model ID:", custom_model_id)
    else:
        print("No custom models found.")
        sys.exit(1)

    # Step 3: Generate Image (Async)
    status_url = generate_image_async(access_token, custom_model_id)

    # Step 4: Poll Job Status
    check_job_status(status_url, access_token)

if __name__ == '__main__':
    main()
```

JavaScript

```js
const axios = require('axios');
const qs = require('qs');
const process = require('process');

(async () => {
  try {
    // Step 1: Retrieve Access Token
    const accessToken = await retrieveAccessToken();
    console.log("Access Token Retrieved");

    // Step 2: List Custom Models
    const modelsResponse = await listCustomModels(accessToken);
    if (modelsResponse && modelsResponse.custom_models && modelsResponse.custom_models.length > 0) {
      // Select the first model
      const customModelId = modelsResponse.custom_models[0]['repo:assetId'];
      console.log("Using Custom Model ID:", customModelId);

      // Step 3: Generate Image (Async)
      const statusUrl = await generateImageAsync(accessToken, customModelId);
      if (!statusUrl) {
        console.log("No status_url returned. Cannot poll status.");
        process.exit(1);
      }

      // Step 4: Poll Job Status
      await checkJobStatus(statusUrl, accessToken);
    } else {
      console.log("No custom models found.");
      process.exit(1);
    }
  } catch (error) {
    console.error("An error occurred:", error.response?.data || error.message || error);
    process.exit(1);
  }
})();

async function retrieveAccessToken() {
  const data = qs.stringify({
    grant_type: "client_credentials",
    client_id: process.env.CUSTOM_MODELS_CLIENT_ID,
    client_secret: process.env.CUSTOM_MODELS_CLIENT_SECRET,
    scope: "openid,AdobeID,firefly_api,ff_apis",
  });

  const config = {
    method: "post",
    url: "https://ims-na1.adobelogin.com/ims/token/v3",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: data,
  };

  const response = await axios.request(config);
  return response.data.access_token;
}

async function listCustomModels(accessToken) {
  const config = {
    method: "get",
    url: "https://firefly-api.adobe.io/v3/custom-models",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "x-api-key": process.env.CUSTOM_MODELS_CLIENT_ID,
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
  };

  const response = await axios.request(config);
  console.log("List Custom Models Response:", response.data);
  return response.data;
}

async function generateImageAsync(accessToken, customModelId) {
  const config = {
    method: "post",
    url: "https://firefly-api.adobe.io/v3/images/generate-async",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "x-accept-mimetype": "image/jpeg",
      "x-model-version": "image3_custom",
      "x-api-key": process.env.CUSTOM_MODELS_CLIENT_ID,
    },
    data: JSON.stringify({
      "numVariations": 2,
      "seeds": [66080, 82683],
      "size": { "width": 2048, "height": 2048 },
      "prompt": "Laika running over rolling green hills with a big vibrant sun in the background",
      "negativePrompt": "red",
      "contentClass": "photo",
      "visualIntensity": 6,
      "style": {
        "presets": ["painting"],
        "strength": 50
      },
      "promptBiasingLocaleCode": "en-US",
      "customModelId": customModelId
    })
  };

  const response = await axios.request(config);
  console.log("Generate Image Async Response:", response.data);
  return response.data.statusUrl;
}

async function checkJobStatus(statusUrl, accessToken) {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': process.env.CUSTOM_MODELS_CLIENT_ID,
    'Authorization': `Bearer ${accessToken}`,
  };

  let status = 'running';
  try {
    while (status !== 'succeeded' && status !== 'failed') {
      // Wait 5 seconds before polling again
      await new Promise(resolve => setTimeout(resolve, 5000));
      const response = await axios.get(statusUrl, { headers });
      status = response.data.status || 'unknown';
      console.log(`Job Status: ${status}`);
    }

    if (status === 'succeeded') {
      console.log('Image generation completed successfully!');
      console.log('Check the returned response for the image URLs or artifacts.');
    } else {
      console.log('Image generation failed.');
    }
  } catch (error) {
    const errorMessage = error.response?.data || error.message || error;
    console.log('Error checking job status:', errorMessage);
    process.exit(1);
  }
}

```

## Deepen your understanding

Now that you have a working implementation, visit the [reference documentation for the Generate Image API](../../api/image_generation/V3_Async/) to explore more advanced use cases and automate your workflows.
