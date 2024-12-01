---
title: Quickstart
description: Quickstart guide for Firefly Services APIs
contributors:
  - https://github.com/bishoysefin
---

# Quickstart Guide

Automating Content Workflows with Firefly Services APIs

Pictures

## Overview

In this tutorial, let's imagine we work at an innovative e-commerce company specializing in handcrafted home decor. Our mission is to create a captivating online catalog that showcases our unique products to customers worldwide. To achieve this, we need to process a large number of product images efficiently while maintaining high visual standards.We will leverage Adobe's Firefly Services APIs to automate our content workflow:

* **Remove Backgrounds:** Use the Photoshop API to eliminate distracting backgrounds from our product images, allowing the items to stand out.
* **Enhance Images with Generative Fill:** Apply the Firefly Fill Image API to add creative and contextually relevant backgrounds that enhance the aesthetic appeal of each product.
* **Optimize Image Quality:** Utilize the Lightroom Auto Tone API to automatically adjust lighting and color balance, ensuring consistent and professional-quality images across our catalog.

## Prerequisites

If you don't already have a Photoshop, Firefly, and Lightroom **Client ID** and **Client Secret**, retrieve them from your [Adobe Developer Console project](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/#api-overview) before reading further. **Securely store these credentials and never expose them in client-side or public code.**

Pre-signed URLs:

* A pre-signed URL with a read token for the input assets.
* A pre-signed URL with a read/write token for the output assets.

## Retrieve an Access Token

Open a secure terminal and `export` your **Client ID** and **Client Secret** as environment variables so that your later commands can access them:

```bash
export FIREFLY_SERVICES_CLIENT_ID=yourClientIdAsdf123
export FIREFLY_SERVICES_CLIENT_SECRET=yourClientSecretAsdf123
```

Generate an access token:

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

#### cURL

```bash
curl --location 'https://ims-na1.adobelogin.com/ims/token/v3' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode "client_id=$FIREFLY_SERVICES_CLIENT_ID" \
--data-urlencode "client_secret=$FIREFLY_SERVICES_CLIENT_SECRET" \
--data-urlencode 'scope=openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis'
```

#### Python

```python
import os
import requests

# Retrieve environment variables
client_id = os.environ['FIREFLY_SERVICES_CLIENT_ID']
client_secret = os.environ['FIREFLY_SERVICES_CLIENT_ID']

# Set up the token endpoint and payload
token_url = 'https://ims-na1.adobelogin.com/ims/token/v3'
payload = {
    'grant_type': 'client_credentials',
    'client_id': client_id,
    'client_secret': client_secret,
    'scope': 'openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis'
}

# Make the POST request to get the access token
response = requests.post(token_url, data=payload)
response.raise_for_status()  # Raise an error for bad status codes

# Parse the JSON response
token_data = response.json()
print("Authentication Response: ", token_data)
```

#### JavaScript

```js
const axios = require("axios");
const qs = require("qs");

(async () => {
  const accessToken = await retrieveAccessToken();
})();


async function retrieveAccessToken() {
  let data = qs.stringify({
    grant_type: "client_credentials",
    client_id: process.env.FIREFLY_SERVICES_CLIENT_ID,
    client_secret: process.env.FIREFLY_SERVICES_CLIENT_SECRET,
    scope:
      "openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://ims-na1.adobelogin.com/ims/token/v3",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log("Authentication Response: ", response);
    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    console.log(error);
  }
}
```

The response will look like this:

```json
{"access_token":"yourAccessTokenAsdf123","token_type":"bearer","expires_in":86399}
```

Export this access token in your secure terminal so that the next script can conveniently access it:

```bash
export FIREFLY_SERVICES_ACCESS_TOKEN=yourAccessTokenAsdf123
```

## Remove Background - Photoshop API

Next, call the [Photoshop Remove Background API](../../photoshop/api/photoshop_removeBackground.md):

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

#### cURL

```bash
curl --location 'https://image.adobe.io/sensei/cutout' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $FIREFLY_SERVICES_CLIENT_ID" \
--header "Authorization: Bearer $FIREFLY_SERVICES_ACCESS_TOKEN" \
--data '{
    "input":{
      "href":"https://demo.blob.core.windows.net:443/container/input.jpeg?sv...&query=params...",
      "storage":"azure"
    },
    "output":{
      "href":"https://demo.blob.core.windows.net:443/container/output.jpeg?sv...&query=params...",
      "storage":"azure"
    }
  }'
```

#### Python

