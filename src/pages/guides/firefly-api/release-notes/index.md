---
title: Release Notes - Adobe Firefly API
description: This is the changelog for Adobe Firefly API
contributors:
  - https://github.com/amandahuarng
---
<!-- TODO: Update with latest prod details, elaborate on API descriptions -->
# Release Notes

## February 1, 2024

### Added

APIs released in production:

  * Text-to-image API with generative match
  * Generative Expand API
  * Generative Fill API
  * Upload API

## December 13, 2023

### Added

APIs released in beta:

  * Text-to-image API with generative match
  * Generative Expand API
  * Generative Fill API
  * Upload API

## November 20, 2023

### Added

* You can now use the latest image model (clio v2) by setting header `x-api-variant` to `v2`. It will be set to `v2` by default.
* Styles are documented in the API references as well as the new [styles guide](../guides/styles/index.md).
  
## October 26, 2023

### Overview

We're excited to announce the release of our text-to-image API v1.0, the first major Firefly API release.

* Styles and content classes using [`clio` v1](https://clio-assets.adobe.com/firefly/image-controls/v1/content.json)
* Generate images according to a text prompt
* Output types:
  * `application/json` (base64-encoded representation of the image data)
  * `multipart/mixed` (multi-part form data - binary representation of the image data)
