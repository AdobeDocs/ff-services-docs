---
title: Generate Images with Style & Structure References
description: A guide to generating images with style and structure references when using the Firefly Generate Images API.
keywords:
  - Adobe Firefly Services
  - Firefly API
  - Firefly API Style Reference
  - Firefly API Structure Reference
  - How-to guides
  - Firefly usage examples
  - Firefly generate images
  - Access token
  - Client ID
  - API Key
  - Text to image
  - Firefly endpoint
contributors:
  - https://github.com/cfjedimaster
  - https://github.com/hollyschinsky
hideBreadcrumbNav: true
---

# Using Style and Structure Image References

This guide will show you how you can pass in an existing image for a style or structure reference when generating images.

## Prerequisites

-  Firefly API credentials. If you don't have them yet, first visit the Firefly Services [Getting Started](../../../guides/get-started.md) guide to obtain a `client_id` and `client_secret`.
-  Node.js installed on your machine and basic familiarity with `JavaScript`. **Note:** The code for this guide will make use of the [Firefly REST APIs](../api/) via Node.js, but could be written in any language, or with the [SDK](https://developer.adobe.com/firefly-services/docs/guides/sdks/).

## Working with Reference Images

Before digging in, you'll need to understand how to work with your existing assets as reference images. The APIs discussed in this guide allow you to reference images in two ways.

First, you can place your media on cloud storage and generate temporary readable URLs for them. However, these URLs may only be used with S3, Sharepoint, and Dropbox. 

Secondly, images may be uploaded via the Upload API. This API lets you send a source image (in either PNG, JPEG, or WebP format) and returns a unique ID that can be used in later calls, like the ones we will demonstrate below. 

Using the [Upload API](../api/upload_image/) requires a file, of course, as well as the mime type. Here is an example function that demonstrates this. It assumes a previously created access token using a `CLIENT_ID` and `CLIENT_SECRET` value. **Note:** This function is used again in the examples below, and the complete script for this guide is shared at the bottom of this page.

```js
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
```

The result of this call will be a JSON object containing the ID of the image:

```json
{
	"images": [
		{"id": "9035f157-4105-4a63-913b-c120285dd799"}
	]
}
```

## Using a Reference Image for Style

The first example uses a reference image to impact the style of the result. A standard prompt is used in a call to the [Generate Images API](../api/image_generation/V3/) -- both with and without a style reference image to compare the differences.

First, note the source image used for the style reference. Specifically, notice the color and fire attributes:

![Style reference image](../images/styleRef.jpg)

Before using this source image as a style reference in the [Generate Images API](../api/image_generation/V3/) call, you'll need to get an upload ID for it to pass in the `style.imageReference.source.uploadId` object. An example payload for the Generate Images API is provided below for reference:

```json
{
	"numVariations":1,
	"prompt":"some prompt",
	"size":{
		"width":1792,
		"height":2304
	}, 
	"style":{
		"imageReference": {
			"source":{
				"uploadId":"The ID value of the uploaded style reference"
			}
		}
	}
}
```

**Note:** You could alternatively provide a presigned URL from an image in cloud storage in the `url` property of the `style.imageReference.source` object. See the [Generate Images API Reference](../api/image_generation/V3/) for details.

Next, we'll need utility code to get an access token, upload an image (via the [Upload API](../api/upload_image/)), and download the result. An example is below:

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
```

Now, you'll see how you can build a wrapper function to the [Generate Images API](../api/image_generation/V3/) call that optionally allows you to pass the ID of an uploaded image:

```js
async function generateImage(prompt, id, token, styleReference) {
	let body = {
		numVariations:1,
		prompt,
		size:{
			width:1792,
			height:2304
		}
	}

	if(styleReference) {
		body.style = {
			imageReference: {
				source: { 
					uploadId: styleReference 
				}
			}
		};
	}

    let req = await fetch('https://firefly-api.adobe.io/v3/images/generate', {
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

Finally, our test code. It will authenticate, upload the style reference, and then make two call using the same prompt, one with the style reference and one without:

```js
let token = await getAccessToken(CLIENT_ID, CLIENT_SECRET);

let upload = await uploadImage('./source_image.jpg', 'image/jpeg', CLIENT_ID, token);
let styleReference = upload.images[0].id;

let prompt = 'A long-haired cat majestically riding a flying unicorn. The cat is wielding a rainbow shield and sword, pointing the swords tip outwards.';

// First, no style reference
let result = await generateImage(prompt, CLIENT_ID, token);
let fileName = `./output/without_style_reference.jpg`;
await downloadFile(result.outputs[0].image.url, fileName);

// Second, with a reference
result = await generateImage(prompt, CLIENT_ID, token, styleReference);
fileName = `./output/with_style_reference.jpg`;
await downloadFile(result.outputs[0].image.url, fileName);
```

Given our prompt, here's the initial result with no style:

![Without style reference image](../images/without-style-ref.jpg)

And here's the result with the reference:

![With style reference image](../images/with-style-ref.jpg)

The difference is striking.

## Working with Structure References

The next feature we'll demonstrate is using an image as a structure reference. As you can imagine, this tells Firefly to use the source not as a 'design reference', ie, trying to match color schemes and styling, but more the actual structure of the source image itself. First, as with the style reference example, when you've uploaded your image you can reference it in the your data sent to the API: 

```json
{
	"numVariations":1,
	"prompt":"some prompt",
	"size":{
		"width":1792,
		"height":2304
	}, 
	"structure":{
		"imageReference": {
			"source":{
				"uploadId":"The ID value of the uploaded structure reference"
			}
		}
	}
}
```

Note that as with `style`, cloud storage URLs may be used as well. To demonstrate this, once again we'll use a simple wrapper to the Text to Image API that optionally takes the ID of an image to use as the structure reference:

```js
async function generateImage(prompt, id, token, structureReference) {

	let body = {
		numVariations:1,
		prompt,
		size:{
			width:1792,
			height:2304
		}
	}

	if(structureReference) {
		body.structure = {
			imageReference: {
				source: { 
					uploadId: structureReference 
				}
			}
		};
	}

    let req = await fetch('https://firefly-api.adobe.io/v3/images/generate', {
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

Let's consider this as a structure reference:

![Structure reference image](../images/structureRef.jpg)

Note the position of the cat, the direction it's facing, etc. Now consider this prompt: "picture of a poodle with colorful fur looking majestic"

Without the structure reference, we get:

![Without structure reference image](../images/without-structure-ref.jpg)

Now compare it to the one where the structure reference was used:

![With structure reference image](../images/with-structure-ref.jpg)

Again, the difference is striking. The complete script used for this guide is below.

<InlineAlert variant="warning" slots="title, text" />

IMPORTANT

Since the Node.js code uses imports and top-level `await`, you must either use the `.mjs` extension on your script file, or ensure you have a `package.json` with `type: "module"`.

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

async function generateImage(prompt, id, token, structureReference) {
	let body = {
		numVariations:1,
		prompt,
		size:{
			width:1792,
			height:2304
		}
	}

	if(structureReference) {
		body.structure = {
			imageReference: {
				source: { 
					uploadId: structureReference 
				}
			}
		};
	}

    let req = await fetch('https://firefly-api.adobe.io/v3/images/generate', {
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

let upload = await uploadImage('./cat_writing_laptop.jpg', 'image/jpeg', CLIENT_ID, token);
let structureReference = upload.images[0].id;

let prompt = 'picture of a poodle with colorful fur looking majestic';

// First, no structure reference
let result = await generateImage(prompt, CLIENT_ID, token);
let fileName = `./output/without_structure_reference.jpg`;
await downloadFile(result.outputs[0].image.url, fileName);

// Second, with a structure reference
result = await generateImage(prompt, CLIENT_ID, token, structureReference);
fileName = `./output/with_structure_reference.jpg`;
await downloadFile(result.outputs[0].image.url, fileName);
```

## Next Steps

While this guide demonstrated two powerful ways to influence Firefly when generating images, there's still more you can learn about to tweak what's generated from your API calls. Check out the other guides in this [how-tos](../how-tos/) section and the [API Reference](../api/) for more details.