```python
import os
import requests

# Retrieve environment variables
client_id = os.environ['FIREFLY_SERVICES_CLIENT_ID']
access_token = os.environ['FIREFLY_SERVICES_ACCESS_TOKEN']

# Replace with your actual pre-signed URLs and storage option
SIGNED_GET_URL = 'https://demo.blob.core.windows.net:443/container/input.jpeg?sv...&query=params...'
SIGNED_POST_URL = 'https://demo.blob.core.windows.net:443/container/output.jpeg?sv...&query=params...'
storage = 'azure'  # e.g., 'external', 'azure'

# Set up headers
headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': client_id,
    'Authorization': f'Bearer {access_token}'
}

# Set up the request payload
data = {
    'input': {
        'href': 'https://demo.blob.core.windows.net:443/container/input.jpeg?sv...&query=params...',
        'storage': 'azure'
    },
    'output': {
        'href': 'https://demo.blob.core.windows.net:443/container/output.jpeg?sv...&query=params...',
        'storage': 'azure'
    }
}

# Make the POST request to create the mask
response = requests.post('https://image.adobe.io/sensei/cutout', headers=headers, json=data)
response.raise_for_status()

# Parse the JSON response
job_response = response.json()
print("Remove Background Response:", job_response)
```

#### JavaScript

```js
const axios = require("axios");

(async () => {
  const result = await removeBackground(accessToken);
  console.log("Remove Background Response:", result);
})();

async function removeBackground(accessToken) {
  // Replace with your actual pre-signed URLs and storage option
  const SIGNED_GET_URL = "https://demo.blob.core.windows.net:443/container/input.jpeg?sv...&query=params...";
  const SIGNED_POST_URL = "https://demo.blob.core.windows.net:443/container/output.jpeg?sv...&query=params...";
  const storage = "azure"; // e.g., 'external', 'azure'

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key": process.env.FIREFLY_SERVICES_CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  };

  const data = {
    input: {
      href: SIGNED_GET_URL,
      storage: storage,
    },
    output: 
      {
        href: SIGNED_POST_URL,
        storage: storage
      }
  };

  const config = {
    method: "post",
    url: "https://image.adobe.io/sensei/cutout",
    headers: headers,
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error during removeBackground:", error);
  }
}
```

The response will look like this:

```json
{
  "_links": {
    "self": {
      "href": "https://image.adobe.io/sensei/status/<:jobId>"
    }
  }
}
```

Wait for a success status of this job. A sample of this is provided in the [Photoshop Quickstart Guide](../../photoshop/quickstart/index.md#get-status---mask).

## Fill Image - Firefly API

Next, call the [Firefly Fill Image API](../../firefly-api/guides/api/generative_fill/V3_Async/index.md):

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

#### cURL

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/fill-async' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $FIREFLY_SERVICES_CLIENT_ID" \
--header "Authorization: Bearer $FIREFLY_SERVICES_ACCESS_TOKEN" \
--data '{
    "prompt": "string",
    "image": {
        "source": {
            "url": "http://example.com",
        }
    },
    "mask": {
        "source": {
            "url": "http://example.com",
        }
    }
}'
```

#### Python

```python
import os
import requests

# Retrieve environment variables
client_id = os.environ['FIREFLY_SERVICES_CLIENT_ID']
access_token = os.environ['FIREFLY_SERVICES_ACCESS_TOKEN']

# Replace with your actual pre-signed URLs and storage option
SIGNED_IMAGE_GET_URL = 'https://demo.blob.core.windows.net:443/container/input.jpeg?sv...&query=params...'
SIGNED_MASK_GET_URL = 'https://demo.blob.core.windows.net:443/container/input.jpeg?sv...&query=params...'

# Set up headers
headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': client_id,
    'Authorization': f'Bearer {access_token}'
}

# Set up the request payload
data = {
    'prompt': 'string',  # Replace with your actual prompt
    'image': {
        'source': {
            'url': SIGNED_IMAGE_GET_URL
        }
    },
    'mask': {
        'source': {
            'url': SIGNED_MASK_GET_URL
        }
    }
}

# Make the POST request to the Firefly Fill Image API
response = requests.post(
    'https://firefly-api.adobe.io/v3/images/fill-async',
    headers=headers,
    json=data
)
response.raise_for_status()

# Parse the JSON response
job_response = response.json()
print("Fill Image Response:", job_response)
```

#### JavaScript

```js
const axios = require("axios");

(async () => {
  const result = await fillImage(accessToken);
  console.log("Fill Image Response:", result);
})();

