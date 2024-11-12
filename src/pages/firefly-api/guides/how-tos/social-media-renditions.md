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
  - https://github.com/bishoysefin
hideBreadcrumbNav: true
---

# Create Social Media Renditions with Firefly APIs

Learn how to use Adobe Firefly APIs to create different renditions of your images tailored for various social media platforms.

## Overview

In today's digital landscape, content creators often need to adapt their media assets to fit the specific dimensions and requirements of different social media platforms. Manually resizing and adjusting images can be time-consuming and prone to errors. 

Adobe Firefly APIs offer a streamlined solution to automate this process, allowing you to generate multiple renditions of an image optimized for platforms like Instagram, Facebook, Twitter, and more. This guide will walk you through how to achieve this using [Firefly's Expand Image API](../api/generative_expand/V3/).

## Prerequisites

-  Firefly API credentials. If you don't have them yet, first visit the Firefly Services [Getting Started](../../../guides/get-started.md) guide to obtain a `client_id` and `client_secret`.
-  Node.js installed on your machine and basic familiarity with `JavaScript`. **Note:** The code for this guide will make use of the [Firefly REST APIs](../api/image_generation/V3/) via Node.js, but could be written in any language, or with the [SDK](https://developer.adobe.com/firefly-services/docs/guides/sdks/).

## Expand Image API Overview

Before diving into the code, let's understand the high-level steps involved in generating different renditions for social media platforms:

1. **Define Target Dimensions:** Each social media platform has specific image size requirements. You'll need to define these dimensions for the platforms you target.
2. **Upload Source Image:** Use the [Firefly Upload API](../api/upload_image/) to upload your original image.
3. **Generate Renditions:** Utilize [Firefly's Expand Image API](../api/generative_expand/V3/) to create resized versions of the image according to the defined dimensions.
4. **Download and Save:** Retrieve the generated images and save them locally or to your preferred storage.

## Step 1: Define Social Media Platform Dimensions

First, let's define the image dimensions required for different social media platforms. Here's an example of common dimensions:

```js
const socialMediaPlatforms = [
  {
    name: 'Instagram Post',
    width: 1080,
    height: 1080,
  },
  {
    name: 'Facebook Cover',
    width: 820,
    height: 312,
  },
  {
    name: 'Twitter Post',
    width: 1024,
    height: 512,
  },
  {
    name: 'LinkedIn Banner',
    width: 1128,
    height: 191,
  },
];
```

## Step 2: Upload Your Source Image

You'll need to upload your source image using the Firefly Upload API. This image will serve as the base for all renditions.

```js
async function uploadImage(filePath, fileType, id, token) {
  let stream = fs.createReadStream(filePath);
  let stats = fs.statSync(filePath);
  let fileSizeInBytes = stats.size;

  let upload = await fetch('https://firefly-api.adobe.io/v2/storage/image', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-API-Key': id,
      'Content-Type': fileType,
      'Content-Length': fileSizeInBytes,
    },
    duplex: 'half',
    body: stream,
  });

  return await upload.json();
}
```

**Example Usage:**

```js
let upload = await uploadImage('./source-image.jpg', 'image/jpeg', CLIENT_ID, token);
let sourceImageId = upload.images[0].id;
```

## Steps 3: Generate Renditions Using Firefly Expand Image API

Now, you'll create a function that generates images for each social media platform using the Firefly Expand Image API.

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

**Note:** The prompt field is utilized here to describe the intended transformation, although for resizing, the API will primarily focus on the width and height parameters.

<InlineAlert variant="success" slots="title, text" />

TIP

By default, Firefly is going to expand "outwards" treating the source image as the center. The placement argument can specify either an `inset` or `alignment` value. The inset value lets you specify displacement values for `left`, `top`, `right`, and `bottom` values, while alignment lets you specify values for `horizontal` and `vertical` alignment.

## Step 4: Download and Save the Renditions

Create a function to download and save the generated images.

```js
async function downloadFile(url, filePath) {
  let res = await fetch(url);
  const body = Readable.fromWeb(res.body);
  const downloadWriteStream = fs.createWriteStream(filePath);
  return await finished(body.pipe(downloadWriteStream));
}
```

## Step 5: Putting It All Together

Now, you can loop through each social media platform and generate the corresponding renditions.

```js
import fs from 'fs';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

/* Include your utility functions: getAccessToken, uploadImage, generateRendition, downloadFile */

async function createSocialMediaRenditions() {
  // Get the access token
  let token = await getAccessToken(CLIENT_ID, CLIENT_SECRET);

  // Upload the source image
  let upload = await uploadImage('./source-image.jpg', 'image/jpeg', CLIENT_ID, token);
  let sourceImageId = upload.images[0].id;

  // Loop through each platform and generate renditions
  for (let platform of socialMediaPlatforms) {
    let result = await genExpand(
      sourceImageId,
      platform.width,
      platform.height,
      CLIENT_ID,
      token,
      platform.name
    );

    // Construct the filename
    let fileName = `./renditions/${platform.name.replace(/\s+/g, '_')}.jpg`;

    // Download and save the image
    await downloadFile(result.outputs[0].image.url, fileName);

    console.log(`Generated rendition for ${platform.name}`);
  }
}

createSocialMediaRenditions();
```

## Complete Source Code

Below is the complete source code that incorporates all the steps:

```js
import fs from 'fs';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

// Set the credentials based on environment variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Define social media platforms and their image dimensions
const socialMediaPlatforms = [
  {
    name: 'Instagram Post',
    width: 1080,
    height: 1080,
  },
  {
    name: 'Facebook Cover',
    width: 820,
    height: 312,
  },
  {
    name: 'Twitter Post',
    width: 1024,
    height: 512,
  },
  {
    name: 'LinkedIn Banner',
    width: 1128,
    height: 191,
  },
];

async function getAccessToken(id, secret) {
  const params = new URLSearchParams();

  params.append('grant_type', 'client_credentials');
  params.append('client_id', id);
  params.append('client_secret', secret);
  params.append(
    'scope',
    'openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis'
  );

  let resp = await fetch('https://ims-na1.adobelogin.com/ims/token/v3', {
    method: 'POST',
    body: params,
  });

  let data = await resp.json();
  return data.access_token;
}

async function uploadImage(filePath, fileType, id, token) {
  let stream = fs.createReadStream(filePath);
  let stats = fs.statSync(filePath);
  let fileSizeInBytes = stats.size;

  let upload = await fetch('https://firefly-api.adobe.io/v2/storage/image', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-API-Key': id,
      'Content-Type': fileType,
      'Content-Length': fileSizeInBytes,
    },
    duplex: 'half',
    body: stream,
  });

  return await upload.json();
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

async function downloadFile(url, filePath) {
  let res = await fetch(url);
  const body = Readable.fromWeb(res.body);
  const downloadWriteStream = fs.createWriteStream(filePath);
  return await finished(body.pipe(downloadWriteStream));
}

async function createSocialMediaRenditions() {
  // Get the access token
  let token = await getAccessToken(CLIENT_ID, CLIENT_SECRET);

  // Upload the source image
  let upload = await uploadImage('./source-image.jpg', 'image/jpeg', CLIENT_ID, token);
  let sourceImageId = upload.images[0].id;

  // Ensure the renditions directory exists
  if (!fs.existsSync('./renditions')) {
    fs.mkdirSync('./renditions');
  }

  // Loop through each platform and generate renditions
  for (let platform of socialMediaPlatforms) {
    let result = await genExpand(
      sourceImageId,
      platform.width,
      platform.height,
      CLIENT_ID,
      token,
      platform.name
    );

    // Check for errors
    if (result.errors) {
      console.error(`Error generating rendition for ${platform.name}:`, result.errors);
      continue;
    }

    // Construct the filename
    let fileName = `./renditions/${platform.name.replace(/\s+/g, '_')}.jpg`;

    // Download and save the image
    await downloadFile(result.outputs[0].image.url, fileName);

    console.log(`Generated rendition for ${platform.name}`);
  }
}

createSocialMediaRenditions();
```

<InlineAlert variant="warning" slots="title, text" />

IMPORTANT

This `Node.js` code uses imports and top-level `await`, so you must either use the `.mjs` extension on your script file, or ensure you have a `package.json` with `type: "module"`.

## Next Steps

[Firefly's Expand Image API](../api/generative_expand/V3/) is a powerful tool to help designers create new variations of their existing media at a large scale, and to be able to have fine-grained control over the result with the options available. Check out the [API Reference](../api/generative_expand/V3/) for more details.
