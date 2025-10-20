---
title: Automate a Content Workflow
description: Learn how to use various Firefly Services APIs to automate a single content workflow.
contributors:
  - 'https://github.com/bishoysefin'
keywords:
  - API documentation
  - REST API
  - tutorial
  - Firefly tutorial
  - Firefly Image
  - Firefly Lightroom
---

# Automate a content workflow tutorial

Automate a product content workflows with various Firefly Services APIs.

||
| --- | --- |
| ![a picture of a burger with a black background](./images/original.jpeg) <p style="text-align:center">Original Image</p> | ![a picture of a burger with a fiery background and enhanced lighting](./images/output.jpeg) <p style="text-align:center">Output Image</p> |

## Overview

In this tutorial, let's imagine we are working for a creative marketing team at a gourmet food chain specializing in premium burgers. Our goal is to develop a visually stunning online menu and promotional materials that highlight the mouthwatering appeal of our products to customers worldwide. We will leverage Adobe's Firefly Services APIs to automate our content workflow:

* **Remove Backgrounds:** use the Photoshop Remove Background API to eliminate distracting backgrounds from our product images, allowing the items to stand out.
* **Enhance Images with Generate Object Composite:** Use the Firefly Generate Object Composite API to add creative and contextually relevant backgrounds that enhance the aesthetic appeal of each product.
* **Optimize Image Quality:** Utilize the Lightroom Auto Tone API to automatically adjust lighting and color balance, ensuring consistent and professional-quality images across our catalog.

## Prerequisites

### Credentials

If you don't already have a Firefly Services **Client ID** and **Client Secret** (which gives you access to Firefly APIs, Photoshop APIs, Lightroom APIs, and more), retrieve them from your [Adobe Developer Console project](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/#api-overview) before reading further. **Securely store these credentials and never expose them in client-side or public code.**

### Set up your environment

Before we begin this tutorial, run the following in a secure terminal:

<CodeBlock slots="heading, code" repeat="2" languages="Python, JavaScript" />

#### JavaScript

```bash
mkdir firefly-services-content-workflow-tutorial
cd firefly-services-content-workflow-tutorial
npm init --y
npm install axios qs
touch index.js
```

#### Python

```bash
mkdir firefly-services-content-workflow-tutorial
cd firefly-services-content-workflow-tutorial
python -m pip install requests
touch main.py
```

### Pre-signed URLs

To interact with Adobe's Firefly Services APIs, you'll need to generate pre-signed URLs. These URLs grant temporary access to your storage resources without exposing your credentials. For more details about pre-signed URLs, see [AWS Sharing objects with presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html), or [Azure Storage resources using shared access signatures](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview).

In this tutorial, you will need:

* A pre-signed URL with read access for the input image. Save this sample image to your cloud storage and generate a pre-signed URL: ![a picture of a burger with a black background](./images/original.jpeg)
* A pre-signed URL with read access for the style reference image below. Save this sample image to your cloud storage and generate a pre-signed URL: ![a styre reference of a burger with a fiery background](./images/styleref.jpeg)
* A pre-signed URL with a read/write token for the modified image.

