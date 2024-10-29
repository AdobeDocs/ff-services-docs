---
title: Adobe Photoshop API Key Concepts
description: Learn about masks, selections and target layers
keywords:
  - Photoshop API 
  - masks
  - selections
  - layers
contributors:
  - https://github.com/sushiriot
  - https://github.com/archyposada
hideBreadcrumbNav: true
---

# Photoshop API Key Concepts
If you're not already familiar with the Photoshop app, learn more about key features you can use in the API and app to create and enhance images.

## Layers and Target Layer

You use layers in Photoshop to stack different parts of an image. Each layer is like a sheet of transparent glass where you can add photos, paint on it, or add vectors. When you stack layers, you can see parts of the image below if an parts of an upper layer are still transparent. Layers isolate each part of an image so you can independently perform image enhancement to one particular. For example, you can view each layer here in the Layers Panel in the Photoshop app:

![alt image](./layers_all.png?raw=true "Original Image")

If you only choose to view one layer, such as the moon in the image, you see this:

![alt image](./layers_earth.png?raw=true "Original Image")

In both the Photoshop app and the API, we have a concept of *target layer*. This is the layer you selected and any operations you perform will apply to this layer only. For example, if we select the astronaut in our original image, resizing it only applies to this layer and we get this result:

![alt image](./astronaut_resize.png?raw=true "Original Image")

In short, layers enable you to organize different parts of an image into manageable parts of a whole. You can isolate image adjustments such as resizing or filling with generative background by applying your change to an individual target layer. For more information about layers see, [Photoshop, layer basics](https://helpx.adobe.com/photoshop/using/layer-basics.html).

## Selections

We use selections to define an area in an image that we want to enhance or adjust. A selection can include an object, a defined color range, and so on. As is the case with target layers, any operation you perform only applies to the selection itself:

![alt image](./astronaut_selection.png?raw=true "Original Image")

In the image above, the pink area is our selected area which we created using the Photoshop app. You can later adjust these areas programmatically such as inserting a generative background, or by expanding that part of the image. To learn more, see [Photoshop, Getting started with selections](https://helpx.adobe.com/photoshop/using/making-selections.html).

## Masks

Masking enables you to hide portion of a layer and to reveal the layers below.


