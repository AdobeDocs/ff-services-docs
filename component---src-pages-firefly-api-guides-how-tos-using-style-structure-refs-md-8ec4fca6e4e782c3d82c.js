"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[4639],{62521:function(e,t,a){a.r(t),a.d(t,{_frontmatter:function(){return c},default:function(){return f}});var n=a(58168),i=a(80045),r=(a(88763),a(15680)),s=a(83407);const o=["components"],c={},d=(p="InlineAlert",function(e){return console.warn("Component "+p+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.mdx)("div",e)});var p;const l={_frontmatter:c},m=s.A;function f(e){let{components:t}=e,a=(0,i.A)(e,o);return(0,r.mdx)(m,(0,n.A)({},l,a,{components:t,mdxType:"MDXLayout"}),(0,r.mdx)("h1",{id:"using-style-and-structure-image-references"},"Using Style and Structure Image References"),(0,r.mdx)("p",null,"Learn how to optionally pass in a source image to use as a style or structure reference for your generated images."),(0,r.mdx)("h2",{id:"prerequisites"},"Prerequisites"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},"Firefly API credentials. If you don't have them yet, first visit the Firefly Services ",(0,r.mdx)("a",{parentName:"li",href:"../../../guides/get-started.md"},"Getting Started")," guide to obtain a ",(0,r.mdx)("inlineCode",{parentName:"li"},"client_id")," and ",(0,r.mdx)("inlineCode",{parentName:"li"},"client_secret"),"."),(0,r.mdx)("li",{parentName:"ul"},"Node.js installed on your machine and basic familiarity with ",(0,r.mdx)("inlineCode",{parentName:"li"},"JavaScript"),". ",(0,r.mdx)("strong",{parentName:"li"},"Note:")," The code for this guide will make use of the ",(0,r.mdx)("a",{parentName:"li",href:"../api/image_generation/V3/"},"Firefly REST APIs")," via Node.js, but could be written in any language, or with the ",(0,r.mdx)("a",{parentName:"li",href:"https://developer.adobe.com/firefly-services/docs/guides/sdks/"},"SDK"),".")),(0,r.mdx)("h2",{id:"working-with-reference-images"},"Working with Reference Images"),(0,r.mdx)("p",null,"Before digging in, you'll need to understand how to work with your existing assets as reference images. The APIs discussed in this guide allow you to reference images in two ways:"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("p",{parentName:"li"},"First, you can place your media on cloud storage and generate temporary readable URLs for them. However, these URLs may only be used with S3, Sharepoint, and Dropbox.")),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("p",{parentName:"li"},"Secondly, you cna upload via the ",(0,r.mdx)("a",{parentName:"p",href:"../api/upload_image/"},"Firefly Upload API"),". This API lets you send a source image in either PNG, JPEG, or WebP format, and returns a unique ID that can be used in later calls, like the ones demonstrated below."))),(0,r.mdx)("p",null,"Using the ",(0,r.mdx)("a",{parentName:"p",href:"../api/upload_image/"},"Upload API")," requires a file, as well as the mime type, such as ",(0,r.mdx)("inlineCode",{parentName:"p"},"image/jpeg"),", ",(0,r.mdx)("inlineCode",{parentName:"p"},"image/png"),", ",(0,r.mdx)("inlineCode",{parentName:"p"},"image/webp"),". Below is an example function that demonstrates this. It assumes we already created access token using a ",(0,r.mdx)("inlineCode",{parentName:"p"},"CLIENT_ID")," and ",(0,r.mdx)("inlineCode",{parentName:"p"},"CLIENT_SECRET")," value. See the ",(0,r.mdx)("a",{parentName:"p",href:"./create-your-first-ff-application.md#step-1-set-up-your-environment"},"Create Your First Firefly Application Guide")," for more help on using your credentials in your code to obtain an access token."),(0,r.mdx)("p",null,(0,r.mdx)("strong",{parentName:"p"},"Note:")," This function is used again in the examples below, and the complete code for this guide is shared at the bottom of this page."),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},"async function uploadImage(filePath, fileType, id, token) {\n    let stream = fs.createReadStream(filePath);\n    let stats = fs.statSync(filePath);\n    let fileSizeInBytes = stats.size;\n\n    let upload = await fetch('https://firefly-api.adobe.io/v2/storage/image', {\n        method:'POST', \n        headers: {\n            'Authorization':`Bearer ${token}`, \n            'X-API-Key':id, \n            'Content-Type':fileType, \n            'Content-Length':fileSizeInBytes\n        }, \n        duplex:'half', \n        body:stream\n    });\n\n    return await upload.json();\n}\n")),(0,r.mdx)("p",null,"The result of this call is a JSON object containing the ID of the image:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-json"},'{\n    "images": [\n        {"id": "9035f157-4105-4a63-913b-c120285dd799"}\n    ]\n}\n')),(0,r.mdx)("p",null,"If you haven't already gone through these tutorials, we recommend you refer to ",(0,r.mdx)("a",{parentName:"p",href:"./create-your-first-ff-application.md"},"Create your First Firefly Application")," guide for a step-by-step walkthrough for:"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},"Authenticating with ",(0,r.mdx)("inlineCode",{parentName:"li"},"getAccessToken()")),(0,r.mdx)("li",{parentName:"ul"},"Uploading images for use in ",(0,r.mdx)("inlineCode",{parentName:"li"},"uploadImage()")," calls"),(0,r.mdx)("li",{parentName:"ul"},"Downloading the generated results ",(0,r.mdx)("inlineCode",{parentName:"li"},"downloadFile()"))),(0,r.mdx)("h2",{id:"using-a-style-reference-image"},"Using a Style Reference Image"),(0,r.mdx)("p",null,"The first example uses a reference image to impact the style of the result. A standard prompt is used in a call to the ",(0,r.mdx)("a",{parentName:"p",href:"../api/image_generation/V3/"},"Generate Images API")," -- both with and without a style reference image to compare the differences."),(0,r.mdx)("p",null,"First, note the source image used for the style reference. Specifically, notice the color and fire attributes:"),(0,r.mdx)("p",null,(0,r.mdx)("span",{parentName:"p",className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"650px"}},"\n      ",(0,r.mdx)("span",{parentName:"span",className:"gatsby-resp-image-background-image",style:{paddingBottom:"66.5625%",position:"relative",bottom:"0",left:"0",display:"block",transition:"opacity 0.5s 0.5s",pointerEvents:"none"}}),"\n  ",(0,r.mdx)("picture",{parentName:"span"},"\n          ",(0,r.mdx)("source",{parentName:"picture",srcSet:["/ff-services-docs/static/c12c83cdd45b21e0c9df8e698be68775/5530d/styleRef.webp 320w","/ff-services-docs/static/c12c83cdd45b21e0c9df8e698be68775/0c8fb/styleRef.webp 640w","/ff-services-docs/static/c12c83cdd45b21e0c9df8e698be68775/309d5/styleRef.webp 650w"],sizes:"(max-width: 650px) 100vw, 650px",type:"image/webp"}),"\n          ",(0,r.mdx)("source",{parentName:"picture",srcSet:["/ff-services-docs/static/c12c83cdd45b21e0c9df8e698be68775/8980b/styleRef.jpg 320w","/ff-services-docs/static/c12c83cdd45b21e0c9df8e698be68775/56d4e/styleRef.jpg 640w","/ff-services-docs/static/c12c83cdd45b21e0c9df8e698be68775/8ea4d/styleRef.jpg 650w"],sizes:"(max-width: 650px) 100vw, 650px",type:"image/jpeg"}),"\n          ",(0,r.mdx)("img",{parentName:"picture",className:"gatsby-resp-image-image",src:"/ff-services-docs/static/c12c83cdd45b21e0c9df8e698be68775/8ea4d/styleRef.jpg",alt:"Style reference image",title:"Style reference image",loading:"lazy",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",opacity:"0",transition:"opacity 0.5s",color:"inherit",boxShadow:"inset 0px 0px 0px 400px none",top:"0",left:"0"}}),"\n        "),"\n    ")),(0,r.mdx)("p",null,"Before using this source image as a style reference in the ",(0,r.mdx)("a",{parentName:"p",href:"../api/image_generation/V3/"},"Generate Images API")," call, you'll need to get an upload ID for it to pass in the ",(0,r.mdx)("inlineCode",{parentName:"p"},"style.imageReference.source.uploadId")," object. An example payload for the Generate Images API is provided below for reference:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-json"},'{\n    "numVariations":1,\n    "prompt":"some prompt",\n    "size":{\n        "width":1792,\n        "height":2304\n    }, \n    "style":{\n        "imageReference": {\n            "source":{\n                "uploadId":"The ID value of the uploaded style reference"\n            }\n        }\n    }\n}\n')),(0,r.mdx)("p",null,(0,r.mdx)("strong",{parentName:"p"},"Note:")," You could alternatively provide a ",(0,r.mdx)("a",{parentName:"p",href:"#working-with-reference-images"},"presigned (temporary) URL")," from an image in cloud storage in the ",(0,r.mdx)("inlineCode",{parentName:"p"},"url")," property of the ",(0,r.mdx)("inlineCode",{parentName:"p"},"style.imageReference.source")," object. See the ",(0,r.mdx)("a",{parentName:"p",href:"../api/image_generation/V3/"},"Generate Images API")," for details."),(0,r.mdx)("p",null,"Next, we'll need utility code to get an access token, upload an image (via the ",(0,r.mdx)("a",{parentName:"p",href:"../api/upload_image/"},"Upload API"),"), and download the result. An example is below:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},"import fs from 'fs';\nimport { Readable } from 'stream';\nimport { finished } from 'stream/promises';\n\n/*\n Set the credentials based on environment variables.\n*/\nconst CLIENT_ID = process.env.CLIENT_ID;\nconst CLIENT_SECRET = process.env.CLIENT_SECRET;\n\nasync function getAccessToken(id, secret) {\n    const params = new URLSearchParams();\n\n    params.append('grant_type', 'client_credentials');\n    params.append('client_id', id);\n    params.append('client_secret', secret);\n    params.append('scope', 'openid,AdobeID,firefly_enterprise,firefly_api,ff_apis');\n    \n    let resp = await fetch('https://ims-na1.adobelogin.com/ims/token/v3', \n        { \n            method: 'POST', \n            body: params\n        }\n    );\n\n    let data = await resp.json();\n    return data.access_token;\n}\n\nasync function uploadImage(filePath, fileType, id, token) {\n    let stream = fs.createReadStream(filePath);\n    let stats = fs.statSync(filePath);\n    let fileSizeInBytes = stats.size;\n\n    let upload = await fetch('https://firefly-api.adobe.io/v2/storage/image', {\n        method:'POST', \n        headers: {\n            'Authorization':`Bearer ${token}`, \n            'X-API-Key':id, \n            'Content-Type':fileType, \n            'Content-Length':fileSizeInBytes\n        }, \n        duplex:'half', \n        body:stream\n    });\n\n    return await upload.json();\n}\n\nasync function downloadFile(url, filePath) {\n    let res = await fetch(url);\n    const body = Readable.fromWeb(res.body);\n    const download_write_stream = fs.createWriteStream(filePath);\n    return await finished(body.pipe(download_write_stream));\n}\n")),(0,r.mdx)("p",null,"Now, you'll see an example of a wrapper function for the ",(0,r.mdx)("a",{parentName:"p",href:"../api/image_generation/V3/"},"Generate Images API")," call that optionally allows you to pass the id of an uploaded style reference image in the ",(0,r.mdx)("inlineCode",{parentName:"p"},"uploadId")," parameter:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},"async function generateImage(prompt, id, token, styleReference) {\n    let body = {\n        numVariations:1,\n        prompt,\n        size:{\n            width:1792,\n            height:2304\n        }\n    }\n\n    if(styleReference) {\n        body.style = {\n            imageReference: {\n                source: { \n                    uploadId: styleReference \n                }\n            }\n        };\n    }\n\n    let req = await fetch('https://firefly-api.adobe.io/v3/images/generate', {\n        method:'POST',\n        headers: {\n            'X-Api-Key':id, \n            'Authorization':`Bearer ${token}`,\n            'Content-Type':'application/json'\n        }, \n        body: JSON.stringify(body)\n    });\n\n    return await req.json();\n}\n")),(0,r.mdx)("p",null,"Finally, the demo code which authenticates, uploads the style reference, and then makes two calls using the same prompt, one with a style reference and one without:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},"let token = await getAccessToken(CLIENT_ID, CLIENT_SECRET);\n\nlet upload = await uploadImage('./styleRef.webp', 'image/webp', CLIENT_ID, token);\nlet styleReference = upload.images[0].id;\n\nlet prompt = 'A long-haired cat majestically riding a flying unicorn. The cat is wielding a rainbow shield and sword, pointing the swords tip outwards.';\n\n// First, no style reference\nlet result = await generateImage(prompt, CLIENT_ID, token);\nlet fileName = `./without_style_reference.jpg`;\nawait downloadFile(result.outputs[0].image.url, fileName);\n\n// Second, with a style reference\nresult = await generateImage(prompt, CLIENT_ID, token, styleReference);\nfileName = `./with_style_reference.jpg`;\nawait downloadFile(result.outputs[0].image.url, fileName);\n")),(0,r.mdx)("p",null,"Given the prompt, here's the initial result with no style:"),(0,r.mdx)("p",null,(0,r.mdx)("span",{parentName:"p",className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"650px"}},"\n      ",(0,r.mdx)("span",{parentName:"span",className:"gatsby-resp-image-background-image",style:{paddingBottom:"128.75%",position:"relative",bottom:"0",left:"0",display:"block",transition:"opacity 0.5s 0.5s",pointerEvents:"none"}}),"\n  ",(0,r.mdx)("picture",{parentName:"span"},"\n          ",(0,r.mdx)("source",{parentName:"picture",srcSet:["/ff-services-docs/static/b45c79ba9c57a65965188ab442a36fff/5530d/without-style-ref.webp 320w","/ff-services-docs/static/b45c79ba9c57a65965188ab442a36fff/0c8fb/without-style-ref.webp 640w","/ff-services-docs/static/b45c79ba9c57a65965188ab442a36fff/309d5/without-style-ref.webp 650w"],sizes:"(max-width: 650px) 100vw, 650px",type:"image/webp"}),"\n          ",(0,r.mdx)("source",{parentName:"picture",srcSet:["/ff-services-docs/static/b45c79ba9c57a65965188ab442a36fff/8980b/without-style-ref.jpg 320w","/ff-services-docs/static/b45c79ba9c57a65965188ab442a36fff/56d4e/without-style-ref.jpg 640w","/ff-services-docs/static/b45c79ba9c57a65965188ab442a36fff/8ea4d/without-style-ref.jpg 650w"],sizes:"(max-width: 650px) 100vw, 650px",type:"image/jpeg"}),"\n          ",(0,r.mdx)("img",{parentName:"picture",className:"gatsby-resp-image-image",src:"/ff-services-docs/static/b45c79ba9c57a65965188ab442a36fff/8ea4d/without-style-ref.jpg",alt:"Without style reference image",title:"Without style reference image",loading:"lazy",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",opacity:"0",transition:"opacity 0.5s",color:"inherit",boxShadow:"inset 0px 0px 0px 400px none",top:"0",left:"0"}}),"\n        "),"\n    ")),(0,r.mdx)("p",null,"And here's the result with the style reference:"),(0,r.mdx)("p",null,(0,r.mdx)("span",{parentName:"p",className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"650px"}},"\n      ",(0,r.mdx)("span",{parentName:"span",className:"gatsby-resp-image-background-image",style:{paddingBottom:"128.75%",position:"relative",bottom:"0",left:"0",display:"block",transition:"opacity 0.5s 0.5s",pointerEvents:"none"}}),"\n  ",(0,r.mdx)("picture",{parentName:"span"},"\n          ",(0,r.mdx)("source",{parentName:"picture",srcSet:["/ff-services-docs/static/f82ac8a1faa2e6ccabea68ccd7f2fdba/5530d/with-style-ref.webp 320w","/ff-services-docs/static/f82ac8a1faa2e6ccabea68ccd7f2fdba/0c8fb/with-style-ref.webp 640w","/ff-services-docs/static/f82ac8a1faa2e6ccabea68ccd7f2fdba/309d5/with-style-ref.webp 650w"],sizes:"(max-width: 650px) 100vw, 650px",type:"image/webp"}),"\n          ",(0,r.mdx)("source",{parentName:"picture",srcSet:["/ff-services-docs/static/f82ac8a1faa2e6ccabea68ccd7f2fdba/8980b/with-style-ref.jpg 320w","/ff-services-docs/static/f82ac8a1faa2e6ccabea68ccd7f2fdba/56d4e/with-style-ref.jpg 640w","/ff-services-docs/static/f82ac8a1faa2e6ccabea68ccd7f2fdba/8ea4d/with-style-ref.jpg 650w"],sizes:"(max-width: 650px) 100vw, 650px",type:"image/jpeg"}),"\n          ",(0,r.mdx)("img",{parentName:"picture",className:"gatsby-resp-image-image",src:"/ff-services-docs/static/f82ac8a1faa2e6ccabea68ccd7f2fdba/8ea4d/with-style-ref.jpg",alt:"With style reference image",title:"With style reference image",loading:"lazy",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",opacity:"0",transition:"opacity 0.5s",color:"inherit",boxShadow:"inset 0px 0px 0px 400px none",top:"0",left:"0"}}),"\n        "),"\n    ")),(0,r.mdx)("p",null,"Note the effect that the style reference image has on the generated result. Our new image has the same color scheme, lighting and flame effects that we provided in our reference."),(0,r.mdx)("h2",{id:"using-a-structure-reference-image"},"Using a Structure Reference Image"),(0,r.mdx)("p",null,"The next feature you'll see is how to use an image as a ",(0,r.mdx)("em",{parentName:"p"},"structure reference"),". As you can imagine, this tells Firefly to use the source less as a reference on color schemes and styling, but to use the source image as a reference for the image's composition. First, as with the style reference example, once you've uploaded your image using the ",(0,r.mdx)("a",{parentName:"p",href:"../api/upload_image/"},"Firefly Upload API"),", you can reference it in the your API call:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-json"},'{\n    "numVariations":1,\n    "prompt":"some prompt",\n    "size":{\n        "width":1792,\n        "height":2304\n    }, \n    "structure":{\n        "imageReference": {\n            "source":{\n                "uploadId":"The ID value of the uploaded structure reference"\n            }\n        }\n    }\n}\n')),(0,r.mdx)("p",null,"Note, that similar to ",(0,r.mdx)("inlineCode",{parentName:"p"},"style"),", you can use ",(0,r.mdx)("a",{parentName:"p",href:"#working-with-reference-images"},"cloud storage URLs")," as well. To demonstrate this, you once again use a simple wrapper for the ",(0,r.mdx)("a",{parentName:"p",href:"../api/image_generation/V3/"},"Generate Images")," endpoint, but this time optionally accept the ID of an image to use as the structure reference:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},"async function generateImage(prompt, id, token, structureReference) {\n\n    let body = {\n        numVariations:1,\n        prompt,\n        size:{\n            width:1792,\n            height:2304\n        }\n    }\n\n    if(structureReference) {\n        body.structure = {\n            imageReference: {\n                source: { \n                    uploadId: structureReference \n                }\n            }\n        };\n    }\n\n    let req = await fetch('https://firefly-api.adobe.io/v3/images/generate', {\n        method:'POST',\n        headers: {\n            'X-Api-Key':id, \n            'Authorization':`Bearer ${token}`,\n            'Content-Type':'application/json'\n        }, \n        body: JSON.stringify(body)\n    });\n\n    return await req.json();\n}\n")),(0,r.mdx)("p",null,"For example, considering this as a structure reference:"),(0,r.mdx)("p",null,(0,r.mdx)("span",{parentName:"p",className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"650px"}},"\n      ",(0,r.mdx)("span",{parentName:"span",className:"gatsby-resp-image-background-image",style:{paddingBottom:"77.8125%",position:"relative",bottom:"0",left:"0",display:"block",transition:"opacity 0.5s 0.5s",pointerEvents:"none"}}),"\n  ",(0,r.mdx)("picture",{parentName:"span"},"\n          ",(0,r.mdx)("source",{parentName:"picture",srcSet:["/ff-services-docs/static/aa86a1f30dc4490de815f919c408135c/5530d/structureRef.webp 320w","/ff-services-docs/static/aa86a1f30dc4490de815f919c408135c/0c8fb/structureRef.webp 640w","/ff-services-docs/static/aa86a1f30dc4490de815f919c408135c/309d5/structureRef.webp 650w"],sizes:"(max-width: 650px) 100vw, 650px",type:"image/webp"}),"\n          ",(0,r.mdx)("source",{parentName:"picture",srcSet:["/ff-services-docs/static/aa86a1f30dc4490de815f919c408135c/8980b/structureRef.jpg 320w","/ff-services-docs/static/aa86a1f30dc4490de815f919c408135c/56d4e/structureRef.jpg 640w","/ff-services-docs/static/aa86a1f30dc4490de815f919c408135c/8ea4d/structureRef.jpg 650w"],sizes:"(max-width: 650px) 100vw, 650px",type:"image/jpeg"}),"\n          ",(0,r.mdx)("img",{parentName:"picture",className:"gatsby-resp-image-image",src:"/ff-services-docs/static/aa86a1f30dc4490de815f919c408135c/8ea4d/structureRef.jpg",alt:"Structure reference image",title:"Structure reference image",loading:"lazy",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",opacity:"0",transition:"opacity 0.5s",color:"inherit",boxShadow:"inset 0px 0px 0px 400px none",top:"0",left:"0"}}),"\n        "),"\n    ")),(0,r.mdx)("p",null,"Note the size and position of the cat, the direction it's facing, and how it props its paws on a table. Now consider this prompt: ",(0,r.mdx)("inlineCode",{parentName:"p"},'"picture of a poodle with colorful fur looking majestic"')),(0,r.mdx)("p",null,"Without the structure reference, you see:"),(0,r.mdx)("p",null,(0,r.mdx)("span",{parentName:"p",className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"650px"}},"\n      ",(0,r.mdx)("span",{parentName:"span",className:"gatsby-resp-image-background-image",style:{paddingBottom:"128.75%",position:"relative",bottom:"0",left:"0",display:"block",transition:"opacity 0.5s 0.5s",pointerEvents:"none"}}),"\n  ",(0,r.mdx)("picture",{parentName:"span"},"\n          ",(0,r.mdx)("source",{parentName:"picture",srcSet:["/ff-services-docs/static/211d1eddb1db47a1f159485cc11f6aa9/5530d/without-structure-ref.webp 320w","/ff-services-docs/static/211d1eddb1db47a1f159485cc11f6aa9/0c8fb/without-structure-ref.webp 640w","/ff-services-docs/static/211d1eddb1db47a1f159485cc11f6aa9/309d5/without-structure-ref.webp 650w"],sizes:"(max-width: 650px) 100vw, 650px",type:"image/webp"}),"\n          ",(0,r.mdx)("source",{parentName:"picture",srcSet:["/ff-services-docs/static/211d1eddb1db47a1f159485cc11f6aa9/8980b/without-structure-ref.jpg 320w","/ff-services-docs/static/211d1eddb1db47a1f159485cc11f6aa9/56d4e/without-structure-ref.jpg 640w","/ff-services-docs/static/211d1eddb1db47a1f159485cc11f6aa9/8ea4d/without-structure-ref.jpg 650w"],sizes:"(max-width: 650px) 100vw, 650px",type:"image/jpeg"}),"\n          ",(0,r.mdx)("img",{parentName:"picture",className:"gatsby-resp-image-image",src:"/ff-services-docs/static/211d1eddb1db47a1f159485cc11f6aa9/8ea4d/without-structure-ref.jpg",alt:"Without structure reference image",title:"Without structure reference image",loading:"lazy",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",opacity:"0",transition:"opacity 0.5s",color:"inherit",boxShadow:"inset 0px 0px 0px 400px none",top:"0",left:"0"}}),"\n        "),"\n    ")),(0,r.mdx)("p",null,"Now, compare it to the following generated image from using the structure reference provided:"),(0,r.mdx)("p",null,(0,r.mdx)("span",{parentName:"p",className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"650px"}},"\n      ",(0,r.mdx)("span",{parentName:"span",className:"gatsby-resp-image-background-image",style:{paddingBottom:"128.75%",position:"relative",bottom:"0",left:"0",display:"block",transition:"opacity 0.5s 0.5s",pointerEvents:"none"}}),"\n  ",(0,r.mdx)("picture",{parentName:"span"},"\n          ",(0,r.mdx)("source",{parentName:"picture",srcSet:["/ff-services-docs/static/4492a9c72a745996e1b40d46bc3500af/5530d/with-structure-ref.webp 320w","/ff-services-docs/static/4492a9c72a745996e1b40d46bc3500af/0c8fb/with-structure-ref.webp 640w","/ff-services-docs/static/4492a9c72a745996e1b40d46bc3500af/309d5/with-structure-ref.webp 650w"],sizes:"(max-width: 650px) 100vw, 650px",type:"image/webp"}),"\n          ",(0,r.mdx)("source",{parentName:"picture",srcSet:["/ff-services-docs/static/4492a9c72a745996e1b40d46bc3500af/8980b/with-structure-ref.jpg 320w","/ff-services-docs/static/4492a9c72a745996e1b40d46bc3500af/56d4e/with-structure-ref.jpg 640w","/ff-services-docs/static/4492a9c72a745996e1b40d46bc3500af/8ea4d/with-structure-ref.jpg 650w"],sizes:"(max-width: 650px) 100vw, 650px",type:"image/jpeg"}),"\n          ",(0,r.mdx)("img",{parentName:"picture",className:"gatsby-resp-image-image",src:"/ff-services-docs/static/4492a9c72a745996e1b40d46bc3500af/8ea4d/with-structure-ref.jpg",alt:"With structure reference image",title:"With structure reference image",loading:"lazy",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",opacity:"0",transition:"opacity 0.5s",color:"inherit",boxShadow:"inset 0px 0px 0px 400px none",top:"0",left:"0"}}),"\n        "),"\n    ")),(0,r.mdx)("p",null,"Again, the difference is striking and Firefly generates an image with a layout and composition which is similar to our reference image."),(0,r.mdx)("h2",{id:"complete-source-code"},"Complete Source Code"),(0,r.mdx)("p",null,"The complete source code containing the utilities for authentication, uploading, and downloading is provided below."),(0,r.mdx)(d,{variant:"warning",slots:"title, text",mdxType:"InlineAlert"}),(0,r.mdx)("p",null,"IMPORTANT"),(0,r.mdx)("p",null,"Since the Node.js code uses imports and top-level ",(0,r.mdx)("inlineCode",{parentName:"p"},"await"),", you must either use the ",(0,r.mdx)("inlineCode",{parentName:"p"},".mjs")," extension on your script file, or ensure you have a ",(0,r.mdx)("inlineCode",{parentName:"p"},"package.json")," with ",(0,r.mdx)("inlineCode",{parentName:"p"},'type: "module"'),"."),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},"import fs from 'fs';\nimport { Readable } from 'stream';\nimport { finished } from 'stream/promises';\n\n/*\n  Set the credentials based on environment variables.\n*/\nconst CLIENT_ID = process.env.CLIENT_ID;\nconst CLIENT_SECRET = process.env.CLIENT_SECRET;\n\nasync function getAccessToken(id, secret) {\n    const params = new URLSearchParams();\n\n    params.append('grant_type', 'client_credentials');\n    params.append('client_id', id);\n    params.append('client_secret', secret);\n    params.append('scope', 'openid,AdobeID,firefly_enterprise,firefly_api,ff_apis');\n    \n    let resp = await fetch('https://ims-na1.adobelogin.com/ims/token/v3', \n        { \n            method: 'POST', \n            body: params\n        }\n    );\n\n    let data = await resp.json();\n    return data.access_token;\n}\n\nasync function uploadImage(filePath, fileType, id, token) {\n    let stream = fs.createReadStream(filePath);\n    let stats = fs.statSync(filePath);\n    let fileSizeInBytes = stats.size;\n\n    let upload = await fetch('https://firefly-api.adobe.io/v2/storage/image', {\n        method:'POST', \n        headers: {\n            'Authorization':`Bearer ${token}`, \n            'X-API-Key':id, \n            'Content-Type':fileType, \n            'Content-Length':fileSizeInBytes\n        }, \n        duplex:'half', \n        body:stream\n    });\n\n    return await upload.json();\n}\n\nasync function downloadFile(url, filePath) {\n    let res = await fetch(url);\n    const body = Readable.fromWeb(res.body);\n    const download_write_stream = fs.createWriteStream(filePath);\n    return await finished(body.pipe(download_write_stream));\n}\n\nasync function generateImage(prompt, id, token, structureReference) {\n    let body = {\n        numVariations:1,\n        prompt,\n        size:{\n            width:1792,\n            height:2304\n        }\n    }\n\n    if(structureReference) {\n        body.structure = {\n            imageReference: {\n                source: { \n                    uploadId: structureReference \n                }\n            }\n        };\n    }\n\n    let req = await fetch('https://firefly-api.adobe.io/v3/images/generate', {\n        method:'POST',\n        headers: {\n            'X-Api-Key':id, \n            'Authorization':`Bearer ${token}`,\n            'Content-Type':'application/json'\n        }, \n        body: JSON.stringify(body)\n    });\n\n    return await req.json();\n}\n\nlet token = await getAccessToken(CLIENT_ID, CLIENT_SECRET);\n\nlet upload = await uploadImage('./structureRef.webp', 'image/webp', CLIENT_ID, token);\nlet structureReference = upload.images[0].id;\n\nlet prompt = 'picture of a poodle with colorful fur looking majestic';\n\n// First, no structure reference\nlet result = await generateImage(prompt, CLIENT_ID, token);\nlet fileName = `./without_structure_reference.jpg`;\nawait downloadFile(result.outputs[0].image.url, fileName);\n\n// Second, with a structure reference\nresult = await generateImage(prompt, CLIENT_ID, token, structureReference);\nfileName = `./with_structure_reference.jpg`;\nawait downloadFile(result.outputs[0].image.url, fileName);\n")),(0,r.mdx)("h2",{id:"next-steps"},"Next Steps"),(0,r.mdx)("p",null,"While this guide demonstrated two powerful ways to influence Firefly when generating images, there's still more you can learn about to tweak what's generated from your API calls. Check out the other guides in the How-Tos section and the ",(0,r.mdx)("a",{parentName:"p",href:"../api/image_generation/V3/"},"API Reference")," for more details."))}f.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-firefly-api-guides-how-tos-using-style-structure-refs-md-8ec4fca6e4e782c3d82c.js.map