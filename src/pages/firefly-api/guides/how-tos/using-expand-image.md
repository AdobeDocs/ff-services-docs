---
title: Using the Firefly Expand Image API
description: A guide to using the Firefly Expand Image API in your code workflows.
keywords:
  - Adobe Firefly Services
  - Firefly API
  - Firefly Generative Expand
  - Expand Images
  - How-to guides
  - Firefly endpoint
contributors:
  - https://github.com/cfjedimaster
  - https://github.com/hollyschinsky
hideBreadcrumbNav: true
---

# Using the Firefly Expand Image API

Learn how to use the Expand Image API in your code workflows. 

## Introduction

Designers often struggle with taking existing media assets and re-purposing them for other sizes and form factors. An original image may be too small, incorrectly oriented, and so forth. With the power of [Firefly's Expand Image API](../api/generative_expand/V3/), an original asset can be used as a source for generating new variations in multiple sizes, using generative AI to "draw out" from the source. In this guide, you will see how this can be done.

## Prerequisites

-  Firefly API credentials. If you don't have them yet, first visit the Firefly Services [Getting Started](../../../guides/get-started.md) guide to obtain a `client_id` and `client_secret`.
-  Node.js installed on your machine and basic familiarity with `JavaScript`. **Note:** The code for this guide will make use of the [Firefly REST APIs](../api/image_generation/V3/) via Node.js, but could be written in any language, or with the [SDK](https://developer.adobe.com/firefly-services/docs/guides/sdks/).

## Expand Image API Overview

Before getting into the code, let's look at how the Expand Image API works at a high-level.

* You begin with a source image, which can either be uploaded to Firefly Services, or used with one of the supported cloud storage providers. For this guide, you'll be using a local image uploaded via the [Firefly Upload API](../api/upload_image/).
* You then specify the desired size. This can be any combination of a `height` and `width` between `1` and `3999` pixels.
* You can *optionally* specify a text `prompt` to guide Firefly when creating the expanded region. If not specified, Firefly only uses the source image itself as a guide.
* An optional `mask` can be used, as long as it is the same size as specified above.
* Finally, an optional `placement` parameter can be provided. By default, Firefly will center the source image in the generated new image, but an `inset` or `alignment` value can be used as well. **Note:** You cannot use the `placement` parameter when a mask image is provided.

## Expand Image Call Wrapper

You will begin with the simplest API operation possible, simply requesting a larger image from a provided source image. From the [API Reference](../api/generative_expand/V3), you can see that a minimal request body might look like this:

```json
{
  "size": {
    "width": 2048,
    "height": 2048
  },
  "image": {
    "source": {
      "uploadId": "string"
    },
  }
}
```

where the `uploadId` will come from an uploaded source image. In this guide, you will use the following image as the source image, so please download it to your local hard drive:

![Source image](../images/gen-expand-source.jpg)

This source image will be uploaded using [Firefly's Upload API](../api/upload_image/) via the `uploadImage()` provided in the [complete source code](#complete-source-code) section. 

<InlineAlert variant="success" slots="title, text" />

TIP

We recommend you refer to the [Create your First Firefly Application](./create-your-first-ff-application.md) guide for a step-by-step walkthrough on the utility methods used in the how-to guides for authenticating via `getAccessToken()`, uploading images for use in the calls via `uploadImage()`, and for downloading the generated results via`downloadFile()`.

Now, you can wrap the [Expand Image API](../api/generative_expand/V3) call in a simple utility function like so:

```js
async function genExpand(imageId, width, height, id, token) {

	let body = {
		numVariations:1,
		size:{
			width,
			height
		},
		image: {
			source: {
				uploadId: imageId
			}
		}
	}

	let req = await fetch('https://firefly-api.adobe.io/v3/images/expand', {
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

and then call it with:

```js
let result = await genExpand(sourceImage, 2048, 2048, CLIENT_ID, token);
```

#### Generated Result

![Generative expand result](../images/gen-expand.jpg)

## Adding a Prompt

In this step, you will support the addition of a `prompt` parameter which can be supplied to help guide the Firely Image model in what's generated with the expansion call. In this step, you will expand the function from above to support a `prompt` as an optional argument. When specified, it will be passed along in the body of the API call.

```js
async function genExpand(imageId, width, height, id, token, prompt) {

	let body = {
		numVariations:1,
		size:{
			width,
			height
		},
		image: {
			source: {
				uploadId: imageId
			}
		}
	}

	if(prompt) body.prompt = prompt;

	let req = await fetch('https://firefly-api.adobe.io/v3/images/expand', {
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

It can then be called such as in the following, with a sample text prompt of: `"The sun is rising in the background and trees are visible."`.

```js
result = await genExpand(sourceImage, 2048, 2048, CLIENT_ID, token, "The sun is rising in the background and trees are visible.");
```

An example result when using this prompt is shown below:

![Generative expand with prompt result](../images/gen-expand-prompt.jpg)

As you can see, the expansion took the prompt as a guide when expanding the source. Feel free to switch the prompt to something completely different now to compare the results.

## Using Placement to Control the Expansion Direction

By default, Firefly is going to expand "outwards" treating the source image as the center. There are times, however, when that will not make sense and you need more control over the direction of the expansion. The `placement` argument can specify either an `inset` or `alignment` value. The `inset` value lets you specify displacement values for `left`, `top`, `right`, and `bottom` values, while `alignment` lets you specify values for `horizontal` and `vertical` alignment. 

As an example, if you wanted the new image to treat the source as the bottom left corner of the new image, you would add this to the request body:

```json
placement: {
	alignment: {
		horizontal: "left",
		vertical: "bottom"
	}
}
```

In this step, you will see an example of this in use after updating the method to support an `alignment` parameter:

```js
async function genExpand(imageId, width, height, id, token, prompt, alignment) {

	let body = {
		numVariations:1,
		size:{
			width,
			height
		},
		image: {
			source: {
				uploadId: imageId
			}
		}
	}

	if(prompt) body.prompt = prompt;
	if(alignment) body.placement = { alignment };

	let req = await fetch('https://firefly-api.adobe.io/v3/images/expand', {
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

Then, call it with the following snippet:

```js
result = await genExpand(sourceImage, 2048, 2048, CLIENT_ID, token, 
"The sun is rising in the background and trees are visible.", { horizontal:"left", vertical:"bottom" });
```

Below is an example result:

![Generative expand with prompt and placement result](../images/gen-expand-prompt-placement.jpg)

## Complete Source Code

The complete source code showing all three variations of expand calls, as well as the utility methods required for authenticating, uploading and downloading files is included below, for reference.

<InlineAlert variant="warning" slots="title, text" />

IMPORTANT

This `Node.js` code uses imports and top-level `await`, so you must either use the `.mjs` extension on your script file, or ensure you have a `package.json` with `type: "module"`.

```js
import fs from 'fs';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

/*
  Set the creds based on environment variables.
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

async function genExpand(imageId, width, height, id, token, prompt, alignment) {

	let body = {
		numVariations:1,
		size:{
			width,
			height
		},
		image: {
			source: {
				uploadId: imageId
			}
		}
	}

	if(prompt) body.prompt = prompt;
	if(alignment) body.placement = { alignment };

	let req = await fetch('https://firefly-api.adobe.io/v3/images/expand', {
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

let upload = await uploadImage('./gen-expand-source.jpg', 'image/jpeg', CLIENT_ID, token);
let sourceImage = upload.images[0].id;

let result = await genExpand(sourceImage, 2048, 2048, CLIENT_ID, token);
let fileName = `./output/gen-expand.jpg`;
await downloadFile(result.outputs[0].image.url, fileName);

result = await genExpand(sourceImage, 2048, 2048, CLIENT_ID, token, "The sun is rising in the background and trees are visible.");
fileName = `./output/gen-expand-prompt.jpg`;
await downloadFile(result.outputs[0].image.url, fileName);

result = await genExpand(sourceImage, 2048, 2048, CLIENT_ID, token, "The sun is rising in the background and trees are visible.", { horizontal:"left", vertical:"bottom" });
fileName = `./output/gen-expand-prompt-placement.jpg`;
await downloadFile(result.outputs[0].image.url, fileName);
```

## Next Steps

[Firefly's Expand Image API](../api/generative_expand/V3/) is a powerful tool to help designers create new variations of their existing media at a large scale, and to be able to have fine-grained control over the result with the options available. Check out the [API Reference](../api/generative_expand/V3/) for more details.
