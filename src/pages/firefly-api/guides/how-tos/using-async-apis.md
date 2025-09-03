---
title: Using the Firefly Asynchronous API
description: A guide to generating images the asynchronous version of Firefly APIs.
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
  - 'https://github.com/cfjedimaster'
  - 'https://github.com/sushiriot'
hideBreadcrumbNav: true
og:
  title: Using the Firefly Asynchronous API
  description: A guide to generating images the asynchronous version of Firefly APIs.
twitter:
  card: summary
  title: Using the Firefly Asynchronous API
  description: A guide to generating images the asynchronous version of Firefly APIs.
---

# Using the Asynchronous Adobe Firefly APIs

With our launch of new asynchronous APIs, you can manage your Firefly requests and responses more efficiently.

## Introduction

Our original Firefly APIs operated in a synchronous fashion. This meant that you could call the API with a given text prompt and generate an image, however Firefly platform delayed returning the response until it generated your assets. If you're not already familiar with our standard, synchronous APIs, see our [Quickstart Guide](../index.md).

![bears in dresses dancing](../images/bearsdancingforest.jpg)

Currently, the async operations include:

* [Generate Image Async](../api/image_generation/V3_Async/)
* [Expand Image Async](../api/generative_expand/V3_Async/)
* [Fill Image Async](../api/generative_fill/V3_Async/)
* [Generate Object Composite Async](../api/generate-object-composite/V3_Async/)
* [Generate Similar Images Async](../api/generate-similar/V3_Async/)

## Sequence of Calls

The workflow for each of these is the same:

* Make a request, and send any required and optional arguments.
* Firefly responds and returns a job ID that includes a URL. Use the ID and URL to check the status of your request or to cancel the job.
* Check on the job, with scheduled requests for a time reasonable time period. For example, check once every second and wait for a success or failure message.
* On success, Firefly sends you a result containing URLs.
* Retrieve your assets from the URL.

## Generating Images with the Async API

Start with this example that uses the asynchronous version of the text to image endpoint, see [Generate Image Async API Reference](../api/image_generation/V3_Async/). For now we won't show authentication which is the same as it is for synchronous calls.

In terms of required and optional arguments, you have the same options that you do with the synchronous endpoint. At minimum, you should send a text prompt; beyond that, you can send optional arguments to help Firefly create the final result. This includes the content class as well as structure and style options. In fact, the only real change to the code for your request beyond what you already do for synchronous requests is to sent it to a different endpoint:

```js
let BASE = 'https://firefly-api.adobe.io';

async function asyncTextToImage(prompt, contentClass='photo', id, token) {

	let body = {
		prompt, 
		contentClass
	}

	let resp = await fetch(`${BASE}/v3/images/generate-async`, {
		method:'POST',
		headers: {
			'x-api-key':id, 
			'Authorization':`Bearer ${token}`,
			'Content-Type':'application/json'
		}, 
		body: JSON.stringify(body)
	});

	return await resp.json();

}
```

This simple `Node.js` wrapper calls the endpoint and helps you to pass a text prompt and a content class. As mentioned earlier, you have a whole set of other options you can change as well.

The main difference now is the response. With the synchronous version, this method waited while Firefly generated your images. Now, on success, you get a rapid response that looks like this:

```json
{
  "jobId": "urn:ff:jobs:eso851211:86ffe2ea-d765-4bd3-b2fd-568ca8fc36ac",
  "statusUrl": "https://firefly-api.adobe.io/v3/status/urn:ff:jobs:eso851211:86ffe2ea-d765-4bd3-b2fd-568ca8fc36ac",
  "cancelUrl": "https://firefly-api.adobe.io/v3/cancel/urn:ff:jobs:eso851211:86ffe2ea-d765-4bd3-b2fd-568ca8fc36ac"
}
```

In your code, you can use `statusUrl` and `cancelUrl` to get the latest status of your request or to cancel the request. If you want, you can also use `jobId` for logging. Here's an example function that repeatedly polls `statusUrl` to see when Firefly completes the job:

```js
async function pollJob(jobUrl, id, token) {
	let status = '';

	while(status !== 'succeeded' && status !== 'failed') {

		let resp = await fetch(jobUrl, {
			headers: {
				'Authorization':`Bearer ${token}`,
				'x-api-key': id
			}
		});

		let data = await resp.json();
		status = data.status;

		// delay is a utility to 'pause' for X ms
		if (status !== 'succeeded' && status !== 'failed') await delay(1000);
		if (status === 'succeeded') return data;
	}

	return status;

}
```

While your job is still in progress, you get a result that looks like this:

```json
{ 
	"status": "running", 
	"jobId": "86ffe2ea-d765-4bd3-b2fd-568ca8fc36ac"
}
```

After Firefly successfully generates your image, the final status looks similar to this response:

