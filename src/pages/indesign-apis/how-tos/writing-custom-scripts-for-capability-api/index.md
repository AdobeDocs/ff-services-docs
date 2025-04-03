---
title: Writing Custom Scripts for Capability API
description: Writing Custom Scripts for Capability API.
---

# Writing Custom Scripts for the Custom Capability API

Use this document to construct the script files for the Custom Capability API.

The script's author defines the custom attributes and values for a particular endpoint using *capability.js* files in the capability bundle[1]. Refer to the examples below to construct your scripts.

## Including input in a custom script

### When no input is required

The system, by default, sends a string-type argument named `"params"`, which needs to be parsed inside the script to retrieve the values of the attributes.

In this case the `"params"` attribute will be empty, since the script doesn't need an argument.

```json
{
    "assets": [
        {"path": "doc.indd"},
        {"path": "image.pdf"},
        ...
    ],
    "params": {

    },
    "jobID": "0c531425-bc82-43c0-89b7-0e851cd56061",
    "workingFolder": <Some path>
}
```

### When input is included in the request

The system, by default, sends a string-type argument named `"params"` which also includes input arguments `"arg1"` and `"arg2"`.

To use the argument, `"params"` must be parsed by the script and the value of `arg1` and `arg2` must be extracted.

```json
{
    "assets": [
        {"path":"doc.indd"},
        {"path":"image.pdf"},
        ...
    ],
    "params": {
        "arg1": <data for argument 1>,
        "arg2": <data for argument 2>,
        ...
    },
    "jobID": "0c531425-bc82-43c0-89b7-0e851cd56061",
    "workingFolder": <Some path>
}
```

The existing scripts must be tweaked to accept the arguments correctly:

**Previous existing script**

```javascript
var arg1 = app.scriptArgs.get('argument1')
var arg2 = app.scriptArgs.get('argument2')
// Some processing
```

**New correct script**  

```javascript
var parameters = app.scriptArgs.get('parameters')
var arg1 = parameters['argument1']
var arg2 = parameters['argument2']
// Some processing
```

### Input examples

For example, below is a sample input and sample script code to open a document and close a document:

**Example input request body**
  
  ```json
  {
      "assets": [
          {
              "source": {
                  "storageType": "Azure",
                  "url": "<Pre-signed URL of the document>"
              },
              "destination": "doc.indd"
          }
      ],
      "params": {
          "targetDocument": "doc.indd"
      }
  }
  ```

**Transformed input request sent to the script**
  
```json
{
    "assets": [
        {
            "path": "doc.indd"
        }
    ],
    "params": {
        "targetDocument": "doc.indd"
    },
    "jobID": "0c531425-bc82-43c0-89b7-0e851cd56061",
    "workingFolder": "c:\\baseFolder\\assets"
}
```

**Sample code that takes the input (from above)**
  
```javascript
  
    var input = app.scriptArgs.get('parameters')
    var allParameters = JSON.parse(input)

    // Set the working folder, which manages all the input and output assets.
    var basePath = allParameters["workingFolder"]

    var documentToOpen = allParameters["params"]["targetDocument"]

    documentPath = basePath + "\\" + documentToOpen
    document = app.open(File(documentPath))
    document.close()
```

## Providing output from a custom script

Use the information below to output data, files, or logs correctly from a script.

### If an execution is successful

The attributes below are expected to be returned as a JSON string if the script execution is successful.

<InlineAlert variant="warning" slots="title, text" />

**Caution:**

Anything outside of these attributes might be logged as data to be investigated.

| Attribute | Description | Required |
| --- | --- | --- |
| `dataURL` | A relative path to the JSON data file inside the working folder. When there is no data to send, pass an empty string. | X |
| `status` | Status of the execution. Can be `SUCCESS` or `FAILURE`. | X |
| `assetToBeUploaded` | An array for assets that need to be uploaded. Each asset is an object with a `path` and `data` attribute. The `path` is a relative link for the file to be uploaded. The `data` is the data in dictionary (object) format to be associated with this asset. This can be empty. | X |

