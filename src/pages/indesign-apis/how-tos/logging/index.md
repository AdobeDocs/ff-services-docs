---
title: ' - InDesign API'
description: ' for InDesign automation and document processing.'
keywords:
  - Adobe InDesign API
  - InDesign automation
  - document processing
  - Data Merge API
  - Rendition API
  - Custom Scripts API
  - Remap Links API
  - REST API
  - cloud services
  - enterprise solutions
  - design automation
  - creative automation
  - content delivery
  - batch processing
og:
  title: ' - InDesign API'
  description: ' for InDesign automation and document processing.'
twitter:
  card: summary
  title: ' - InDesign API'
  description: ' for InDesign automation and document processing.'
---
# Logging

Logging can be important for debugging your own scripts and to keep track of decisions made during a script execution. You can log the data during script execution in two ways: collect logs in an array or log data in the application's log.

## Collect logs in an array

It's possible to collect logs in an array and then dump them with a
function similar to `WriteToFile`.

We've created a UTILS.jsx file that contains reusable utility functions. These functions help maintain clean, modular, and efficient code. Add the relative path to the list of assets to be uploaded. You can use UTILS.jsx functionality or create a similar one for your use case.

```javascript
//Logging Instructions

UTILS.logFilePath='LogFile1.txt'
UTILS.InitiateLogging() // Initialising logging. This will create an empty array to store logs.
UTILS.OpenLogFileHandle() // Opening the file handle to create the log file.
UTILS.AddAssetToBeUploaded(UTILS.logFilePath) // Adding the log file to the list of files to be uploaded.
UTILS.Log('Sample Log 1') // Logging a sample log.
UTILS.Log('Sample Log 2') // Logging a sample log. This automatically writes the log to the file, one line at a time.

```

## Log data in the application's log

Data can be logged in the application's log. Use the script calls below to redirect the provided log to the application's log:

```javascript
    // The following should come in the application log, which can be dumped using generalSettings/appLogs/logsRelativePath
    app.consoleout('Logging in app\'s std::out')
    app.consoleerr('Logging in app\'s std::err')
```

You can dump the application's log into a file by adding the `generalSettings` object, as shown below:

```json
    "params": {
        "targetDocument": "doc.indd",
        "outputPath": "idmlDoc.idml",
        "generalSettings": {
            "appLogs": {
                "logsRelativePath": "appLog.txt"
            }
        }
    }
```
