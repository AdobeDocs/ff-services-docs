---
title: Firefly Expand Image API Tutorial - Adobe Firefly API
description: >-
  Learn to become an advanced user of Firefly's Expand Image API. Generate
  multiple variations of an image tailored for various social media platforms.
keywords:
  - Adobe Firefly API
  - generative AI
  - AI image generation
  - text-to-image
  - image generation
  - creative AI
  - REST API
  - AI models
  - generative content
  - AI art generation
  - creative automation
  - content creation
  - Adobe Firefly Services
  - Adobe Firefly Expand Image API
  - Adobe Firefly Expand Image API tutorial
contributors:
  - 'https://github.com/bishoysefin'
hideBreadcrumbNav: true
og:
  title: Firefly Expand Image API Tutorial - Adobe Firefly API
  description: >-
    Learn to become an advanced user of Firefly's Expand Image API. Generate
    multiple variations of an image tailored for various social media platforms.
twitter:
  card: summary
  title: Firefly Expand Image API Tutorial - Adobe Firefly API
  description: >-
    Learn to become an advanced user of Firefly's Expand Image API. Generate
    multiple variations of an image tailored for various social media platforms.
---

# Firefly Expand Image API Tutorial

Generatively expand an image out beyond its edges with the [Expand Image API](../api/generative_expand/V3_Async/)

![wallet advertisement hero image](../images/expand-image-tutorial-hero-image.jpeg)

## Overview

In this tutorial, imagine we are working on a marketing campaign at a Fortune 100 company, and we need to create differently sized image variations optimized for various social media platforms. In the past we had to manually resize images for each platform, which was time-consuming and error-prone. With Firefly's Expand Image API, we can automate this process and generate multiple variations of images with dimensions optimized for platforms like Instagram, Facebook, Twitter, and more.

Before diving into the code, let's preview the high-level steps:

* **Define Target Dimensions:** Each social media platform has specific image size requirements. We define these dimensions for the platforms we plan to target.
* **Upload Source Image:** Use Firefly's [Upload API](../api/upload_image/V2/) to upload your original image.
* **Generate Image Variations:** Use Firefly's [Expand Image API](../api/generative_expand/V3_Async/) to create resized variations of the image for each dimension.

