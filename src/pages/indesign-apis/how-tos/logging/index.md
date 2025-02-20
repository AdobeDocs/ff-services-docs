# Logging

Logging can be important for debugging your own scripts and to keep track of decisions made during a script execution. You can log the data during script execution in two ways:

## Collect logs in an array

 Collecting all the logs in an array and then dumping them with a
    function, similar to `WriteToFile`. Include the relative path to the list of assets to be uploaded.

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
