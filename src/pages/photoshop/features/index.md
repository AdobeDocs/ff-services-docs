---
title: Adobe Photoshop API features
description: Learn about the available features in Photoshop API.
keywords:
  - Adobe Photoshop API features
  - Photoshop API features
contributors:
  - https://github.com/archyposada
   - https://github.com/khound
hideBreadcrumbNav: true
---

# Supported Features

With Adobe Photoshop API, which is now available through Adobe Firefly Services, you can perform numerous rich image-enhancements at scale.

## Product Crop

The Product Crop endpoint facilitates smart cropping for images, automatically detecting the subject and ensuring it remains the focal point of the cropped image. You can identify the product and specify the desired padding for their cropped image. You can see some sample code [here](../code-sample/index.md#applying-product-crop).

### Known Limitations

The current model is trained to return a crop that respects the salient object within an image. There is a current known issue that when a person or portrait is contained within a salient object, the model will crop with the person as the focal area rather than the salient object that contains it. This is problematic in the case of an item where an image of a person is contained within a design (i.e. a t-shirt, collectible or art). Rather than crop to the intended item, the service will crop to the person within the item.
We intend to correct this issue in future releases.

## DepthBlur

The DepthBlur API supports applying depth blur to your image. Depth Blur is part of the Neural Filters gallery in Photoshop. It allows you to target the area and range of blur in photos, creating wide-aperture depth of field blur effects. You may choose different focal points or remove the focal point and control the depth blur through manipulating the focal range slider. Setting focusSubject to true will select the most prominent subject in the image and apply depth blur around that subject.

You can find a code sample [here.](../code-sample/index.md#applying-depth-blur-neural-filter)

## Rendering and Conversions

This endpoint allows you to create a new PSD document and various renditions of different sizes. You can also convert any supported input file format to PSD, JPEG, TIFF, or PNG

* Create a new PSD document.
* Create a JPEG, TIFF or PNG rendition of various sizes.
* Request thumbnail previews of all renderable layers.
* Convert between any of the supported filetypes (PSD, JPEG, TIFF, PNG).

Here is an example of creating JPEG and PNG rendtions of a PSD document:
[Render PSD document](../code-sample/index.md#create-a-document-rendition)

## Layer level edits

* General layer edits
  * Edit the layer name.
  * Toggle the layer locked state.
  * Toggle layer visibility.
  * Move or resize the layer via it's bounds.
  * Delete layers.
* Adjustment layers
  * Add or edit an adjustment layer. The following types of adjustment layers are currently supported:
    * Brightness and Contrast.
    * Exposure.
    * Hue and Saturation.
    * Color Balance.
* Image/Pixel layers
  * Add a new pixel layer, with optional image.
  * Swap the image in an existing pixel layer.
* Shape layers
  * Resize a shape layer via it's bounds.

### Add, edit and delete layers

The `/documentOperations` API should primarily be used to make layer and/or document level edits to your PSD and then generate new renditions with the changes. You can pass in a flat array of only the layers that you wish to act upon, in the `options.layers` argument of the request body.
The layer name (or the layer id) will be used by the service to identify the correct layer to operation upon in your PSD.

The `add`, `edit`, `move` and `delete` blocks indicate the action you would like to be taken on a particular layer object. Any layer block passed into the API that is missing one of these attributes will be ignored.
The `add` and `move` blocks must also supply one of the attributes `insertAbove`, `insertBelow`, `insertInto`, `insertTop` or `insertBottom` to indicate where you want to move the layer to. More details on this can be found in the API reference.

**Note**: Adding a new layer does not require the ID to be included, the service will generate a new layer id for you.

Here are some examples of making various layer level edits.

* [Layer level editing](../code-sample/index.md#making-a-simple-edit)
* [Adding a new Adjustment Layer](../code-sample/index.md#adding-a-new-adjustment-layer)
* [Editing Image in a Pixel Layer](../code-sample/index.md#editing-a-pixel-layer)

## Document level edits

* Crop a PSD
* Resize a PSD

## Artboards

* Show artboard information in the JSON Manifest
* Create a new artboard from multiple input psd's

## Remove Background

The Remove Background endpoint can recognize the primary subject within an image and eliminate the background, providing the subject as the output. You can see a code sample [here.](../code-sample/index.md#remove-background).<br />

Example of Remove Background with a sample image.
![alt image](./imagecutout_cutout_example.png?raw=true "Original Image")

## Create Mask

This endpoint allows you create a greyscale mask png file that you can composite onto the original image (or any other). You can find a code sample [here.](../code-sample/index.md#generate-image-mask).

Example of Image mask with a sample image.
![alt image](./imagecutout_mask_example.png?raw=true "Original Image")

## Customized Workflow

You can make a customized workflow by chaining different endpoints together. [Here](../code-sample/index.md#generate-remove-background-result-as-photoshop-path) is an example using the Remove Background endpoint.

## Webhooks through Adobe I/O Events

Adobe I/O Events offers the possibility to build an event-driven application, based on events originating from Photoshop. To start listening for events, your application needs to register a webhook URL, specifying the Event Types to receive. Whenever a matching event gets triggered, your application is notified through an HTTP POST request to the webhook URL.
The Event Provider for the Photoshop API is `Imaging API Events`.
This event provider has two event types:

1. `Photoshop API events`

As the names indicate, these event types represent events triggered by the individual APIs.

### Registering your application to our Event Provider

#### Prerequisites needed to use the Event Provider

1. In order to use the Adobe I/O Events you will need to create a project on Adobe I/O Console.
2. You can follow the steps listed in [Getting Started](../../guides/get-started.md) page if you haven't created one yet.
3. Create a [Webhook application](https://www.adobe.io/apis/experienceplatform/events/docs.html#!adobedocs/adobeio-events/master/intro/webhooks_intro.md)

You can find a sample NodeJS application [here](https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/webhook-sample-app).

#### Registering the Webhook

Once the above prerequisites are met, you can now proceed to register the webhook to the service integration. The steps to do that can be found  [here](https://www.adobe.io/apis/experienceplatform/events/docs.html#!adobedocs/adobeio-events/master/intro/webhooks_intro.md#your-first-webhook).
After the webhook has been successfully registered, you will start to receive the events for any submitted job that either succeeded or failed, from the Event Types selected. This eliminates the need for your application to poll for the status of the job using the jobID. Examples can be found [here](../code-sample/index.md#triggering-an-event-from-the-apis)
