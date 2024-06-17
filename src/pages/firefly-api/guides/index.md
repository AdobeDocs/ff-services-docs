---
title: Quickstart
description: A quickstart guide to the Adobe Firefly API
keywords:
  - Adobe Firefly Services
  - Firefly API guides
  - Developer documentation
  - Firefly API documentation
  - Quickstart
  - Firefly usage examples
  - Firefly API Key
  - Firefly example curl
  - Firefly content
  - Firefly generate
  - Example request
  - Example response
  - How-to guides
  - Firefly tutorial
  - Code samples
  - Getting started with Firefly API
  - API reference
  - Access token
  - Client ID
  - API Key
  - Firefly scope
  - Service scope
  - Firefly configuration guides
  - Text to image
  - Firefly endpoint
  - Use cases
  - Troubleshooting tips
  - Authentication
  - Authorization
  - Credentials
contributors:
  - https://github.com/hollyschinsky
hideBreadcrumbNav: true
---

# Quickstart Guide

This guide will show you how to make your first successful call to the [Firefly Generate Images API](./api/image_generation/V3/).

You need a valid API key and an access token to call the [Firefly Generate Images](./api/image_generation/V3/) endpoint. If you don't have an API key (aka: `client_id`) or access token yet, visit the [Getting Started guide](../../guides/get-started.md/) for instructions on obtaining them.

If you already have a project configured with Firefly Services in the [Adobe Developer Console](https://developer.adobe.com/console), you can generate an access token there, or use the credentials from it (client ID and client secret) to generate an access token with the following `curl` command, replacing the`{CLIENT_ID}` and `{CLIENT_SECRET}` values with your own.

<!-- Log into the [Adobe Developer Console](https://developer.adobe.com/console) using the profile that your admin created for you and create an access token. [Learn more](../get-started.md/#generate-an-api-key-and-access-token-from-the-adobe-developer-console) about creating an access token. -->

```bash
curl -X POST 'https://ims-na1.adobelogin.com/ims/token/v3' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'grant_type=client_credentials&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&scope=openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis'
```

<InlineAlert variant="warning" slots="text" />

Access tokens expire every 24 hours and it is wise that you rotate them programmatically before they expire. The token endpoint above returns expiry information alongside the token itself. Read more about this in our [auth guide](./concepts/authentication/index.md). Once you have this token, you are ready to make your first request to the [Generate Images](./api/image_generation/) endpoint.

Now, replace your API key and access token in the example below, and you're all set to make your first request to the [Generate Images](./api/image_generation/) endpoint.

## Request Headers

* `X-Api-Key`: This is a required parameter -- provide your client ID from the Developer Console project.
* `Authorization`: This is a required header -- provide your access token.
* `Content-Type`: Specifies the media type of the request body.

## Example Request

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/generate' \
--header 'X-Api-Key: {CLIENT_ID}' \
--header 'Authorization: {ACCESS_TOKEN}' \
--header 'Content-Type: application/json' \
--data '{
  "numVariations": 2,
  "seeds": [
    0,4999
  ],
  "size": {
    "width": 2048,
    "height": 2048
  },
  "prompt": "Horses in a field of sunflowers",
  "contentClass": "photo",
  "visualIntensity": 2,
  "style": {
    "presets": [
      "vibrant_colors"
    ],    
    "strength": 90   
  }
}'
```

## Responses

Got a 200 response code? Great! Your API call was successful.

### Response Payload

Here is an example response payload:

```json
{
  "size": {
    "width": 2048,
    "height": 2048
  },
  "outputs": [
    {
      "seed": 0,
      "image": {
        "url": "https://pre-signed-firefly-prod.s3-accelerate.amazonaws.com/images/c851e657-67e0-4a05-aa4a-91c2ab26b9a8?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARDA3TX66CSNORXF4%2F20240617%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240617T165447Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=10377687205d2f3d0c199c9348633aeb48d2cbb2075c01fa9b0bc0fd545c3aff"
      }
    },
    {
      "seed": 4999,
      "image": {
        "url": "https://pre-signed-firefly-prod.s3-accelerate.amazonaws.com/images/e5f03d33-05dc-43e3-a23d-edffa6d90ff8?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARDA3TX66CSNORXF4%2F20240617%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240617T165447Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=d34ffaecce34ef6f874e6fa668a27c2c8162cffc2fed0c2b71d8640be51f2764"
      }
    }    
  ],
  "contentClass": "photo"
}
```

### Image Results

- Seed 0 <br/>

 ![Horses in a field of sunflowers (photo)](./images/horses-sunflowers-0.jpg)

- Seed 4999 <br/>

 ![Horses in a field of sunflowers (photo) - seed 4999 ](./images/horses-sunflowers-4999.jpg)

### Error Codes

To learn more about each response code, head over to the [API's Responses](../guides/api/image_generation/V3/) section.

### Rate Limits

Read more about the Firefly APIs throttling limits [here](./concepts/rate-limits/index.md).

## Try it yourself

Go ahead and try making calls using the __Try it__ feature on the __API Reference__ page. Configure the headers and send a request. Once you get a 200 response code, the response body will contain a pre-signed URL of your image.
