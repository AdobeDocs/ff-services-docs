---
title: Masking
description: A guide to authentication for Adobe Firefly API
keywords:
  - Photoshop Mask
  - Mask
  - Inverted Mask
contributors:
  - https://github.com/bishoysefin
hideBreadcrumbNav: true
---

# Masking

Use masks to control image maniplation in Firefly APIs

||
| --- | --- |
| ![a picture of a person with a green scenic background](../../images/masking-concept-original.jpg) <p style="text-align:center">Original Image</p> | ![a mask of a person shape with a white background](../../images/masking-concept-mask.jpg) <p style="text-align:center">Masked Image</p> |

## Overview

Masking is a powerful concept in image editing that allows you to isolate specific parts of an image for modifications while leaving other areas unchanged. This process is essential in scenarios where you want precise control over which portions of an image are edited.

In the case of Firefly APIs, masking can help with tasks such as filling images, expanding images, and compositing images.

## Mask

A mask is a grayscale overlay applied to an image. It determines which parts of the image are unaffected by edits and which parts are open to edits. Here's how it works:

* **Black** areas are **protected**. No requested edits will apply to these regions.
* **White** areas are **exposed**. Requested edits will apply only to these regions.

### Example

#### Original Image

![a picture of a person with a green scenic background](../../images/masking-concept-original.jpg)

#### Mask

![a mask of a person shape with a white background](../../images/masking-concept-mask.jpg)

In the example above, we can see that the white background exposes the park scenery to any changes.

Think of the white areas as beams from flashlights illuminating the parts of the image where edits can occur, while the black areas stay in shadow, shielded from any alterations.

## Inverted Mask

An inverted mask flips the roles of the black and white areas in the original mask:

* Previously **black** areas become **white** and therefore are now **exposed** to edits.
* Previously **white** areas become **black** and therefore are now **protected** from edits.

### Example

![a mask of a person shape with a white background](../../images/masking-concept-mask.jpg)

The original mask above only allows edits to the park scenery. No edits will apply to the person.

![an inverted mask of a person shape with a black background](../../images/masking-concept-inverted.png)

The inverted mask above only allows edits to the person. No edits will apply to the park scenery.

Inverting a mask is a quick way to reverse the selection of editable areas without creating a new mask. This technique offers flexibility, allowing you to focus on different parts of the image as needed during the editing process.
