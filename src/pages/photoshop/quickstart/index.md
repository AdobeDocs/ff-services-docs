---
title: Quickstart
description: Quickstart guide for Photoshop API
contributors:
  - https://github.com/bishoysefin
---

# Quickstart Guide

Create your first Mask with Photoshop APIs

||
| --- | --- |
| ![a picture of a person golfing with a green scenic background](./images/masking-original.jpeg) <p style="text-align:center">Image</p> | ![a mask of a person golfing with a black background](./images/masking-output.png) <p style="text-align:center">Image Mask</p> |

## Prerequisites

If you don't already have a Photoshop "client ID" and "client secret", retrieve them from your [Adobe Developer Console project](https://developer.adobe.com/developer-console/docs/guides/services/services-add-api-oauth-s2s/#api-overview) before reading further. **Securely store these credentials and never expose them in client-side or public code.**

Pre-signed URLs:

* A pre-signed URL with a read token for the input image.
* A pre-signed URL with a read/write token for the output mask.

For more details, see [Understanding Pre-signed URLs](https://medium.com/@shivam_99875/understanding-pre-signed-urls-80be30b0adf3#:~:text=Fundamental%20Concept%3A,need%20for%20traditional%20authentication%20mechanisms.).

## Retrieve an Access Token

Open a secure terminal and `export` your "client ID" and "client secret" as environment variables so that your later commands can access them:

```bash
export PHOTOSHOP_CLIENT_ID=yourClientIdAsdf123
export PHOTOSHOP_CLIENT_SECRET=yourClientSecretAsdf123
```

Generate an access token:

```bash
curl --location 'https://ims-na1.adobelogin.com/ims/token/v3' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode "client_id=$PHOTOSHOP_CLIENT_ID" \
--data-urlencode "client_secret=$PHOTOSHOP_CLIENT_SECRET" \
--data-urlencode 'scope=openid,AdobeID,read_organizations'
```

The response will look like this:

```json
{"access_token":"yourAccessTokenAsdf123","token_type":"bearer","expires_in":86399}
```

Export this access token in your secure terminal so that the next script can conveniently access it:

```bash
export PHOTOSHOP_ACCESS_TOKEN=yourAccessTokenAsdf123
```

## Create Mask

Next, call the [Photoshop Create Mask API](../api/photoshop_createMask.md):

```bash
curl --location 'https://image.adobe.io/sensei/mask' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $PHOTOSHOP_CLIENT_ID" \
--header "Authorization: Bearer $PHOTOSHOP_ACCESS_TOKEN" \
--data '{
    "input":{
      "href":"<SIGNED_GET_URL>",
      "storage":"<storage>"
    },
    "output":{
      "href":"<SIGNED_POST_URL>",
      "storage":"<storage>"
    }
  }'
```

The response will look like this:

```json
{
  "_links": {
    "self": {
      "href": "https://image.adobe.io/sensei/status/<:jobId>"
    }
  }
}
```

## Get Status - Mask

Next up, we will use the [Get Status - Mask](../api/photoshop_status_mask.md) endpoint to monitor the job status until it completes. 

```bash
curl --location 'https://image.adobe.io/sensei/status/<:jobId>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $PHOTOSHOP_CLIENT_ID" \
--header "Authorization: Bearer $PHOTOSHOP_ACCESS_TOKEN" 
```

A successful response looks like:

```json
{
  "jobId": "f54e0fcb-260b-47c3-b520-de0d17dc2b67",
  "created": "string",
  "modified": "string",
  "status": "string",
  "metadata": {
    "service": {}
  },
  "output": {
    "href": "string",
    "storage": "<storage>",
    "mask": {
      "format": "soft"
    },
    "color": {
      "space": "rgb"
    }
  },
  "options": {
    "optimize": "performance"
  },
  "errors": [
    {}
  ],
  "_links": {
    "self": {}
  }
}
```

## View Created Mask

Access the mask at the `output.href` URL (the `SIGNED_POST_URL` provided earlier). 🎉

## Deepen Your Understanding

Explore more Photoshop API options in our [Photoshop Tutorials](../how-tos/photoshop-actions) 🚀
