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

## June 18, 2024

### Added

- Firefly Image Model 3 (preview) APIs:

  - New API References added for the newly introduced [Generate Similar Images](../api/generate-object-composite/) and [Generate Object Composite](../api/generate-similar/) APIs.
  - New V3 API References added for [Generate Images](../api/image_generation/), [Expand Image](../api/generative_expand/V3/) and [Fill Image](../api/generative_fill/V3) with support for Firefly Image Model 3 (preview).
  
- Updated guides:

  - [Create your first Firefly APIs implementation](../how-tos/create-your-first-ff-application.md) guide updated to use the new V3 version of the [Generate Images API](../api/image_generation/V3/).

- New Guides:

  - [Firefly Image Model 3 (preview) - Overview](../concepts/model-3-overview.md)
  - [Using Content Class and Style Presets](../how-tos/using-content-class-style-preset.md)
  - [Using Style and Structure Image References](../how-tos/using-style-structure-refs.md)
  - [Using the Expand Image API](../how-tos/using-expand-image.md)
  - [Using the Fill Image API](../how-tos/using-fill-image.md)
  - [Getting Started with the Firefly Services SDK](../../../guides/tutorials/using-the-sdk.md)
  - [Firefly API Terminology](../concepts/terminology.md)

## April 18, 2024

### Added

Firefly [Generate Images API](../api/image_generation/V2/) now accepts `url` as source for `referenceImage`. Only allow listed domains are allowed to be accepted as input `url` in the request.

The allow-listed domains are as follows:

* `amazonaws.com`
* `windows.net`
* `dropboxusercontent.com`

## December 13, 2023

### Added

* Generate Images API with generative match
* Generative Expand API
* Generative Fill API
* Upload API

## November 20, 2023

### Added

* You can now use the latest image model by setting header `x-api-variant` to `v2`. It will be set to `v2` by default.
* Styles are documented in the API references as well as the new [styles guide](../concepts/styles/index.md).
  
## October 26, 2023

### Overview

We're excited to announce the release of our Generate Images API v1.0, the first major Firefly API release.

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
