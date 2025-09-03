---
title: Quickstart
description: Quickstart guide for Lightroom API
contributors:
  - 'https://github.com/bishoysefin'
keywords:
  - Adobe Lightroom API
  - photo editing API
  - image enhancement
  - preset application
  - photo processing
  - image optimization
  - REST API
  - batch editing
  - cloud processing
  - photo automation
  - bulk editing
  - preset management
og:
  title: Quickstart
  description: Quickstart guide for Lightroom API
twitter:
  card: summary
  title: Quickstart
  description: Quickstart guide for Lightroom API
---

# Quickstart Guide

Modify your first Image with Lightroom APIs

||
| --- | --- |
| ![a crooked picture of a watch tower](./images/autostraighten-input.jpg) <p style="text-align:center">Image</p> | ![a straightened picture of a watch tower](./images/autostraighten-output.png) <p style="text-align:center">Straightened Image</p> |

## Prerequisites

### Credentials

If you don't already have a Lightroom or a Firefly Services **Client ID** and **Client Secret**, retrieve them from your [Adobe Developer Console project](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/#api-overview) before reading further. **Securely store these credentials and never expose them in client-side or public code.**

### Set Up Your Environment

Before we begin this tutorial, run the following in a secure terminal:

<CodeBlock slots="heading, code" repeat="2" languages="Python, JavaScript" />

#### JavaScript

```bash
mkdir lightroom-api-auto-straighten-tutorial
cd lightroom-api-auto-straighten-tutorial
npm init --y
npm install axios qs
touch index.js
```

#### Python

```bash
mkdir lightroom-api-auto-straighten-tutorial
cd lightroom-api-auto-straighten-tutorial
python -m pip install requests
touch main.py
```

### Pre-signed URLs

To interact with Adobe's Lightroom APIs, you'll need to generate pre-signed URLs. These URLs grant temporary access to your storage resources without exposing your credentials. For more details about pre-signed URLs, see [AWS Sharing objects with presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html), or [Azure Storage resources using shared access signatures](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview).

In this tutorial, you will need:

* A pre-signed URL with a read token for the input image. Save this sample image to your cloud storage and generate a pre-signed URL: ![a crooked picture of a watch tower](./images/autostraighten-input.jpg)
* A pre-signed URL with a read/write token for the modified image.

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

## Auto Straighten

Next, call the [Lightroom Auto Straighten API](../api/lightroom_autoStraighten.md):

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

#### cURL

```bash
curl --location 'https://image.adobe.io/lrService/autoStraighten' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $LIGHTROOM_CLIENT_ID" \
--header "Authorization: Bearer $LIGHTROOM_ACCESS_TOKEN" \
--data '{
    "inputs":{
      "href":"https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...",
      "storage":"azure"
    },
    "outputs":[{
      "href":"https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...",
      "storage":"azure",
      "type":"image/jpeg"
    }]
  }'
```

#### Python

```python
# Replace with your actual pre-signed URLs and storage option
SIGNED_GET_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...'
SIGNED_POST_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...'
STORAGE = 'azure'  # e.g., 'external', 'azure'

def auto_straighten(access_token):
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': os.environ['CLIENT_ID'],
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

    response = requests.post('https://image.adobe.io/lrService/autoStraighten', headers=headers, json=data)
    response.raise_for_status()
    job_response = response.json()
    print("Auto Straighten Job Submitted:", job_response)
    return job_response
```

#### JavaScript

