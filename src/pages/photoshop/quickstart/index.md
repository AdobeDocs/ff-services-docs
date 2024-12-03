---
title: Quickstart
description: Quickstart guide for Photoshop API
contributors:
  - https://github.com/bishoysefin
---

# Quickstart Guide

Create your first Mask with Photoshop APIs

||
| --- | --- |
| ![a picture of a person golfing with a green scenic background](./images/masking-original.jpeg) <p style="text-align:center">Image</p> | ![a mask of a person golfing with a black background](./images/masking-output.png) <p style="text-align:center">Image Mask</p> |

## Prerequisites

### Credentials

If you don't already have a Photoshop or Firefly Services **Client ID** and **Client Secret**, retrieve them from your [Adobe Developer Console project](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/#api-overview) before reading further. **Securely store these credentials and never expose them in client-side or public code.**

### Set Up Your Environment

Before we begin this tutorial, run the following in a secure terminal:

<CodeBlock slots="heading, code" repeat="2" languages="Python, JavaScript" />

#### JavaScript

```bash
mkdir photoshop-api-create-mask-tutorial
cd photoshop-api-create-mask-tutorial
npm init --y
npm install axios qs
touch index.js
```

#### Python

```bash
mkdir photoshop-api-create-mask-tutorial
cd photoshop-api-create-mask-tutorial
python -m pip install requests
touch main.py
```

### Pre-signed URLs

To interact with Adobe's Photoshop APIs, you'll need to generate pre-signed URLs. These URLs grant temporary access to your storage resources without exposing your credentials. For more details about pre-signed URLs, see [AWS Sharing objects with presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html), or [Azure Storage resources using shared access signatures](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview).

In this tutorial, you will need: 

* A pre-signed URL with a read token for the input image. Save this sample image to your cloud storage, generating a pre-signed URL: ![a picture of a person golfing with a green scenic background](./images/masking-original.jpeg)
* A pre-signed URL with a read/write token for the output mask.


Depending on your learning style, you may prefer to walk through this tutorial step-by-step or [jump immediately to the full source code](#full-example).

## Retrieve an Access Token

Open a secure terminal and `export` your **Client ID** and **Client Secret** as environment variables so that your later commands can access them:

```bash
export CLIENT_ID=yourClientIdAsdf123
export CLIENT_SECRET=yourClientSecretAsdf123
```

Generate an access token:

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

#### cURL

```bash
curl --location 'https://ims-na1.adobelogin.com/ims/token/v3' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode "client_id=$CLIENT_ID" \
--data-urlencode "client_secret=$CLIENT_SECRET" \
--data-urlencode 'scope=openid,AdobeID,read_organizations'
```

#### Python

```python
def retrieve_access_token():
    client_id = os.environ['CLIENT_ID']
    client_secret = os.environ['CLIENT_SECRET']

    token_url = 'https://ims-na1.adobelogin.com/ims/token/v3'
    payload = {
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret,
        'scope': 'openid,AdobeID,read_organizations'
    }

    response = requests.post(token_url, data=payload)
    response.raise_for_status()
    token_data = response.json()
    return token_data
```

#### JavaScript

```js
async function retrieveAccessToken() {
  const data = qs.stringify({
    grant_type: 'client_credentials',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    scope: 'openid,AdobeID,read_organizations',
  });

  const config = {
    method: 'post',
    url: 'https://ims-na1.adobelogin.com/ims/token/v3',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: data,
  };

  const response = await axios.request(config);
  return response.data;
}
```

The response will look like this:

```json
{"access_token":"yourAccessTokenAsdf123","token_type":"bearer","expires_in":86399}
```

Export this access token in your secure terminal so that the next script can conveniently access it:

```bash
export ACCESS_TOKEN=yourAccessTokenAsdf123
```

## Create Mask

Next, call the [Photoshop Create Mask API](../api/photoshop_createMask.md):

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

#### cURL

```bash
curl --location 'https://image.adobe.io/sensei/mask' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $CLIENT_ID" \
--header "Authorization: Bearer $ACCESS_TOKEN" \
--data '{
    "input":{
      "href":"https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...",
      "storage":"azure"
    },
    "output":{
      "href":"https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...",
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

def create_mask(access_token):
  headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': os.environ['CLIENT_ID']
        'Authorization': f'Bearer {access_token}',
    }

    data = {
        'input': {'href': SIGNED_GET_URL, 'storage': STORAGE},
        'output': {'href': SIGNED_POST_URL, 'storage': STORAGE},
    }

    response = requests.post('https://image.adobe.io/sensei/mask', headers=headers, json=data)
    response.raise_for_status()
    return response.json()
```

#### JavaScript

```js
const SIGNED_GET_URL = "https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...";
const SIGNED_POST_URL = "https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...";
const STORAGE = "azure"; // e.g., 'external', 'azure'

async function createMask(accessToken) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-key': process.env.CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  };

  const data = {
    input: { href: SIGNED_GET_URL, storage: STORAGE },
    output: { href: SIGNED_POST_URL, storage: STORAGE },
  };

  const config = {
    method: 'post',
    url: 'https://image.adobe.io/sensei/mask',
    headers: headers,
    data: data,
  };

  const response = await axios.request(config);
  return response.data;
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

## Get Status - Mask

Next up, we will use the [Get Status - Mask](../api/photoshop_status_mask.md) endpoint to monitor the job status until it completes.

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

#### cURL

```bash
curl --location 'https://image.adobe.io/sensei/status/<:jobId>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $CLIENT_ID" \
--header "Authorization: Bearer $ACCESS_TOKEN" 
```

#### Python

```python
def check_job_status(job_id, access_token):
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': os.environ['CLIENT_ID'],
        'Authorization': f'Bearer {access_token}',
    }

    status_url = f'https://image.adobe.io/sensei/status/{job_id}'
    response = requests.get(status_url, headers=headers)
    response.raise_for_status()
    return response.json()
