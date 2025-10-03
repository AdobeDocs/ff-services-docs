---
title: Firefly Generate Image API Tutorial - Adobe Firefly API
description: >-
  Learn to become an advanced user of Firefly's Generate Image API. Generate a
  single image with a simple prompt, add aspect ratio, localized style, and
  style preset customizations, and generate localized images for multiple
  locations.
keywords:
  - Adobe Firefly Services
  - Adobe Firefly Generate Image API
  - Adobe Firefly Generate Image API tutorial
  - Firefly API
  - Integrating Firefly Services
  - Developer documentation
  - How-to guides
  - Tutorial
  - Firefly tutorial
  - Firefly API tutorial
  - Get started
  - Environment setup
  - Setup
  - Workflow
  - Credentials
  - Authentication
  - Sample code
  - Generate image
  - Call firefly
  - Sample call
  - Application development
  - First Firefly application
  - Firefly implementation
  - Prompts
  - Getting started with Firefly API
  - Application creation tutorial
  - Step-by-step guide
  - Development workflow
  - Application setup
  - API integration
  - User interface development
  - Backend implementation
  - Frontend development
  - SDK usage
  - Code examples
  - Automate processing
  - Development environment
  - Application deployment
  - Testing and debugging
  - Styles
contributors:
  - 'https://github.com/bishoysefin'
hideBreadcrumbNav: true
og:
  title: Firefly Generate Image API Tutorial - Adobe Firefly API
  description: >-
    Learn to become an advanced user of Firefly's Generate Image API. Generate a
    single image with a simple prompt, add aspect ratio, localized style, and
    style preset customizations, and generate localized images for multiple
    locations.
twitter:
  card: summary
  title: Firefly Generate Image API Tutorial - Adobe Firefly API
  description: >-
    Learn to become an advanced user of Firefly's Generate Image API. Generate a
    single image with a simple prompt, add aspect ratio, localized style, and
    style preset customizations, and generate localized images for multiple
    locations.
---

# Firefly Generate Image API Tutorial

Create custom illustrations and photos with the [Generate Image API](../api/image_generation/V3_Async/index.md)

![paris tourism illustration](../images/gen-image-tutorial-hero.jpeg)

## Overview

In this tutorial, let's imagine we work at a global tourism company and are creating a marketing campaign with localized illustrations for the different places our company promotes.

In the tutorial below, we will:

* First, generate a single image with a simple prompt
* Next, add aspect ratio, localized style, and style preset customizations
* Finally, generate localized images for multiple locations

Depending on your learning style, you may prefer to walk through this tutorial step-by-step or [jump immediately to the full source code](#full-example) at the bottom of this webpage.

## Prerequisites

This tutorial assumes you possess a Firefly Services **Client ID** and **Client Secret**. If you don't have these credentials, learn how to get them at the [Adobe Developer Console](../concepts/dev-console) page.

### Set Up Your Environment

Before we begin this [Node.js](https://nodejs.org/en/download/package-manager) tutorial, run the following in a secure terminal:

```bash
export FIREFLY_SERVICES_CLIENT_ID=yourClientIdAsdf123
export FIREFLY_SERVICES_CLIENT_SECRET=yourClientSecretAsdf123

mkdir firefly-generate-image-api-tutorial
cd firefly-generate-image-api-tutorial
npm init --y
npm install axios qs
touch index.js
```

## Generate an Image

Let's not bury the lede 😁 Here's the code to generate a single image with a simple prompt:

```js
async function generateImage({ accessToken, data = { prompt: "dog" } }) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://firefly-api.adobe.io/v3/images/generate",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-api-key": process.env.FIREFLY_SERVICES_CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
    data: JSON.stringify(data),
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
```

## Customize Requests

Firefly has a variety of options to customize your image generation requests. Let's explore some of these options by creating the following `data` object to customize our artwork:

* A landscape (16:9) aspect ratio
* A geographic style localized to `en-US`
* The style presets of `doodle_drawing` and `scribble_texture`

```js
const data = {
  prompt: "Fun, abstract tourism doodle that inspires travel",
  size: { width: 2688, height: 1536 },
  promptBiasingLocaleCode: "en-US",
  style: {
    presets: ["doodle_drawing", "scribble_texture"],
  },
}
```

## Define Localized Customizations

To generate localized customizations, we'll define this object at the top of our file:

```js
const IMAGE_VARIATIONS = [
  {
    location: "Paris, France",
    locale: "fr-FR",
    customPrompt: "Includes delicious croissants.",
  },
  {
    location: "Tokyo, Japan",
    locale: "ja-JP",
    customPrompt: "Includes delicious sushi.",
  },
];
```

And now let's update the `createImages` function to customize its requests for each location:

```js
async function createImages(accessToken) {
  return Promise.all(
    IMAGE_VARIATIONS.map(({ location, locale, customPrompt }) => {
      const data = {
        prompt: `Fun, abstract tourism doodle that inspires travel to ${location}. ${customPrompt}`,
        size: { width: 2688, height: 1536 },
        promptBiasingLocaleCode: locale,
        style: {
          presets: ["doodle_drawing", "scribble_texture"],
        },
      };

      return generateImage({ accessToken, data });
    }),
  );
}
```

## Full Example

Review this tutorial's [prerequisites](#prerequisites) section to understand how to set up your environment prior to running this code. (Because this code is for educational purposes only, it is not production-ready and requires additional error handling, logging, security measures, and more before it can be used in a live application.)

```js
const axios = require("axios");
const qs = require("qs");

const IMAGE_VARIATIONS = [
  {
    location: "Paris, France",
    locale: "fr-FR",
    customPrompt: "Includes delicious croissants.",
  },
  {
    location: "Tokyo, Japan",
    locale: "ja-JP",
    customPrompt: "Includes delicious sushi.",
  },
  // Add more locations here
];

(async () => {
  const accessToken = await retrieveAccessToken();
  const images = await createImages(accessToken);
  console.log(JSON.stringify(images, null, 2));
})();

async function createImages(accessToken) {
  return Promise.all(
    IMAGE_VARIATIONS.map(({ location, locale, customPrompt }) => {
      const data = {
        prompt: `Fun, abstract tourism doodle that inspires travel to ${location}. ${customPrompt}`,
        size: { width: 2688, height: 1536 },
        promptBiasingLocaleCode: locale,
        style: {
          presets: ["doodle_drawing", "scribble_texture"],
        },
      };

      return generateImage({ accessToken, data });
    }),
  );
}

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

async function generateImage({ accessToken, data }) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://firefly-api.adobe.io/v3/images/generate",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-api-key": process.env.FIREFLY_SERVICES_CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
    data: JSON.stringify(data),
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
```

We wrote this tutorial in CommmonJS in order to make it easy to get up and running with the code. If you'd prefer to use ES6 modules, convert the code by changing the `require` statements to `import` statements and then changing the file name from `index.js` to `index.mjs`.

## Deepen Your Understanding

Now that you have a working implementation of the Generate Image API, visit its [reference documentation](../api/image_generation/V3_Async/) to explore more advanced use cases for automating your workflows.
