# Terminology

This section provides definitions and details for terms and parameters to be aware of when you use the [Firefly APIs](../api/image_generation/V3/) and documentation.

## Seed

A **seed** is a starting point for image generation. By using a seed value, you can generate consistent images across multiple API calls. This means that using the same seed with different styles can produce similar images with variations.

*Note:* Only generated images can be used as seeds. You can find the seed value for any generated image in the `outputs` array of a successful response. For example:

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

A **prompt** is a descriptive text instruction that tells the model what kind of image to generate. The more detailed your prompt, the more specific the generated image will be. If you're not satisfied with the results, try rewording your prompt. See [Writing Effective Prompts](https://helpx.adobe.com/firefly/using/tips-and-tricks.html) for more tips.

## Negative prompt

A **negative prompt** tells the model what elements to avoid in the generated image. By specifying what you don't want, the model will make a best effort to exclude those elements. Learn more about negative prompts [here](https://www.adobe.com/products/firefly/discover/ai-art-negative-prompts.html#:~:text=Negative%20prompts%20are%20text%20prompts,elements%20in%20its%20generated%20images).

## Mask

An image mask allows you to hide or protect parts of an image when editing. It's like placing a mask over the areas you don't want to change, revealing only the parts you want to edit.

* **Black conceals:** Use black on the mask to hide areas from being edited.
* **White reveals:** Use white to expose areas that can be changed.

## Inverted mask

An **inverted mask** swaps the masked and unmasked areas of an image. This means that the areas previously hidden become visible for editing, and vice versa.

## MD (Multi Diffusion)

**Multi Diffusion** refers to the model processing an image using its context. For example, in Generative Fill or Expand, the model considers the rest of the image when generating new content.

## Reference Image

A **reference image** is a sample image you provide to influence the generated results. For example, you can use a reference image to match the style or structure in the generated images.

## Content class

The **content class** guides the overall theme and styles applied to the content, such as `photo` or `art`. If not specified, the model will auto-detect the content class. For more information visit the [Styles Documentation.](./styles/index.md)

## Style

Use the style parameter to define the look and feel of the generated image. You can:

* **Preset styles:** Use the `style` parameter to generate an image based on a [preset value](https://developer.adobe.com/firefly-services/docs/firefly-api/guides/concepts/styles/) like `photo`, `art`, `graphic`, or `bw`. 
* **Reference image:** Provide an image to match its style.

## Parameter Options

- `presets`: a list of style presets to be applied to generated content.
- `source`: presigned url or upload id of an image to use to match style.
- `strength`: indicates the intensity scale to apply the styles (`1..100`).

## Structure

Structure refers to the composition and arrangement of visual elements in an image. By providing a reference image in the `structure` parameter, Firefly will mimic the outline and depth in the generated image.

<InlineAlert variant="help" slots="text" />

Use the `strength` param to adjust the adherence to the structure reference image. `0` means no adherence. `100` means full adherence.


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

Outpainting expands the borders of an image by generating new content using generative AI, effectively extending the image beyond its original boundaries.