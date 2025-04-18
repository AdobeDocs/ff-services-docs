---
title: Working with the Rendition API
description: Quickstart cURL commands to use the Rendition API.
---
# Working with the Rendition API

Create PDF, JPEG, or PNG renditions from a
specific InDesign document using the Rendition API.

## Quickstart

Use the cURL command below to create a JPEG image from an InDesign document.

Be sure to update the `{PRE-SIGNED_URL}` with [the pre-signed URL of the InDesign document][1].

```curl
curl --request POST \ 
  --url https://indesign.adobe.io/v3/create-rendition \ 
  --header 'Authorization: bearer {YOUR_OAUTH_TOKEN}' \ 
  --header 'x-api-key: {YOUR_API_KEY}' \ 
  --header 'Content-Type: application/json' \ 
  --data-raw '{ 
        "assets": [ 
            { 
              "source": { 
                    "url": "{PRE-SIGNED_URL}" 
              }, 
              "destination": "Short_Document.indd" 
            } 
        ], 
        "params": { 
            "outputMediaType": "image/jpeg", 
            "pageRange": "All", 
            "quality": "medium", 
            "resolution": 72, 
            "targetDocuments": [ 
                "Short_Document.indd" 
            ], 
            "outputFolderPath":"outputfolder" 
      } 
}
```

The raw data may include three
parts:

- **assets** - Input assets for the request.
- **params** - Information about what to do with the input assets.
- **outputs** - Specify locations where the output assets are uploaded. Without an `outputs` parameter, the output assets are stored in a temporary
repository, and a [pre-signed URL][2] will be shared for those assets, which will be valid for 24hrs.

Consult this skeleton [cURL request][3] for more details.

[1]: ../../concepts/index.md#Pre-signed-URLs
[2]: ../../concepts/index.md#Pre-signed-URLs
[3]: https://developer.adobe.com/commerce/webapi/get-started/gs-curl/