```js
const SIGNED_GET_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...';
const SIGNED_POST_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...';
const STORAGE = 'azure';  //e.g., 'external', 'azure'

async function autoStraighten(accessToken) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-key': process.env.CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  };

  const data = {
    inputs: { href: SIGNED_GET_URL, storage: STORAGE },
    outputs: [{ href: SIGNED_POST_URL, storage: STORAGE, type: 'image/jpeg' }],
  };

  const config = {
    method: 'post',
    url: 'https://image.adobe.io/lrService/autoStraighten',
    headers: headers,
    data: data,
  };

  const response = await axios.request(config);
  console.log('Auto Straighten Job Submitted:', response.data);
  return response.data;
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

## Get Status

Next up, we will use the [Get Status](../api/lightroom_getStatus.md) endpoint to monitor the job status until it completes.

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

#### cURL

```bash
curl --location 'https://image.adobe.io/lrService/status/<:jobId>' \
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

    status_url = f'https://image.adobe.io/lrService/status/{job_id}'
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

  const url = `https://image.adobe.io/lrService/status/${jobId}`;

  try {
    const response = await axios.get(url, { headers: headers });
    return response.data;
  } catch (error) {
    console.error("Error checking job status:", error);
  }
}
```

A successful response looks like:

```json
{
    "jobId": "38ae54a3-6961-43fa-914f-111111111",
    "created": "2024-11-28T23:07:01.264Z",
    "modified": "2024-11-28T23:07:03.036Z",
    "_links": {
        "self": {
            "href": "https://image.adobe.io/lrService/status/38ae54a3-6961-43fa-914f-111111111"
        }
    },
    "outputs": [
        {
            "input": "https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...",
            "status": "succeeded",
            "_links": {
                "self": {
                    "href": "https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...",
                    "storage": "azure"
                }
            }
        }
    ]
}
```

## View Modified Image

Access the straightened at the `outputs[0]._links.self.href` URL (the `SIGNED_POST_URL` provided earlier). 🎉

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
SIGNED_POST_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...'  # Output image URL
STORAGE = 'azure'  # e.g., 'external', 'azure'

def main():
    access_token = retrieve_access_token()
    job_response = auto_straighten(access_token)
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
        'scope': 'openid,AdobeID,read_organizations'
    }

    response = requests.post(token_url, data=payload)
    response.raise_for_status()
    token_data = response.json()
    print("Access Token Retrieved")
    return token_data['access_token']

def auto_straighten(access_token):
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': os.environ['CLIENT_ID'],
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

    response = requests.post('https://image.adobe.io/lrService/autoStraighten', headers=headers, json=data)
    response.raise_for_status()
    job_response = response.json()
    print("Auto Straighten Job Submitted:", job_response)
    return job_response

def check_job_status(job_id, access_token):
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': os.environ['CLIENT_ID'],
        'Authorization': f'Bearer {access_token}'
    }

    url = f'https://image.adobe.io/lrService/status/{job_id}'

    status = 'submitted'
    while status not in ['succeeded', 'failed']:
        time.sleep(5)  # Wait for 5 seconds
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        status_response = response.json()
        status = status_response.get('outputs', [{}])[0].get('status')
        print(f'Job Status: {status}')

    if status == 'succeeded':
        print('Auto straighten completed successfully!')
        print('You can access the modified image at your SIGNED_POST_URL.')
    else:
        print('Auto straighten failed.')

if __name__ == '__main__':
    main()
```

#### JavaScript

```js
const axios = require('axios');
const qs = require('qs');

const SIGNED_GET_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...'; // Input image URL
const SIGNED_POST_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...'; // Output image URL
const STORAGE = 'azure'; // e.g., 'external', 'azure'

(async () => {
  const accessToken = await retrieveAccessToken();
  const jobResponse = await autoStraighten(accessToken);
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

  const response = await axios.request(config);
  console.log('Access Token Retrieved');
  return response.data.access_token;
}

async function autoStraighten(accessToken) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-key': process.env.CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  };

  const data = {
    inputs: { href: SIGNED_GET_URL, storage: STORAGE },
    outputs: [{ href: SIGNED_POST_URL, storage: STORAGE, type: 'image/jpeg' }],
  };

  const config = {
    method: 'post',
    url: 'https://image.adobe.io/lrService/autoStraighten',
    headers: headers,
    data: data,
  };

  const response = await axios.request(config);
  console.log('Auto Straighten Job Submitted:', response.data);
  return response.data;
}

async function checkJobStatus(jobId, accessToken) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-key': process.env.CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `https://image.adobe.io/lrService/status/${jobId}`;

  let status = 'submitted';
  while (status !== 'succeeded' && status !== 'failed') {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
    const response = await axios.get(url, { headers: headers });
    status = response.data.outputs[0].status;
    console.log(`Job Status: ${status}`);
  }

  if (status === 'succeeded') {
    console.log('Auto straighten completed successfully!');
    console.log('You can access the modified image at your SIGNED_POST_URL.');
  } else {
    console.error('Auto straighten failed.');
  }
}
```

## Deepen Your Understanding

Explore more Lightroom API options in our [Lightroom Tutorials](../code-sample) 🚀
