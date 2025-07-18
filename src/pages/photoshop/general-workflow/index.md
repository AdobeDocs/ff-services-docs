---
title: Adobe Photoshop API general workflow
description: Learn the general workflow of the Photoshop API
keywords:
  - Photoshop API general workflow
contributors:
  - https://github.com/khound
  - https://github.com/archyposada
hideBreadcrumbNav: true
---

# General Workflow for Photoshop API

The typical workflow involves making one or more calls to our API, to edit PSD or other image files, and to create new image renditions.

As you begin integrating the Ps APIs into your workflow, there are a few considerations to keep in mind which we've outlined below:

## Input and Output file storage

The Photoshop API works with any public or signed url. We have documented a few of the most common storage services and how to generate the urls programmatically.

**AWS S3:** Pre-signed GET/PUT URL. For more information about pre-signed urls on S3 you can go [here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html). Here are some code samples that show you how to generate your pre-signed urls programmatically:

  - [Node.js](https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/storage-app/aws-s3/presignedURLs.js) <br />Please note that creating pre-signed urls for AWS S3 requires signature version S3V4, as demonstrated in the sample code.
  - [Python](https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/storage-app/azure/presignedURLs.py)

We also have a python [application](https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/storage-app/aws-s3/example.py) that provides a working example of how to call our api using assets stored in AWS S3.

**Google Drive:**: Signed GET/PUT URL. For more information on how to setup your Google drive account for access to creating a signed URL [here](https://www.labnol.org/google-api-service-account-220404). Here are some code samples for getting signed urls.

  - [Node.js](https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/storage-app/googledrive/presignedURLs.js)

**Azure:** SAS (Shared Access Signature) for upload/download. For more information on how to generate a Shared Access Signature you can go [here](https://azuresdkdocs.blob.core.windows.net/$web/python/azure-storage-blob/12.9.0/index.html). Here are some code samples for generating a url with Shared Access Signature.

  - [Node.js](https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/storage-app/azure/presignedURLs.js)
  - [Python](https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/storage-app/azure/presignedURLs.py)

**Dropbox:** Temporary upload/download URLs.  For more information on how to generate an upload/download you can go [here](https://www.dropbox.com/developers/documentation). You can also create a file upload link for dropbox [here](https://www.dropbox.com/developers/documentation/http/documentation#files-get_temporary_upload_link).

**Note :** You can test to see if your public URL or pre-signed url is working.

Run the curl command below to see if your input file path is working.

  ```bash
  curl -X GET <Your file path> --output <some-file.jpg>
  ```

  If you are using a presigned url, put your file path within ""

  ```bash
  curl -X GET "<Your file path>" --output <some-file.jpg>
  ```

Run the curl command below to see if your output file path is working

  ```bash
  curl -X PUT <Your file path> -d <some-file.txt>
  ```

  If you are using a presigned url, put your file path within ""

  ```bash
  curl -X PUT "<Your file path>" -d <some-file.txt>
  ```

## Current Limitations

There are a few limitations to the APIs you should be aware of ahead of time.

- Multi-part uploads and downloads are not yet supported.
- All the endpoints only support a single file input.

## Retries

For increased reliability and stability we have added a retry mechanism for all API calls, and have some recommendations on how to handle these:

- The service will retry status codes of 429, 502, 503, 504 three times.
- You should only retry requests that have a 5xx response code. A 5xx error response indicates there was a problem processing the request on the server.
- You should implement an exponential back-off retry strategy with 3 retry attempts.
- You should not retry requests for any other response code.
