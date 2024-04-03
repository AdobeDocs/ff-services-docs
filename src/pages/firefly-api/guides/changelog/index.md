---
title: Changelog - Adobe Firefly API
description: This is the changelog for Adobe Firefly API
keywords:
  - Adobe Firefly Services
  - Firefly API
  - Developer documentation
  - API documentation
  - Integration
  - User interface components
  - Component library
  - UI/UX design
  - Web development
  - Application development
  - Software development kit (SDK)
  - JavaScript framework
  - Front-end development
  - Back-end development
  - Adobe Experience Platform
  - Cross-platform compatibility
  - Interactive experiences
  - User interface customization
  - API endpoints
  - Authentication and authorization
contributors:
  - https://github.com/amandahuarng
  - https://github.com/nimithajalal
  - https://github.com/hollyschinsky
hideBreadcrumbNav: true
---
<!-- TODO: Update with latest prod details, elaborate on API descriptions -->
# Changelog

## December 13, 2023

### Added

* generateImages API with generative match
* Generative Expand API
* Generative Fill API
* Upload API

## November 20, 2023

### Added

* You can now use the latest image model by setting header `x-api-variant` to `v2`. It will be set to `v2` by default.
* Styles are documented in the API references as well as the new [styles guide](../concepts/styles/index.md).
  
## October 26, 2023

### Overview

We're excited to announce the release of our generateImages API v1.0, the first major Firefly API release.

* Styles and content classes using the [v1 model](https://clio-assets.adobe.com/firefly/image-controls/v1/content.json)
* Generate images according to a text prompt
* Output types:
  * `application/json` (base64-encoded representation of the image data)
  * `multipart/mixed` (multi-part form data - binary representation of the image data)

### Known Issues and Limitations

* Offer Async API pattern
* Generate a tempUrl for each response
* Introduce defaults for `accept` and `mimetype` headers
* Add ability to specify JPG quality
* Rendering image in API References sandbox
