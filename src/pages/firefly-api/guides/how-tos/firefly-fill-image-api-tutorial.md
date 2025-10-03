---
title: Firefly Fill Image API Tutorial - Adobe Firefly API
description: >-
  Learn to become an advanced user of Firefly's Fill Image API. Fill in specific
  regions of an image by replacing them with AI-generated content base...
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
  - Adobe Firefly Fill Image API
  - Adobe Firefly Fill Image API tutorial
contributors:
  - 'https://github.com/bishoysefin'
hideBreadcrumbNav: true
og:
  title: Firefly Fill Image API Tutorial - Adobe Firefly API
  description: >-
    Learn to become an advanced user of Firefly's Fill Image API. Fill in
    specific regions of an image by replacing them with AI-generated content
    base...
twitter:
  card: summary
  title: Firefly Fill Image API Tutorial - Adobe Firefly API
  description: >-
    Learn to become an advanced user of Firefly's Fill Image API. Fill in
    specific regions of an image by replacing them with AI-generated content
    base...
---

# Firefly Fill Image API Tutorial

Generatively edit specific areas of an image with the [Fill Image API](../api/generative_fill/V3_Async/)

||
| --- | --- | --- |
| ![source-person-photo-1](../images/source-person-photo-1.png) | ![mask-person-photo-1](../images/mask-person-photo-1.png) | ![result-person-photo-1](../images/result-person-photo-1.jpeg)

## Overview

In this tutorial, let's imagine we manage the website of a company and we need to update thousands of employee photos on the website to have a consistent, tasteful, and professional look. Using the Fill Image API, we'll replace the backgrounds of all the employee photos with a similar style.

In this tutorial:

- Upload employee images along with their mask images to target each photo's background.
- Write a prompt that generates the artwork for the new backgrounds.
- Use the Fill Image API to replace the backgrounds of the employee photos with the new generated, consistent artwork.