async function fillImage(accessToken) {
  // Replace with your actual image and mask URLs
  const SIGNED_IMAGE_GET_URL = "http://example.com"; // Replace with your image URL
  const SIGNED_MASK_GET_URL = "http://example.com";  // Replace with your mask URL

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key": process.env.FIREFLY_SERVICES_CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  };

  const data = {
    prompt: "string", // Replace with your actual prompt
    image: {
      source: {
        url: SIGNED_IMAGE_GET_URL,
      },
    },
    mask: {
      source: {
        url: SIGNED_MASK_GET_URL,
      },
    },
  };

  const config = {
    method: "post",
    url: "https://firefly-api.adobe.io/v3/images/fill-async",
    headers: headers,
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error during fillImage:", error);
  }
}
```

The response will look like this:

```json
{
"cancelUrl": "string",
"jobId": "string",
"statusUrl": "string"
}
```

Wait for a success status of this job. A sample of this is provided in the [Firefly API Tutorials](../../firefly-api/guides/how-tos/using-async-apis.md#generating-images-with-the-async-api).

## Auto Tone - Lightroom API

Next, call the [Lightroom Auto Tone API](../../lightroom/api/lightroom_autoTone.md):

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

#### cURL

```bash
curl --location 'https://image.adobe.io/lrService/autoTone' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $FIREFLY_SERVICES_CLIENT_ID" \
--header "Authorization: Bearer $FIREFLY_SERVICES_ACCESS_TOKEN" \
--data '{
    "inputs":{
      "href":"https://demo.blob.core.windows.net:443/container/input.jpeg?sv...&query=params...",
      "storage":"azure"
    },
    "outputs":[{
      "href":"https://demo.blob.core.windows.net:443/container/output.jpeg?sv...&query=params...",
      "storage":"azure",
      "type":"image/jpeg"
    }]
  }'
```

#### Python

```python
import os
import requests

# Retrieve environment variables
client_id = os.environ['FIREFLY_SERVICES_CLIENT_ID']
access_token = os.environ['FIREFLY_SERVICES_ACCESS_TOKEN']

# Replace with your actual pre-signed URLs and storage option
SIGNED_GET_URL = 'https://demo.blob.core.windows.net:443/container/input.jpeg?sv...&query=params...'
SIGNED_POST_URL = 'https://demo.blob.core.windows.net:443/container/output.jpeg?sv...&query=params...'
storage = 'azure'  # e.g., 'external', 'azure'

# Set up headers
headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': client_id,
    'Authorization': f'Bearer {access_token}'
}

# Set up the request payload
data = {
    'inputs': {
        'href': 'https://demo.blob.core.windows.net:443/container/input.jpeg?sv...&query=params...',
        'storage': azure
    },
    'outputs': [{
        'href': 'https://demo.blob.core.windows.net:443/container/output.jpeg?sv...&query=params...',
        'storage': 'azure',
        'type':'image/jpeg'
    }]
}

# Make the POST request to create the mask
response = requests.post('https://image.adobe.io/lrService/autoTone', headers=headers, json=data)
response.raise_for_status()

# Parse the JSON response
job_response = response.json()
print("Auto Tone Response:", job_response)
```

#### JavaScript

```js
const axios = require("axios");

(async () => {
  const result = await autoTone(accessToken);
  console.log("Auto Tone Response:", result);
})();

async function autoTone(accessToken) {
  // Replace with your actual pre-signed URLs and storage option
  const SIGNED_GET_URL = "https://demo.blob.core.windows.net:443/container/input.jpeg?sv...&query=params...";
  const SIGNED_POST_URL = "https://demo.blob.core.windows.net:443/container/output.jpeg?sv...&query=params...";
  const storage = "azure"; // e.g., 'external', 'azure'

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key": process.env.FIREFLY_SERVICES_CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  };

  const data = {
    inputs: {
      href: SIGNED_GET_URL,
      storage: storage,
    },
    outputs: [
      {
        href: SIGNED_POST_URL,
        storage: storage,
        type: "image/jpeg",
      },
    ],
  };

  const config = {
    method: "post",
    url: "https://image.adobe.io/lrService/autoTone",
    headers: headers,
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error during autoTone:", error);
  }
}
```

The response will look like this:

```json
{
  "_links": {
    "self": {
      "href": "https://image.adobe.io/lrService/status/<:jobId>"
    }
  }
}
```

Wait for a success status of this job. A sample of this is provided in the [Lightroom API Quickstart Guide](../../lightroom/quickstart/index.md#get-status).

## View Final Image

Access the final at the `outputs[0]._links.self.href` URL (the `SIGNED_POST_URL` provided earlier). 🎉
