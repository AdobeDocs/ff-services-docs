---
title: Firefly Fill Image API Tutorial - Adobe Firefly API
description: Learn to become an advanced user of Firefly's Fill Image API. Fill in specific regions of an image by replacing them with AI-generated content based on a text prompt. In this tutorial, we'll use it to replace backgrounds in employee photos for a consistent and professional look.
keywords:
  - Adobe Firefly Services
  - Adobe Firefly Fill Image API
  - Adobe Firefly Fill Image API tutorial
  - Firefly API
  - Firefly Generative Fill
  - Fill Images
  - How-to guides
  - Firefly endpoint
contributors:
  - https://github.com/bishoysefin
hideBreadcrumbNav: true
---

# Firefly Fill Image API Tutorial

Modify specific regions of an image by replacing them with AI-generated pixels with the [Fill Image API](../api/generative_fill/V3).

||
| --- | --- | --- |
| ![source-person-photo-1](../images/source-person-photo-1.png) | ![mask-person-photo-1](../images/mask-person-photo-1.png) | ![result-person-photo-1](../images/result-person-photo-1.jpeg)

## Overview

For this tutorial, let's imagine we are on a team that manages the website of a Fortune 100 company. We need to update thousands of employee photos on the website to have a consistent and professional look. Because it is it's too expensive and time-consuming to schedule new photo sessions for every employee, we decide to efficiently use the Fill Image API to replace the backgrounds of the employee photos with a uniform style, ensuring a cohesive online presence.

In this tutorial, we will:

* **Replace Backgrounds:** Change the background of employee photos to a uniform, professional setting.
* **Maintain Consistency:** Ensure all photos have the same look without the need for new photo sessions.

Depending on your learning style, you may prefer to walk through this tutorial step-by-step or [go straight to the full source code](#full-example) at the bottom of this webpage.

## Prerequisites

This tutorial assumes you have worked with your Adobe Representative and have the following:

* An [Adobe Developer Console](https://developer.adobe.com/console/786177/home) account.
* A [project](https://developer.adobe.com/developer-console/docs/guides/projects/projects-empty/) with Firefly API [OAuth Server-to-Server credentials set up](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/).
* Access to your Client ID and Client Secret from the [Adobe Developer Console project](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/#api-overview). Securely store these credentials and never expose them in client-side or public code.

### Set up environment

Before we begin this [Node.js](https://nodejs.org/en/download/package-manager) tutorial, run the following in a secure terminal:

```bash
export FIREFLY_CLIENT_ID=yourClientIdAsdf123
export FIREFLY_CLIENT_SECRET=yourClientSecretAsdf123

mkdir firefly-fill-image-api-tutorial
cd firefly-fill-image-api-tutorial
npm init --y
npm install axios qs
touch index.js
```

### Download sample images

Right click on each of the images below to download and save them to your project folder.

||
| --- | --- |
| ![source-person-photo-1](../images/source-person-photo-1.png) <p style="text-align:center">source-person-photo-1.webp</p> | ![mask-person-photo-1](../images/mask-person-photo-1.png) <p style="text-align:center">mask-person-photo-1.webp</p>
| ![source-person-photo-2](../images/source-person-photo-2.png) <p style="text-align:center">source-person-photo-2.webp</p> | ![mask-person-photo-2](../images/mask-person-photo-2.png) <p style="text-align:center">mask-person-photo-2.webp</p>

<InlineAlert variant="info" slots="text" />

When creating your own applications, use the Photoshop API's [Create Mask](https://developer.adobe.com/firefly-services/docs/photoshop/api/photoshop_createMask/) endpoint to automate creation masks for your own images.

## Upload images

Let's begin by uploading both the source image and the mask image using Firefly's [Upload API](../api/upload_image/V2).

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
      'X-API-Key': process.env.FIREFLY_FIREFLY_CLIENT_ID,
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

## Write background prompt

Let's next describe the new background you want for our photos. For a professional look, let's use a smooth gradient background with corporate blue tones.

```js
const backgroundPrompt = 'A professional background for corporate headshots, blending a smooth gradient in neutral tones (e.g., gray, beige, or light blue) with subtle abstract artistic elements. Include elegant geometric shapes, soft brushstroke patterns, or layered textures that provide a modern and sophisticated appearance without overpowering the subject. The abstract elements should create depth and interest while maintaining a clean, polished, and corporate-appropriate aesthetic.';
```

## Replace backgrounds

Below is a sample JavaScript function that calls the [Fill Image API](../api/generative_fill/V3).

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
      'X-Api-Key': process.env.FIREFLY_FIREFLY_CLIENT_ID,
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(body),
  };

  const response = await axios(config);
  return response.data;
}
```

## Generate photo backgrounds

Now, you can process each employee photo and generate a new image with the updated background.

```js
async function updateEmployeePhotos() {
  const accessToken = await getAccessToken();

  const employees = [
    {
      name: 'Jane Smith',
      imagePath: './source-person-photo-1.webp',
      maskPath: './mask-person-photo-1.webp',
    },
    {
      name: 'John Doe',
      imagePath: './source-person-photo-2.webp',
      maskPath: './mask-person-photo-2.webp',
    },
    // Add more employees as needed
  ];

  for (const employee of employees) {
    try {
      // Upload the source and mask images
      const sourceUploadResponse = await uploadImage(employee.imagePath, 'image/webp', accessToken);
      const sourceImageId = sourceUploadResponse.images[0].id;

      const maskUploadResponse = await uploadImage(employee.maskPath, 'image/webp', accessToken);
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

Review this tutorial's [Prequisites](#prerequisites) section to understand how to set up your environment prior to running this code. (Because this code is for educational purposes only, it is not production-ready and requires additional error handling, logging, security measures, and more before it can be used in a live application.)

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
    imagePath: "./source-person-photo-1.webp",
    maskPath: "./mask-person-photo-1.webp",
  },
  {
    name: "John Doe",
    imagePath: "./source-person-photo-2.webp",
    maskPath: "./mask-person-photo-2.webp",
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

async function uploadImage({ filePath, fileType, accessToken }) {
  const fileStream = fs.createReadStream(filePath);
  const fileStats = fs.statSync(filePath);
  const fileSizeInBytes = fileStats.size;

  const config = {
    method: "post",
    url: "https://firefly-api.adobe.io/v2/storage/image",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-API-Key": process.env.FIREFLY_CLIENT_ID,
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
      "X-Api-Key": process.env.FIREFLY_CLIENT_ID,
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
        fileType: "image/webp",
        accessToken,
      });
      const sourceImageId = sourceUploadResponse.images[0].id;

      const maskUploadResponse = await uploadImage({
        filePath: employee.maskPath,
        fileType: "image/webp",
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

We wrote this tutorial using the CommmonJS convention in order to make it easy to get up and running with the code. If you'd prefer to use ES6 modules, you can easily convert the code by changing the `require` statements to `import` statements and then changing the file name from `index.js` to `index.mjs`.

## Deepen your understanding

Now that you have a working implementation of the Fill Image API, visit its [reference documentation](../api/generative_fill/V3) to explore more advanced use cases for automating your workflows.
