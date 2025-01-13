---
title: Custom Models Generate Image API Tutorial
description: Learn how to list your custom models and then generate images using a selected custom model with the Firefly Generate Image API.
keywords:
contributors:
  - https://github.com/bishoysefin
hideBreadcrumbNav: true
---

# Custom Models Generate Image API Tutorial

Learn how to generate images using a Firefly Custom Model.

||
| --- | --- |
| ![trained-custom-model](./images/customModelTrained.png) <p style="text-align:center">Custom Image Model</p> | ![generated-image](./images/almond.png) <p style="text-align:center">Output Image</p> |

## Overview

In this tutorial, let's imagine we work at a global fragrance company and are creating an on-brand marketing campaign for our new product line promoting Almond notes.

In the tutorial below, we will:

* First, list custom models available
* Next, Generate Images Using the chosen Custom Model with custom parameters such as prompt, style presets, and image size.

Depending on your learning style, you may prefer to walk through this tutorial step-by-step or [jump immediately to the full source code](#full-example) at the bottom of this webpage.

## Prerequisites

### Credentials

If you don't already have a Firefly Services **Client ID** and **Client Secret**, retrieve them from your [Adobe Developer Console project](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/#api-overview) before reading further. **Securely store these credentials and never expose them in client-side or public code.**

### Set Up Your Environment

Before we begin this tutorial, run the following in a secure terminal:

<CodeBlock slots="heading, code" repeat="2" languages="Python, JavaScript" />

#### JavaScript

```bash
mkdir cm-generate-image-api-tutorial
cd cm-generate-image-api-tutorial
npm init --y
npm install axios qs
touch index.js
```

#### Python

```bash
mkdir cm-generate-image-api-tutorial
cd cm-generate-image-api-tutorial
python -m pip install requests
touch main.py
```

## Retrieve an Access Token

Open a secure terminal and `export` your **Client ID** and **Client Secret** as environment variables so that your later commands can access them:

```bash
export CUSTOM_MODELS_CLIENT_ID=yourClientIdAsdf123
export CUSTOM_MODELS_CLIENT_SECRET=yourClientSecretAsdf123
```

Generate an access token:

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

Export this access token so that the next script can conveniently access it:

```bash
export CUSTOM_MODELS_ACCESS_TOKEN=yourAccessTokenAsdf123
```

## List Custom Models

In order to generate images with a custom model, you first need a Custom Model ID. Let's list all models available to use and select one for generating images

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

#### cURL

```bash
curl --request GET 'https://firefly-api.adobe.io/v3/custom-models' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $CUSTOM_MODELS_CLIENT_ID" \
--header "Authorization: Bearer $CUSTOM_MODELS_ACCESS_TOKEN"
```

#### Python

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

#### JavaScript

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

### Retrieve Custom Model ID

Now that we have listed the custom models available, let's store a Custom Model ID to be used to generate our images. The Custom Model ID can be found at the path `custom_models[n].assetId`

```bash
export $CUSTOM_MODEL_ID=urn:aaid:sc:VA6C2:bc1f46cd-be98-4a7b-9ffe-1111111111
```

## Generate Image

Next, let's use the Custom Model ID to generate images with our custom model! **Important:** Remember to include the header `x-model-version: image3_custom` in your request, as this tells the system to use our custom model for image generation.

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

#### cURL

```bash
curl --request GET 'https://firefly-api.adobe.io/v3/images/generate-async' \
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

#### Python

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

#### JavaScript

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

The response will look like:

```json
{
	"jobId": "urn:ff:jobs:eso85125:2dc3bd5f-1606-4658-8781-111111111",
	"statusUrl": "https://firefly-stage-eso85125.adobe.io/v3/status/urn:ff:jobs:eso85125:2dc3bd5f-1606-4658-8781-111111111",
	"cancelUrl": "https://firefly-stage-eso85125.adobe.io/v3/cancel/urn:ff:jobs:eso85125:2dc3bd5f-1606-4658-8781-111111111"
} 
```

### Check Generation Status

Next up, we will use the Get Status endpoint to monitor the job status until it completes.

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

#### cURL

```bash
curl --location 'https://firefly-stage-eso85121.adobe.io/jobs/result/urn:ff:jobs:eso85125:2dc3bd5f-1606-4658-8781-111111111' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $CUSTOM_MODELS_CLIENT_ID" \
--header "Authorization: Bearer $CUSTOM_MODELS_ACCESS_TOKEN" 
```

#### Python

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

#### JavaScript

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

## Full Example

Review this tutorial's [prerequisites](#prerequisites) section to understand how to set up your environment prior to running this code. (Because this code is for educational purposes only, it is not production-ready and requires additional error handling, logging, security measures, and more before it can be used in a live application.)

<CodeBlock slots="heading, code" repeat="2" languages="Python, JavaScript" />

#### Python

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

#### JavaScript

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

## Deepen Your Understanding

Now that you have a working implementation of the Generate Image API, visit its [reference documentation](../api/image_generation/V3) to explore more advanced use cases for automating your workflows.
