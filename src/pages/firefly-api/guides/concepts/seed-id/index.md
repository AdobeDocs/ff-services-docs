---
title: Seed IDs - Adobe Firefly API
description: This guide explains usage of Seed IDs for the Adobe Firefly API.
contributors:
  - https://github.com/nimithajalal
---
# Understanding Seed IDs in Firefly Services API

Seed IDs in Firefly services API are the unique identifiers that drive the API's request and response mechanisms. 

## Role of Seed IDs

These IDs, represented as strings of numbers, are the key to associating images with specific styles or characteristics, making them a fundamental component of the API.

## Generating Similar Images using Seed IDs

Seed IDs are the secret sauce to generating images with similar styles. For instance, when using the [text-to-image](../../api/image_generation/index.md) feature to create multiple images, you can leverage the seed ID of a preferred image in subsequent API calls. This will result in more images that mirror its style, giving you a batch of images with a consistent aesthetic.

## Optional Usage and Requirements

While using seed IDs in API requests is optional, providing a seed for each expected output is essential. For instance, if you intend to generate four images, you must provide an array containing four distinct seeds.

Seed IDs in Firefly services API are strategic assets. They empower users to steer the image generation process according to their preferences. Whether you are exploring variations of a favourite style or ensuring consistency across outputs, the strategic use of seed IDs can significantly enhance your experience and the quality of the content you generate.