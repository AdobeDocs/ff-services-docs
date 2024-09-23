# Firefly Image 3 Model (Preview)

The Firefly Image 3 Model (Preview) offers an improved generative Al image model for faster ideation and content creation.

## Overview
This document provides an overview of the changes and new APIs introduced for the Firefly Image 3 Model (Preview).

Specific benefits include:

- Improved generation quality with better depiction of details and more photorealistic results.
- Greater variety in generated outputs from a single prompt for photos, art, or flat illustrations.
- Improved ability to take reference images into account, both for stylization and for structure matching.
- Better understanding of prompts and compositions of complex scenes and text rendering.
- Improved image variations with varied options for composition, mood, and lighting.

See [this link](https://helpx.adobe.com/firefly/using/whats-new.html) for more details on what's new.

### New APIs

The following new APIs were introduced:

- **[Generate Similar Images](../api/generate-similar/):** Pass in a source image to use as a reference for generating similar image results.
- **[Generate Object Composite](../api/generate-object-composite/):** Upload an image (with or without mask), such as a product photo, and utilize a text prompt to generate a seamlessly composited scene featuring the product. Additionally, provide optional parameters to influence the style and content of the background. See [this link](https://helpx.adobe.com/firefly/using/whats-new/2024-3.html#object-composites) for more specific details.

### Updated APIs

The following existing APIs were updated to use the new Image Model 3, and have new and/or renamed parameters:

- **[Generate Images API](../api/image_generation/V3/):**

  - The `n` parameter has been renamed to `numVariations`.
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

  - The `photoSettings` parameter has been removed.
  - The `locale` parameter has been renamed to `promptBiasingLocaleCode`.

- **[Expand Image](../api/generative_expand/V3/):**

  - The `n` parameter has been renamed to `numVariations`.
  - `locale` has been renamed to `promptBiasingLocaleCode`.
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

- **[Fill Image](../api/generative_fill/V3):**

  - The `n` parameter has been renamed to `numVariations`.
  - `locale` has been renamed to `promptBiasingLocaleCode`.
  ​- Support for a `negativePrompt` parameter has been added.
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

  See [this link](https://helpx.adobe.com/firefly/using/generative-expand.html) for more details about the capabilities available for expanding and filling images with Firefly Image Model 3.
