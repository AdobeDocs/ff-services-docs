# Working with Rendition API 
[https://indesign.adobe.io/v3/create-rendition](https://indesign.adobe.io/v3/create-rendition)

Rendition API creates and returns PDF, JPEG, or PNG renditions from a
specific InDesign document. Using a [pre-signed
URL](#pre-signed-urls), the following example creates a JPEG image from an InDesign document. 
The output is generated and placed at the designated location.

```curl
curl --request POST \ 

  --url https://indesign.adobe.io/v3 create-rendition \ 

  --header 'Authorization: bearer <YOUR_OAUTH_TOKEN>' \ 

  --header 'x-api-key: <YOUR_API_KEY>' \ 

  --header ‘Content-Type: application/json’ \ 

  --data-raw '{ 
        “assets”: [ 
            { 
              “source”: { 
                    "url": "<YOUR PRE-SIGNED URL>" 
              }, 
              “destination”: “Short_Document.indd” 
            } 
        ], 

        “params”: { 
            “outputMediaType”: “image/jpeg”, 
            “pageRange”: “All”, 
            “quality”: “medium”, 
            “resolution”: 72, 
            “targetDocuments”: [ 
                "Short_Document.indd" 
            ], 
            "outputFolderPath":"outputfolder" 
      } 

}
```