You may walk through this tutorial step-by-step or [jump immediately to the full source code](#full-example) to learn more.

## Prerequisites

- You'll need a Firefly Services **Client ID** and **Client Secret**. To get these credentials, see the [Adobe Developer Console](../concepts/dev-console) page.

### Set up your environment

Before we begin this [Node.js](https://nodejs.org/en/download/package-manager) tutorial, run the following in a secure terminal:

```bash
export FIREFLY_SERVICES_CLIENT_ID=yourClientIdAsdf123
export FIREFLY_SERVICES_CLIENT_SECRET=yourClientSecretAsdf123

mkdir firefly-fill-image-api-tutorial
cd firefly-fill-image-api-tutorial
npm init --y
npm install axios qs
touch index.js
```

### Download the sample images

Save all four of the images below, two source images and two mask images, as PNG files to your project folder.

||
| --- | --- |
| ![source-person-photo-1](../images/source-person-photo-1.png) <p style="text-align:center">source-person-photo-1.png</p> | ![mask-person-photo-1](../images/mask-person-photo-1.png) <p style="text-align:center">mask-person-photo-1.png</p>
| ![source-person-photo-2](../images/source-person-photo-2.png) <p style="text-align:center">source-person-photo-2.png</p> | ![mask-person-photo-2](../images/mask-person-photo-2.png) <p style="text-align:center">mask-person-photo-2.png</p>

<InlineAlert variant="info" slots="text" />

In your own applications, use [Photoshop Create Mask API](https://developer.adobe.com/firefly-services/docs/photoshop/api/?aio_internal) to automate the creation of masks for your own images.

## Step 1 - Upload the images

Upload both the source image and the mask image using the [Upload API](../api/upload_image/V2):

```js
const fs = require('fs');

async function uploadImage({ filePath, fileType, accessToken }) {
  const fileStream = fs.createReadStream(filePath);
  const fileStats = fs.statSync(filePath);
  const fileSizeInBytes = fileStats.size;

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

## Step 2 - Write a background prompt

Now let's describe to the AI the new background we want for our photos. To get a professional look, let's use a smooth gradient background with corporate blue tones.

```js
const backgroundPrompt = 'A professional background for corporate headshots, blending a smooth gradient in neutral tones (e.g., gray, beige, or light blue) with subtle abstract artistic elements. Include elegant geometric shapes, soft brushstroke patterns, or layered textures that provide a modern and sophisticated appearance without overpowering the subject. The abstract elements should create depth and interest while maintaining a clean, polished, and corporate-appropriate aesthetic.';
```

## Step 3 - Replace the backgrounds

This JavaScript function calls the [Fill Image API](../api/generative_fill/V3_Async/):

```js
async function genFill({ maskId, sourceId, prompt, accessToken }) {
  const body = {
    image: {
      mask: {
        uploadId: maskId,
      },
      source: {
        uploadId: sourceId,
      },
    },
    prompt: prompt,
  };

  const config = {
    method: 'post',
    url: 'https://firefly-api.adobe.io/v3/images/fill',
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

## Step 4 - Generate new backgrounds

Process each employee photo to generate a new image with an updated background:

```js
async function updateEmployeePhotos() {
  const accessToken = await getAccessToken();

  const employees = [
    {
      name: 'Jane Smith',
      imagePath: './source-person-photo-1.png',
      maskPath: './mask-person-photo-1.png',
    },
    {
      name: 'John Doe',
      imagePath: './source-person-photo-2.png',
      maskPath: './mask-person-photo-2.png',
    },
    // Add more employees as needed
  ];

  for (const employee of employees) {
    try {
      // Upload the source and mask images
      const sourceUploadResponse = await uploadImage(employee.imagePath, 'image/png', accessToken);
      const sourceImageId = sourceUploadResponse.images[0].id;

      const maskUploadResponse = await uploadImage(employee.maskPath, 'image/png', accessToken);
      const maskImageId = maskUploadResponse.images[0].id;

      // Generate the new image
      const result = await genFill({
        maskImageId,
        sourceImageId,
        backgroundPrompt,
        accessToken
      });

      console.log(`Updated photo for ${employee.name}`);
      console.log(`New image URL: ${result.outputs[0].image.url}`);
    } catch (error) {
      console.error(`Error updating photo for ${employee.name}:`, error.response.data);
    }
  }
}
```

||
| --- | --- |
| ![result-person-photo-1](../images/result-person-photo-1.jpeg) | ![result-person-photo-2](../images/result-person-photo-2.jpeg)

## Full example

Here is a full example that includes all the steps from this tutorial. If you haven't completed the steps above, review this [tutorial's prerequisites](#prerequisites) section before running this code.

This tutorial was written in CommonJS. If you'd prefer to use ES6 modules, convert the code by changing the `require` statements to `import` statements and then changing the file name from `index.js` to `index.mjs`.

 <InlineAlert variant="warning" slots="header, text" />

 This code is for educational purposes only.

 This code example IS NOT production-ready and shouldn't be used in a live application without additional error handling, logging, security measures.

```js
const axios = require("axios");
const qs = require("qs");
const fs = require("fs");

// Define the background replacement prompt
const backgroundPrompt = 'A professional background for corporate headshots, blending a smooth gradient in neutral tones (e.g., gray, beige, or light blue) with subtle abstract artistic elements. Include elegant geometric shapes, soft brushstroke patterns, or layered textures that provide a modern and sophisticated appearance without overpowering the subject. The abstract elements should create depth and interest while maintaining a clean, polished, and corporate-appropriate aesthetic.';

// Assuming you have a list of employee image file paths and corresponding mask file paths
const employees = [
  {
    name: "Jane Smith",
    imagePath: "./source-person-photo-1.png",
    maskPath: "./mask-person-photo-1.png",
  },
  {
    name: "John Doe",
    imagePath: "./source-person-photo-2.png",
    maskPath: "./mask-person-photo-2.png",
  },
  // Add more employees as needed
];

(async () => {
  const accessToken = await retrieveAccessToken();
  await updateEmployeePhotos(accessToken);
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

async function genFill({ maskId, sourceId, prompt, accessToken }) {
  const body = {
    image: {
      mask: {
        uploadId: maskId,
      },
      source: {
        uploadId: sourceId,
      },
    },
    prompt: prompt,
  };

  const config = {
    method: "post",
    url: "https://firefly-api.adobe.io/v3/images/fill",
    headers: {
      "X-Api-Key": process.env.FIREFLY_SERVICES_CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(body),
  };

  const response = await axios(config);
  return response.data;
}

async function updateEmployeePhotos(accessToken) {
  for (let employee of employees) {
    try {
      // Upload the source and mask images
      const sourceUploadResponse = await uploadImage({
        filePath: employee.imagePath,
        fileType: "image/png",
        accessToken,
      });
      const sourceImageId = sourceUploadResponse.images[0].id;

      const maskUploadResponse = await uploadImage({
        filePath: employee.maskPath,
        fileType: "image/png",
        accessToken,
      });
      const maskImageId = maskUploadResponse.images[0].id;

      // Generate the new image
      const result = await genFill({
        maskId: maskImageId,
        sourceId: sourceImageId,
        prompt: backgroundPrompt,
        accessToken,
      });

      console.log(
        `Updated photo for ${employee.name} at url ${result.outputs[0].image.url}`,
      );
    } catch (error) {
      console.error(
        `Error updating photo for ${employee.name}:`,
        error.response.data,
      );
    }
  }
}
```

## Deepen your understanding

Now that you have a working implementation of the Fill Image API, visit the [API reference documentation](../api/generative_fill/V3_Async/) with more technical details for advanced use cases.