```json
{
    "status": "SUCCESS",
    "assetToBeUploaded": [
        {
            "path": <Relative path of the file to be uploaded>,
            "data": <Data associated with this asset>
        }
    ],
    "dataURL": <Relative path of the JSON data file>
}
```

### Output examples

In these examples the data is shared in a JSON file, not directly. This is ideal for cases where the data becomes too big to send back.

**Example without data and without any output file**

This creates an object to be returned when the job is successful. The object should be stringified before returning.
  
```javascript

function GetSuccessReturnObj() {
    var obj = {}
    
    obj.status = 'SUCCESS'
    obj.assetsToBeUploaded = []
    obj.dataURL = ''
    
    return JSON.stringify(obj)

}
```

**Example with data and without any output file**
  
  This creates an object to be returned when the job is successful. Data is written into a JSON file, which should be created in a working folder.
  
  The data in dictionary (object) format is to be returned. The object should be stringified before returning.
  
```javascript
function GetSuccessReturnObj(data) {
  var obj = {}
  
  obj.status = 'SUCCESS'
  obj.assetsToBeUploaded = []
  obj.dataURL = WriteToFile(data)
  
  return JSON.stringify(obj)
}
function WriteToFile ( data ) {
  var newFile
  var fileName = 'data.json'
  var filePath = workingFolder + '\\' + fileName
  newFile = File(filePath)
  newFile.encoding = 'UTF8'
  newFile.open('write')
  newFile.write(JSON.stringify(data))
  newFile.close()
  return filePath  
}
```

**Example with data and with the output file**
  
  This creates an array of assets to be uploaded and sent back to the caller.
  
  - `assetPath`: The path of the file to be uploaded, relative to the working folder.
  - `data`: The data in dictionary (object) format to be associated with this asset. (It's optional).
  
  This data will be provided to the user with an  `ASSET_UPLOAD_COMPLETED`  event.

```javascript

  var assets = []
  var assetToBeUploaded = {}
  
  assetToBeUploaded.path = assetPath
  assetToBeUploaded.data = data //this is optional
  assets.push(assetToBeUploaded)
  
  
  function GetSuccessReturnObj(assets, data) {
    var obj = {}
    obj.status = 'SUCCESS'
    obj.assetsToBeUploaded = assets
    if (data) {
        obj.dataURL = WriteToFile(data)
    } else {
        obj.dataURL = ''
    }
    return JSON.stringify(obj)
}
```

### If an execution fails

When a script execution fails, the following attributes are returned as a JSON string.

| Attribute | Output Request Mapping | Required |
| --- | --- | --- |
| `status` | Status of execution. Will be `SUCCESS` or `FAILURE`. | X |
| `errorCode` | The error code. |  |
| `errorString` | A description of the error. |  |

```json
{
    "status": "FAILURE",
    "errorCode": <Error code>,
    "errorString": <Error Message>,
}
```

Use the code block below as a starting point to create the returned object for failed cases.

- `errorCode`: Error code detail.
- `errorString`: Description about the error.

Returns the object as a JSON string.

```javascript
function GetFailureReturnObj(errorCode, errorString) {
    var obj = {}
    obj.status = 'FAILURE'
    obj.errorCode = errorCode
    obj.errorString = errorString
    return JSON.stringify(obj)
}
```
## Sample Scripts


To help you get started with writing custom scripts for the Custom Capability API, we have created a collection of sample scripts. These scripts demonstrate various use cases and best practices for constructing capability bundles and handling input/output in your scripts. The repository includes scripts in both Extendscript and UXP formats.

You can find the sample scripts on our GitHub repository: [Sample Scripts for Custom Capability API](https://github.com/AdobeDocs/indesign-api-docs/tree/main/SampleScripts).

[1]: ../../concepts/index.md#Capability-bundle-structure


