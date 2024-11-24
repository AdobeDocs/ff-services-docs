---
title: Adobe Developer Console
description: A guide to authentication for Adobe Firefly API
keywords:
  - Adobe Firefly Services
  - Authentication
  - Firefly API
  - Credentials
  - Server-to-server
  - Developer documentation
  - Authentication concepts
  - Authorization
  - Identity verification
  - OAuth
  - API security
  - Access tokens
  - Client secret
  - Authentication methods
  - User authentication
  - Client authentication
  - Authentication flow
  - Token-based authentication
  - Single sign-on (SSO)
  - Generate token
  - Firefly access
  - Identity management
  - Secure API access
  - Authentication protocols
  - Authentication best practices
contributors:
  - https://github.com/bishoysefin
hideBreadcrumbNav: true
---

# Image Upload

Use Images with Firefly APIs

## Overview

Some Firefly APIs require images to be uploaded as part of their transactions. The Firefly API offers two options for uploading images:

1. **Upload Endpoint:** Use Firefly's Upload Endpoint to upload an image from local storage. This operation generates an image ID that can be used in API calls.
2. **Pre-signed URLs:** Have Firefly APIs read from **Azure**, **AWS**, or **Dropbox** pre-signed URLs.

## Using the Upload Endpoint

The Firefly Upload Endpoint allows you to upload images directly from local storage. After uploading, an image ID is returned, which you can use for subsequent API operations.

### Prerequisites

If you don't already have a Firefly "client ID" and "access token", learn how to retrieve them in the [Authentication Guide](../authentication/index.md) before reading further. **Securely store these credentials and never expose them in client-side or public code.**

### Upload Source Image

Below is a JavaScript example using `axios` to upload an image using Firefly's Upload API:

```javascript
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
    data: stream,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  };

  const response = await axios(config);
  return response.data;
}

// Example usage
uploadImage({
  filePath: './example-image.png',
  fileType: 'image/png',
  accessToken: 'YOUR_ACCESS_TOKEN'
}).then(response => {
  console.log(response);
}).catch(error => {
  console.error(error);
});
```

**Example Response:**

```json
{
  "images": [
    {
      "id": "510aabb4-e154-4a7b-bd2e-f492ee71c938"
    }
  ]
}
```

You can now use this `id` in subsequent Firefly API requests. The upload id is valid for **7 days** from the date of upload.

## Pre-signed URLs

If you prefer not to use the Firefly Upload Endpoint, you can reference images hosted on supported platforms via pre-signed URLs. The currently supported domains are:

* `*.amazonaws.com`
* `*.windows.net`
* `*.dropboxusercontent.com`

## Image Formats

Supported formats include `image/jpeg`, `image/png`, and `image/webp`.
