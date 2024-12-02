---
title: Quickstart
description: A quickstart guide to the Adobe Firefly API
keywords:
  - Adobe Firefly Services
  - Firefly API guides
  - Developer documentation
  - Firefly API documentation
  - Quickstart
  - Firefly usage examples
  - Firefly API Key
  - Firefly example curl
  - Firefly content
  - Firefly generate
  - Example request
  - Example response
  - How-to guides
  - Firefly tutorial
  - Code samples
  - Getting started with Firefly API
  - API reference
  - Access token
  - Client ID
  - API Key
  - Firefly scope
  - Service scope
  - Firefly configuration guides
  - Text to image
  - Firefly endpoint
  - Use cases
  - Troubleshooting tips
  - Authentication
  - Authorization
  - Credentials
contributors:
  - https://github.com/bishoysefin
hideBreadcrumbNav: true
---

# Quickstart Guide

Generate your first image with Firefly Services

![an illustration of a cat coding on a laptop](./images/cat-coding.jpeg)

## Prerequisites

If you don't already have a Firefly API **Client ID** and **Client Secret**, retrieve them from your [Adobe Developer Console project](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/#api-overview) before reading further. **Securely store these credentials and never expose them in client-side or public code.**

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

Export this access token so that the next script can conveniently access it:

```bash
export FIREFLY_SERVICES_ACCESS_TOKEN=yourAccessTokenAsdf123
```

## Generate an Image

Next, call the [Firefly Generate Images API](./api/image_generation/V3/):

<CodeBlock slots="heading, code" repeat="3" languages="bash, Python, JavaScript" />

#### cURL

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/generate' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $FIREFLY_SERVICES_CLIENT_ID" \
--header "Authorization: Bearer $FIREFLY_SERVICES_ACCESS_TOKEN" \
--data '{
    "prompt": "a realistic illustration of a cat coding"
}'
```

#### Python

```python
import os
import requests

# Retrieve environment variables
client_id = os.environ['FIREFLY_SERVICES_CLIENT_ID']
access_token = os.environ['FIREFLY_SERVICES_ACCESS_TOKEN']

# Set up headers
headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': client_id,
    'Authorization': f'Bearer {access_token}'
}

# Set up the request payload
data = {
    'prompt': 'a realistic illustration of a cat coding',  # Replace with your actual prompt
}

# Make the POST request to the Firefly Fill Image API
response = requests.post(
    'https://firefly-api.adobe.io/v3/images/generate',
    headers=headers,
    json=data
)
response.raise_for_status()

# Parse the JSON response
job_response = response.json()
print("Generate Image Response:", job_response)
```

#### JavaScript

```js
const axios = require("axios");

(async () => {
  const result = await generateImage(accessToken);
  console.log("Generate Image Response:", result);
})();

async function generateImage(accessToken) {

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key": process.env.FIREFLY_SERVICES_CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  };

  const data = {
    prompt: "a realistic illustration of a cat coding", // Replace with your actual prompt
  };

  const config = {
    method: "post",
    url: "https://firefly-api.adobe.io/v3/images/generate",
    headers: headers,
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error during generateImage:", error);
  }
}
```

The response will look like this:

```json
{
    "size": {
        "width": 2048,
        "height": 2048
    },
    "outputs": [
        {
            "seed": 1779323515,
            "image": {
                "url": "https://pre-signed-firefly-prod.s3-accelerate.amazonaws.com/images/asdf-12345?lots=of&query=params..."
            }
        }
    ],
    "contentClass": "art"
}
```

## View the Generated Image

Open the URL in your browser to see the image you generated with Firefly 🎉

## Deepen Your Understanding

Visit the [Firefly Generate Image API tutorial](./how-tos/firefly-generate-image-api-tutorial.md) to learn more about the rich customization options available to you 🚀
