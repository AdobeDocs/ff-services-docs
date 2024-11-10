---
title: Create Your First Firefly API Implementation - Adobe Firefly API
description: This how-to guides you through the process of integrating Adobe's Firefly workflows into your applications.
keywords:
  - Adobe Firefly Services
  - Firefly API
  - Integrating Firefly Services
  - Developer documentation
  - How-to guides
  - Tutorial
  - Firefly tutorial
  - Firefly API tutorial
  - Get started
  - Environment setup
  - Setup
  - Workflow
  - Credentials
  - Authentication
  - Sample code
  - Generate image
  - Call firefly
  - Sample call
  - Application development
  - First Firefly application
  - Firefly implementation
  - Prompts
  - Getting started with Firefly API
  - Application creation tutorial
  - Step-by-step guide
  - Development workflow
  - Application setup
  - API integration
  - User interface development
  - Backend implementation
  - Frontend development
  - SDK usage
  - Code examples
  - Automate processing
  - Development environment
  - Application deployment
  - Testing and debugging
  - Styles
contributors:
  - https://github.com/cfjedimaster
  - https://github.com/nimithajalal
  - https://github.com/hollyschinsky
hideBreadcrumbNav: true
---

# Firefly Generate Images API Tutorial

Learn to use the advanced capabilities offered by Firefly's Generate Images API

Read this tutorial to learn step-by-step how to use the powerful features of Firefly's Generate Images API. If you'd rather jump straight to the full implementation, find it at the bottom of this page.

<InlineAlert variant="info" slots="text" />

If you don't already have a Firefly "client ID" and "access token", learn how to retrieve them in the [Authentication Guide](../authentication/index.md) before reading further. **Securely store these credentials and never expose them in client-side or public code.**


### Export your client ID and access token

Open a secure terminal and `export` your "client ID" and "access token" as environment variables:

```bash
export FIREFLY_CLIENT_ID=PASTE_YOUR_CLIENT_ID_HERE
export FIREFLY_ACCESS_TOKEN=PASTE_YOUR_ACCESS_TOKEN
```

### Project setup

* Create a new empty directory for your project.
* Run `npm init -y` to create a new `package.json` file.
* Run `npm install axios` to install the `axios` package.
* Create a new file called `index.mjs` in your project directory.

### Generate an image

Begin by generating an image using the Firefly API. Insert the following code snippet to make a POST request to the Firefly API to generate an image based on a prompt:

```js
const axios = require('axios');
const qs = require('qs');

async function retrieveAccessToken() {
let data = qs.stringify({
  'grant_type': 'client_credentials',
  'client_id': process.env.FIREFLY_CLIENT_ID,
  'client_secret': process.env.FIREFLY_CLIENT_SECRET,
  'scope': 'openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis' 
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://ims-na1.adobelogin.com/ims/token/v3',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded', 
  },
  data : data
};

  try {
    const response = await axios.request(config);
    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    console.log(error);
  }
}

async function generateImage(data) {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://firefly-api.adobe.io/v3/images/generate',
    headers: { 
      'Content-Type': 'application/json', 
      'Accept': 'application/json', 
      'x-api-key': process.env.FIREFLY_CLIENT_ID,
      'Authorization': `Bearer ${process.env.FIREFLY_ACCESS_TOKEN}`
    },
    data : JSON.stringify(data)
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  }
  catch (error) {
    console.log(error);
  }
}

let data = {
  prompt: 'a cat dancing on a rainbow'
};

generateImage(data);
```

## Full Implementation

<CodeBlock slots="heading, code" repeat="3" languages="JavaScript, PYTHON, JSON" />

#### Sample code

```js
let prompt = 'a cat dancing on a rainbow';
let result = await generateImage(prompt, CLIENT_ID, token);
console.log(JSON.stringify(result, null, '\t'));
```

#### Sample code

```python
prompt = "a cat dancing on a rainbow"
result = generateImage(prompt, CLIENT_ID, token)
print(json.dumps(result, indent=True))
```

#### Response

```js
{
 "size": {
  "width": 2048,
  "height": 2048
 },
 "outputs": [
  {
   "seed": 295213121,
   "image": {
    "uploadId": "014c2235-f2e9-47be-98a9-33bc9d62568b",
    "url": "https://pre-signed-firefly.s3.amazonaws.com/images/014c2235-f2e9-47be-98a9-33bc9d62568b?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA55EBG7KCZFCHQDZT%2F20240510%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240510T145429Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=a91dfaf608f5f539c80339778aa1bd45dc8698fc35bd32ba41e93d0d2e288632"
   }
  },
  {
   "seed": 295109025,
   "image": {
    "uploadId": "1c1ae898-0709-4a28-bb6d-1c677189a03b",
    "url": "https://pre-signed-firefly.s3.amazonaws.com/images/1c1ae898-0709-4a28-bb6d-1c677189a03b?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA55EBG7KCZFCHQDZT%2F20240510%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240510T145429Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=88bf526592ef5e72e016619c470a346789403660933f05f523af467704ebb0b8"
   }
  },
  {
   "seed": 779747824,
   "image": {
    "uploadId": "e56845cd-bf6d-4242-b1db-2eb357c821a5",
    "url": "https://pre-signed-firefly.s3.amazonaws.com/images/e56845cd-bf6d-4242-b1db-2eb357c821a5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA55EBG7KCZFCHQDZT%2F20240510%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240510T145429Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=77d4b996909b04cfe1e892c12345f28d97b47a43e79bdf8ae91a36a87eac73a3"
   }
  },
  {
   "seed": 1081574056,
   "image": {
    "uploadId": "0985b3be-5961-409a-a6e5-8a31e44e6aed",
    "url": "https://pre-signed-firefly.s3.amazonaws.com/images/0985b3be-5961-409a-a6e5-8a31e44e6aed?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA55EBG7KCZFCHQDZT%2F20240510%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240510T145429Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=0fc4ff2e7b0545208fc5b08f1bb18d265b429166d0e0bfbe49b411aa01142bae"
   }
  }
 ],
 "photoSettings": {
  "aperture": 1.2,
  "shutterSpeed": 0.0005,
  "fieldOfView": 14
 },
 "contentClass": "art"
}
```

