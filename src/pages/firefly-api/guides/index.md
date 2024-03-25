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
  - https://github.com/amandahuarng
  - https://github.com/nimithajalal
  - https://github.com/hollyschinsky
hideBreadcrumbNav: true
---

# Quickstart Guide

This guide will show you how to make your first successful call to the Firefly Text-to-Image API.

Log into the [Adobe Developer Console](https://developer.adobe.com/console) using the profile that your admin created for you and create an access token. [Learn more](https://developer.adobe.com/firefly-services/docs/guides/get-started/#generate-an-api-key-and-access-token) about creating an access token.

To call the Firefly text-to-image endpoint, you need a valid API key (aka: client_id) and an access token. To get an access token, use the following command:

```bash
curl -X POST 'https://ims-na1.adobelogin.com/ims/token/v3' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'grant_type=client_credentials&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&scope=openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis'
```

Access tokens expire every 24 hours and it is wise that you rotate them programmatically before they expire. The token endpoint above returns expiry information alongside the token itself. Read more about this in our [auth guide](./concepts/authentication/index.md). Once you have this token, you are ready to make your first request to the text-to-image endpoint.

Now, replace your API key and access token in the example below, and you're all set to make your first request to the text-to-image endpoint.

## Request Headers

* `X-Api-Key`: This is a required parameter -- provide your client ID from Console.
* `Authorization`: This is a required header -- provide your access token.
* `Content-Type`: Specifies the media type of the request body.

## Example Request

```bash
curl --location 'https://firefly-api.adobe.io/v2/images/generate' \
--header 'X-Api-Key: {CLIENT_ID}' \
--header 'Authorization: {ACCESS_TOKEN}' \
--header 'Content-Type: application/json' \
--data '{
    "n": 1,
    "prompt": "Horse on a field.",
    "contentClass": "photo",
    "size": {
        "width": 2048,
        "height": 2048
    },
    "styles": {
        "presets": ["concept_art"]
    } 
}'
```

## Responses

Got a 200 response code? Great! Your API call was successful. Here is an example response:

```json
{
  "version": "2.10.2",
  "size": {
    "width": 2048,
    "height": 2048
  },
  "predictedPhotoSettings": {
    "aperture": 5.6,
    "shutterSpeed": 0.0005,
    "fieldOfView": 50
  },
  "outputs": [
    {
      "seed": 290878684,
      "image": {
          "id": "{IMAGE_ID}",
          "presignedUrl": "https://pre-signed-firefly-prod.s3.amazonaws.com/images/{IMAGE_ID}?..."
      }
    }
  ]
}
```

![Horse on a field, photo, concept_art](../images/horse_t2i_sample.jpg)

### Error Codes

To learn more about each response code, head over to the [**Try it** (Responses)](../guides/api/upload_image/index.md) section.

### Rate Limits

Read more about the text-to-image API's throttling limits [here](./concepts/rate-limits/index.md)

## Try it yourself

Go ahead and try making calls using the __Try it__ feature on the __API Reference__ page. Configure the headers and send a request. Once you get a 200 response code, the response body will contain a pre-signed URL of your image.
