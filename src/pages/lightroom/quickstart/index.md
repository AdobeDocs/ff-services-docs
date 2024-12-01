---
title: Quickstart
description: Quickstart guide for Lightroom API
contributors:
  - https://github.com/bishoysefin
---

# Quickstart Guide

Modify your first Image with Lightroom APIs

||
| --- | --- |
| ![a crooked picture of a watch tower](./images/autostraighten-input.jpg) <p style="text-align:center">Image</p> | ![a straightened picture of a watch tower](./images/autostraighten-output.png) <p style="text-align:center">Straightened Image</p> |

## Prerequisites

If you don't already have a Lightroom **Client ID** and **Client Secret**, retrieve them from your [Adobe Developer Console project](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/#api-overview) before reading further. **Securely store these credentials and never expose them in client-side or public code.**

Pre-signed URLs:

* A pre-signed URL with a read token for the input image.
* A pre-signed URL with a read/write token for the modified image.

For more details, see [AWS Sharing objects with presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html), or [Azure Storage resources using shared access signatures](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview).

## Retrieve an Access Token

Open a secure terminal and `export` your **Client ID** and **Client Secret** as environment variables so that your later commands can access them:

```bash
export LIGHTROOM_CLIENT_ID=yourClientIdAsdf123
export LIGHTROOM_CLIENT_SECRET=yourClientSecretAsdf123
```

Generate an access token:

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

#### cURL

```bash
curl --location 'https://ims-na1.adobelogin.com/ims/token/v3' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode "client_id=$LIGHTROOM_CLIENT_ID" \
--data-urlencode "client_secret=$LIGHTROOM_CLIENT_SECRET" \
--data-urlencode 'scope=openid,AdobeID,read_organizations'
```

#### Python

```python
import os
import requests

# Retrieve environment variables
client_id = os.environ['LIGHTROOM_CLIENT_ID']
client_secret = os.environ['LIGHTROOM_CLIENT_ID']

# Set up the token endpoint and payload
token_url = 'https://ims-na1.adobelogin.com/ims/token/v3'
payload = {
    'grant_type': 'client_credentials',
    'client_id': client_id,
    'client_secret': client_secret,
    'scope': 'openid,AdobeID,read_organizations'
}

# Make the POST request to get the access token
response = requests.post(token_url, data=payload)
response.raise_for_status()  # Raise an error for bad status codes

# Parse the JSON response
token_data = response.json()
print("Authentication Response:", token_data)
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
    client_id: process.env.LIGHTROOM_CLIENT_ID,
    client_secret: process.env.LIGHTROOM_CLIENT_SECRET,
    scope:
      "openid,AdobeID,read_organizations",
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
    console.log("Authentication Response:", response);
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
export LIGHTROOM_ACCESS_TOKEN=yourAccessTokenAsdf123
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
import os
import requests

# Retrieve environment variables
client_id = os.environ['LIGHTROOM_CLIENT_ID']
access_token = os.environ['LIGHTROOM_ACCESS_TOKEN']

# Replace with your actual pre-signed URLs and storage option
SIGNED_GET_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...'
SIGNED_POST_URL = 'https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...'
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
        'href': SIGNED_GET_URL,
        'storage':storage
    },
    'outputs': [{
        'href': SIGNED_POST_URL,
        'storage':storage,
        'type':'image/jpeg'
    }]
}

# Make the POST request to create the mask
response = requests.post('https://image.adobe.io/lrService/autoStraighten', headers=headers, json=data)
response.raise_for_status()

# Parse the JSON response
job_response = response.json()
print("Auto Straighten Response:", job_response)
```

#### JavaScript

```js
const axios = require("axios");

(async () => {
  const result = await autoStraighten(accessToken);
  console.log("Auto Straighten Response:", result);
})();

async function autoStraighten(accessToken) {
  // Replace with your actual pre-signed URLs and storage option
  const SIGNED_GET_URL = "https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...";
  const SIGNED_POST_URL = "https://your-storage-bucket-name.blob.core.windows.net:443/images/asdf-12345?lots=of&query=params...";
  const storage = "azure"; // e.g., 'external', 'azure'

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key": process.env.LIGHTROOM_CLIENT_ID,
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
    url: "https://image.adobe.io/lrService/autoStraighten",
    headers: headers,
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error during autoStraighten:", error);
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

## Get Status

Next up, we will use the [Get Status](../api/lightroom_getStatus.md) endpoint to monitor the job status until it completes.

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

#### cURL

```bash
curl --location 'https://image.adobe.io/lrService/status/<:jobId>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $LIGHTROOM_CLIENT_ID" \
--header "Authorization: Bearer $LIGHTROOM_ACCESS_TOKEN" 
```

#### Python

```python
import os
import requests

# Retrieve environment variables
client_id = os.environ['LIGHTROOM_CLIENT_ID']
access_token = os.environ['LIGHTROOM_ACCESS_TOKEN']

# Replace with your actual job ID from the previous step
job_id = '<jobId>'

# Set up headers
headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': client_id,
    'Authorization': f'Bearer {access_token}'
}

# Function to check job status
def check_job_status(job_id):
    status_url = f'https://image.adobe.io/lrService/status/{job_id}'
    response = requests.get(status_url, headers=headers)
    response.raise_for_status()
    return response.json()

print ("Job Status Response:", check_job_status(job_id))
```

#### JavaScript

```js
const axios = require("axios");

(async () => {
  const jobId = "<jobId>"; // Replace with your actual job ID
  const jobStatus = await checkJobStatus(jobId, accessToken);
  console.log("Job Status Response:", jobStatus);
})();

async function checkJobStatus(jobId, accessToken) {
  const clientId = process.env.LIGHTROOM_CLIENT_ID;

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key": clientId,
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

## Deepen Your Understanding

Explore more Lightroom API options in our [Lightroom Tutorials](../code-sample) 🚀
