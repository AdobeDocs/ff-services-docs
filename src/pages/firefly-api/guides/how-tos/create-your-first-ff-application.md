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
  - https://github.com/nimithajalal
  - https://github.com/cfjedimaster
hideBreadcrumbNav: true
---

# Create your first Firefly API implementation

Welcome to Adobe's Firefly APIs! These APIs offer a seamless way to integrate powerful creative workflows into your applications using a simple REST-based API.

In this tutorial, we'll guide you through creating your first implementation of the Firefly API.

<InlineAlert slots="text" />

This tutorial provides code snippets in both `Node.js` and `Python` for your convenience. Feel free to use the language of your choice to complete the implementation of your first Firefly API.

Let's get started!

## Prerequisites

Before we begin, make sure you have the following:

-   Firefly API credentials. If you don't have them yet, first visit the [Firefly Services Getting Started guide](https://developer.adobe.com/firefly-services/docs/guides/get-started/) to obtain a `client_id` and `client_secret`.
-   `Node.js` or `Python` installed on your machine and basic familiarity with `JavaScript` or `Python`.

## Step 1: Set Up Your Environment

Begin by creating a new script, named `firefly.js` (or `firefly.py`), and save it anywhere on your computer., and save it anywhere on your computer. This will be the script we use to test our integration with Firefly APIs.

Next, set your `client_id` and `client_secret` as environment variables. For example, on a Mac or in Windows Subsystem for Linux (WSL), you can do the following:

```js
export CLIENT_ID=YOURIDHERE
export CLIENT_SECRET=YOURSECRETHERE
```

Note that our code is going to assume CLIENT_ID and CLIENT_SECRET - case matters!

## Step 2: Authentication

Let's begin by initializing a few variables. As previously mentioned, it is crucial to set up two environment variables, as the following code relies on them:

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, PYTHON" />

#### Sample code

```js
/* Set our creds based on environment variables.
*/
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
```

#### Sample code

```python
#Set our creds based on environment variables.
CLIENT_ID = os.environ.get('CLIENT_ID')
CLIENT_SECRET = os.environ.get('CLIENT_SECRET')
```

To authenticate, we take these two variables and make a `POST` request to our authentication endpoint: `https://ims-na1.adobelogin.com/ims/token/v3`. You need to pass your credentials along with the requested scopes that allow for access to Firefly. We can wrap up the entire thing in one simple function:

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, PYTHON" />

#### Sample code

```js
async function getAccessToken(id, secret) {

	const params = new URLSearchParams();

	params.append('grant_type', 'client_credentials');
	params.append('client_id', id);
	params.append('client_secret', secret);
	params.append('scope', 'scope=openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis');
	
	let resp = await fetch('https://ims-na1.adobelogin.com/ims/token/v3', 
		{ 
			method: 'POST', 
			body: params
		}
	);

	let data = await resp.json();
	return data.access_token;
}

let token = await getAccessToken(CLIENT_ID, CLIENT_SECRET);
```

#### Sample code

```python
def getAccessToken(id, secret):
	response = requests.post(f"https://ims-na1.adobelogin.com/ims/token/v3?client_id={id}&client_secret={secret}&grant_type=client_credentials&scope=openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis")
	return response.json()["access_token"]

token = getAccessToken(CLIENT_ID, CLIENT_SECRET)
```

<InlineAlert variant="info" slots="text" />

The provided code example does not include error handling for credentials. For production code, it's essential to implement proper error handling to ensure the security and reliability of your application.

## Step 3: Generate an Image with a Prompt

For our demo, we will use Firefly to generate four images from a single prompt.

In this case, we will focus on the Text-to-image functionality, which includes optional generative matching.

<InlineAlert variant="help" slots="text" />

