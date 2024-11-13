---
title: Employee Headshots with Firefly Fill Image API
description: A guide to using the Firefly Fill Image API in your code workflows.
keywords:
  - Adobe Firefly Services
  - Firefly API
  - Firefly Generative Fill
  - Fill Images
  - How-to guides
  - Firefly endpoint
contributors:
  - https://github.com/cfjedimaster
  - https://github.com/hollyschinsky
  - https://github.com/bishoysefin
hideBreadcrumbNav: true
---

# Employee Headshots with Firefly Fill Image API

Learn how to use the [Fill Image API](../api/generative_fill/V3) to replace backgrounds in employee headshots for a consistent and professional look.

## Overview

Maintaining a consistent and professional appearance across all employee headshots is essential for company branding and a cohesive online presence. However, scheduling new photoshoots for every employee can be time-consuming and costly. 

Adobe Firefly's [Fill Image API](../api/generative_fill/V3) provides a powerful solution to automate background replacement in existing headshots, allowing you to update and unify employee photos efficiently.

<InlineAlert variant="warning" slots="title,text" />

DISCLAIMER

The code in this tutorial is for educational purposes only. It is not production-ready and requires additional error handling, logging, security measures, and more before it can be used in a live application.

Depending on your learning style, you may prefer to walk through this tutorial step-by-step or [go straight to the full source code](#full-source-code) at the bottom of this webpage.

## Prerequisites

Before we begin, run the following in a secure terminal:

```bash
export FIREFLY_CLIENT_ID=yourClientIdAsdf123
export FIREFLY_CLIENT_SECRET=yourClientSecretAsdf123

mkdir firefly-fill-image-api-tutorial
cd firefly-fill-image-api-tutorial
npm init --y
npm install axios qs
touch index.js
```

<InlineAlert variant="info" slots="text" />

If you don't already have a Firefly "client ID" and "client secret", retrieve them from your [Adobe Developer Console project](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/#api-overview) before reading further. **Securely store these credentials and never expose them in client-side or public code.**


## Introduction to the Fill Image API

The [Fill Image API](../api/generative_fill/V3) allows you to modify specific regions of an image by replacing them with AI-generated content based on a text prompt. In this tutorial, we'll use it to:

* **Replace Backgrounds:** Change the background of employee headshots to a uniform, professional setting.
* **Maintain Consistency:** Ensure all headshots have the same look without reshooting.

## Source and Mask Images

The source and mask images are below, and will be uploaded using [Firefly's Upload API](../api/upload_image/).

##### Source image

![Source image](../images/gen-fill-source.png)

##### Mask image

![Mask image](../images/gen-fill-mask.png)

**Note:** Use the Photoshop API's [Create Mask](https://developer.adobe.com/firefly-services/docs/photoshop/api/photoshop_createMask/) endpoint to automate the creation of a mask.

## Upload Images to Firefly Storage

You'll need to upload both the source image and the mask image using the Firefly Upload API.

```js
const fs = require('fs');

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
```
**Example Usage:**

```js
const sourceUploadResponse = await uploadImage('./employee.jpg', 'image/jpeg', accessToken);
const sourceImageId = sourceUploadResponse.images[0].id;

const maskUploadResponse = await uploadImage('./mask.png', 'image/png', accessToken);
const maskImageId = maskUploadResponse.images[0].id;
```


## Define Your Background Replacement Prompt

Decide on the new background you want for the headshots. For a professional look, you might choose a simple gradient or a specific office setting.

```js
const backgroundPrompt = 'a smooth gradient background with corporate blue tones';
```

## Use the Fill Image API to Replace Backgrounds

Below is a sample JavaScript function that could be used to call the [Fill Image API](../api/generative_fill/V3).

```js
async function genFill(maskId, sourceId, prompt, accessToken) {
  const body = {
    numVariations: 1,
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
Now, you can process each employee headshot and generate the updated images.

```js
async function updateEmployeeHeadshots() {
  const accessToken = await getAccessToken();

  // Assuming you have a list of employee image file paths and corresponding mask file paths
  const employees = [
    {
      name: 'John Doe',
      imagePath: './employee1.jpg',
      maskPath: './mask1.png',
    },
    {
      name: 'Jane Smith',
      imagePath: './employee2.jpg',
      maskPath: './mask2.png',
    },
    // Add more employees as needed
  ];

  for (let employee of employees) {
    try {
      // Upload the source and mask images
      const sourceUploadResponse = await uploadImage(employee.imagePath, 'image/jpeg', accessToken);
      const sourceImageId = sourceUploadResponse.images[0].id;

      const maskUploadResponse = await uploadImage(employee.maskPath, 'image/png', accessToken);
      const maskImageId = maskUploadResponse.images[0].id;

      // Generate the new image
      const result = await genFill(
        maskImageId,
        sourceImageId,
        backgroundPrompt,
        accessToken
      );

      console.log(`Updated headshot for ${employee.name}`);
    } catch (error) {
      console.error(`Error updating headshot for ${employee.name}:`, error.response.data);
    }
  }
}
```

## Full Source Code

Here is the complete source code combining all the steps:

```js
const axios = require('axios');
const qs = require('qs');
const fs = require('fs');

// Set the credentials based on environment variables
const CLIENT_ID = process.env.FIREFLY_CLIENT_ID;
const CLIENT_SECRET = process.env.FIREFLY_CLIENT_SECRET;

// Define the background replacement prompt
const backgroundPrompt = 'a smooth gradient background with corporate blue tones';

```

## Next Steps

For more examples of what's possible with Firefly APIs, check out the other guides in this [how-tos](../how-tos/) section and the [API Reference](../api/image_generation/V3/) for more details.