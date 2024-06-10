## Overview

This document provides an overview of the changes and new APIs introduced with the Firefly Image 3 Model support. A quick summary is provided, followed by a more detailed description of what's new as well as a list of terminology to use for reference while using the updated/new APIs and parameters.

## What's New in Firefly Image 3 Model

- Improved generation quality with better depiction of details and more photorealistic results.
- Greater variety in generated outputs from a single prompt for photos, art, or flat illustrations.
- Improved ability to take reference images into account – both for stylization and for structure matching.
- Better understanding of prompts and compositions of complex scenes and text rendering.
- Improved image variations with varied options for composition, mood, and lighting.

** See [this link](https://helpx.adobe.com/firefly/using/whats-new.html) for more details on what's new.

### New Firefly APIs

The following new Firefly APIs were added and use the new v3 model:

- Generate Similar Images - provide a source image to use as a reference for generating similar image results.
- Generate Object Composite - upload an image (with or without  mask), such as a product photo, and utilize a text prompt to generate a seamlessly composited scene featuring the product. Object Composites enable users to upload an image of an object, guaranteeing pixel accuracy of the object, and generate a background using a reference image and a text prompt to influence the style and content of the background. See this link for more specific details.

### Updated Firefly APIs

The following existing Firefly APIs were updated to use the new v3 model, and have new and/or renamed parameters:

#### Generate Images

- The `n` parameter has been renamed to `numVariations`
- The `styles` object parameter was renamed to `style` and contains renamed child parameters as well. You can still supply a reference image to be used, but it should now be passed as `url` (for a presigned image URL), or `uploadId` for an uploaded image within the `imageReference.source` field:

```json
style": {
    "presets": [
        "bw"
    ],
    "imageReference": {
        "source": {
            "url": "https://example.com/",
            "uploadId": "string"
        }
    }
    "strength": 50,
}
```

- The `photoSettings` parameter has been removed locale  has been renamed to `promptBiasingLocaleCode`.

#### Expand Image
- The `n` parameter has been renamed to `numVariations`
- `locale` has been renamed to `promptBiasingLocaleCode`
- The `image` parameter now has a `source` and a `mask` that can be provided as sub-parameters in the form of either an `uploadId` of an uploaded image (ie: `image.source.uploadId` or `image.mask.uploadId`, or a url for a presigned URL (ie: `image.source.url` or `image.mask.url`):

```json
"image": {
    "source": {
      "url": "https://example.com/",
      "uploadId": "string"
    },
    "mask": {
      "url": "https://example.com/",
      "uploadId": "string"
    }
}
```

- A new `placement` object parameter can be specified, with `insets` and `alignment` child parameter values that can be provided. See the placement section below for more details.

#### Fill Image

- The `n` parameter has been renamed to `numVariations`
- `locale` has been renamed to `promptBiasingLocaleCode`
​- Support for a `negativePrompt` parameter has been added
- The `image` parameter now contains both the `source` parameter for the `image` input, and the `mask` parameter for the mask to use. (The previous version of the API had `mask` at the same level as the `image` parameter). Please note, for both, you can supply either a `url` (for a presigned URL – ie: `image.source.url` or `image.mask.url`) or an `uploadId` (for an uploaded image – ie: `image.source.uploadId` or `image.mask.uploadId`):

```json
"image": {
    "source": {
      "url": "https://example.com/",
      "uploadId": "string"
    },
    "mask": {
      "url": "https://example.com/",
      "uploadId": "string"
    }
}
```

See [this link](https://helpx.adobe.com/firefly/using/generative-expand.html) for more over details about the capabilities available for expanding and filling images with Firefly Image Model 3.  

### Firefly API Examples

#### Generate Images

Generate images based on a prompt, with optional [preset](https://developer.adobe.com/firefly-services/docs/firefly-api/guides/concepts/styles/) value or reference image to match style, and optional reference image to match structure.

#### Example

Prompt: The giant magical dog, sniffing flowers on the forest floor. Fireflies everywhere. A spring of water. Long moss hanging from the tree branches. Moonlight.

Outputs (for seeds: 70722 and 99092):

Seed 70722 Image Seed 99092 Image

#### Generate Similar Images

Provide a source image to use as a reference for generating similar image results.

Example

Input source Image:

Output:


#### Expand Image

Expand an image by automatically filling it with Firefly-generated content that seamlessly blends with the existing image, or, use a descriptive prompt to get a more specific result. (Also known as "outpainting").

Example: Generate a sandy beach onto the extended canvas of an ocean and lighthouse.


#### Fill Image

Fill in a designated region of an image by specifying a descriptive prompt, or skip the prompt and the area will be filled in with new content that seamlessly blends in with the surrounding image automatically. (Also known as "inpainting"). Note: The input is the original Image to be altered, along with a mask of the region that needs to be altered and a text prompt describing the change that needs to be made. 

Example: Add a cruise ship to a picture of an ocean and lighthouse.



#### Generate Object Composite

Upload an image (with or without mask), such as a product photo, and utilize a text prompt to generate a seamlessly composited scene featuring the product. 

Object Composites enable users to upload an image of an object, guaranteeing pixel accuracy of the object, and generate a background using a reference image and a text prompt to influence the style and content of the background.

Example
Input image and mask source:



**Prompt:** A luxurious background with a satin pillow and falling rose petals

Style [preset](https://developer.adobe.com/firefly-services/docs/firefly-api/guides/concepts/styles/): `cool_colors` 

Content class: `"art"`

Output:  


Changing the style preset to `vibrant_colors` yields the following output:

### Terminology

This section provides definitions and details for some terminology and parameters to be aware of when using the Firefly API references and documentation.

#### Seed

The purpose of a seed is to give a starting point for image generation. Each API supports an optional array of seed values that will provide generation stability across multiple API calls (e.g., you can use the same seed to generate a similar image with different styles). Note: Only generated images can be used as seeds, and you can locate the seed value for any generated image in the outputs  array of a successful response, ie:

```json
"outputs": [
    {
      "seed": 1,
      "image": {
        "url": "https://image1.com/"
      }
    },
    {
      "seed": 1234,
      "image": {
        "url": "https://image2.com/"
      }
    }
]
```

#### Prompt

Instructions given to generate an output. Write descriptive prompts to generate specifically what you want — if you don't like the results, reword your prompt to get closer to what you want. See [Writing Effective Prompts](https://helpx.adobe.com/firefly/using/tips-and-tricks.html) for more details.

#### Negative prompt

Instruct the model that it should NOT include certain elements in its generated image that it may otherwise assume. The model will avoid these words in the generated content with best effort. More details [here](https://www.adobe.com/products/firefly/discover/ai-art-negative-prompts.html#:~:text=Negative%20prompts%20are%20text%20prompts,elements%20in%20its%20generated%20images).

#### Mask

With image masking, you can “conceal and reveal", meaning you can hide portions of your image and display other portions when editing an image. An image mask is like putting a mask over the parts of a picture you want to protect or hide, while exposing the other areas for editing. 

When creating an image mask, use black or white depending on the results you're trying to achieve. A tip to remember is that black conceals and white reveals, thus you will want to use black on the parts you want to hide from being edited, and white on those that can be changed. For example, using the image and mask below will preserve the perfume bottle content outlined in black.

#### Inverted mask

Inverting a mask means to swap which area of the image is masked (ie: black and white areas are reversed). So for instance, in the case of the above perfume image mask, inverting it would result in the following, and preserve the background of the image instead.

#### MD (Multi Diffusion)

For these APIs, the model will process an image using its context. For example, in case of Generative Fill/Expand, the model needs to know what the rest of the image is before generating new content.

#### Reference Image

A sample image provided to be used as a reference while generating image results (ie: such as the image parameter in the Generate Similar API, or the style  and structure.imageReference parameters in Generate Images).

#### Content class

Guides the overall image theme and styles that can be applied on top of each content type (ie: photo , art). If the parameter is not specified, it will be auto-detected.

** The `contentClass` parameter is supported in the v3 Generate Image and Object Composite APIs.

#### Style

Use the `style` parameter to generate an image based on a [preset value](https://developer.adobe.com/firefly-services/docs/firefly-api/guides/concepts/styles/), or the look and feel of a reference image. Firefly will be influenced by either the preset style value when present, or detect the style in the supplied image, and apply the same style in the generated image. A `style` can be specified with preset styles (e.g. `photo`, `art`, `graphic`, `bw`), a reference image, or both.

#### Parameter Options

- `presets`: a list of style presets to be applied to generated content.
- `source`: presigned url of image to use for style match.
- `strength`: indicates the intensity scale to apply the styles (`1..100`).

** The `style` parameter is supported in the v3 Generate Images and Object Composite APIs.

#### Structure

Firefly will detect the structure in the image supplied in the `structure` param and apply the same in the generated image. Structure in an image refers to the composition of an image and how the visual elements and subjects are arranged within the frame. The outline and depth are essential aspects that Firefly considers while matching the structure of a reference image. A reference image provided to use for determining the structure of the generated image is more specific than the content reference image in that only the structure is affected.

**Note:** Use the `strength` param to adjust the adherence to the structure reference image. 0 means no adherence. 100 means full adherence.

** The `structure` parameter is currently available in the v3 Generate Image API.

Example:

A car driving in the middle of a desert

#### Dimensions

Specifies the dimensions of the generated image via a `size` parameter in the APIs. Valid dimensions:

**Non-upsampled:**

square: `{ width: 1024, height: 1024 }`
landscape: `{ width: 1152, height: 896 }`
portrait: `{ width: 896, height: 1152 }`
widescreen: `{ width: 1344, height: 768 }`

**Upsampled (2x):**

square: `{ width: 2048, height: 2048 }`
landscape: `{ width: 2304, height: 1792 }`
portrait: `{ width: 1792, height: 2304 }`
widescreen: `{ width: 2688, height: 1536 }`

**Note:** For tileable images (`"tileable": true`), only the square dimensions are accepted (ie: `{ width: 1024, height: 1024 }` or `{ width: 2048, height: 2048 }`).

#### Tileable

Generates results that are repeated patterns, like tiles in a single image​. An image is tileable if it can be repeated infinitely in any direction without showing visible seams or edges.  The default for `tileable` is false.

Note: For tileable images (`"tileable": true`), only the square dimensions are accepted (ie: `{ width: 1024, height: 1024 }` or `{ width: 2048, height: 2048 }` for instance).

#### Locale Based Prompt Bias

Including the `promptBiasingLocaleCode` parameter where it's supported will generate more relevant content to the region specified. **Note:** When not specified, the locale will be auto-detected, based on user's profile and `Accept-Language` header. Defaults to `en-US`. 

#### Visual Intensity

The `visualIntensity` parameter adjusts the overall intensity of your photo's existing visual characteristic. Valid values are `[ 2 .. 10 ]`.

#### Placement

The `placement` object adjust how the image will be positioned and sized in the final generation. You can specify both `inset` and `alignment`, only `inset`, only `alignment`, or none (omit all).

```json
"placement": {
    "inset": {
        "left": 500,
        "top": 0,
        "right": 400,
        "bottom": 40
    },
    "alignment": {
        "horizontal": "left",
        "vertical": "top"
    }
}
```

** This parameter is currently available in the Expand Image API v3 and the Object Composite API v3, but used somewhat differently. **Note:** In the case of the Expand Image API, you cannot use `placement` along with `mask`.

A visual representation of how these settings are used with different image sizes and placement settings is shown below, but please check out this wiki for more details about how these properties are interpreted when used with the Expand Image and the Object Composite APIs specifically.

#### Inpainting

The process of filling-in a designated region of the visual input.

#### Outpainting

Expands the borders of an image using generative AI.
