# Writing Custom Scripts for Capability API

InDesign APIs expose a way for third-party developers to come on board and deploy their custom scripts as endpoints. The script writer can define the custom attributes and values that make sense for a particular endpoint. These can be done by deploying the capability bundle. Please refer to the [Capability]() to understand more about capabilities, their deployment, and their use. 

A few points to remember while writing a script for InDesign APIs: 

* To run a script with InDesign APIs, the script must be compatible to run with InDesignServer. However, any script that can be run on InDesignServer can’t be run as is. 

* While writing a new script or modifying existing scripts for InDesign APIs, there are a few nuances that the developer must take care of with respect to “input to the script” and “output from the script.” These nuances are discussed in the following sections

## Accepting input in custom script

* Case 1: The script does not require any input/argument.

    In this case, the system by default sends string type argument named `"parameters"` as follows:
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
    The above-mentioned JSON will be received in the form of `"string"`, which needs to be parsed inside the script to retrieve the value of attributes. In this case, the `"params"` attribute will be empty since, the script does not need an argument.

*   Case 2: In this case, the system, by default, sends a string-type argument named `“parameters”` which also includes input arguments e.g. “arg1”, “arg2”. So, In order to use the argument `“parameters”` must be parsed. And then you must extract the value of arg1 and arg2. 
    
    So, In order to use the argument `"parameters"` must be parsed. And then you must extract the value of arg1 and arg2.
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
    You must tweak the existing scripts to accept the arguments correctly e.g.
    <table>
        <tr>
        <th>Old Script</th>
        <th>New Script</th>
        </tr>
        <tr>
        <td><p> var arg1 = app.scriptArgs.get('argument1')<br>
        var arg2 = app.scriptArgs.get('argument2')<br><br>
        // Some processing</p></td>
        <td><p>var parameters = app.scriptArgs.get('parameters')    <br>
        // parse "parameters" so, that values can be extracted.     <br>
        var arg1 = parameters['argument1'] <br>
        var arg2 = parameters['argument2'] <br><br>
        // Some processing</p></td>
        </tr>
    </table>

    The execution of any script depends on the following attributes:

    <table style="background-color:white;">
      <tr>
        <th>Attribute</th>
        <th>Input Request Mapping</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>assets</td>
        <td>assets->destination field</td>
        <td>This contains a list of input assets like .indd, .pdf, or .jpeg etc.</td>
      </tr>
      <tr>
        <td>params</td>
        <td>params</td>
        <td>User input/arguments that are used inside script</td>
      </tr>
      <tr>
        <td>jobID</td>
        <td>Auto generated</td>
        <td>The job ID</td>
      </tr>
      <tr>
        <td>workingFolder</td>
        <td>Auto generated</td>
        <td>The working folder for the job. This is the base directory. Inside this directory, all the assets and scripts are downloaded. e.g c:\\baseFolder\assets </td>
      </tr>
    </table>
    
    </br> 


    Here’s the sample input and sample script code to open a document and close a document.

    * Sample Input request body
        ```json
        {
            "assets": [
                {
                    "source": {
                        "storageType": "Azure",
                        "url": "Pre-signed url of document"
                    },
                    "destination": "doc.indd"
                }
            ],
            "params": {
                "targetDocument": "doc.indd"
            }
        }
        ```
    * Transformed Input request. That is sent to script
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
    * Sample code that takes above mentioned input. This code opens docuemnt and closes the document.
        ```javascript
         
            var input = app.scriptArgs.get('parameters')
            var allParameters = JSON.parse(input)

            // Set the working folder. This is the directory within which all the  input and output assets are to be managed.
            var basePath = allParameters["workingFolder"]

            var documentToOpen = allParameters["params"]["targetDocument"]

            documentPath = basePath + "\\" + documentToOpen
            document = app.open(File(documentPath))
            document.close()
        ```

</br>

## Providing output from custom script

A developer must follow certain rules in order to output data, files, or logs from a script. Please follow these instructions to provide output correctly :

### Execution is successful

The following attributes are expected in return as a JSON string if the script execution is successful.

```json
{
    "status": "SUCCESS",
    "assetsToBeUploaded": [
        {
            "path": <Relative path of file to be uploaded w.r.t working folder>,
            "data": <Data in dictionary (object) format to be associated with this asset>
        }
    ],
    "dataURL": <Relative path of json file w.r.t working folder>
}
```
Caution: Anything outside of these attributes might be logged as data to be     investigated.

<table style="background-color:white;">
  <tr>
    <th>Attribute</th>
    <th>Description</th>
    <th>Optional/Mandatory</th>
  </tr>
  <tr>
    <td>dataURL</td>
    <td>This should have a path of JSON file w.r.t working folder. It should be created inside the working folder</td>
    <td>Mandatory</td>
  </tr>
  <tr>
    <td>status</td>
    <td>Status of execution (SUCCESS/FAILURE)</td>
    <td>Mandatory</td>
  </tr>
  <tr>
    <td>assetToBeUploaded</td>
    <td>Array for assets that need to be uploaded. This can be empty.</td>
    <td>Mandatory</td>
  </tr>
</table>

</br>



* Here’s a sample code returning a successful execution. Without data and without any output file.
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
* Here’s a sample code returning a successful execution. With data and without any output file.
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
* Here’s a sample code returning a successful execution. With/Without data and with the output file.
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
* In the above cases, it can be observed that the data is being shared in a JSON file, and not directly. This is to take care of cases where the data becomes too big to send back.
* In case no data is to be sent, an empty string should be passed in 'dataURL'.
### Execution failed

In case of failed execution of the script, the following attributes are expected in return as a JSON string.
```json
{
    "status": "FAILURE",
    "errorCode": <Error code>,
    "errorString": <Error Message>,
}
```

<table style="background-color:white;">
  <tr>
    <th>Attribute</th>
    <th>Output Request Mapping</th>
    <th>Meaning</th>
  </tr>
  <tr>
    <td>status</td>
    <td>Status of execution (SUCCESS/FAILURE)</td>
    <td>Mandatory</td>
  </tr>
    <tr>
    <td>errorCode</td>
    <td>ErrorCode of the error</td>
    <td>Optional</td>
  </tr>
  <tr>
    <td>errorString</td>
    <td>Description of error</td>
    <td>Optional</td>
  </tr>
</table>



Here’s a sample code to use as a starting point, to create the return object for failed cases.
```javascript
/*  Creates json string that is returned in case the job has failed.
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
