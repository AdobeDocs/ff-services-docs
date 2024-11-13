---
title: Structure Image Reference - Adobe Firefly APIs
description: A guide to using structure image reference with the Firefly Image Model APIs.
keywords:
  - Structure Image Reference
  - Adobe Firefly Services
  - Firefly API
  - Developer documentation
contributors:
  - https://github.com/hollyschinsky
hideBreadcrumbNav: true
---

# Structure Image Reference

Use Structure Image Reference to generate images based on a specific outline and depth

![a picture of a puppy dressed as a renaissance artist](../../images/puppy-renaissance-artist.jpeg)

Use `structure.imageReference` with Firefly's [Generate Images API](../../api/image_generation/V3/) to generate images based on a specific outline and depth. This is helpful for when you have a scene where everything in it is placed correctly, but you want to generate a new image with a different details, style, or mood.

### Specifying Strength

To influence how impactful your reference image is during the image generation process, add a `strength` value between `1` and `100` to your structure object. When "strength" is not specified, it defaults to a value of `50`.
