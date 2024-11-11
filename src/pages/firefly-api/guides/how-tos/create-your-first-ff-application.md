---
title: Create Your First Firefly API Implementation - Adobe Firefly API
description: This how-to guides you through the process of integrating Adobe's Firefly workflows into your applications.
keywords:
  - Adobe Firefly Services
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
  - https://github.com/cfjedimaster
  - https://github.com/nimithajalal
  - https://github.com/hollyschinsky
hideBreadcrumbNav: true
---

# Firefly Generate Images API Tutorial

Efficiently become an advanced user of Firefly's Generate Images API

![paris tourism illustration](../images/paris.jpeg)

## Overview

To ground the lesson of [Firefly's Generate Images API](../api/image_generation/V3/index.md) in reality, let's pretend we're a global tourism company creating a marketing campaign with localized assets for each of the destinations it promotes. While the company may have 100 locations, to keep the code simple, we'll just focus on two: Paris and Tokyo.

<InlineAlert variant="info" slots="text" />

Depending on your learning style, we invite you to walk through this use-case step-by-step or jump straight to the [full source code](#full-source-code).

## Prerequisites

Before we focus on the code, prepare for this tutorial by running the following in a secure terminal:

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

## Generating our first image

Begin by pasting this script into your `index.js` file and run `node index.js` to generate an image:


```javascript
const axios = require("axios");
const qs = require("qs");

(async () => {
  const accessToken = await retrieveAccessToken();
  const images = await createImages(accessToken);
  console.log(JSON.stringify(images, null, 2));
})();

async function createImages(accessToken) {
  const data = { prompt: "Fun, abstract tourism doodle that inspires travel" }
  return generateImage({ accessToken, data, });
}

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

async function generateImage({ accessToken, data }) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://firefly-api.adobe.io/v3/images/generate",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-api-key": process.env.FIREFLY_CLIENT_ID,
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

## Specifying size, style, and locale

Next, let's build out our request to generate artwork with:

* Style presets of `doodle_drawing` and `scribble_texture`
* A landscape (16:9) aspect ratio
* A localized style of `en-US`
* A prompt to generate an tourism image

If you're following along, update your `data` object to match the following:

```javascript
const data = {
  prompt: "Fun, abstract tourism doodle that inspires travel",
  size: { width: 2688, height: 1536 },
  promptBiasingLocaleCode: "en-US",
  style: {
    presets: ["doodle_drawing", "scribble_texture"],
  },
}
```

## Generate images for multiple locations

Finally, let's generate multiple variations by adding this object to the top of our file:

```javascript
const axios = require("axios");
const qs = require("qs");

const IMAGE_VARIATIONS = [
  {
    location: "Paris, France",
    locale: "fr-FR",
    customPrompt: "Includes delicious baguettes and croissants.",
  },
  {
    location: "Tokyo, Japan",
    locale: "ja-JP",
    customPrompt: "Includes delicious sushi and ramen.",
  },
];

...
```

And let's update the `createImages` function generate images for each location:

```javascript
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



## Full Source Code

Review this tutorial's [Prequisites](#prerequisites) section to understand how to run this code locally.

We kept this tutorial code succinct in order to focus on efficiently teaching you the advanced features of Firefly' Generate Images API. Therefore, as you review the script below, imagine how the tourism company could easily expand it to generate more targeted variations of images for their marketing campaign, including image variations for seasonality and even highlighting different activities such as ocean cruises, mountain hiking, and more. Feel free to use this code in your own projects, but be sure to refactor anything you reuse to be secure and production-ready, as this code is for educational purposes only.

```javascript
const axios = require("axios");
const qs = require("qs");

const IMAGE_VARIATIONS = [
  {
    location: "Paris, France",
    locale: "fr-FR",
    customPrompt: "Includes delicious baguettes and croissants.",
  },
  {
    location: "Tokyo, Japan",
    locale: "ja-JP",
    customPrompt: "Includes delicious sushi and ramen.",
  },
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

async function generateImage({ accessToken, data }) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://firefly-api.adobe.io/v3/images/generate",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-api-key": process.env.FIREFLY_CLIENT_ID,
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