Depending on your learning style, you may prefer to walk through this tutorial step-by-step or [jump immediately to the full source code](#full-example).

## Retrieve an access token

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
def retrieve_access_token():
    client_id = os.environ['FIREFLY_SERVICES_CLIENT_ID']
    client_secret = os.environ['FIREFLY_SERVICES_CLIENT_SECRET']

    token_url = 'https://ims-na1.adobelogin.com/ims/token/v3'
    payload = {
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret,
        'scope': 'openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis'
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
    client_id: process.env.FIREFLY_SERVICES_CLIENT_ID,
    client_secret: process.env.FIREFLY_SERVICES_CLIENT_SECRET,
    scope: 'openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis',
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

Export this access token in your secure terminal so that the next script can conveniently access it:

```bash
export FIREFLY_SERVICES_ACCESS_TOKEN=yourAccessTokenAsdf123
```

## Remove Background - Photoshop API

Next, call the [Photoshop Remove Background API](https://developer.adobe.com/firefly-services/docs/photoshop/api/?aio_internal):

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
      "href":"https://your-storage-bucket-name.blob.core.windows.net:443/container/input.jpeg?sv...&query=params...",
      "storage":"azure"
    },
    "output":{
      "href":"https://your-storage-bucket-name.blob.core.windows.net:443/container/output.jpeg?sv...&query=params...",
      "storage":"azure"
    }
  }'
```

#### Python

```python
# Replace with your actual pre-signed URLs and storage option
SIGNED_GET_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...'
SIGNED_POST_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...'
STORAGE = 'azure'  # e.g., 'external', 'azure'

def remove_background(access_token):
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': os.environ['FIREFLY_SERVICES_CLIENT_ID'],
        'Authorization': f'Bearer {access_token}'
    }

    data = {
        'input': {
            'href': SIGNED_GET_URL,
            'storage': STORAGE
        },
        'output': {
            'href': SIGNED_POST_URL,
            'storage': STORAGE
        }
    }

    response = requests.post('https://image.adobe.io/sensei/cutout', headers=headers, json=data)
    response.raise_for_status()
    job_response = response.json()
    print("Remove Background Job Submitted:", job_response)
    return job_response
```

#### JavaScript

```js
const SIGNED_GET_URL = "https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...";
const SIGNED_POST_URL = "https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...";
const STORAGE = "azure"; // e.g., 'external', 'azure'

async function removeBackground(accessToken) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-key': process.env.FIREFLY_SERVICES_CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  };

  const data = {
    input: { href: SIGNED_GET_URL, storage: STORAGE },
    output: { href: SIGNED_POST_URL, storage: STORAGE },
  };

  const config = {
    method: 'post',
    url: 'https://image.adobe.io/sensei/cutout',
    headers: headers,
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log('Remove Background Job Submitted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during removeBackground:', error.response.data);
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

Wait for a success status of this job.

## Generate Object Composite - Firefly API

Next, call the [Firefly Generate Object Composite API](../../firefly-api/guides/api/generate-object-composite/V3_Async/):

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

#### cURL

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/generate-object-composite-async' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $FIREFLY_SERVICES_CLIENT_ID" \
--header "Authorization: Bearer $FIREFLY_SERVICES_ACCESS_TOKEN" \
--data '{
    "prompt": "A delicious fiery background",
    "contentClass": "photo",
    "image": {
        "source": {
            "url": "https://your-storage-bucket-name.blob.core.windows.net:443/container/input.jpeg?sv...&query=params..."
        }
    },
    "placement": {
        "alignment": {
            "horizontal": "center",
            "vertical": "center"
        }
    },
    "style": {
        "imageReference": {
            "source": {
                "url": "https://your-storage-bucket-name.blob.core.windows.net:443/container/style_ref.jpeg?sv...&query=params..."
            }
        },
        "strength": 50
    }
}'
```

#### Python

```python
# Replace with your actual pre-signed URLs
SIGNED_IMAGE_GET_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/container/input.jpeg?sv...&query=params...'
SIGNED_STYLEREF_GET_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/container/style_ref.jpeg?sv...&query=params...'

def generate_object_composite(access_token):
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': os.environ['FIREFLY_SERVICES_CLIENT_ID'],
        'Authorization': f'Bearer {access_token}'
    }

    data = {
        'prompt': 'A delicious fiery background',  # Replace with your actual prompt
        'contentClass': 'photo',
        'image': {
            'source': {
                'url': SIGNED_IMAGE_GET_URL
            }
        },
        'placement': {
            'alignment': {
                'horizontal': 'center',
                'vertical': 'center'
            }
        },
        'style': {
            'imageReference': {
                'source': {
                    'url': SIGNED_STYLEREF_GET_URL
                }
            },
            'strength': 50
        }
    }

    response = requests.post(
        'https://firefly-api.adobe.io/v3/images/generate-object-composite-async',
        headers=headers,
        json=data
    )
    response.raise_for_status()
    job_response = response.json()
    print("Generate Object Composite Job Submitted:", job_response)
    return job_response
