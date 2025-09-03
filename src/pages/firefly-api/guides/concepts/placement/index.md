---
title: Using Placement in Adobe Firefly APIs for Image Positioning
description: >-
  Learn how to control image positioning in Adobe Firefly APIs using the
  placement object, including alignment and inset options.
keywords:
  - Adobe Firefly APIs
  - Placement Object
  - Image Positioning
  - Alignment
  - Inset
  - Image Control
  - Positioning Images
  - API Guide
  - Image Manipulation
  - Horizontal Alignment
  - Vertical Alignment
  - Margin Settings
  - Image Sizing
  - Image Alignment
  - Firefly API Tutorial
  - Developer Documentation
  - Code Examples
  - Best Practices
  - Image Generation
  - Output Customization
contributors:
  - 'https://github.com/bishoysefin'
hideBreadcrumbNav: true
og:
  title: Using Placement in Adobe Firefly APIs for Image Positioning
  description: >-
    Learn how to control image positioning in Adobe Firefly APIs using the
    placement object, including alignment and inset options.
twitter:
  card: summary
  title: Using Placement in Adobe Firefly APIs for Image Positioning
  description: >-
    Learn how to control image positioning in Adobe Firefly APIs using the
    placement object, including alignment and inset options.
---

# Placement

Use placement to control how an image is positioned

||
| --- | --- |
| ![expanded product with placement alignment top right](../../images/sevoi-top-right.png) <p style="text-align:center">Right Alignment</p> | ![expanded product with placement alignment top left](../../images/sevoi-top-left.png) <p style="text-align:center">Left Alignment</p> |

## Overview

The `placement` object in Firefly APIs provides a way to control how an image is positioned and sized in the final generation. It is an essential tool for specifying precise alignment or inset adjustments for your output. With placement, you can specify one of the following:

* **Alignment:** Defines how the image aligns within the frame.
* **Inset:** Sets specific margins for the image within the frame.

## Placement with Alignment

The alignment option lets you position the image relative to the frame by specifying horizontal and vertical alignment.

```json
"placement": {
    "alignment": {
        "horizontal": "left",
        "vertical": "top"
    }
}
```

This example aligns the image to the top-left corner of the frame.

## Placement with Inset

The inset option defines margins (in pixels) from each side of the frame, effectively controlling the size and position of the image within the frame.

```json
"placement": {
    "inset": {
        "left": 500,
        "top": 0,
        "right": 400,
        "bottom": 40
    }
}
```

This example places the image with:

* 500 pixels of margin from the left edge of the final generation
* 0 pixels from the top edge of the final generation
* 400 pixels from the right edge of the final generation
* 40 pixels from the bottom edge of the final generation
