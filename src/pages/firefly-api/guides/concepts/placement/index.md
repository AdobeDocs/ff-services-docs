---
title: Placement
description: A concept of placement for Adobe Firefly API
keywords:
  - Image Translation
  - Placement
  - Position
  - Inset
contributors:
  - https://github.com/bishoysefin
hideBreadcrumbNav: true
---

# Placement

Use placement to control how an image is positioned

||
| --- | --- |
| ![expanded product with placement alignment top right](../../images/sevoi-top-right.png) <p style="text-align:center">Placement - Right Alignment</p> | ![expanded product with placement alignment top left](../../images/sevoi-top-left.png) <p style="text-align:center">Placement - Left Alignment</p> |

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

* 500 pixels of margin from the left,
* 0 pixels from the top,
* 400 pixels from the right, and
* 40 pixels from the bottom.