```

#### JavaScript

```js
async function checkJobStatus(jobId, accessToken) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-key': process.env.CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `https://image.adobe.io/sensei/status/${jobId}`;

  const response = await axios.get(url, { headers: headers });
  return response.data;
}
```

A successful response looks like:

```json
{
  "jobId": "f54e0fcb-260b-47c3-b520-111111",
  "created": "2024-11-28T23:07:01.264Z",
  "modified": "2024-11-28T23:07:03.036Z",
  "status": "succeeded",
  "metadata": {
    "service": {}
  },
  "output": {
    "href": "https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...",
    "storage": "azure",
    "mask": {
      "format": "soft"
    },
    "color": {
      "space": "rgb"
    }
  },
  "options": {
    "optimize": "performance"
  },
  "errors": [
    {}
  ],
  "_links": {
    "self": {}
  }
}
```

## View Created Mask

Access the mask at the `output.href` URL (the `SIGNED_POST_URL` provided earlier). 🎉

## Full Example

You can review the [prerequisites](#prerequisites) section to understand how to set up your environment prior to running this code. Note that this is an example only and is not production-ready and requires additional error handling, logging, security measures, and more before you can run it at scale in a live application.

<CodeBlock slots="heading, code" repeat="2" languages="Python, JavaScript" />

#### Python

```python
import os
import time
import requests

# Replace with your actual pre-signed URLs and storage option
SIGNED_GET_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...'  # Input image URL
SIGNED_POST_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...'  # Output mask URL
STORAGE = 'azure'  # e.g., 'external', 'azure'


def main():
    access_token = retrieve_access_token()
    job_response = create_mask(access_token)
    job_id = job_response['_links']['self']['href'].split('/')[-1]
    check_job_status(job_id, access_token)

def retrieve_access_token():
    client_id = os.environ['CLIENT_ID']
    client_secret = os.environ['CLIENT_SECRET']

    token_url = 'https://ims-na1.adobelogin.com/ims/token/v3'
    payload = {
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret,
        'scope': 'openid,AdobeID,read_organizations',
    }

    try:
        response = requests.post(token_url, data=payload)
        response.raise_for_status()
        access_token = response.json()['access_token']
        print('Access Token Retrieved')
        return access_token
    except requests.exceptions.RequestException as error:
        print('Error retrieving access token:', error.response.text)
        exit(1)

