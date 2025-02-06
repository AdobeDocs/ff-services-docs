## Logging

While writing your own scripts, debugging forms an important part of the
whole process. Likewise, to keep track of what decisions were made
during a script execution, one may feel the need to log the steps. You
can log the data during script execution. This can be done in two ways

-   Collecting all the logs in an array and then dumping them with a
    function similar to WriteToFile. This must be accompanied by the
    addition of the relative path to the list of assets to be uploaded.

-   The second way is to log data in the application's log. You can use the following script calls to redirect the provided log to the application's log.
    ```javascript
    // The following should come in the application log, which can be dumped using      generalSettings/appLogs/logsRelativePath
    app.consoleout('Logging in app\'s std::out')
    app.consoleerr('Logging in app\'s std::err')
    ```
    You can dump the application's log into a file, by adding the `"generalSetting"` as mentioned below:.
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