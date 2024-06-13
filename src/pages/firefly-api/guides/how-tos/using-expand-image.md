# Using the Expand Image API

Designers often struggle with taking existing media assets and re-purposing them for other sizes and form factors. An original image may be too small, incorrectly oriented, and so forth. With the power of Firefly's [Expand Image API](../api/generative_expand/), an original asset can be used as a source for generating new variations in multiple sizes, using generative AI to "draw out" from the source. Let's take a look at how this can be done.

## Prerequisites

-  Firefly API credentials. If you don't have them yet, first visit the Firefly Services [Getting Started](../../../guides/get-started.md) guide to obtain a `client_id` and `client_secret`.
-  `Node.js` installed on your machine and basic familiarity with `JavaScript`. **Note:** The code for this guide will make use of the [Firefly REST API](../api/) via Node.js, but could be done in any language, or with the [SDK](https://developer.adobe.com/firefly-services/docs/guides/sdks/).

## Expand Image at a High Level

Before getting into the code, let's look at how generative expand works at a high level.

* You begin with a source image, which can either be uploaded to Firefly Services, or use one of the supported cloud storage providers. For our demo, we'll be using a local image uploaded via the Firefly Upload API.
* You then specify the desired size. This can be any combination of a height and width between 1 and 2688 pixels.
* You can *optionally* specify a prompt to help Firefly create the expanded region. If not specified, Firefly only uses the source image itself as a guide.
* An optional mask can be used, as long as it is the same size as specified above.
* Finally, an optional placement parameter. By default, Firefly will center the source image in the generated new image, but an inset or alignment value can be used as well.

## Source Image

The source image used in this guide is shown below, and will be uploaded using [Firefly's Upload API](../api/upload_image/). This image is 800 pixels wide by 582 pixels high.

![Source image](../images/gen-expand-source.jpg)

## Calling the Expand Image API

Let's begin with the simplest operation possible, simply requesting a larger image. From the [API Reference](../api/generative_expand/), we can see that a minimal request body should look like so:

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

Remember that the `uploadId` will come from uploading our source image. We can wrap up a call in a simple utility function like so:

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

	let req = await fetch('https://firefly-api-enterprise-stage.adobe.io/v3/images/expand', {
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

And then call it with:

```js
let result = await genExpand(sourceImage, 2048, 2048, CLIENT_ID, token);
```

#### Generated result

![Generative expand result](../images/gen-expand.jpg)

## Adding a Prompt

To add a prompt, you simply write your prompt and pass it in the body. Let's expand our previous function to support this as an optional argument:

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

	let req = await fetch('https://firefly-api-enterprise-stage.adobe.io/v3/images/expand', {
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

And we can call it with:

```js
result = await genExpand(sourceImage, 2048, 2048, CLIENT_ID, token, "The sun is rising in the background and trees are visible.");
```

Here's an example result:

![Generative expand with prompt result](../images/gen-expand-prompt.jpg)

As you can see, the expansion took the prompt as a guide when expanding the source. 

### Modifying the Direction of the Expansion

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

Let's look at a simple example of this. First, we'll once again update our method to support this new argument:

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

	let req = await fetch('https://firefly-api-enterprise-stage.adobe.io/v3/images/expand', {
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

And call it like so:

```js
result = await genExpand(sourceImage, 2048, 2048, CLIENT_ID, token, 
"The sun is rising in the background and trees are visible.", { horizontal:"left", vertical:"bottom" });
```

Here's an example result:

![Generative expand with prompt and placement result](../images/gen-expand-prompt-placement.jpg)

## Source Code

Here is the complete source code of the demo, with all three variations.

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

	let upload = await fetch('https://firefly-api-enterprise-stage.adobe.io/v2/storage/image', {
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

	let req = await fetch('https://firefly-api-enterprise-stage.adobe.io/v3/images/expand', {
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

let upload = await uploadImage('./source.jpg', 'image/jpeg', CLIENT_ID, token);
let sourceImage = upload.images[0].id;

let result = await genExpand(sourceImage, 2048, 2048, CLIENT_ID, token);
let fileName = `./output/basic_expand.jpg`;
await downloadFile(result.outputs[0].image.url, fileName);

result = await genExpand(sourceImage, 2048, 2048, CLIENT_ID, token, "The sun is rising in the background and trees are visible.");
fileName = `./output/expand_with_prompt.jpg`;
await downloadFile(result.outputs[0].image.url, fileName);

result = await genExpand(sourceImage, 2048, 2048, CLIENT_ID, token, "The sun is rising in the background and trees are visible.", { horizontal:"left", vertical:"bottom" });
fileName = `./output/expand_with_prompt_and_placement.jpg`;
await downloadFile(result.outputs[0].image.url, fileName);
```

## Next Steps

Firefly's [Expand Image API](../api/generative_expand/) is a powerful tool to help designers create new variations of their existing media at a large scale, and to be able to have fine-grained control over the result with the options available. Check out the [API Reference](../api/generative_expand/) for more details.
