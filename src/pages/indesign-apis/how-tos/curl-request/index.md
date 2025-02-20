# CURL

[CURL](https://developer.adobe.com/commerce/webapi/get-started/gs-curl/)
is a command-line tool that lets you transmit HTTP requests and receive
responses from the command line or a shell script. It is available for
Linux distributions, Mac OS X, and Windows.

InDesign 'APIs support OAuth Server-to-Server authentication. You can
use the token generated in the above step to call InDesign 'APIs. 
Here's a skeleton curl request to accessing the APIs:

```curl
    curl --location --request POST <API_ENDPINT> \
    --header 'Authorization: bearer <YOUR_OAUTH_TOKEN>' \
    --header 'x-api-key: <YOUR_API_KEY>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "assets": [
            ...
        ],
        "params": {
            ...
        },
        "outputs": [
            ...
        ]
    }
```

As shown in the skeleton request above, the request has three main
parts. Here's the information to understand these parts and their
significance:

### Assets

Specify input assets for the request to be processed successfully. More
information can be found below.

### Outputs 

Specify the locations where the output assets should be uploaded. Learn
more about input and output locations in InDesign API. Without an
"outputs" parameter, the output assets are stored in a temporary
repository, and a [pre-signed URL](#pre-signed-urls) will
be shared for those assets, which will be valid for 24hrs.

### Params 

Specify information regarding what to do with the input assets.