```json
{
        "status": "succeeded",
        "jobId": "urn:ff:jobs:eso851211:86ffe2ea-d765-4bd3-b2fd-568ca8fc36ac",
        "result": {
                "size": {
                        "width": 2048,
                        "height": 2048
                },
                "outputs": [
                        {
                                "seed": 2142812600,
                                "image": {
                                        "url": "https://pre-signed-firefly-prod.s3-accelerate.amazonaws.com/images/0c5c80a3-7189-4bd3-a52e-87b36e4fc47b12345"
                                }
                        }
                ],
                "contentClass": "art"
        }
}
```

Altogether, here's a complete script that takes a static text prompt, creates a request to Firefly, and checks the status of this request. When Firefly generates the image, this script saves the result to the file system. As a reminder, any utility functions below such as the one handling authentication are the same as when you make synchronous calls, and your code could implement this authentication differently.

```js
import fs from 'fs';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

let FIREFLY_SERVICES_CLIENT_ID = process.env.FIREFLY_SERVICES_CLIENT_ID;
let FIREFLY_SERVICES_CLIENT_SECRET = process.env.FIREFLY_SERVICES_CLIENT_SECRET;

let BASE = 'https://firefly-api.adobe.io';

async function getAccessToken(id, secret) {
	const params = new URLSearchParams();

	params.append('grant_type', 'client_credentials');
	params.append('client_id', id);
	params.append('client_secret', secret);
	params.append('scope', 'openid,AdobeID,read_organizations,firefly_enterprise,firefly_api,ff_apis');
	
	let resp = await fetch('https://ims-na1.adobelogin.com/ims/token/v3', 
		{ 
			method: 'POST', 
			body: params
		}
	);

	let data = await resp.json();
	return data.access_token;
}

async function asyncTextToImage(prompt, contentClass='photo', id, token) {

	let body = {
		prompt, 
		contentClass
	}

	let resp = await fetch(`${BASE}/v3/images/generate-async`, {
		method:'POST',
		headers: {
			'x-api-key':id, 
			'Authorization':`Bearer ${token}`,
			'Content-Type':'application/json'
		}, 
		body: JSON.stringify(body)
	});

	return await resp.json();

}

async function delay(x) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, x);
	});
}

async function pollJob(jobUrl, id, token) {
	let status = '';

	while(status !== 'succeeded' && status !== 'failed') {

		let resp = await fetch(jobUrl, {
			headers: {
				'Authorization':`Bearer ${token}`,
				'x-api-key': id
			}
		});

		let data = await resp.json();
		console.log(data);
		status = data.status;

		if (status !== 'succeeded' && status !== 'failed') await delay(1000);
		if (status === 'succeeded') return data;
	}

	return status;

}

async function downloadFile(url, filePath) {
	let res = await fetch(url);
	const body = Readable.fromWeb(res.body);
	const download_write_stream = fs.createWriteStream(filePath);
	return await finished(body.pipe(download_write_stream));
}

let token = await getAccessToken(FIREFLY_SERVICES_CLIENT_ID, FIREFLY_SERVICES_CLIENT_SECRET);

let result = await asyncTextToImage('a cat living their best life, sleeping in a sunbeam', 'art', FIREFLY_SERVICES_CLIENT_ID, token);
console.log(result);

let jobResult = await pollJob(result.statusUrl, FIREFLY_SERVICES_CLIENT_ID, token);
console.log(JSON.stringify(jobResult, null, '\t'));

for(let output of jobResult.result.outputs) {
	let fileName = `./${output.seed}.jpg`;
	await downloadFile(output.image.url, fileName);
}
```

## Expanding Images with Async APIs

The asynchronous API are even more powerful; in this next example, we take a source image, upload it, and then use the [Expand Image Asynchronous API](../api/generative_expand/V3_Async/) to resize it. Instead of doing one resize after another, we can kick off multiple jobs at once so we can resize an image much more efficiently.

First, let's look at our wrapper function which uses a small subset of available parameters. In this case, our wrapper only needs the source image and your desired size:

```js
async function asyncExpandImage(source, size, id, token) {

	let [ width, height ] = size.split('x');

	let body = {
		image: {
			source: {
				uploadId: source
			}
		},
		size: {
			width, height
		}
	}

	let resp = await fetch(`${BASE}/v3/images/expand-async`, {
		method:'POST',
		headers: {
			'x-api-key':id, 
			'Authorization':`Bearer ${token}`,
			'Content-Type':'application/json'
		}, 
		body: JSON.stringify(body)
	});

	return await resp.json();
}
```

Now let's look at the code that uses this. We begin by authenticating and uploading a source image:

```js
let token = await getAccessToken(FIREFLY_SERVICES_CLIENT_ID, FIREFLY_SERVICES_CLIENT_SECRET);

let upload = await uploadImage('./source.jpg', 'image/jpeg', FIREFLY_SERVICES_CLIENT_ID, token);
let uploadedImage = upload.images[0].id;
```

