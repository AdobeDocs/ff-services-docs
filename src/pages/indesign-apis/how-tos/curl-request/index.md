---
title: Quickstart for InDesign API
description: cURL commands to make requests to InDesign APIs.
---

# Quickstart for InDesign API

Here's a skeleton [cURL request](https://developer.adobe.com/commerce/webapi/get-started/gs-curl/) to use to access InDesign APIs:

```curl
    curl --location --request POST <API_ENDPINT> \
    --header 'Authorization: bearer <YOUR_OAUTH_TOKEN>' \
    --header 'x-api-key: <YOUR_API_KEY>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "assets": [
            ...
        ],
        "params": {
            ...
        },
        "outputs": [
            ...
        ]
    }
```

The raw data for the request has three main
parts:

- **Assets** - Specify input assets for the request.
- **Params** - Specify information regarding what to do with the input assets.
- **Outputs** - Specify the locations where the output assets are uploaded.Without an `outputs` parameter, the output assets are stored in a temporary
repository, and a [pre-signed URL](/indesign-apis/concepts/#pre-signed-urls) will be shared for those assets, which will be valid for 24hrs.
