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
  - 'https://github.com/amandahuarng'
  - 'https://github.com/nimithajalal'
  - 'https://github.com/hollyschinsky'
hideBreadcrumbNav: true
og:
  title: Changelog - Adobe Firefly API
  description: This is the changelog for Adobe Firefly API
twitter:
  card: summary
  title: Changelog - Adobe Firefly API
  description: This is the changelog for Adobe Firefly API
---
<!-- TODO: Update with latest prod details, elaborate on API descriptions -->
# Changelog

## October 3, 2025

**API updates**

* **Removed deprecated non-synchronous API references** The following non-synchronous APIs are removed. Please use the async versions of these APIs instead:
  * Generate Images v3
  * Generate Similar Images v3
  * Generate Object Composite v3
  * Expand Image v3
  * Fill Image v3

## September 10, 2025

**API updates**

* **Removed deprecated APIs**: The following APIs are no longer available:
  * Generate Images v2 API
  * Expand Image v1 API
  * Fill Image v1 API

## June 19, 2025

**API updates**

* **Launch of Generate Video API**: Bring text, still shots, or illustrations to life by transforming them into live action clips. The [Generate Video API](../api/generate_video/V3_Async/) is now available for use.

## April 29, 2025

**API updates**

* **New Image Model 4**: The Image Model 4 is now available for use with the [Generate Images](../api/image_generation/V3_Async/) and [Generate Similar Images](../api/generate-similar/V3_Async/) APIs.

## March 11, 2025

**API updates**

* **Launch of Custom Models support**: The Generate Images API [now supports custom models](../concepts/custom-models/index.md).

## November 18, 2024

### API services update: General availability

We are excited to announce that the following APIs are now generally available:

* [Generate Image Async](../api/image_generation/V3_Async/)
* [Expand Image Async](../api/generative_expand/V3_Async/)
* [Fill Image Async](../api/generative_fill/V3_Async/)
* [Generate Object Composite Async](../api/generate-object-composite/V3_Async/)
* [Generate Similar Images Async](../api/generate-similar/V3_Async/)

## October 12, 2024

### API services update: General availability

We are excited to announce that the following APIs are now generally available and no longer only in preview:

* [Generate Object Composite](../api/generate-object-composite/V3_Async/)
* [Expand Image](../api/generative_expand/V3_Async/)
* [Fill Image](../api/generative_fill/V3_Async/)

## July 23, 2024

### API services update: General availability

We are excited to announce that the following APIs are now generally available and no longer in preview:

* [Generate Similar Images](../api/generate-similar/V3_Async/)
* [Generate Images](../api/image_generation/V3_Async/)

## June 18, 2024

### Added

Firefly Image Model 3 (preview) APIs:

  * New API References added for the newly introduced [Generate Similar Images](../api/generate-similar/) and [Generate Object Composite](../api/generate-object-composite/) APIs.
  * New V3 API References added for [Generate Images](../api/image_generation/V3_Async/), [Expand Image](../api/generative_expand/V3_Async/) and [Fill Image](../api/generative_fill/V3_Async) with support for Firefly Image Model 3 (preview).

Updated guides:

Create your first Firefly APIs implementation guide updated to use the new V3 version of the [Generate Images API](../api/image_generation/V3_Async/).

New guides:

  * Firefly Image Model 3 (preview) - Overview
  * Using Content Class and Style Presets
  * Using Style and Structure Image References
  * Using the Expand Image API
  * Using the Fill Image API
  * Getting Started with the Firefly Services SDK
  * Firefly API Terminology

## April 18, 2024

### Added

Firefly Generate Images API now accepts `url` as source for `referenceImage`. Only allow listed domains are allowed to be accepted as input `url` in the request.

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
* Styles are documented in the API references as well as the new styles guide
  
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
