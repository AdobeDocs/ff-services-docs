---
title: Using the Firefly Fill Image API
description: A guide to using the Firefly Fill Image API in your code workflows.
keywords:
  - Adobe Firefly Services
  - Firefly API
  - Firefly Generative Fill
  - Fill Images
  - How-to guides
  - Firefly endpoint
contributors:
  - https://github.com/cfjedimaster
  - https://github.com/hollyschinsky
hideBreadcrumbNav: true
---

# Using the Firefly Fill Image API

Learn how to use the Fill Image API in your code workflows. 

## Introduction

Generative Fill is a powerful Firefly feature that lets designers modify an existing image using AI to replace a portion of an image with generated content. The content replaced might be a small portion of an image, or an entire background behind a central object. In this guide, you will see how this can be done using the [Firefly Fill API](../api/generative_fill/V3/).

## Prerequisites

-  Firefly API credentials. If you don't have them yet, first visit the Firefly Services [Getting Started](../../../guides/get-started.md) guide to obtain a `client_id` and `client_secret`.
-  Node.js installed on your machine and basic familiarity with `JavaScript`. **Note:** The code for this guide will make use of the [Firefly REST APIs](../api/image_generation/V3/) via Node.js, but could be written in any language, or with the [SDK](https://developer.adobe.com/firefly-services/docs/guides/sdks/).

## Fill Image API Overview

Before getting into the code, let's consider how the Fill Image API works at a high level.

* You begin with a source image, which can either be uploaded to Firefly Services, or used with one of the supported cloud storage providers. For this guide, you'll use a local image uploaded via the [Firefly Upload API](../api/upload_image/).
* You then provide a *masked* version of the image. That mask will be where Firefly adds it's generated content.
* You then specify the desired size. This can be any combination of a `height` and `width` between `1` and `2688` pixels.
* You can *optionally* specify a `prompt` to help Firefly create the filled region. If not specified, Firefly only uses the source image itself as a guide.

## Source and Mask Images

The source and mask images are below, and will be uploaded using [Firefly's Upload API](../api/upload_image/).

##### Source image

![Source image](../images/gen-fill-source.png)

##### Mask image

![Mask image](../images/gen-fill-mask.png)

**Note:** The Photoshop API has a "Create Mask" endpoint that can be used to automate the creation of a mask, but at this time, the mask is created in a way that does not yet work with the Firefly Fill Image endpoint. The image mask must be inverted. That could either be done with a second Photoshop API, the ActionJSON endpoint -- or instead, use one ActionJSON call to do both. This is only a temporary limitation, however, and will be fixed soon.

## Calling the Fill Image API

A simple example of the request body required to use the [Fill Image API](../api/generative_fill/) is below:

```json
{
  "numVariations": 1,
  "size": {
    "width": 2048,
    "height": 2048
  },
  "image": {
    "source": {
      "uploadId": "string"
    },
    "mask": {
      "uploadId": "string"
    }
  }
}
```

More options are available and may be found in the [API Reference](../api/generative_fill/V3). Please note that you could also use [cloud storage URLs (in the form of presigned URLs)](./using-style-structure-refs.md#working-with-reference-images) instead of uploaded assets as desired.

Below is a sample JavaScript function that could be used to call the [Fill Image API](../api/generative_fill/V3).

```js
async function genFill(maskId, sourceId, width, height, prompt, id, token) {

	let body = {
		numVariations:1,
		size:{
			width,
			height
		},
		prompt,
		image: {
			mask: {
				uploadId: maskId
			},
			source: {
				uploadId: sourceId
			}	
		}
	}

	let req = await fetch('https://firefly-api.adobe.io/v3/images/fill', {
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

This next step requires you to use some utility functions to 1) authenticate and obtain your access token (via `getAccessToken()`), and 2) upload your source and mask images with a [Firefly Upload API](../api/upload_image/) wrapper function (ie: `uploadImage()`). The latter ensures you will have the `uploadId` needed for both the source and mask images when you are ready to make the call to `genFill()`. These utility methods are provided in the [complete source code](#complete-source-code) section for you. 

<InlineAlert variant="success" slots="title, text" />

TIP

We recommend you refer to the [Create your First Firefly Application](./create-your-first-ff-application.md) guide for a step-by-step walkthrough on the utility methods used in the how-to guides for authenticating (via `getAccessToken()`), uploading images for use in the calls (`uploadImage()`), and for downloading the generated results (`downloadFile()`).

Below is an example snippet of using the aforementioned utility functions with the necessary parameters:

```js
let token = await getAccessToken(CLIENT_ID, CLIENT_SECRET);

let upload = await uploadImage('./gen-fill-mask.png', 'image/png', CLIENT_ID, token);
let maskedImage = upload.images[0].id;

upload = await uploadImage('./gen-fill-source.png', 'image/png', CLIENT_ID, token);
let sourceImage = upload.images[0].id;
```


<!-- the rest of what you will write the rest of the code needed to actually use the above function to make the fill call. 

First, you will need to authenticate and obtain your access token, then upload your source and mask images using the [Firefly Upload API](../api/upload_image/) (to ensure you have the `uploadId` needed for each).

and then upload our source and mask (again, using a wrapper to Firefly's upload API, which we'll include in the full listing below). Our prompt is, "a beach at sunset".  -->

Now that you have everything needed for the call parameters, make a call to the `genFill()` function with the prompt: `"a beach at sunset"`, and save the result using the `downloadFile()` utility function (also provided in the [complete source code](#complete-source-code) section). 

```js
let result = await genFill(maskedImage, sourceImage, 2048, 2048, "a beach at sunset", CLIENT_ID, token);
let fileName = `./output/gen-fill.jpg`;
await downloadFile(result.outputs[0].image.url, fileName);
```

##### Generated result

![Result with basic fill](../images/gen-fill.jpg)

**Note:** A more detailed prompt would provide better results, and remember that the masked region could be smaller as well, rather than the complete background. 

## Complete Source Code

The complete source code containing utilities for authentication, uploading, and downloading is provided below.

<InlineAlert variant="warning" slots="title, text" />

IMPORTANT

The Node.js code uses imports and top-level `await`, so you must either use the `.mjs` extension on your script file, or ensure you have a `package.json` with `type: "module"`.

```js
import fs from 'fs';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

/*
  Set the credentials based on environment variables.
*/
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

async function getAccessToken(id, secret) {

	const params = new URLSearchParams();

	params.append('grant_type', 'client_credentials');
	params.append('client_id', id);
	params.append('client_secret', secret);
	params.append('scope', 'openid,AdobeID,firefly_enterprise,firefly_api,ff_apis');
	
	let resp = await fetch('https://ims-na1-stg1.adobelogin.com/ims/token/v3', 
		{ 
			method: 'POST', 
			body: params
		}
	);

	let data = await resp.json();
	return data.access_token;
}

async function uploadImage(filePath, fileType, id, token) {

	let stream = fs.createReadStream(filePath);
	let stats = fs.statSync(filePath);
	let fileSizeInBytes = stats.size;

	let upload = await fetch('https://firefly-api.adobe.io/v2/storage/image', {
		method:'POST', 
		headers: {
			'Authorization':`Bearer ${token}`, 
			'X-API-Key':id, 
			'Content-Type':fileType, 
			'Content-Length':fileSizeInBytes
		}, 
		duplex:'half', 
		body:stream
	});

	return await upload.json();
}

async function downloadFile(url, filePath) {
	let res = await fetch(url);
	const body = Readable.fromWeb(res.body);
	const download_write_stream = fs.createWriteStream(filePath);
	return await finished(body.pipe(download_write_stream));
}

async function genFill(maskId, sourceId, width, height, prompt, id, token) {

	let body = {
		numVariations:1,
		size:{
			width,
			height
		},
		prompt,
		image: {
			mask: {
				uploadId: maskId
			},
			source: {
				uploadId: sourceId
			}	
		}
	}

	let req = await fetch('https://firefly-api.adobe.io/v3/images/fill', {
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

let token = await getAccessToken(CLIENT_ID, CLIENT_SECRET);

let upload = await uploadImage('./gen-fill-mask.png', 'image/png', CLIENT_ID, token);
let maskedImage = upload.images[0].id;

upload = await uploadImage('./gen-fill-source.png', 'image/png', CLIENT_ID, token);
let sourceImage = upload.images[0].id;

let result = await genFill(maskedImage, sourceImage, 2048, 2048, "a beach at sunset", CLIENT_ID, token);
let fileName = `./output/gen-fill.jpg`;
await downloadFile(result.outputs[0].image.url, fileName);
```

## Next Steps

For more examples of what's possible with Firefly APIs, check out the other guides in this [how-tos](../how-tos/) section and the [API Reference](../api/image_generation/V3/) for more details.
