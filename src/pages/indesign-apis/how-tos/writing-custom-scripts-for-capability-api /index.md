---
title: Writing Custom Scripts for Capability API
description: Writing Custom Scripts for Capability API.
---

# Writing Custom Scripts for the Custom Capability API

InDesign APIs expose a way for third-party developers to come on board and deploy their custom scripts as endpoints. The script writer can define the custom attributes and values that make sense for a particular endpoint. These can be done by [deploying the capability bundle](../../concepts/#capability-bundle-structure).

To run a script with InDesign APIs, the script must be compatible to run with InDesignServer. However, any script that can be run on InDesignServer can't be run as is.

The execution of any script depends on the following attributes:

| Attribute | Input Request Mapping | Description |
| --- | --- | --- |
| assets | assets->destination field | This contains a list of input assets, like .indd, .pdf, .jpeg, etc. |
| params | params | User input/arguments that are used inside script. |
| jobID | Auto-generated | The job ID. |
| workingFolder | Auto-generated | The working folder for the job. This is the base directory. Inside this directory, all the assets and scripts are downloaded. (e.g., c:\\baseFolder\assets). |

## Accepting input in a custom script

Case 1:

The script doesn't require any input/argument.

In this case, the system by default sends a string-type argument named `"parameters"` as follows:

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

The JSON is received in the form of `"string"`, which needs to be parsed inside the script to retrieve the values of the attributes. In this case the `"params"` attribute will be empty, since the script doesn't need an argument.

Case 2:

In this case, the system, by default, sends a string-type argument named `"parameters"` which also includes input arguments `"arg1"` and `"arg2"`.

To use the argument, `"parameters"` must be parsed and the value of `arg1` and `arg2` must be extracted.

```json
{
    "assets": [
        {"path":"doc.indd"},
        {"path":"image.pdf"},
        ...
    ],
    "params": {
        "arg1": <data corresponding to argument1>,
        "arg2": <data corresponding to argument2>,
        ...
    },
    "jobID": "0c531425-bc82-43c0-89b7-0e851cd56061",
    "workingFolder": <Some path>
}
```

In this case, you must tweak the existing scripts to accept the arguments correctly, as shown in the following examples.

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

For example, here's a sample input and sample script code to open a document and close a document:

**Sample input request body**
  
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
| dataURL | A relative path to the data file. It should be created inside the working folder. When there is no data to send, pass an empty string. | X |
| status | Status of the execution. Can be `SUCCESS` or `FAILURE`. | X |
| assetToBeUploaded | An array for assets that need to be uploaded. This can be empty. | X |

```json
{
    "status": "SUCCESS",
    "assetToBeUploaded": [
        {
            "path": <Relative path of the file to be uploaded w.r.t working folder>,
            "data": <Data in dictionary (object) format to be associated with this asset>
        }
    ],
    "dataURL": <Relative path of JSON file w.r.t working folder>
}
```

#### Examples

In these examples, the data is shared in a JSON file, not directly. This is ideal for cases where the data becomes too big to send back.

**Example without data and without any output file**
  
```javascript
/* Creates an object to be returned when the job is successful. The object should be stringified before returning. 
*/
function GetSuccessReturnObj() {
    var obj = {}
    
    obj.status = 'SUCCESS'
    obj.assetsToBeUploaded = []
    obj.dataURL = ''
    
    return JSON.stringify(obj)

}
```

**Example with data and without any output file**
  
```javascript
/* Creates an object to be returned when the job is successful. Data is written into a JSON file, which should be created inside a working folder.
    @param data: The data in dictionary (object) format is to be returned.
    The object should be stringified before returning. 
  */

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
  
```javascript
/* Create an array of assets which is to be uploaded and sent back to the caller.
    assetPath: Path of the file to be uploaded, relative to the working folder.
    data: The data in dictionary (object) format to be associated with this asset. (It is optional)
    This data will be provided to the user with ASSET_UPLOAD_COMPLETED  event. 
*/

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

When a script execution fails, the following attributes are expected to be returned as a JSON string.

| Attribute | Output Request Mapping | Meaning |
| --- | --- | --- |
| status | Status of execution. Will be `SUCCESS` or `FAILURE`. | Mandatory |
| errorCode | The error code. | Optional |
| errorString | A description of the error. | Optional |

```json
{
    "status": "FAILURE",
    "errorCode": <Error code>,
    "errorString": <Error Message>,
}
```

Use the code block below as a starting point to create the returned object for failed cases:

```javascript
/*  Creates JSON string that is returned in case the job has failed.
@param errorCode: Error code detail.
@param errorString: Description about the error.
@return: json string.
*/

function GetFailureReturnObj(errorCode, errorString) {
    var obj = {}
    obj.status = 'FAILURE'
    obj.errorCode = errorCode
    obj.errorString = errorString
    return JSON.stringify(obj)
}
```
