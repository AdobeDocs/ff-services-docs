---
title: Adobe Lightroom API Code Samples
description: This page contains Code Samples for Lightroom API
keywords:
  - Adobe Lightroom API
  - photo editing API
  - image enhancement
  - preset application
  - photo processing
  - image optimization
  - REST API
  - batch editing
  - cloud processing
  - photo automation
  - bulk editing
  - preset management
  - Lighgtroom API code sample
contributors:
  - 'https://github.com/khound'
  - 'https://github.com/archyposada'
hideBreadcrumbNav: true
og:
  title: Adobe Lightroom API Code Samples
  description: This page contains Code Samples for Lightroom API
twitter:
  card: summary
  title: Adobe Lightroom API Code Samples
  description: This page contains Code Samples for Lightroom API
---
# Code Samples

These code snippets are ready to copy  and use for tasks with the Lightroom API.

## Lightroom tasks

These actions all initiate an asynchronous job and return a response containing the link to [poll for job status and results](#get-a-tasks-status-and-results).

### Apply Auto Tone to an image

Auto Tone is a feature that automatically adjusts the tonal range of an image, making shadows darker and highlights brighter.

```shell
curl -X POST \
  https://image.adobe.io/lrService/autoTone \
  -H "Authorization: Bearer ${Token}"  \
  -H "x-api-key: ${Api Key}" \
  -H "Content-Type: application/json" \
  -d '{
    "inputs": {
        "href": "<signed GET URL>",
        "storage": "<storage>"
    },
    "outputs": [
        {
            "href": "<signed POST URL>",
            "type": "<type>",
            "storage": "<storage>"
        }
    ]
}'
```

**Example response**

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/lrService/status/<:jobId>"
        }
    }
}
```

### Auto straighten an image

Automatically straighten images by identifying and correcting skewed lines.

```shell
curl -X POST \
  https://image.adobe.io/lrService/autoStraighten \
  -H "Authorization: Bearer ${Token}"  \
  -H "x-api-key: ${Api Key}" \
  -H "Content-Type: application/json" \
  -d '{
    "inputs": {
        "href": "<signed GET URL>",
        "storage": "<storage>"
    },
    "outputs": [
        {
            "href": "<signed POST URL>",
            "type": "<type>",
            "storage": "<storage>"
        }
    ]
}'
```

**Example response**

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/lrService/status/<:jobId>"
        }
    }
}
```

### Apply presets to an image

Apply presets to an image to quickly adjust its appearance.

```shell
curl -X POST \
  https://image.adobe.io/lrService/presets \
  -H "Authorization: Bearer ${Token}"  \
  -H "x-api-key: ${Api Key}" \
  -H "Content-Type: application/json" \
  -d '{
    "inputs": {
        "source": {
            "href": "<signed GET URL>",
            "storage": "<storage>"
        },
        "presets": [
            {
                "href": "<signed GET URL>",
                "storage": "<storage>"
            },
            {
                "href": "<SIGNED_GET_URL>",
                "storage": "<storage>"
            }
        ]
    },
    "outputs": [
        {
            "href": "<SIGNED_POST_URL>",
            "type": "<type>",
            "storage": "<storage>"
        }
    ]
}'
```

**Example response**

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/lrService/status/<:jobId>"
        }
    }
}
```

### Apply edits to an image

Perform image edits.

```shell
curl -X POST \
  https://image.adobe.io/lrService/edit \
  -H "Authorization: Bearer ${Token}"  \
  -H "x-api-key: ${Api Key}" \
  -H "Content-Type: application/json" \
  -d '{
    "inputs": {
        "source": {
            "href": "<signed GET URL>",
            "storage": "<storage>"
        }
    },
    "options": {
        "Exposure": -5.00 to 5.00,
        "Contrast": -100 to 100,
        "Sharpness": 0 10 150,
        "WhiteBalance": <"As Shot", "Auto", "Cloudy", "Custom", "Daylight", "Flash", "Fluorescent", "Shade", "Tungsten">
        "Saturation": -100 to 100,
        "ColorNoiseReduction": 0 to 100,
        "NoiseReduction": 0 to 100,
        "VignetteAmount": -100 to 100,
        "Vibrance": -100 to 100,
        "Highlights": -100 to 100,
        "Shadows": -100 to 100,
        "Whites": -100 to 100,
        "Blacks": -100 to 100,
        "Clarity": -100 to 100,
        "Dehaze": -100 to +100,
        "SharpenRadius": 0.5 to 3.0,
        "SharpenDetail": 0 to 100,
        "SharpenEdgeMasking": 0 to 100,
        "Texture": -100 t0 100
    },
    "outputs": [
        {
            "href": "<signed POST URL>",
            "type": "<type>",
            "storage": "<storage>"
        }
    ]
}'
```

**Example response**

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/lrService/status/<:jobId>"
        }
    }
}
```

