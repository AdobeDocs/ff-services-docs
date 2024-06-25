# Getting Started with the Enhance Speech API (Audio Services)

The Enhance Speech API, part of Adobe Audio Services, enables rich workflow automation around audio post-production.

## Overview

This guide will demonstrate how to create enhanced (noise and echo-free) versions of your spoken-audio assets. To accomplish this, follow the steps below to learn how to create and upload data for an audio `Asset`, create a `SpeechEnhancement`, and download its data when ready.

## Prerequisites

To get started, you will need:

- API credentials - these credentials were provided as part of the private beta in the form of a `client_id` and `client_secret`. You will need them available to get started.
- An HTTP client, like [Postman](https://www.postman.com/).

We also strongly encourage you to explore the [Enhance Speech within Adobe Podcast](https://podcast.adobe.com/enhance) site. The audio enhancement technology that backs this API is the same as the one available on the web, so exploring this will allow you to develop an intuition for how speech enhancement impacts audio, without writing any code!

## Concepts

Before diving into the API, it will be helpful to level-set on the following concepts:

1. `Asset`: An `Asset` represents a file that contains audio that is compatible with speech enhancement. Currently, the Enhance Speech API only support audio-only files, like `.mp3` files. However, we might support other files that contain audio (like video files), in the future.
2. `SpeechEnhancement`: A `SpeechEnhancement` represents an `Asset` that has been enhanced at a particular strength. As you can enhance an `Asset` at multiple strengths, it's possible to have many `SpeechEnhancement`s for a given `Asset`.

## Enhance Speech API Walkthrough

### Step 0: Obtain a valid access token

Ensure you have reference to a valid access token. See the [Firefly Services Getting Started Guide](../../guides/get-started.md) for details on how to obtain such a token.

### Step 1: Create an asset

Before you can run speech enhancement on an `Asset`, you'll need to register a new `Asset` with the Enhance Speech API. To accomplish this, use the `POST /audio_services/v1/assets` endpoint.

This endpoint requires the following information as a JSON request body:

- `filename`:<br/>
A filename (with extension) of the asset. We use this filename when naming the downloaded file for a downstream `SpeechEnhancement`.<br/>
**Example:** `"earhart-aviation.mp3"`<br/>
- `byte_size`:<br/>
The number of bytes of the asset.<br/>
**Example:** `59400`<br/>
- `content_type`<br/>
The content type of the asset.<br/>
**Example:** `"audio/mpeg"`<br/>

The `byte_size` and `content_type` are used to enable secure and verifiable direct uploads of your asset to our object store.

#### API Request

You can use the `curl` HTTP client to create an asset:

```bash
curl 'https://firefly-beta.adobe.io/audio_services/v1/assets'\
--header 'x-api-key: {CLIENT_ID}'\
--header 'Content-Type: application/json'\
--header 'Authorization: Bearer {ACCESS_TOKEN}'\
--data '{
    "filename": "earhart-aviation.mp3",
    "byte_size": 59400,
    "content_type": "audio/mpeg"
}'
```

If all goes well, you'll get a `201 Created` response with a payload like the following:

```json
{
    "id": "3445d7a0-2513-4606-b37b-bff0034c0214",
    "filename": "earhart-aviation.mp3",
    "upload_url": "https://phonos-recordings-staging.s3-accelerate.amazonaws.com/Assets/3445d7a0-2513-4606-b37b-bff0034c0214?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAS2MU72M7ACPXX764%2F20240409%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240409T213836Z&X-Amz-Expires=43200&X-Amz-Security-Token=FwoGZXIvYXdzEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDMyjVxJyIRosE7smGSLJAWqfi8jqgkF0iiCYFU1nq3xAzNalFsrmbNnJRpWZvOSjGREvQftcLr%2FVgG9rjuz1cskXD3H8umxVLOS6oVmjHdt0wmaRtx5C6ZvGp8tW7BL%2F0hsuuU%2FmmG0n8QmmuQjA%2BfeaRkwR6Fgw85SryaPZUxzXhX9Y2BypyeBDX1H5JTPUYpZA0fAu1g9nYncsIjbNgnBJvr5e42gBnJZQSyAeeE3dA%2BK9btul5QapF5of4JTHXngkhLSBm819JD9iXRjRiUAUfoofGYfDhiiw5NawBjItFfJCqsABzKqETJ6q87zlAHajnVODPJgGowODSXrrqNd%2BTnV%2B73UXZTYKNukt&X-Amz-SignedHeaders=content-length%3Bcontent-md5%3Bcontent-type%3Bhost&X-Amz-Signature=45bad70aa97e89bf6120a7a0ec22b0dfc4771060922c50e1ec5c876f13252c49",
    "status": "waiting_for_upload",
    "created_at": "2024-04-09T21:38:36.872Z",
    "updated_at": "2024-04-09T21:38:36.872Z",
    "byte_size": 59400,
    "content_type": "audio/mpeg",
    "checksum": null
}
```

As you can see in the API response, the `status` of this `Asset` is `waiting_for_upload`, which indicates it can't be used to  create `SpeechEnhancement`s until you upload data for the `Asset`.

In the event that request parameters are structurally or semantically invalid, you'll get a `422` response. See the [API specification](./api/) for details.

### Step 2: Upload data for the asset

In order to create `SpeechEnhancement`s for the `Asset`, the `Asset`'s `status` must be `ready_for_processing`. To do this, you need to upload valid data to the object store using the `upload_url` included in the response to `POST /audio_services/v1/assets`.

You can accomplish this by making a `PUT` request to the `upload_url` with the `Asset`'s content and setting the `Content-Type` header to match the `content_type` provided when creating the `Asset`:

```bash
curl --request PUT 'https://phonos-recordings-staging.s3-accelerate.amazonaws.com/Assets/3445d7a0-2513-4606-b37b-bff0034c0214?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAS2MU72M7ACPXX764%2F20240409%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240409T213836Z&X-Amz-Expires=43200&X-Amz-Security-Token=FwoGZXIvYXdzEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDMyjVxJyIRosE7smGSLJAWqfi8jqgkF0iiCYFU1nq3xAzNalFsrmbNnJRpWZvOSjGREvQftcLr%2FVgG9rjuz1cskXD3H8umxVLOS6oVmjHdt0wmaRtx5C6ZvGp8tW7BL%2F0hsuuU%2FmmG0n8QmmuQjA%2BfeaRkwR6Fgw85SryaPZUxzXhX9Y2BypyeBDX1H5JTPUYpZA0fAu1g9nYncsIjbNgnBJvr5e42gBnJZQSyAeeE3dA%2BK9btul5QapF5of4JTHXngkhLSBm819JD9iXRjRiUAUfoofGYfDhiiw5NawBjItFfJCqsABzKqETJ6q87zlAHajnVODPJgGowODSXrrqNd%2BTnV%2B73UXZTYKNukt&X-Amz-SignedHeaders=content-length%3Bcontent-md5%3Bcontent-type%3Bhost&X-Amz-Signature=45bad70aa97e89bf6120a7a0ec22b0dfc4771060922c50e1ec5c876f13252c49'\
--header 'Content-Type: audio/mpeg'\
--data-binary '@/path/to/earhart-aviation.mp3'
```

If the upload request succeeds, you'll receive a `200` response with an empty body. If you receive a `400`-level response, double check that you are providing the exact same `Content-Type` and `Content-MD5` as supplied when creating the `Asset` via `POST /audio_services/v1/assets`.

For more details on our object store's (AWS S3) `PUT` API, including links to language-specific S3 clients, please consult the [PutObject documentation](https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html).

#### `upload_url` expiration window

The presigned `upload_url` is *only valid for a few minutes*. Be certain to `PUT` to `upload_url` *as soon as it is returned in the API* (without any systematic delays).

To receive a new `upload_url` for an `Asset`, call `GET /audio_services/v1/assets/:id` and use the new `upload_url` in the response:

```bash
curl --request GET 'https://firefly-beta.adobe.io/audio_services/v1/assets/3445d7a0-2513-4606-b37b-bff0034c0214'\
--header 'x-api-key: {CLIENT_ID}'\
--header 'Content-Type: application/json'\
--header 'Authorization: Bearer {ACCESS_TOKEN}'
```

```json
{
    "id": "3445d7a0-2513-4606-b37b-bff0034c0214",
    "filename": "earhart-aviation.mp3",
    "upload_url": "https://phonos-recordings-staging.s3-accelerate.amazonaws.com/Assets/e971f261-b878-4f4e-b0b2-3f485847ff18?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAS2MU72M7KMGERYWU%2F20240409%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240409T223834Z&X-Amz-Expires=43200&X-Amz-Security-Token=FwoGZXIvYXdzEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDK9qYgyGpviWih6o0yLJAT9R%2Bh6EgpSttgs8uEC26fP3gwZvVKnblpk%2BlwPCqlQhR7YbTwZ0eGLVgWVxbKXTwk20TNrkmnL7DVxdm1%2BOQWhnqamyLSsxoSTAMlc7iLIbQua0mMDeVpty%2FOJQAZH7qxp6%2BD7DqO7M5o7DBQp9ZpQYIGqhntA5ykNUyRBJW3XABstDjVGoTm6epgYxJUKPxzjX2Swm%2BRyLBUykHH39VWWn1NEjdS6Cbbmd5txAbVYUpY9B1fM4THmOiMxYTf0X9LuqI3wQ7H%2FPjyjqhNewBjItrW7JkVjKx5%2Bsy%2BUtTajoNuVwnozge6PpPnCeQwvxaAJTzbwdISKaxCEuedm7&X-Amz-SignedHeaders=content-length%3Bcontent-md5%3Bcontent-type%3Bhost&X-Amz-Signature=554df03c538e36864db91d4b01db45ce8aba6dcf8ea31890cadf67df81dd9a90",
    "status": "waiting_for_upload",
    "created_at": "2024-04-09T22:37:12.541Z",
    "updated_at": "2024-04-09T22:37:12.541Z",
    "byte_size": 59400,
    "content_type": "audio/mpeg",
    "checksum": null
}
```

#### Checking upload validity

As an API client, the best way to ensure that not only did the `PUT` request above go through successfully, but was successfully registered by the [Enhance Speech API](./api/), is to call the `GET /audio_services/v1/assets/:id` endpoint and ensure that `status` shows `ready_for_processing`. Once the `Asset` is `ready_for_processing`, an `upload_url` will no longer be displayed:

```json
{
    "id": "3445d7a0-2513-4606-b37b-bff0034c0214",
    "filename": "earhart-aviation.mp3",
    "upload_url": null,
    "status": "ready_for_processing",
    "created_at": "2024-04-09T21:38:36.872Z",
    "updated_at": "2024-04-09T22:37:03.129Z",
    "byte_size": 59400,
    "content_type": "audio/mpeg",
    "checksum": "AWzJTRSXGy5JsL+Phh/cFA=="
}
```

Now that the data has been uploaded to S3, a base64-encoded MD5 checksum of the uploaded data visible for the asset. You can use this checksum as a debugging datapoint to cross-reference data integrity between the Enhance Speech API and other storage systems.

### Step 3: Create a speech enhancement

Once you have an `Asset` that is `ready_for_processing`, you can create a `SpeechEnhancement` for it, at a given strength, using the `POST audio_services/v1/assets/:id/speech_enhancements` endpoint:

```bash
curl --location 'https://firefly-beta.adobe.io/audio_services/v1/assets/3445d7a0-2513-4606-b37b-bff0034c0214/speech_enhancements'\
--header 'x-api-key: {CLIENT_ID}'\
--header 'Content-Type: application/json'\
--header 'Authorization: Bearer {ACCESS_TOKEN}'\
--data '{
    "strength": 93
}'
```

Assuming that the `Asset` was `ready_for_processing` and the request is structurally valid, you should receive a [`202 Accepted`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202) response like the following:

```json
{
    "strength": 93,
    "id": "b877bc56-9c17-4efb-8eec-b5839cd7f555",
    "download_url": null,
    "asset_id": "3445d7a0-2513-4606-b37b-bff0034c0214",
    "requested_processing_at": "2024-04-09T22:56:50.174Z",
    "finished_processing_at": null,
    "status": "queued",
    "model_id": "v1"
}
```

#### Understanding strength

The strength parameter allows users to adjust the blend between the original and enhanced audio of the `Asset` when creating the `SpeechEnhancement`.

**Usage Guidelines**

- **Low Strength (0 - 50)**<br/>
Preserves more of the original's subtle qualities. Useful for when your original asset is already high-quality or when you want to preserve more of the original acoustics and background.<br/>
**Example:** Setting at 30 (30%) keeps most of the original audio with slight enhancement.<br/>

- **High Strength (51 - 100)**<br/>
Maximizes enhancement, reducing original audio presence.<br/>
**Example:** At 100 (100%), the output is the fully enhanced version. Nearly all background is removed. Use this setting if you are exposing and mixing the Speech Enhancement in your own application.

### Step 4: Poll to learn when the speech enhancement is complete

As indicated by the `202 Accepted` response code, a `SpeechEnhancement` is not immediately acted upon by the API.

Currently, a single `SpeechEnhancement` will be processed per API client - there is no parallel processing of speech enhancements.

For example, if you create 5 assets via `POST /audio_services/v1/assets`, upload data for all of them, and then create 5 speech enhancements via `POST audio_services/v1/assets/:id/speech_enhancements`, only 1 of those speech enhancements will be processed at any given time (the order of processing will be from oldest to newest).

To see the latest status of the newly created `SpeechEnhancement`, you can poll `GET audio_services/v1/assets/:asset-id/speech_enhancements/:speech-enhancement-id`:

```bash
curl 'https://firefly-beta.adobe.io/audio_services/v1/assets/3445d7a0-2513-4606-b37b-bff0034c0214/speech_enhancements/b877bc56-9c17-4efb-8eec-b5839cd7f555'\
--header 'x-api-key: {CLIENT_ID}'\
--header 'Authorization: Bearer {ACCESS_TOKEN}'
```

```json
{
    "strength": 93,
    "id": "b877bc56-9c17-4efb-8eec-b5839cd7f555",
    "download_url": "https://phonos-recordings-staging.s3-accelerate.amazonaws.com/Assets/c77ffc5f-aa1c-4db6-916e-99ae7978f76b/6757ba26-8de6-454f-a9d5-21a1bbc27eb3?response-content-disposition=attachment%3B%20filename%3D%22earhart-aviation-enhanced-92p.mp3%22%3B%20filename%2A%3DUTF-8%27%27earhart-aviation-enhanced-92p.mp3&response-content-type=audio%2Fmpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAS2MU72M7HLP2GA42%2F20240423%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240423T210414Z&X-Amz-Expires=43200&X-Amz-Security-Token=FwoGZXIvYXdzEEYaDHSuaL9jaLiQpoCGzCLJASOmIUcZRk4wj9v0SJi098pCPXErSuLeak8WDsVQz9jOn82SciN8PFIli%2B5liuy8f%2BvukcQF5VJ3q3NRFgUf8%2FNeSqKeD8Y4Ci9SachcOQWBwYPAw0ZqbdaGNea99W4N5KVPJkfFM7L60a4%2B861CxVVVCh5wegNPqERkQ5uF%2Bxo6D3ZXSIevhGRfGOk5gj%2BWQCT1CDyC%2FYYoSZuLoSRK9S3cWSKcjqQqfYaBrqRv5xjeT9pmaEcHRMHcXGKF6u9pZ%2B6YPalushmhciiywKCxBjItCVY8PvebQUp0owuxf3Xt%2FCURh78fUej0d1n%2FQ3M9wiqZ5WRevzUwi3YivJB0&X-Amz-SignedHeaders=host&X-Amz-Signature=33d8c8ed1baa809168130636896581b7a832d2a1d1eee6a1246060ffd7e6221f",
    "asset_id": "3445d7a0-2513-4606-b37b-bff0034c0214",
    "requested_processing_at": "2024-04-09T22:56:50.174Z",
    "finished_processing_at": "2024-04-09T22:56:51.675Z",
    "status": "succeeded",
    "model_id": "v1"
}
```

The `status` of a `SpeechEnhancement` progresses from `queued` -> `processing` -> (`succeeded` OR `failed`).

We don't often expect a `SpeechEnhancement` to fail (have a `status` of `failed`) -- this would likely indicate a server-side bug. However, in the rare event that it does happen, the API is transparent about this state.

Once the `status` is `succeeded`, a non-null `download_url` is included in the response that enables the downloading of the speech enhancement to the API client.

### Step 5: Download the speech enhancement

To download the `SpeechEnhancement`, make a `GET` request to the `download_url` displayed above. This is a (short-lived) presigned URL that will enable the downloading of the enhanced audio from AWS S3. If the presigned URL has expired, make a new request to `GET audio_services/v1/assets/:asset-id/speech_enhancements/:speech-enhancement-id` to get a new presigned URL.

```bash
curl 'https://phonos-recordings-staging.s3-accelerate.amazonaws.com/Assets/c77ffc5f-aa1c-4db6-916e-99ae7978f76b/6757ba26-8de6-454f-a9d5-21a1bbc27eb3?response-content-disposition=attachment%3B%20filename%3D%22earhart-aviation-enhanced-92p.mp3%22%3B%20filename%2A%3DUTF-8%27%27earhart-aviation-enhanced-92p.mp3&response-content-type=audio%2Fmpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAS2MU72M7HLP2GA42%2F20240423%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240423T210414Z&X-Amz-Expires=43200&X-Amz-Security-Token=FwoGZXIvYXdzEEYaDHSuaL9jaLiQpoCGzCLJASOmIUcZRk4wj9v0SJi098pCPXErSuLeak8WDsVQz9jOn82SciN8PFIli%2B5liuy8f%2BvukcQF5VJ3q3NRFgUf8%2FNeSqKeD8Y4Ci9SachcOQWBwYPAw0ZqbdaGNea99W4N5KVPJkfFM7L60a4%2B861CxVVVCh5wegNPqERkQ5uF%2Bxo6D3ZXSIevhGRfGOk5gj%2BWQCT1CDyC%2FYYoSZuLoSRK9S3cWSKcjqQqfYaBrqRv5xjeT9pmaEcHRMHcXGKF6u9pZ%2B6YPalushmhciiywKCxBjItCVY8PvebQUp0owuxf3Xt%2FCURh78fUej0d1n%2FQ3M9wiqZ5WRevzUwi3YivJB0&X-Amz-SignedHeaders=host&X-Amz-Signature=33d8c8ed1baa809168130636896581b7a832d2a1d1eee6a1246060ffd7e6221f' \ --remote-name --remote-header-name
```

The `--remote-name` and `--remote-header-name` options tells curl to use the `Content-Disposition` response header when naming the output file).

This will result in a file named `"earhart-aviation-enhanced-93p.mp3"` saved at the your current working directory!
