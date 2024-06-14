---
title: Using the Firefly Fill Image API
description: A guide to using the Firefly Fill Image API in your code workflows.
keywords:
  - Adobe Firefly Services
  - Firefly API
  - Firefly Generative Expand
  - Fill Images
  - How-to guides
  - Firefly endpoint
contributors:
  - https://github.com/cfjedimaster
  - https://github.com/hollyschinsky
hideBreadcrumbNav: true
---

# Using the Firefly Fill Image API

A guide to getting started using the Fill Image API in your code workflows. 

## Overview

Generative Fill is a powerful Firefly feature that lets designers modify an existing image using AI to replace a portion of an image with generated content. This could be a small portion of an image or an entire background behind a central object. Let's take a look at how this can be done with Firefly Services.

## Prerequisites

-  Firefly API credentials. If you don't have them yet, first visit the Firefly Services [Getting Started](../../../guides/get-started.md) guide to obtain a `client_id` and `client_secret`.
-  Node.js installed on your machine and basic familiarity with `JavaScript`. **Note:** The code for this guide will make use of the [Firefly REST APIs](../api/) via Node.js, but could be written in any language, or with the [SDK](https://developer.adobe.com/firefly-services/docs/guides/sdks/).

## Generative Fill at a High Level

Before getting into the code, let's consider how generative fill works at a high level.

* You begin with a source image, which can either be uploaded to Firefly Services, or use one of the supported cloud storage providers. For our demo, we'll be using a local image uploaded via the Firefly Upload API.
* You then provide a *masked* version of the image. That mask will be where Firefly adds it's generated content.
* You then specify the desired size. This can be any combination of a height and width between 1 and 2688 pixels.
* You can *optionally* specify a prompt to help Firefly create the filled region. If not specified, Firefly only uses the source image itself as a guide.

## Source and Mask Images

The source and mask images are below, and will be uploaded using Firefly's [Upload API](../api/upload_image/).

##### Source image

![Source image](../images/gen-fill.jpg)

##### Mask image

![Mask image](../images/gen-fill-mask.jpg)

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

More options are available and may be found in the [API Reference](../api/generative_fill/). Also note that you may also use cloud storage URLs instead of uploaded assets as desired.

Here's a sample function that demonstrates this in action:

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

Now let's consider an example of using this. First, we authenticate and then upload our source and mask (again, using a wrapper to Firefly's upload API, which we'll include in the full listing below). Our prompt is, "a beach at sunset". 

```js
let token = await getAccessToken(CLIENT_ID, CLIENT_SECRET);

let upload = await uploadImage('./dog1_masked_inverted.png', 'image/png', CLIENT_ID, token);
let maskedImage = upload.images[0].id;

upload = await uploadImage('./dog1.png', 'image/png', CLIENT_ID, token);
let sourceImage = upload.images[0].id;
```

Next, we'll call our function, and save the result (as before, using a utility method defined later):

```js
let result = await genFill(maskedImage, sourceImage, 2048, 2048, "a beach at sunset", CLIENT_ID, token);
let fileName = `./output/basic_getfill.jpg`;
await downloadFile(result.outputs[0].image.url, fileName);
```

##### Generated result

![Result with basic fill](../images/gen-fill.jpg)

A more detailed prompt would provide better results, and remember that the masked region could be smaller as well, not the complete background. 

Here's the complete script containing utilities for authentication, uploading, and downloading.

<InlineAlert variant="warning" slots="title, text" />

IMPORTANT

The Node.js code uses imports and top-level `await`, so you must either use the `.mjs` extension on your script file, or ensure you have a `package.json` with `type: "module"`.

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

let upload = await uploadImage('./dog1_masked_inverted.png', 'image/png', CLIENT_ID, token);
let maskedImage = upload.images[0].id;

upload = await uploadImage('./dog1.png', 'image/png', CLIENT_ID, token);
let sourceImage = upload.images[0].id;

let result = await genFill(maskedImage, sourceImage, 2048, 2048, "a beach at sunset", CLIENT_ID, token);
let fileName = `./output/basic_getfill.jpg`;
await downloadFile(result.outputs[0].image.url, fileName);
```

## Next Steps

For more examples of what's possible with Firefly APIs, check out the other guides in this [how-tos](../how-tos/) section and the [API Reference](../api/) for more details.
