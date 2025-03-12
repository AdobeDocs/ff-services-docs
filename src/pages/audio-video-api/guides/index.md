---
title: Reframe API Quickstart
description: This guide provides a quickstart for using the Reframe API.
contributors:
  - https://github.com/AEAbreu-hub
---

# Reframe API Quickstart

This quickstart page provides ready-to-use cURL commands and instructions for the features of the Reframe API.

## Before you start

- You'll need a valid access token and client ID. See the [Authentication Guide](../getting_started/index.md) for details.
- Upload your media files (audio or video) to [your storage location and generate a pre-signed URL](../getting_started/storage_solutions.md).

## Reframing and scene edit detection

Use the cURL command example below to reframe your video. For best results, input video in 16:9 aspect ratio format.

In the command, be sure to:

- Replace `bearer_token` with the access token generated during authentication.
- Update `x-api-key` with your assigned API key/Client ID.
- Set `mediaType` to your input media format (for example: "video/mp4", "video/quicktime").
- Include the pre-signed URL to the video you'd like to have reframed in `"url"`.
- For multi-scene videos, enable scene transition handling by setting `sceneEditDetection: true`.
- Specify aspect ratios in width:height format (examples: "1:1", "9:16").

```shell
curl --location 'https://audio-video-api.adobe.io/v1/reframe' \
--header 'Authorization: {ACCESS_TOKEN}' \
--header 'x-api-key: {CLIENT_ID}' \
--header 'Content-Type: application/json' \
--data '{
  "video": {
    "source": {
      "url": {PRE_SIGNED_URL}
    },  
    "mediaType": {MEDIA_TYPE}
  },
  "sceneEditDetection": true,
  "outputConfig": {
      "aspectRatios": [
        "1:1","9:16","4:5"
      ]
  }
}'
```

## Adding video overlays

Overlays enable you to add assets as dynamic layers (e.g., GIFs, Animated PNGS, PNG) on top of the video, customized for positioning, size, timing, and behavior. To include overlays in your video processing workflow, extend the Reframe API payload by defining `overlays`. The `overlays` array defines how one or more overlay assets get applied.

Each overlay object has customizable properties to adjust the result. For full details, see the [API Reference](../api/reframe.md).

### Adjust overlay timing

Specify the timing of overlays with:

- **`startTime`** (optional):  
  Timecode specifying when the overlay starts on the video.  
- **`duration`** (optional):  
  Timecode specifying how long the overlay remains visible.

Use timecode format `HH:mm:SS:Frames`, where:

- HH: Hours (00–23)
- MM: Minutes (00–59)
- SS: Seconds (00–59)
- Frames: The frame number within a second, based on the video's frames per second (FPS)

**Example**:  

```json
"startTime": "00:00:05:10",  
"duration": "00:00:10:00"
```

### Set the media type and source

Indicate the source and file type of the overlay asset with:

- **`mediaType`** (required):  
  Specifies the type of overlay. The allowed values are:
  - `"image/png"`  
  - `"image/gif"`  

- **`source.url`** (required):  
  A pre-signed URL pointing to the overlay asset. The URL must be accessible and valid during the request.  

**Example**:  

```json
"mediaType": "image/png",  
"source": {  
  "url": "<pre-signed overlay url>"  
}
```

### Adjust overlay size and position

Adjust the size and position of the overlay with:

- **`scale`** (optional):  
  Defines the dimensions of the overlay in pixels.  
  - **`width`**: The width of the overlay.  
  - **`height`**: The height of the overlay.  

**Example**:  

```json
"scale": {  
  "width": 300,  
  "height": 300  
}
```

### Adjust overlay position

Specify the overlay's anchor point on the video and the offsets for precise placement with:

- **`anchorPoint`** (required):  
  Predefined anchor positions for placement:  
  - `"top_left"`  
  - `"top_right"`  
  - `"center"`  
  - `"bottom_left"`  
  - `"bottom_right"`  

- **`offsetX`** and **`offsetY`** (optional):  
  Pixel offsets relative to the anchor position for fine-tuning placement.  

**Example**:  

```json
"position": {  
  "anchorPoint": "top_right",  
  "offsetX": 50,  
  "offsetY": 50  
}
```

### Adjust overlay behavior

Determine how the overlay should behave when the source media runs longer with:

- **`repeat`** (optional):
  - `"loop"`: The overlay loops continuously for the specified duration.
  - `"stopOnLastFrame"`: The overlay GIF stops on the last frame.
  - `"timeStretch"`: Timestretch the overlay to the remaining length of the video  

**Example**:  

```json
"repeat": "loop"
```

## Example payload with overlay configuration

This is an example of an extended payload with an overlay configuration:  

```shell
curl --location 'https://audio-video-api.adobe.io/v1/reframe' \
--header 'Authorization: {ACCESS_TOKEN}' \
--header 'x-api-key: {CLIENT_ID}' \
--header 'Content-Type: application/json' \
--data '{
  "video": {
    "source": {
      "url": "{PRE_SIGNED_URL}"
    },
    "mediaType": "video/mp4"
  },
  "sceneEditDetection": true,
  "overlays": [
    {
      "mediaType": "image/gif",
      "source": {
        "url": "<pre-signed overlay url>"
      },
      "startTime": "00:00:10:15",   // Start 10 seconds and 15 frames into the video
      "duration": "00:00:05:00",    // Lasts for 5 seconds
      "scale": {
        "width": 400,
        "height": 400
      },
      "position": {
        "anchorPoint": "center",
        "offsetX": 0,
        "offsetY": 0
      },
      "repeat": "loop"
    }
  ],
  "outputConfig": {
      "aspectRatios": [
        "1:1",
        "9:16",
        "4:5"
      ]
  }
}'
```

If successful, you'll see a response like:

```json
{
  "jobId": "<jobId>",
  "statusUrl": "https://<baseUrl>/v1/status/<jobId>"
}
```

If there's an error, you'll see something like:

```json
{
  "error_code": <error code>,
  "message": <Message>
}
```

For a full list of error codes, check the [API Reference](../api/reframe.md).

## Check the job status

To check the status of a reframe job, use the cURL command below.

A successful response when the processing job is complete contains a secure link in the `url` field to download the reframed video output. Go to the URL in your browser to see the processed video featuring the new aspect ratio. 🎉

```shell
curl -X 'GET'
'https://audio-video-api.adobe.io/v1/status/{jobId}' \
-H 'Authorization:{ACCESS_TOKEN}' \
-H 'x-api-key:{CLIENT_ID}' \
-H 'Content-Type: application/json'
```

**Successful response for a running job**:

```json
{
    "jobId": "<jobId>",
    "status": "running",
    "percentCompleted": "23.0"
}
```

**Successful response when the processing job is complete**:

```json
{
    "jobId": "<jobId>",
    "status": "succeeded",
    "outputs": [
        {
            "destination": {
                "url": "<pre-signed URL of the result>"
            },
            "aspectRatio": "1:1"
        },
        {
            "destination": {
                "url": "<pre-signed URL of the result>"
            },
            "aspectRatio": "9:16"
        },
        {
            "destination": {
                "url": "<pre-signed URL of the result>"
            },
            "aspectRatio": "4:5"
        }
    ]
}
```
