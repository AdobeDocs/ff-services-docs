---
title: Adobe Photoshop API and Text
description: Learn about using Text with the Photoshop API.
keywords:
  - Adobe Photoshop API uses cases
  - Text
contributors:
  - https://github.com/archyposada
  - https://github.com/sushiriot
hideBreadcrumbNav: true
---

# Text

Copy and paste text, edit and resize it, or add text effects using Photoshop API.

## APIs and Text

The Edit Text endpoint supports editing one or more text layers within a PSD.

It enables users to:

* Format text properties such as antialias, orientation and be able to edit text contents. (Note: Changing only the text properties will not change any character/paragraph styling).
* Some of the key character properties that can be formatted include (but not limited to):
  * Text treatments such as strikethrough, underline, fontCaps.
  * Character size and color.
  * Line and character spacing through leading, tracking, autoKern settings.
* All the paragraph properties are supported.
* Use custom fonts when specified through the options.fonts section in the API request body.

### Usage Recommendations

* Ensure that the input file is a PSD and that it contains one or more text layers.
* Please refer to [Font Handling](../features/index.md#font-handling) and [Handle Missing Fonts](../features/index.md#handle-missing-fonts-in-the-document) for a better understanding.
* You can find a code sample [here.](../code-sample/index.md#making-a-text-layer-edit)

### Known Limitations

The API cannot automatically detect missing fonts in the layers. To prevent potential missing fonts from being replaced, please provide a href to the font(s) in the options.fonts section of the API. For more details on specifying custom fonts, please refer to the example section below.

In this example, the font on the original image was altered using the Text API, as depicted in the image on the left:
![alt image](./textlayer_example.png?raw=true "Original Image")