Please refer to the [Text-to-image with optional generative](https://developer.adobe.com/firefly-api/api/#operation/v2/images/generate) match section in the API Reference for more details.

Based on the docs, we can see that the only required parameter is prompt. Also, the `n` prompt specifies how many images we want. So the simplest request body we could build would look like so:

```js
{
	"prompt":"a cat dancing on a rainbow",
	"n":4
}
```

Now, let's create a function to generate an image using a prompt.

First, we'll build a simple function to call the REST endpoint.
It requires our previous `client_id` value and the `access_token`, and our prompt:

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, PYTHON" />

#### Sample code

```js
async function textToImage(prompt, id, token) {

	let body = {
		"n":4,
		prompt
	}


	let req = await fetch('https://firefly-api.adobe.io/v2/images/generate', {
		method:'POST',
		headers: {
			'X-Api-Key':id, 
			'Authorization':`Bearer ${token}`,
			'Content-Type':'application/json'
		}, 
		body: JSON.stringify(body)
	});

	return await req.json();
}
```

#### Sample code

```python
def textToImage(text, id, token):

	data = {
		"prompt":text,
		"n":4,
	}


	response = requests.post("https://firefly-api.adobe.io/v2/images/generate", json=data, headers = {
		"X-API-Key":id, 
		"Authorization":f"Bearer {token}",
		"Content-Type":"application/json"
	}) 

	return response.json()
```

Please ensure you include the authentication headers correctly. Pass the token in the Authorization header and the `client ID` in the `X-Api-Key` header. The API will return a JSON string for you to process and return to the caller.

### Executing the Firefly API Call

We define a simple prompt and call the function to interact with the Firefly API, displaying the result on the screen.

<CodeBlock slots="heading, code" repeat="3" languages="JavaScript, PYTHON, JSON" />

#### Sample code

```js
let prompt = 'a cat dancing on a rainbow';
let result = await textToImage(prompt, CLIENT_ID, token);
console.log(JSON.stringify(result, null, '\t'));
```

#### Sample code

```python
prompt = "a cat dancing on a rainbow"
result = textToImage(prompt, CLIENT_ID, token)
print(json.dumps(result, indent=True))
```

#### Response

```js
{
        "version": "2.10.2",
        "size": {
                "width": 2048,
                "height": 2048
        },
        "predictedContentClass": "art",
        "outputs": [
                {
                        "seed": 1003577025,
                        "image": {
                                "id": "723779df-6388-49b7-81bc-81f735bd2423",
                                "presignedUrl": "https://pre-signed-firefly-prod.s3.amazonaws.com/images/723779df-6388-49b7-81bc-81f735bd2423?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARDA3TX66LLPDOIWV%2F20240229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240229T212734Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=4c8cb7c08a954d1990c26308edf13992a479c7da220ae6797252c4f03ad7c39e"
                        }
                },
                {
                        "seed": 2103068358,
                        "image": {
                                "id": "ae302228-e6bb-435e-8e49-6db12b9a619b",
                                "presignedUrl": "https://pre-signed-firefly-prod.s3.amazonaws.com/images/ae302228-e6bb-435e-8e49-6db12b9a619b?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARDA3TX66LLPDOIWV%2F20240229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240229T212734Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=c9dccb63e2824b69984b4717204774358ae198d9597d340a712a4563dfe607df"
                        }
                }
        ]
}
```

This function sends a POST request to the Firefly API with the prompt and retrieves the generated images. Replace `a cat dancing on a rainbow` with your desired prompt.

You can copy and paste any of the `presignedUrl` values from the result to view the images.

## Step 4: Downloading Images from Firefly API

Let's see how you can write a quick utility to download these images.

### Import the Required Modules

First, import the necessary file-related modules and the requests module for Python:

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, PYTHON" />

#### Sample code

```js
import fs from 'fs';
import { Readable } from 'stream';
import { finished } from 'stream/promises';
```

#### Sample code

```python
import requests 
```

### Define the `downloadFile` function

Create a function that takes a URL and a file path as arguments, and downloads the file from the URL to the specified path (This step is only required for Node.js).

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, PYTHON" />

#### Sample code

```js
async function downloadFile(url, filePath) {
    let res = await fetch(url);
    const body = Readable.fromWeb(res.body);
    const download_write_stream = fs.createWriteStream(filePath);
    return await finished(body.pipe(download_write_stream));
}
```

#### Sample code

```python
def downloadFile(url, filePath):
	with open(filePath,'wb') as output:
		bits = requests.get(url, stream=True).content
		output.write(bits)
```

### Iterate over the results and save each image

Finally, iterate over the results (assuming result contains the response from the API call) and save each image with a unique file name using the seed value from the result:

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, PYTHON" />

#### Sample code

```js
for(let output of result.outputs) {
    let fileName = `./${output.seed}.jpg`;
    await downloadFile(output.image.presignedUrl, fileName);
}
```

#### Sample code

```python
for output in result["outputs"]:
    fileName = f'./{output["seed"]}.jpg';
    downloadFile(output["image"]["presignedUrl"], fileName);
```

After running these steps, you'll see four images output in the same directory.

**Sample output**

![a cat dancing on a rainbow](../images/firefly-sample.png)

## Complete Code

Here's the entire code sample. As a reminder, feel free to modify and change the prompt.

**IMPORTANT:** Note that this Node.js code uses imports and top-level `await`, so you must either use the `.mjs` extension on your script file or ensure you have a `package.json` with `type: "module"`.

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, PYTHON" />

#### Sample code

```js
import fs from 'fs';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

/*
Set our creds based on environment variables.
*/
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;


async function getAccessToken(id, secret) {

	const params = new URLSearchParams();

	params.append('grant_type', 'client_credentials');
	params.append('client_id', id);
	params.append('client_secret', secret);
	params.append('scope', 'openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis');
	
	let resp = await fetch('https://ims-na1.adobelogin.com/ims/token/v3', 
		{ 
			method: 'POST', 
			body: params
		}
	);

	let data = await resp.json();
	return data.access_token;
}

let token = await getAccessToken(CLIENT_ID, CLIENT_SECRET);

async function textToImage(prompt, id, token) {

	let body = {
		"n":4,
		prompt
	}


	let req = await fetch('https://firefly-api.adobe.io/v2/images/generate', {
		method:'POST',
		headers: {
			'X-Api-Key':id, 
			'Authorization':`Bearer ${token}`,
			'Content-Type':'application/json'
		}, 
		body: JSON.stringify(body)
	});

	return await req.json();
}

let prompt = 'a cat dancing on a rainbow';
let result = await textToImage(prompt, CLIENT_ID, token);
console.log(JSON.stringify(result,null,'\t'));

async function downloadFile(url, filePath) {
	let res = await fetch(url);
	const body = Readable.fromWeb(res.body);
	const download_write_stream = fs.createWriteStream(filePath);
	return await finished(body.pipe(download_write_stream));
}

for(let output of result.outputs) {
	let fileName = `./${output.seed}.jpg`;
	await downloadFile(output.image.presignedUrl, fileName);
}
```

#### Sample code

```python
import os 
import requests 
import json 

#Set our creds based on environment variables.
CLIENT_ID = os.environ.get('CLIENT_ID')
CLIENT_SECRET = os.environ.get('CLIENT_SECRET')

def getAccessToken(id, secret):
	response = requests.post(f"https://ims-na1.adobelogin.com/ims/token/v3?client_id={id}&client_secret={secret}&grant_type=client_credentials&scope=openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis")
	return response.json()["access_token"]

token = getAccessToken(CLIENT_ID, CLIENT_SECRET)

def textToImage(text, id, token):

	data = {
		"prompt":text,
		"n":4,
	}


	response = requests.post("https://firefly-api.adobe.io/v2/images/generate", json=data, headers = {
		"X-API-Key":id, 
		"Authorization":f"Bearer {token}",
		"Content-Type":"application/json"
	}) 

	return response.json()


prompt = "a cat dancing on a rainbow"
result = textToImage(prompt, CLIENT_ID, token)
print(json.dumps(result, indent=True))

def downloadFile(url, filePath):
	with open(filePath,'wb') as output:
		bits = requests.get(url, stream=True).content
		output.write(bits)

for output in result["outputs"]:
	fileName = f'./{output["seed"]}.jpg';
	downloadFile(output["image"]["presignedUrl"], fileName);
```
