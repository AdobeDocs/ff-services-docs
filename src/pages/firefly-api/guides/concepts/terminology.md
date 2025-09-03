---
title: ''
description: ''
keywords:
  - Adobe Firefly API
  - generative AI
  - AI image generation
  - text-to-image
  - image generation
  - creative AI
  - REST API
  - AI models
  - generative content
  - AI art generation
  - creative automation
  - content creation
og:
  title: ''
  description: ''
twitter:
  card: summary
  title: ''
  description: ''
---
# Terminology

This section provides definitions and details for terms and parameters to be aware of when you use the [Firefly APIs](../api/image_generation/V3/) and documentation.

## Seed

A **seed** is a starting point for image generation. By using a seed value, you can generate consistent images across multiple API calls. Visit the seed [concept page](./seeds/index.md) for more information.

## Prompt

A **prompt** is a descriptive text instruction that tells Firefly what kind of image to generate. See the [Writing Effective Prompts](https://helpx.adobe.com/firefly/using/tips-and-tricks.html) guide for more tips.

## Negative prompt

A **negative prompt** tells Firefly what elements not to include in its generated the image.

## Mask

An image **mask** allows you to specify which parts of an image should change and which should stay the same when an image is being edited. Because black areas of an image mask are protected from changes and white areas of the image mask are exposed to changes, imagine the white areas are flashlights that show the artist where they can make changes.

## Inverted mask

An **inverted mask** swaps the black masked and white unmasked areas of an image. This means that the black, previously protected areas become visible for editing, and all of the white, previously exposed areas are now protected from changes.

## MD (Multi Diffusion)

**Multi Diffusion** refers to the model processing an image using its context. For example, in Generative Fill or Expand, the model considers the rest of the image when generating new content.

## Reference Image

A **reference image** is an image you provide to influence how Firefly generates its images. For example, you can use a reference image to match the style or structure in the generated images.

## Content class

The **content class** guides the overall type of content (`photo` or `art`) to generate.If not specified, the model will auto-detect the content class.

## Style

Use the style parameter to define the look and feel of the generated image. You can use a preset style or provide a reference image to match its style.

## Parameter Options

* `presets`: a list of style presets to be applied to generated content.
* `source`: presigned url or upload id of an image to use to match style.
* `strength`: indicates the intensity scale to apply the styles (`1..100`).

## Structure

Structure refers to the composition and arrangement of visual elements in an image. By providing a reference image in the `structure` parameter, Firefly will mimic the outline and depth in the generated image.

## Dimensions

The **dimensions** specify the size of the generated image using the `size` parameter. Valid dimensions are:

**Non-upsampled:**

| `width` | `height` | Description |
|---------|----------|-------------|
| 1024    | 1024     | Square      |
| 1152    | 896      | Landscape   |
| 896     | 1152     | Portrait    |
| 1344    | 768      | Widescreen  |

**Upsampled (2x):**

| `width` | `height` | Description |
|---------|----------|-------------|
| 2048    | 2048     | Square      |
| 2304    | 1792     | Landscape   |
| 1792    | 2304     | Portrait    |
| 2688    | 1536     | Widescreen  |

<InlineAlert variant="help" slots="text" />

For tileable images (`"tileable": true`), only the square dimensions are accepted (ie: `{ width: 1024, height: 1024 }` or `{ width: 2048, height: 2048 }`).

## Tileable

A **tileable image** is one that can be repeated infinitely in any direction without visible seams or edges, like a pattern. Set `tileable` to `true` to generate such images. The default is false.

<InlineAlert variant="help" slots="text" />

For tileable images (`"tileable": true`), only the square dimensions are accepted (ie: `{ width: 1024, height: 1024 }` or `{ width: 2048, height: 2048 }` for instance).

## Locale Based Prompt Bias

Including the `promptBiasingLocaleCode` parameter where supported will generate content relevant to the specified region.

<InlineAlert variant="help" slots="text" />

When not specified, the locale will be auto-detected, based on user's profile and `Accept-Language` header. Defaults to `en-US`.

## Visual Intensity

The `visualIntensity` parameter adjusts the overall intensity of the image's existing visual characteristics. Valid values are `[ 2 .. 10 ]`.

## Placement

The `placement` object adjust how the image is positioned and sized in the final generation. You can specify only `inset`, only `alignment`, or none (omit all).

<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON" />

#### Placement with alignment

```json
"placement": {
    "alignment": {
        "horizontal": "left",
        "vertical": "top"
    }
}
```

#### Placement with inset

```json
"placement": {
    "inset": {
        "left": 500,
        "top": 0,
        "right": 400,
        "bottom": 40
    }
}
````

<InlineAlert variant="help" slots="text1, text2" />

This parameter is currently available in the [Expand Image API V3](../api/generative_expand/V3/) and the [Object Composite API V3](../api/generate-object-composite/), but used differently in each.

In the case of the [Expand Image API V3](../api/generative_expand/V3/), you cannot use `placement` along with `mask`.

<!-- TODO: A visual representation of how these settings are used with different image sizes and placement settings is shown below, but please check out this wiki for more details about how these properties are interpreted when used with the Expand Image and the Object Composite APIs specifically. -->

## Inpainting

**Inpainting** is the process of filling in a designated region of an image. It's used to reconstruct or replace parts of an image.

## Outpainting

**Outpainting** expands the borders of an image by generating new content using generative AI, effectively extending the image beyond its original boundaries.