### Apply XMP to an image

```shell
curl -X POST \
  https://image.adobe.io/lrService/xmp \
  -H "Authorization: Bearer ${Token}"  \
  -H "x-api-key: ${Api Key}" \
  -H "Content-Type: application/json" \
  -d '{
    "inputs": {
        "source": {
            "href": "<signed GET URL>",
            "storage": "<storage>"
        }
    },
    "options": {
        "xmp": "<xmp>",
        "orientation": "<orientation>"
    },
    "outputs": [
        {
            "href": "<signed POST URL>",
            "storage": "<storage>",
            "type": "<type>"
        }
    ]
}'
```

**Example response**

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/lrService/status/<:jobId>"
        }
    }
}
```

## Get a task's status and results

Use the Job ID with the `href` link that's returned in the response to poll for the status of a Lightroom API job.

When a successful job completes, the output file is available at the `href` link in the response.

If the job fails due to an error, the `errorDetails` field in the response will contain the details of the failure.

```shell
curl -X GET \
  https://image.adobe.io/lrService/status/<jobId> \
  -H "Authorization: Bearer ${Token}"  \
  -H "x-api-key: ${Api Key}" \
  -H "Content-Type: application/json" \
```

**Example response**

```json
{
  "jobId":"<job ID>",
  "created":"2018-01-04T12:57:15.12345:Z",
  "modified":"2018-01-04T12:58:36.12345:Z",
  "outputs":[
  {
      "input":"<input_file_href>",
      "status":"succeeded",
      "_links":{
        "self":
        {
          "href":"<output_file_href>",
          "storage":"<storage>"
        }
      }
    }
  ],
  "_links":{
    "self":{
      "href":"https://image.adobe.io/lrService/status/<jobId>"
    }
  }
}
```

## Triggering an event from the APIs

To start receiving the events in your webhook application, pass your IMS organization ID in the header:

```shell
 -H 'x-gw-ims-org-id: ${IMS org ID}'  \
 ```

 The example below demonstrates using this header in an Auto Tone job and a sample event received for that job.

### Step 1: Initiating the job

This initiates the Auto Tone job using the header to trigger an event.

```shell
curl -X POST \
  https://image.adobe.io/lrService/autoTone \
  -H "Authorization: Bearer ${Token}" \
  -H "Content-Type: application/json" \
  -H "x-api-key: ${Api Key}" \
  -H 'x-gw-ims-org-id: ${IMS org ID}' \
  -d '{
    "inputs": {
      "href": "<signed GET URL>",
      "storage": "<storage>"
    },
    "outputs": [
    {
      "href": "<signed POST URL>",
      "type": "<type>",
      "storage": "<storage>"
    }
  ]
}'
```

The asynchronous job returns a response containing the `href` to poll for the job status.

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/lrService/status/eb4a9211-eb8a-4e88-b853-b9c08ba47427"
        }
    }
}
```

### Step 2: Retrieve the job's status on the webhook application when the job is complete

The `body` property in the `event` object contains the result of the job.

```json
{
  "event_id": "7b59cc70-88d7-4895-b204-87f5350a0cce",
  "event": {
    "header": {
      "msgType": "JOB_COMPLETION_STATUS",
      "msgId": "eb4a9211-eb8a-4e88-b853-b9c08ba47427",
      "imsOrgId": "<IMS org ID>",
      "eventCode": "lightroom-job-status",
      "_pipelineMeta": {
        "pipelineMessageId": "1586290300876:944289:VA7_A1:149:0"
      },
      "_smarts": {
        "definitionId": "3ee6c9056a9d72fc40e09ddf5fdbb0af752e8e49",
        "runningSmartId": "psmart-yw6wosjksniuuathenny"
      },
      "_adobeio": {
        "imsOrgId": "<IMS org ID>",
        "providerMetadata": "di_event_code",
        "eventCode": "lightroom-job-status"
      }
    },
    "body": {
      "jobId": "eb4a9211-eb8a-4e88-b853-b9c08ba47427",
      "outputs": [
        {
          "input": "<signed GET URL>",
          "status": "succeeded",
          "_links": {
            "self": [
              {
                "href": "<signed POST URL>",
                "storage": "<storage>"
              }
            ]
          }
        }
      ],
      "_links": {
        "self": {
          "href": "https://image.adobe.io/lrService/status/eb4a9211-eb8a-4e88-b853-b9c08ba47427"
        }
      }
    }
  }
}
```
