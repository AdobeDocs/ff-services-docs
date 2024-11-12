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

Learn how to use Firefly's Expand Image API to create different renditions of your images tailored for various social media platforms.

## Overview

In today's digital landscape, content creators often need to adapt their media assets to fit the specific dimensions and requirements of different social media platforms. Manually resizing and adjusting images can be time-consuming and prone to errors. 

[Firefly's Expand Image API](../api/generative_expand/V3/) offers a streamlined solution to automate this process, allowing you to generate multiple renditions of an image optimized for platforms like Instagram, Facebook, Twitter, and more. This guide will walk you through how to achieve this using [Firefly's Expand Image API](../api/generative_expand/V3/).

<InlineAlert variant="warning" slots="title,text" />

DISCLAIMER

The code in this tutorial is for educational purposes only. It is not production-ready and requires additional error handling, logging, security measures, and more before it can be used in a live application.

Depending on your learning style, you may prefer to walk through this tutorial step-by-step or [go straight to the full source code](#full-source-code) at the bottom of this webpage.

## Prerequisites

Before we begin, run the following in a secure terminal:

```bash
export FIREFLY_CLIENT_ID=yourClientIdAsdf123
export FIREFLY_CLIENT_SECRET=yourClientSecretAsdf123

mkdir firefly-generate-images-api-tutorial
cd firefly-generate-images-api-tutorial
npm init --y
npm install axios qs
touch index.js
```

<InlineAlert variant="info" slots="text" />

If you don't already have a Firefly "client ID" and "client secret", retrieve them from your [Adobe Developer Console project](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/#api-overview) before reading further. **Securely store these credentials and never expose them in client-side or public code.**

## Expand Image API Overview

Before diving into the code, let's understand the high-level steps involved in generating different renditions for social media platforms:

1. **Define Target Dimensions:** Each social media platform has specific image size requirements. You'll need to define these dimensions for the platforms you target.
2. **Upload Source Image:** Use the [Firefly Upload API](../api/upload_image/) to upload your original image.
3. **Generate Renditions:** Utilize [Firefly's Expand Image API](../api/generative_expand/V3/) to create resized versions of the image according to the defined dimensions.

## Define Social Media Platform Dimensions

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
  }
];
```

## Upload Your Source Image

You'll need to upload your source image using the Firefly Upload API. This image will serve as the base for all renditions.

```js
const axios = require("axios");
const fs = require('fs');


async function uploadImage(filePath, fileType, accessToken) {
  let stream = fs.createReadStream(filePath);
  let stats = fs.statSync(filePath);
  let fileSizeInBytes = stats.size;

  const config = {
    method: 'post',
    url: 'https://firefly-api.adobe.io/v2/storage/image',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'X-API-Key': process.env.FIREFLY_CLIENT_ID,
      'Content-Type': fileType,
      'Content-Length': fileSizeInBytes,
    },
    data: fileStream,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  };

  const response = await axios(config);
  return response.data;
```

**Example Firefly Upload API Response**

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

**Example Usage:**

```js
const uploadResponse = await uploadImage('./source-image.jpg', 'image/jpeg', accessToken);
const sourceImageId = uploadResponse.images[0].id;
```

## Generate Renditions Using Firefly Expand Image API

Now, you'll create a function that generates images for each social media platform using the Firefly Expand Image API.

```js
const axios = require('axios');

async function genExpand(imageId, width, height, accessToken) {

    const body = {
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

    const config = {
    method: 'post',
    url: 'https://firefly-api.adobe.io/v3/images/expand',
    headers: {
      'X-Api-Key': process.env.FIREFLY_CLIENT_ID,
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    data: body,
  };

  const response = await axios(config);
  return response.data;
}
```

## Putting It All Together

Now, you can loop through each social media platform and generate the corresponding renditions.

```js
const axios = require('axios');
const qs = require('qs');
const fs = require('fs');

/* Include your utility functions: getAccessToken, uploadImage, generateRendition */

async function createSocialMediaRenditions(accessToken) {

  // Upload the source image
  let upload = await uploadImage('./source-image.jpg', 'image/jpeg', accessToken);
  let sourceImageId = upload.images[0].id;

  // Loop through each platform and generate renditions
  for (let platform of socialMediaPlatforms) {
    let result = await genExpand(
      sourceImageId,
      platform.width,
      platform.height,
      accessToken
    );

    console.log(`Generated rendition for ${platform.name} at ${result.outputs[0].image.url}`);
  }
}
```

## Full Source Code

Below is the complete source code that incorporates all the steps:

```js
const axios = require('axios');
const qs = require('qs');
const fs = require('fs');

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
  }
];

(async () => {
  const accessToken = await retrieveAccessToken();
  await createSocialMediaRenditions(accessToken);
})();


async function retrieveAccessToken() {
  let data = qs.stringify({
    grant_type: "client_credentials",
    client_id: process.env.FIREFLY_CLIENT_ID,
    client_secret: process.env.FIREFLY_CLIENT_SECRET,
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
async function uploadImage(filePath, fileType, accessToken) {
  const fileStream = fs.createReadStream(filePath);
  const fileStats = fs.statSync(filePath);
  const fileSizeInBytes = fileStats.size;

  const config = {
    method: 'post',
    url: 'https://firefly-api.adobe.io/v2/storage/image',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'X-API-Key': process.env.FIREFLY_CLIENT_ID,
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

async function genExpand(imageId, width, height, accessToken) {
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
    method: 'post',
    url: 'https://firefly-api.adobe.io/v3/images/expand',
    headers: {
      'X-Api-Key': process.env.FIREFLY_CLIENT_ID,
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    data: body,
  };

  const response = await axios(config);
  return response.data;
}

async function createSocialMediaRenditions(accessToken) {

  // Upload the source image
  let upload = await uploadImage('./source-image.jpg', 'image/jpeg', accessToken);
  let sourceImageId = upload.images[0].id;

  // Loop through each platform and generate renditions
  for (let platform of socialMediaPlatforms) {
    let result = await genExpand(
      sourceImageId,
      platform.width,
      platform.height,
      accessToken
    );

    console.log(`Generated rendition for ${platform.name} at ${result.outputs[0].image.url}`);
  }
}
```

## Next Steps

[Firefly's Expand Image API](../api/generative_expand/V3/) is a powerful tool to help designers create new variations of their existing media at a large scale, and to be able to have fine-grained control over the result with the options available. Check out the [API Reference](../api/generative_expand/V3/) for more details.