```

#### JavaScript

```js
const SIGNED_IMAGE_GET_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/container/input.jpeg?sv...&query=params...'; // Replace with your image URL
const SIGNED_STYLEREF_GET_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/container/input.jpeg?sv...&query=params...';  // Replace with your mask URL

async function generateObjectComposite(accessToken) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key": process.env.FIREFLY_SERVICES_CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  };

  const data = {
    prompt: "A delicious firey background", // Replace with your actual prompt
    contentClass: "photo",
    image: {
      source: {
        url: SIGNED_IMAGE_GET_URL,
      },
    },
    placement: {
        alignment: {
            horizontal: "center",
            vertical: "center"
        }
    },
    style: {
        imageReference: {
            source: {
                url: SIGNED_STYLEREF_GET_URL
            }
        },
        strength: 50
    }
  };

  const config = {
    method: "post",
    url: "https://firefly-api.adobe.io/v3/images/generate-object-composite-async",
    headers: headers,
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error during generateObjectComposite:", error);
  }
}
```

The response will look like this:

```json
{
  "jobId": "urn:ff:jobs:eso851211:86ffe2ea-d765-4bd3-b2fd-1111",
  "statusUrl": "https://firefly-api.adobe.io/v3/status/urn:ff:jobs:eso851211:86ffe2ea-d765-4bd3-b2fd-1111",
  "cancelUrl": "https://firefly-api.adobe.io/v3/cancel/urn:ff:jobs:eso851211:86ffe2ea-d765-4bd3-b2fd-1111"
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
      "href":"https://your-storage-bucket-name.blob.core.windows.net:443/container/input.jpeg?sv...&query=params...",
      "storage":"azure"
    },
    "outputs":[{
      "href":"https://your-storage-bucket-name.blob.core.windows.net:443/container/output.jpeg?sv...&query=params...",
      "storage":"azure",
      "type":"image/jpeg"
    }]
  }'
```

#### Python

```python
# Replace with your actual pre-signed URLs and storage option
SIGNED_GET_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/container/input.jpeg?sv...&query=params...'
SIGNED_POST_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/container/output.jpeg?sv...&query=params...'
storage = 'azure'  # e.g., 'external', 'azure'

def auto_tone(access_token):
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': os.environ['FIREFLY_SERVICES_CLIENT_ID'],
        'Authorization': f'Bearer {access_token}'
    }

    data = {
        'inputs': {
            'href': SIGNED_GET_URL,
            'storage': STORAGE
        },
        'outputs': [{
            'href': SIGNED_POST_URL,
            'storage': STORAGE,
            'type': 'image/jpeg'
        }]
    }

    response = requests.post('https://image.adobe.io/lrService/autoTone', headers=headers, json=data)
    response.raise_for_status()
    job_response = response.json()
    print("Auto Tone Job Submitted:", job_response)
    return job_response
```

#### JavaScript

```js
 const SIGNED_GET_URL = "https://your-storage-bucket-name.blob.core.windows.net:443/container/input.jpeg?sv...&query=params...";
  const SIGNED_POST_URL = "https://your-storage-bucket-name.blob.core.windows.net:443/container/output.jpeg?sv...&query=params...";
  const STORAGE = "azure"; // e.g., 'external', 'azure'

