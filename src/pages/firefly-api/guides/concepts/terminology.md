# Terminology

This section provides definitions and details for terms and parameters to be aware of when using the [Firefly APIs](../api/image_generation/V3/) and documentation.

## Seed

The purpose of a seed is to give a starting point for image generation. Each API supports an optional array of seed values that will provide generation stability across multiple API calls. For example, you can use the same seed to generate a similar image with different styles.

Only generated images can be used as seeds, and you can locate the seed value for any generated image in the outputs array of a successful response, for example:

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

## Prompt

Instructions given to generate an output. Write descriptive prompts to generate specifically what you want — if you don't like the results, reword your prompt to get closer to what you want. See [Writing Effective Prompts](https://helpx.adobe.com/firefly/using/tips-and-tricks.html) for more details.

## Negative prompt

Tell the model that it should **not** include certain elements in its generated image that it may otherwise assume. The model will avoid these words in the generated content with best effort. More details [here](https://www.adobe.com/products/firefly/discover/ai-art-negative-prompts.html#:~:text=Negative%20prompts%20are%20text%20prompts,elements%20in%20its%20generated%20images).

## Mask

With image masking, you can “conceal and reveal", meaning you can hide portions of your image and display other portions when editing an image. An image mask is like putting a mask over the parts of a picture you want to protect or hide, while exposing the other areas for editing.

When creating an image mask, use black or white depending on the results you're trying to achieve. A tip to remember is that black conceals and white reveals, thus you will want to use black on the parts you want to hide from being edited, and white on those that can be changed. For example, using the image and mask below will preserve the perfume bottle content outlined in black.

## Inverted mask

Inverting a mask means to swap which area of the image is masked (ie: black and white areas are reversed). So for instance, in the case of the above perfume image mask, inverting it would result in the following, and preserve the background of the image instead.

## MD (Multi Diffusion)

For these APIs, the model will process an image using its context. For example, in case of Generative Fill/Expand, the model needs to know what the rest of the image is before generating new content.

## Reference Image

A sample image provided to be used as a reference while generating image results (ie: such as the image parameter in the Generate Similar API, or the style  and structure.imageReference parameters in Generate Images).

## Content class

Guides the overall image theme and styles that can be applied on top of each content type (ie: photo, art). If the parameter is not specified, it will be auto-detected.

<InlineAlert slots="text" />

The `contentClass` parameter is supported in the V3 Generate Image and Object Composite APIs.

## Style

Use the `style` parameter to generate an image based on a [preset value](https://developer.adobe.com/firefly-services/docs/firefly-api/guides/concepts/styles/), or the look and feel of a reference image. Firefly will be influenced by either the preset style value when present, or detect the style in the supplied image, and apply the same style in the generated image. A `style` can be specified with preset styles (Such as, `photo`, `art`, `graphic`, `bw`), a reference image, or both.

## Parameter Options

- `presets`: a list of style presets to be applied to generated content.
- `source`: presigned url of image to use for style match.
- `strength`: indicates the intensity scale to apply the styles (`1..100`).

<InlineAlert slots="text" />

The `style` parameter is supported in the V3 Generate Images and Object Composite APIs.

## Structure

Firefly will detect the structure in the image supplied in the `structure` param and apply the same in the generated image. Structure in an image refers to the composition of an image and how the visual elements and subjects are arranged within the frame. The outline and depth are essential aspects that Firefly considers while matching the structure of a reference image. A reference image provided to use for determining the structure of the generated image is more specific than the content reference image in that only the structure is affected.

<InlineAlert variant="help" slots="text" />

Use the `strength` param to adjust the adherence to the structure reference image. `0` means no adherence. `100` means full adherence.

<InlineAlert variant="info" slots="text" />

The `structure` parameter is currently available in the v3 Generate Image API.

Example:

A car driving in the middle of a desert

## Dimensions

Specifies the dimensions of the generated image via a `size` parameter in the APIs. Valid dimensions:

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

Generates results that are repeated patterns, like tiles in a single image​. An image is tileable if it can be repeated infinitely in any direction without showing visible seams or edges.  The default for `tileable` is false.

<InlineAlert variant="help" slots="text" />

For tileable images (`"tileable": true`), only the square dimensions are accepted (ie: `{ width: 1024, height: 1024 }` or `{ width: 2048, height: 2048 }` for instance).

## Locale Based Prompt Bias

Including the `promptBiasingLocaleCode` parameter where it's supported will generate more relevant content to the region specified.

<InlineAlert variant="help" slots="text" />

When not specified, the locale will be auto-detected, based on user's profile and `Accept-Language` header. Defaults to `en-US`.

## Visual Intensity

The `visualIntensity` parameter adjusts the overall intensity of your photo's existing visual characteristic. Valid values are `[ 2 .. 10 ]`.

## Placement

The `placement` object adjust how the image will be positioned and sized in the final generation. You can specify only `inset`, only `alignment`, or none (omit all).

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

This parameter is currently available in the [Expand Image API V3](../api/generative_expand/V3/) and the [Object Composite API V3](../api/generate-object-composite/), but used somewhat differently.

In the case of the [Expand Image API V3](../api/generative_expand/V3/), you cannot use `placement` along with `mask`.

<!-- TODO: A visual representation of how these settings are used with different image sizes and placement settings is shown below, but please check out this wiki for more details about how these properties are interpreted when used with the Expand Image and the Object Composite APIs specifically. -->

## Inpainting

The process of filling-in a designated region of the visual input.

## Outpainting

Expands the borders of an image using generative AI.