`uploadImage` wraps the [`upload`](https://developer.adobe.com/firefly-services/docs/firefly-api/guides/api/upload_image/) method. Also note that as with the synchronous versions of the Firefly APIs, you can also work with signed URLs from our supported cloud storage providers.

Now, let's define a set of desired sizes, kick off the jobs, and wait for them to complete:

```js
let sizes = ['2500x2500','3000x3000','3500x3500'];

let expandJobs = [];
for(let size of sizes) {
	console.log(`Create job to expand our source to ${size}`);
	expandJobs.push(asyncExpandImage(uploadedImage, size, FIREFLY_SERVICES_CLIENT_ID, token));
}

let jobs = await Promise.all(expandJobs);
```

Typically you should have additional error checking in place. At this point, all three jobs for each of the three sizes have begun.

Next we set up our polling and wait for them to complete:

```js
let expandResults = [];
jobs.forEach(j => {
	expandResults.push(pollJob(j.statusUrl, FIREFLY_SERVICES_CLIENT_ID, token));
});
console.log('Waiting for the jobs to complete...');

let finalResults = await Promise.all(expandResults);
```

Once the jobs successfully complete, we download the results:

```js
console.log('All work done, now downloading.');

finalResults.forEach((r,i) => {
	// we know we only have one result
	downloadFile(r.result.outputs[0].image.url, `source_${sizes[i]}.jpg`);
});
```

Here's the complete script for this example:

```js
import fs from 'fs';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

let FIREFLY_SERVICES_CLIENT_ID = process.env.FIREFLY_SERVICES_CLIENT_ID;
let FIREFLY_SERVICES_CLIENT_SECRET = process.env.FIREFLY_SERVICES_CLIENT_SECRET;

let BASE = 'https://firefly-api.adobe.io';

async function getAccessToken(id, secret) {
	const params = new URLSearchParams();

	params.append('grant_type', 'client_credentials');
	params.append('client_id', id);
	params.append('client_secret', secret);
	params.append('scope', 'openid,AdobeID,read_organizations,firefly_enterprise,firefly_api,ff_apis');
	
	let resp = await fetch('https://ims-na1.adobelogin.com/ims/token/v3', 
		{ 
			method: 'POST', 
			body: params
		}
	);

	let data = await resp.json();
	return data.access_token;
}

async function asyncExpandImage(source, size, id, token) {

	let [ width, height ] = size.split('x');

	let body = {
		image: {
			source: {
				uploadId: source
			}
		},
		size: {
			width, height
		}
	}

	let resp = await fetch(`${BASE}/v3/images/expand-async`, {
		method:'POST',
		headers: {
			'x-api-key':id, 
			'Authorization':`Bearer ${token}`,
			'Content-Type':'application/json'
		}, 
		body: JSON.stringify(body)
	});

	return await resp.json();
}

async function delay(x) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, x);
	});
}

async function pollJob(jobUrl, id, token) {
	let status = '';

	while(status !== 'succeeded' && status !== 'failed') {

		let resp = await fetch(jobUrl, {
			headers: {
				'Authorization':`Bearer ${token}`,
				'x-api-key': id
			}
		});

		let data = await resp.json();
		status = data.status;

		if (status !== 'succeeded' && status !== 'failed') await delay(1000);
		if (status === 'succeeded') return data;
	}

	// only returns for fails now, meh
	return status;

}

async function uploadImage(filePath, fileType, id, token) {

	let stream = fs.createReadStream(filePath);
	let stats = fs.statSync(filePath);
	let fileSizeInBytes = stats.size;

	let upload = await fetch(`${BASE}/v2/storage/image`, {
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

let token = await getAccessToken(FIREFLY_SERVICES_CLIENT_ID, FIREFLY_SERVICES_CLIENT_SECRET);

let upload = await uploadImage('./source.jpg', 'image/jpeg', FIREFLY_SERVICES_CLIENT_ID, token);
let uploadedImage = upload.images[0].id;

let sizes = ['2500x2500','3000x3000','3500x3500'];

let expandJobs = [];
for(let size of sizes) {
	console.log(`Create job to expand our source to ${size}`);
	expandJobs.push(asyncExpandImage(uploadedImage, size, FIREFLY_SERVICES_CLIENT_ID, token));
}

let jobs = await Promise.all(expandJobs);

let expandResults = [];
jobs.forEach(j => {
	expandResults.push(pollJob(j.statusUrl, FIREFLY_SERVICES_CLIENT_ID, token));
});
console.log('Waiting for the jobs to complete...');

let finalResults = await Promise.all(expandResults);
console.log('All work done, now downloading.');

finalResults.forEach((r,i) => {
	// we know we only have one result
	downloadFile(r.result.outputs[0].image.url, `source_${sizes[i]}.jpg`);
});
```