async function autoTone(accessToken) {
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

## View final image

Access the final at the `outputs[0]._links.self.href` URL (the `SIGNED_POST_URL` provided earlier). 🎉

## Full example

You can review the [prerequisites](#prerequisites) section to understand how to set up your environment prior to running this code. Note that this is an example only and is not production-ready and requires additional error handling, logging, security measures, and more before you can run it at scale in a live application.

<CodeBlock slots="heading, code" repeat="2" languages="Python, JavaScript" />

#### Python

```python
import os
import time
import requests

# Replace with your actual pre-signed URLs and storage option
SIGNED_PRODUCT_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...'  # Input product URL for Photoshop 
SIGNED_GET_POST_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...'  # Output product URL for Photoshop and Lightroom
SIGNED_STYLE_REF_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...'  # Style reference image URL for Firefly
STORAGE = 'azure'  # e.g., 'external', 'azure'

def main():
    access_token = retrieve_access_token()

    # Step 1: Remove Background
    remove_bg_response = remove_background(access_token)
    remove_bg_job_id = extract_job_id(remove_bg_response)
    check_photoshop_job_status(remove_bg_job_id, access_token)

    # Step 2: Generate Object Composite
    generate_object_composite_response = generate_object_composite(access_token)
    generate_object_composite_job_id = generate_object_composite_response['jobId']
    generate_object_composite_output = check_firefly_job_status(generate_object_composite_job_id, access_token)

    # Step 3: Auto Tone
    auto_tone_response = auto_tone(access_token, generate_object_composite_output)
    auto_tone_job_id = extract_job_id(auto_tone_response)
    check_lightroom_job_status(auto_tone_job_id, access_token)

def retrieve_access_token():
    client_id = os.environ['FIREFLY_SERVICES_CLIENT_ID']
    client_secret = os.environ['FIREFLY_SERVICES_CLIENT_SECRET']

    token_url = 'https://ims-na1.adobelogin.com/ims/token/v3'
    payload = {
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret,
        'scope': 'openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis'
    }

    response = requests.post(token_url, data=payload)
    response.raise_for_status()
    token_data = response.json()
    print("Access Token Retrieved")
    return token_data['access_token']

def remove_background(access_token):
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': os.environ['FIREFLY_SERVICES_CLIENT_ID'],
        'Authorization': f'Bearer {access_token}'
    }

    data = {
        'input': {
            'href': SIGNED_PRODUCT_URL,
            'storage': STORAGE
        },
        'output': {
            'href': SIGNED_GET_POST_URL,
            'storage': STORAGE
        }
    }

    response = requests.post('https://image.adobe.io/sensei/cutout', headers=headers, json=data)
    response.raise_for_status()
    job_response = response.json()
    print("Remove Background Job Submitted:", job_response)
    return job_response

def check_photoshop_job_status(job_id, access_token):
    headers = {
        'x-api-key': os.environ['FIREFLY_SERVICES_CLIENT_ID'],
        'Authorization': f'Bearer {access_token}'
    }

    url = f'https://image.adobe.io/sensei/status/{job_id}'

    status = 'submitted'
    while status not in ['succeeded', 'failed']:
        time.sleep(5)  # Wait for 5 seconds
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        status_response = response.json()
        status = status_response.get('status')
        print(f'Photoshop Job Status: {status}')

    if status == 'succeeded':
        print('Background removal completed successfully!')
    else:
        print('Background removal failed.')

def generate_object_composite(access_token):
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': os.environ['FIREFLY_SERVICES_CLIENT_ID'],
        'Authorization': f'Bearer {access_token}'
    }

    data = {
        'prompt': 'A delicious fiery background',  # Replace with your actual prompt
        'contentClass': 'photo',
        'image': {
            'source': {
                'url': SIGNED_GET_POST_URL
            }
        },
        'placement': {
            'alignment': {
                'horizontal': 'center',
                'vertical': 'center'
            }
        },
        'style': {
            'imageReference': {
                'source': {
                    'url': SIGNED_STYLE_REF_URL
                }
            },
            'strength': 50
        }
    }

    response = requests.post(
        'https://firefly-api.adobe.io/v3/images/generate-object-composite-async',
        headers=headers,
        json=data
    )
    response.raise_for_status()
    job_response = response.json()
    print("Generate Object Composite Job Submitted:", job_response)
    return job_response

def check_firefly_job_status(job_id, access_token):
    client_id = os.environ['FIREFLY_SERVICES_CLIENT_ID']

    headers = {
        'x-api-key': client_id,
        'Authorization': f'Bearer {access_token}'
    }

    url = f'https://firefly-api.adobe.io/v3/status/{job_id}'

    status = 'pending'
    while status not in ['succeeded', 'failed', 'cancelled']:
        time.sleep(5)  # Wait for 5 seconds
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        status_response = response.json()
        status = status_response.get('status')
        print(f'Firefly Job Status: {status}')

    if status == 'succeeded':
        print('Object composite generation completed successfully!')
        image_url = status_response['result']['outputs'][0]['image']['url']
        print(f'You can access the image at: {image_url}')
        return image_url
    else:
        print('Object composite generation failed.')

def auto_tone(access_token, signed_input_url):
    client_id = os.environ['FIREFLY_SERVICES_CLIENT_ID']

    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': client_id,
        'Authorization': f'Bearer {access_token}'
    }

    data = {
        'inputs': {
            'href': signed_input_url,
            'storage': 'external'
        },
        'outputs': [{
            'href': SIGNED_GET_POST_URL,
            'storage': STORAGE,
            'type': 'image/jpeg'
        }]
    }

    response = requests.post('https://image.adobe.io/lrService/autoTone', headers=headers, json=data)
    response.raise_for_status()
    job_response = response.json()
    print("Auto Tone Job Submitted:", job_response)
    return job_response

def check_lightroom_job_status(job_id, access_token):
    client_id = os.environ['FIREFLY_SERVICES_CLIENT_ID']

    headers = {
        'x-api-key': client_id,
        'Authorization': f'Bearer {access_token}'
    }

    url = f'https://image.adobe.io/lrService/status/{job_id}'

    status = 'pending'
    while status not in ['succeeded', 'failed']:
        time.sleep(5)  # Wait for 5 seconds
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        status_response = response.json()
        outputs = status_response.get('outputs', [])
        if outputs:
            status = outputs[0].get('status')
        print(f'Lightroom Job Status: {status}')

    if status == 'succeeded':
        print('Auto tone completed successfully!')
        print('You can access the image at your SIGNED_POST_URL.')
    else:
        print('Auto tone failed.')

def extract_job_id(response):
    href = response['_links']['self']['href']
    return href.split('/')[-1]

if __name__ == '__main__':
    main()
```

#### JavaScript

```js
const axios = require('axios');
const qs = require('qs');

// Replace with your actual pre-signed URLs and storage option
const SIGNED_PRODUCT_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...'; // Input product URL for Photoshop
const SIGNED_GET_POST_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...'; // Output product URL for Photoshop and Lightroom
const SIGNED_STYLE_REF_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...'; // Style reference image URL for Firefly
const STORAGE = 'azure'; // e.g., 'external', 'azure'

(async () => {
  const accessToken = await retrieveAccessToken();

  // Step 1: Remove Background
  const removeBgResponse = await removeBackground(accessToken);
  const removeBgJobId = extractJobId(removeBgResponse);
  await checkPhotoshopJobStatus(removeBgJobId, accessToken);

  // Step 2: Generate Object Composite
  const generateObjectCompositeResponse = await generateObjectComposite(accessToken);
  const generateObjectCompositeJobId = generateObjectCompositeResponse.jobId;
  const compositeOutputUrl = await checkFireflyJobStatus(generateObjectCompositeJobId, accessToken);

  // Step 3: Auto Tone
  const autoToneResponse = await autoTone(accessToken, compositeOutputUrl);
  const autoToneJobId = extractJobId(autoToneResponse);
  await checkLightroomJobStatus(autoToneJobId, accessToken);
})();

async function retrieveAccessToken() {
  const clientId = process.env.FIREFLY_SERVICES_CLIENT_ID;
  const clientSecret = process.env.FIREFLY_SERVICES_CLIENT_SECRET;

  const data = qs.stringify({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis',
  });

  const config = {
    method: 'post',
    url: 'https://ims-na1.adobelogin.com/ims/token/v3',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  };

  try {
    const response = await axios(config);
    console.log('Access Token Retrieved');
    return response.data.access_token;
  } catch (error) {
    console.error('Error retrieving access token:', error.response?.data || error.message);
  }
}

async function removeBackground(accessToken) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-key': process.env.FIREFLY_SERVICES_CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  };

  const data = {
    input: {
      href: SIGNED_PRODUCT_URL,
      storage: STORAGE,
    },
    output: {
      href: SIGNED_GET_POST_URL,
      storage: STORAGE,
    },
  };

  const config = {
    method: 'post',
    url: 'https://image.adobe.io/sensei/cutout',
    headers: headers,
    data: data,
  };

  try {
    const response = await axios(config);
    console.log('Remove Background Job Submitted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during removeBackground:', error.response?.data || error.message);
  }
}

async function checkPhotoshopJobStatus(jobId, accessToken) {
  const headers = {
    'x-api-key': process.env.FIREFLY_SERVICES_CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `https://image.adobe.io/sensei/status/${jobId}`;

  let status = 'submitted';
  while (status !== 'succeeded' && status !== 'failed') {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
    const response = await axios.get(url, { headers: headers });
    status = response.data.status;
    console.log(`Photoshop Job Status: ${status}`);
  }

  if (status === 'succeeded') {
    console.log('Background removal completed successfully!');
  } else {
    console.error('Background removal failed.');
  }
}

async function generateObjectComposite(accessToken) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-key': process.env.FIREFLY_SERVICES_CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  };

  const data = {
    prompt: 'A delicious fiery background', // Replace with your actual prompt
    contentClass: 'photo',
    image: {
      source: {
        url: SIGNED_GET_POST_URL,
      },
    },
    placement: {
      alignment: {
        horizontal: 'center',
        vertical: 'center',
      },
    },
    style: {
      imageReference: {
        source: {
          url: SIGNED_STYLE_REF_URL,
        },
      },
      strength: 50,
    },
  };

  const config = {
    method: 'post',
    url: 'https://firefly-api.adobe.io/v3/images/generate-object-composite-async',
    headers: headers,
    data: data,
  };

  try {
    const response = await axios(config);
    console.log('Generate Object Composite Job Submitted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during generateObjectComposite:', error.response?.data || error.message);
  }
}

