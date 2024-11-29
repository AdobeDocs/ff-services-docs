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

If you don't already have a Photoshop "client ID" and "client secret", retrieve them from your [Adobe Developer Console project](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/#api-overview) before reading further. **Securely store these credentials and never expose them in client-side or public code.**

Pre-signed URLs:

* A pre-signed URL with a read token for the input image.
* A pre-signed URL with a read/write token for the output mask.

For more details, see [Understanding Pre-signed URLs](https://medium.com/@shivam_99875/understanding-pre-signed-urls-80be30b0adf3#:~:text=Fundamental%20Concept%3A,need%20for%20traditional%20authentication%20mechanisms.).

## Retrieve an Access Token

Open a secure terminal and `export` your "client ID" and "client secret" as environment variables so that your later commands can access them:

```bash
export PHOTOSHOP_CLIENT_ID=yourClientIdAsdf123
export PHOTOSHOP_CLIENT_SECRET=yourClientSecretAsdf123
```

Generate an access token:

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

#### cURL

```bash
curl --location 'https://ims-na1.adobelogin.com/ims/token/v3' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode "client_id=$PHOTOSHOP_CLIENT_ID" \
--data-urlencode "client_secret=$PHOTOSHOP_CLIENT_SECRET" \
--data-urlencode 'scope=openid,AdobeID,read_organizations'
```

#### Python

```python
import os
import requests

# Retrieve environment variables
client_id = os.environ['PHOTOSHOP_CLIENT_ID']
client_secret = os.environ['PHOTOSHOP_CLIENT_SECRET']

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
    client_id: process.env.PHOTOSHOP_CLIENT_ID,
    client_secret: process.env.PHOTOSHOP_CLIENT_SECRET,
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
export PHOTOSHOP_ACCESS_TOKEN=yourAccessTokenAsdf123
```

## Create Mask

Next, call the [Photoshop Create Mask API](../api/photoshop_createMask.md):

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

#### cURL

```bash
curl --location 'https://image.adobe.io/sensei/mask' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $PHOTOSHOP_CLIENT_ID" \
--header "Authorization: Bearer $PHOTOSHOP_ACCESS_TOKEN" \
--data '{
    "input":{
      "href":"<SIGNED_GET_URL>",
      "storage":"<storage>"
    },
    "output":{
      "href":"<SIGNED_POST_URL>",
      "storage":"<storage>"
    }
  }'
```

#### Python

```python
import os
import requests

# Retrieve environment variables
client_id = os.environ['PHOTOSHOP_CLIENT_ID']
access_token = os.environ['PHOTOSHOP_ACCESS_TOKEN']

# Replace with your actual pre-signed URLs and storage option
SIGNED_GET_URL = '<SIGNED_GET_URL>'
SIGNED_POST_URL = '<SIGNED_POST_URL>'
storage = '<storage>'  # e.g., 'external', 'azure'

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
        'href': <SIGNED_GET_URL>,
        'storage': <STORAGE>
    },
    'output': {
        'href': <SIGNED_POST_URL>,
        'storage': <STORAGE>
    }
}

# Make the POST request to create the mask
response = requests.post('https://image.adobe.io/sensei/mask', headers=headers, json=data)
response.raise_for_status()

# Parse the JSON response
job_response = response.json()
print("Create Mask Response:", job_response)
```

#### JavaScript

```js
const axios = require("axios");

(async () => {
  const result = await createMask(accessToken);
  console.log("Create Mask Response:", result);
})();

async function createMask(accessToken) {
  // Replace with your actual pre-signed URLs and storage option
  const SIGNED_GET_URL = "<SIGNED_GET_URL>";
  const SIGNED_POST_URL = "<SIGNED_POST_URL>";
  const storage = "<storage>"; // e.g., 'external', 'azure'

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key": process.env.PHOTOSHOP_CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  };

  const data = {
    input: {
      href: SIGNED_GET_URL,
      storage: storage,
    },
    output: {
      href: SIGNED_POST_URL,
      storage: storage,
    },
  };

  const config = {
    method: "post",
    url: "https://image.adobe.io/sensei/mask",
    headers: headers,
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error during createMask:", error);
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

## Get Status - Mask

Next up, we will use the [Get Status - Mask](../api/photoshop_status_mask.md) endpoint to monitor the job status until it completes.

<CodeBlock slots="heading, code" repeat="2" languages="bash, Python" />

#### cURL

```bash
curl --location 'https://image.adobe.io/sensei/status/<:jobId>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $PHOTOSHOP_CLIENT_ID" \
--header "Authorization: Bearer $PHOTOSHOP_ACCESS_TOKEN" 
```

#### Python

```python
import os
import requests

# Retrieve environment variables
client_id = os.environ['PHOTOSHOP_CLIENT_ID']
access_token = os.environ['PHOTOSHOP_ACCESS_TOKEN']

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
    status_url = f'https://image.adobe.io/sensei/status/{job_id}'
    response = requests.get(status_url, headers=headers)
    response.raise_for_status()
    return response.json()

print ("Job Status Response:", check_job_status(job_id))
```

#### JavaScript

```js
const axios = require("axios");

(async () => {
  const accessToken = process.env.PHOTOSHOP_ACCESS_TOKEN;
  const jobId = "<jobId>"; // Replace with your actual job ID
  const jobStatus = await checkJobStatus(jobId, accessToken);
  console.log("Job Status Response:", jobStatus);
})();

async function checkJobStatus(jobId, accessToken) {
  const clientId = process.env.PHOTOSHOP_CLIENT_ID;

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key": clientId,
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `https://image.adobe.io/sensei/status/${jobId}`;

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
  "jobId": "f54e0fcb-260b-47c3-b520-de0d17dc2b67",
  "created": "string",
  "modified": "string",
  "status": "JOB_COMPLETION_STATUS",
  "metadata": {
    "service": {}
  },
  "output": {
    "href": "string",
    "storage": "<storage>",
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

## Deepen Your Understanding

Explore more Photoshop API options in our [Photoshop Tutorials](../how-tos/photoshop-actions) 🚀