Depending on your learning style, you may prefer to walk through this tutorial step-by-step or [jump immediately to the full source code](#full-example).

## Prerequisites

This tutorial assumes you possess a Firefly Services **Client ID** and **Client Secret**. If you don't have these credentials, learn how to get them at the [Adobe Developer Console](../concepts/dev-console) page.

### Set Up Your Environment

Before we begin this [Node.js](https://nodejs.org/en/download/package-manager) tutorial, run the following in a secure terminal:

```bash
export FIREFLY_SERVICES_CLIENT_ID=yourClientIdAsdf123
export FIREFLY_SERVICES_CLIENT_SECRET=yourClientSecretAsdf123

mkdir firefly-expand-image-api-tutorial
cd firefly-expand-image-api-tutorial
npm init --y
npm install axios qs
touch index.js
```

### Download the Sample Image

Save this sample image to your project folder:

![expand-image-tutorial-source-image.webp](../images/expand-image-tutorial-source-image.jpeg)

## Define the Dimensions

First, let's define the image dimensions for each social media platform:

```js
const SOCIAL_MEDIA_PLATFORMS = [
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
  }
];
```

## Upload the Source Image

 Next, let's upload our source image using Firefly's [Upload API](../api/upload_image/V2/). This image serves as the starting point for all variations.

```js
const axios = require("axios");
const fs = require('fs');

async function uploadImage({ filePath, fileType, accessToken }) {
  let stream = fs.createReadStream(filePath);
  let stats = fs.statSync(filePath);
  let fileSizeInBytes = stats.size;

  const config = {
    method: 'post',
    url: 'https://firefly-api.adobe.io/v2/storage/image',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'X-API-Key': process.env.FIREFLY_SERVICES_CLIENT_ID,
      'Content-Type': fileType,
      'Content-Length': fileSizeInBytes,
    },
    data: fileStream,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  };

  const response = await axios(config);
  return response.data;
}
```

On success, the response looks similar to this:

```json
{
  "images":
    [
      {
        "id": "510aabb4-e154-4a7b-bd2e-f492ee71c938" 
    }
  ]
}
```

## Generate Image Variations

Next, let's create a function that generates images for each social media platform with Firefly's [Expand Image API](../api/generative_expand/V3_Async/). We use the `axios` library to make HTTPs requests:

```js
const axios = require('axios');

async function genExpand({ imageId, width, height, accessToken }) {
  const body = {
    size: { width, height },
    image: { 
      source: { uploadId: imageId }
    }
  }

  const config = {
    method: 'post',
    url: 'https://firefly-api.adobe.io/v3/images/expand-async',
    headers: {
      'X-Api-Key': process.env.FIREFLY_SERVICES_CLIENT_ID,
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(body),
  };

  const response = await axios(config);
  return response.data;
}
```

We can expand the image to fit each social media platform's optimized dimensions and log the URL of the generated image:

```js
async function createSocialMediaRenditions(accessToken) {
  // Upload the source image
  let upload = await uploadImage('./expand-image-tutorial-source-image.webp', 'image/webp', accessToken);
  let sourceImageId = upload.images[0].id;

  // Iterate over each platform and generate renditions
  for (let platform of SOCIAL_MEDIA_PLATFORMS) {
    let result = await genExpand(
      sourceImageId,
      platform.width,
      platform.height,
      accessToken
    );

    console.log(`Generated image variation for ${platform.name} at ${result.outputs[0].image.url}`);
  }
}
```

## Full Example

You can review the [prerequisites](#prerequisites) section to understand how to set up your environment prior to running this code. Note that this is an example only and is not production-ready and requires additional error handling, logging, security measures, and more before you can run it at scale in a live application.

```js
const axios = require("axios");
const qs = require("qs");
const fs = require("fs");

// Define social media platforms and their image dimensions
const SOCIAL_MEDIA_PLATFORMS = [
  {
    name: "Instagram Post",
    width: 1080,
    height: 1080,
  },
  {
    name: "Facebook Cover",
    width: 820,
    height: 312,
  },
  {
    name: "Twitter Post",
    width: 1024,
    height: 512,
  },
];

(async () => {
  const accessToken = await retrieveAccessToken();
  await createSocialMediaRenditions(accessToken);
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
    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    console.log(error);
  }
}

async function uploadImage({ filePath, fileType, accessToken }) {
  const fileStream = fs.createReadStream(filePath);
  const fileStats = fs.statSync(filePath);
  const fileSizeInBytes = fileStats.size;

  const config = {
    method: "post",
    url: "https://firefly-api.adobe.io/v2/storage/image",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-API-Key": process.env.FIREFLY_SERVICES_CLIENT_ID,
      "Content-Type": fileType,
      "Content-Length": fileSizeInBytes,
    },
    data: fileStream,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  };

  const response = await axios(config);
  return response.data;
}

async function genExpand({ imageId, width, height, accessToken }) {
  const body = {
    numVariations: 1,
    size: {
      width,
      height,
    },
    image: {
      source: {
        uploadId: imageId,
      },
    },
  };

  const config = {
    method: "post",
    url: "https://firefly-api.adobe.io/v3/images/expand-async",
    headers: {
      "X-Api-Key": process.env.FIREFLY_SERVICES_CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: body,
  };

  const response = await axios(config);
  return response.data;
}

async function createSocialMediaRenditions(accessToken) {
  // Upload the source image
  let upload = await uploadImage({
    filePath: "./expand-image-tutorial-source-image.webp",
    fileType: "image/webp",
    accessToken,
  });

  let sourceImageId = upload.images[0].id;

  // Loop over each platform and generate renditions
  for (const platform of SOCIAL_MEDIA_PLATFORMS) {
    let result = await genExpand({
      imageId: sourceImageId,
      width: platform.width,
      height: platform.height,
      accessToken,
    });

    console.log(
      `Generated rendition for ${platform.name} at ${result.outputs[0].image.url}`,
    );
  }
}
```

We wrote this tutorial in CommmonJS in order to make it easy to get up and running with the code. If you'd prefer to use ES6 modules, convert the code by changing the `require` statements to `import` statements and then changing the file name from `index.js` to `index.mjs`.

## Deepen Your Understanding

Now that you completed this tutorial, visit its [API Reference](../api/generative_expand/V3_Async/) to explore more advanced use cases to automate image generation with Firefly.
