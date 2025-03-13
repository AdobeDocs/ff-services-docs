---
title: Working with the Data Merge API
description: Quickstart cURL commands to use the Data Merge API.
---
# Working with the Data Merge API

![Data Merge](./image3.png)

Data merge generates variations of a template document
from data in a provided CSV file.

The Data Merge API supports UTF-16BE encoding for CSV files, which is necessary for languages or characters requiring multi-byte representation. For plain English characters, the CSV will function correctly even without this encoding.

The [Data Merge API](../../api/datamerge.md) includes two components to complete the task: the data merge and the data merge tags.

## Quickstart

The example below takes the data from `Directory_Names.csv` and creates different variations of `dataMergeTemplate.indd`. The
output is a merged INDD file of all variations.

### Merge data

This cURL command merges the data (from `Directory_Names.csv` into `dataMergeTemplate.indd`).

```curl
curl --location --request POST 'https://indesign.adobe.io/v3/merge-data' \
--header 'Authorization: Bearer {YOUR_OAUTH_TOKEN}' \
--header 'x-api-key: {YOUR_API_KEY}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "assets": [
    {
      "source": {
        "url": "{PRE-SIGNED_URL}",
        "storageType": "Azure"
      },
      "destination": "dataMergeTemplate.indd"
    },
    {
      "source": {
        "url": "{PRE-SIGNED_URL}",
        "storageType": "Azure"
      },
      "destination": "Directory_Names.csv"
    }
  ],
  "params": {
    "targetDocument": "dataMergeTemplate.indd",
    "outputMediaType": "application/x-indesign",
    "outputFolderPath": "outputfolder",
    "outputFileBaseString": "merged",
    "dataSource": "Directory_Names.csv"
  },
  "outputs": [
    {
      "destination": {
        "url": "{PUT-SIGNED_URL}"
      },
      "source": "outputfolder/merged.pdf"
    }
  ]
}'
```

The raw data may include three
parts:

- **assets** - Input assets for the request.
- **params** - Information about what to do with the input assets.
- **outputs** - Specify locations where the output assets are uploaded. Without an `outputs` parameter, the output assets are stored in a temporary
repository, and a [pre-signed URL](/indesign-apis/concepts/#pre-signed-urls) will be shared for those assets, which will be valid for 24hrs.

Consult this skeleton [cURL request](https://developer.adobe.com/commerce/webapi/get-started/gs-curl/) for more details.

### Retrieve data merge tags

This cURL command retrieves the data merge tags from the document.

```curl
curl --location --request POST 'https://indesign.adobe.io/v3/merge-data-tags' \
--header 'Authorization: Bearer {YOUR_OAUTH_TOKEN}' \
--header 'x-api-key: {YOUR_API_KEY}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "assets": [
    {
      "source": {
        "url": "{PRE-SIGNED_URL}",
        "storageType": "Azure"
      },
      "destination": "dataMergeTemplate.indd"
    },
    {
      "source": {
        "url": "{PRE-SIGNED_URL}",
        "storageType": "Azure"
      },
      "destination": "batang.ttc"
    }
  ],
  "params": {
    "outputMediaType": "application/x-indesign",
    "targetDocument": "dataMergeTemplate.indd",
    "includePageItemIdentifiers": true
  }
}'
```
