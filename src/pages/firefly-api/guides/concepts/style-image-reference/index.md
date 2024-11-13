---
title: Style Image Reference - Adobe Firefly APIs
description: A guide to using style image reference with the Firefly Image Model APIs.
keywords:
  - Style Image Reference
  - Adobe Firefly Services
  - Firefly API
  - Developer documentation
contributors:
  - https://github.com/hollyschinsky
hideBreadcrumbNav: true
---

# Style Image Reference

Use Style Image Reference to generate images based on a specific style, colors, artistic methods, or mood.

![a picture of a puppy dressed as a renaissance artist](../../images/puppy-renaissance-artist.jpeg)

Use `style.imageReference` to generate images based on specific style, colors, artistic methods, or mood.

### Specifying Strength

To influence how impactful your reference image is during the image generation process, add a `strength` value between `1` and `100` to your style object. When "strength" is not specified, it defaults to a value of `50`.