async function checkFireflyJobStatus(jobId, accessToken) {
  const headers = {
    'x-api-key': process.env.FIREFLY_SERVICES_CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `https://firefly-api.adobe.io/v3/status/${jobId}`;

  let status = 'pending';
  let imageUrl = null;
  while (status !== 'succeeded' && status !== 'failed' && status !== 'cancelled') {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
    const response = await axios.get(url, { headers: headers });
    status = response.data.status;
    console.log(`Firefly Job Status: ${status}`);
  }

  if (status === 'succeeded') {
    console.log('Object composite generation completed successfully!');
    imageUrl = response.data.result.outputs[0].image.url;
    console.log(`You can access the image at: ${imageUrl}`);
    return imageUrl;
  } else {
    console.error('Object composite generation failed.');
  }
}

async function autoTone(accessToken, signedInputUrl) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-key': process.env.FIREFLY_SERVICES_CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  };

  const data = {
    inputs: {
      href: signedInputUrl,
      storage: 'external',
    },
    outputs: [
      {
        href: SIGNED_GET_POST_URL,
        storage: STORAGE,
        type: 'image/jpeg',
      },
    ],
  };

  const config = {
    method: 'post',
    url: 'https://image.adobe.io/lrService/autoTone',
    headers: headers,
    data: data,
  };

  try {
    const response = await axios(config);
    console.log('Auto Tone Job Submitted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during autoTone:', error.response?.data || error.message);
  }
}

async function checkLightroomJobStatus(jobId, accessToken) {
  const headers = {
    'x-api-key': process.env.FIREFLY_SERVICES_CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `https://image.adobe.io/lrService/status/${jobId}`;

  let status = 'pending';
  while (status !== 'succeeded' && status !== 'failed') {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
    const response = await axios.get(url, { headers: headers });
    const outputs = response.data.outputs || [];
    if (outputs.length > 0) {
      status = outputs[0].status;
    }
    console.log(`Lightroom Job Status: ${status}`);
  }

  if (status === 'succeeded') {
    console.log('Auto tone completed successfully!');
    console.log('You can access the image at your SIGNED_GET_POST_URL.');
  } else {
    console.error('Auto tone failed.');
  }
}

function extractJobId(response) {
  const href = response._links.self.href;
  return href.split('/').pop();
}
```

## Deepen your understanding

Dive deeper into Firefly Services by exploring our [Firefly API tutorials](../../firefly-api/guides/how-tos/firefly-generate-image-api-tutorial.md).