def create_mask(access_token):
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': os.environ['CLIENT_ID'],
        'Authorization': f'Bearer {access_token}',
    }

    data = {
        'input': {'href': SIGNED_GET_URL, 'storage': STORAGE},
        'output': {'href': SIGNED_POST_URL, 'storage': STORAGE},
    }

    try:
        response = requests.post(
            'https://image.adobe.io/sensei/mask', headers=headers, json=data
        )
        response.raise_for_status()
        print('Mask Creation Job Submitted:', response.json())
        return response.json()
    except requests.exceptions.RequestException as error:
        print('Error during create_mask:', error.response.text)
        exit(1)

def check_job_status(job_id, access_token):
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': os.environ['CLIENT_ID'],
        'Authorization': f'Bearer {access_token}',
    }

    url = f'https://image.adobe.io/sensei/status/{job_id}'

    try:
        status = 'submitted'
        while status not in ['succeeded', 'failed']:
            time.sleep(5)  # Wait for 5 seconds
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            status_response = response.json()
            status = status_response.get('status')
            print(f'Job Status: {status}')
        if status == 'succeeded':
            print('Mask creation completed successfully!')
            print('You can access the mask at your SIGNED_POST_URL.')
        else:
            print('Mask creation failed.')
    except requests.exceptions.RequestException as error:
        print('Error checking job status:', error.response.text)
        exit(1)

if __name__ == '__main__':
    main()
```

#### JavaScript

```js
const axios = require('axios');
const qs = require('qs');

// Replace with your actual pre-signed URLs and storage option
const SIGNED_GET_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...'; // Input image URL
const SIGNED_POST_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...'; // Output mask URL
const STORAGE = 'azure'; // e.g., 'external', 'azure'

(async () => {
  const accessToken = await retrieveAccessToken();
  const jobResponse = await createMask(accessToken);
  const jobId = jobResponse._links.self.href.split('/').pop();
  await checkJobStatus(jobId, accessToken);
})();

async function retrieveAccessToken() {
  const data = qs.stringify({
    grant_type: 'client_credentials',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    scope: 'openid,AdobeID,read_organizations',
  });

  const config = {
    method: 'post',
    url: 'https://ims-na1.adobelogin.com/ims/token/v3',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: data,
  };

  try {
    const response = await axios.request(config);
    const { access_token } = response.data;
    console.log('Access Token Retrieved');
    return access_token;
  } catch (error) {
    console.error('Error retrieving access token:', error.response.data);
  }
}

async function createMask(accessToken) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-key': process.env.CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  };

  const data = {
    input: { href: SIGNED_GET_URL, storage: STORAGE },
    output: { href: SIGNED_POST_URL, storage: STORAGE },
  };

  const config = {
    method: 'post',
    url: 'https://image.adobe.io/sensei/mask',
    headers: headers,
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log('Mask Creation Job Submitted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during createMask:', error.response.data);
  }
}

async function checkJobStatus(jobId, accessToken) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-key': process.env.CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `https://image.adobe.io/sensei/status/${jobId}`;

  try {
    let status = 'submitted';
    while (status !== 'succeeded' && status !== 'failed') {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
      const response = await axios.get(url, { headers: headers });
      status = response.data.status;
      console.log(`Job Status: ${status}`);
    }

    if (status === 'succeeded') {
      console.log('Mask creation completed successfully!');
      console.log('You can access the mask at your SIGNED_POST_URL.');
    } else {
      console.error('Mask creation failed.');
    }
  } catch (error) {
    console.error('Error checking job status:', error.response.data);
  }
}
```

## Deepen Your Understanding

Explore more Photoshop API options in our [Photoshop Tutorials](../how-tos/photoshop-actions) 🚀
