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
  * Text treatments such as strikethrough, underline, capitalization.
  * Character size and color.
  * Line and character spacing through leading, tracking, autoKern settings.
* All the paragraph properties are supported.
* Use custom fonts when specified through the `options.fonts` section in the API request body.

### Usage Recommendations

* Ensure that the input file is a PSD and that it contains one or more text layers.
* Please refer to [Font Handling](#font-handling) and [Handle Missing Fonts](#handle-missing-fonts-in-the-document) for a better understanding.
* You can find a code sample [here.](../../code-sample/index.md#making-a-text-layer-edit)

### Known Limitations

The API cannot automatically detect missing fonts in the layers. To prevent potential missing fonts from being replaced, please provide a `href` to the font in the `options.fonts` section of the API. For more details on specifying custom fonts, please refer to the example section below.

In this example, the font on the original image was altered using the Text API, as depicted in the image on the left:
![alt image](./textlayer_example.png?raw=true "Original Image").

## Text layers Edits

The Photoshop API currently supports creating and editing of Text Layer with different fonts, character styles and paragraph styles. The set of text attributes that can be edited is listed below:

* Edit the text contents
* Change the font. See the `Fonts` section for more information.
* Edit the font size
* Change the font color in the following formats: rgb, cmyk, gray, lab
* Edit the text orientation (horizontal/vertical)
* Edit the paragraph alignment (left, center, right, justify, justifyLeft, justifyCenter, justifyRight)

We also have an example of making a simple text layer edit.

[Text layer Example Code](../../code-sample/index.md#edit-text-layers)

### Font handling

In order to be able to correctly operate on text layers in the PSD, the corresponding fonts needed for these layers will need to be available when the server is processing the PSD. These include fonts from the following cases:

1. The font that is in the text layer being edited, but the font itself is not being changed
2. If the font in a text layer is being changed to a new font

While referencing fonts in the API request, please ensure that the correct Postscript name for that font is used. Referencing to that font with any other name will result in the API treating this as a missing font.

The Photoshop API supports using the following category of fonts:

* You can find a list of currently supported fonts [here](#photoshop-cc)
* Custom/Other Fonts: These are the fonts that are either owned by you or the ones that only you are authorized to use.
  To use a custom font you must include an href to the font in your request. Look at the `options.fonts` section of the API docs for more information.
  For including an href to the font in your request, please ensure the font file name to be in this format: `<font_postscript_name>.<ext>`, when it is being uploaded in your choice of storage. A sample `options.fonts` section will look like so:

  ```js
  {
    "storage": "external",
    "href": "<Storage URL to OpenSansCondensed-Light.ttf>"
  }
  ```

  **Note:** This also applies to any other font present in the document which is not to be found in the first 2 categories above.

Here is an example usage of a custom font: [Custom font](../../code-sample/index.md#custom-font-in-a-text-layer)

#### Handle missing fonts in the document.

The API provides two options to control the behavior when there are missing fonts, as the request is being processed:

Specify a global font which would act as a default font for the current request: The `globalFont` field in the `options` section of the request can be used to specify the full postscript name of this font.
For any textLayer edit/add operation, if the font used specifically for that layer is missing, this font will be used as the default. If the global font itself is missing, then the action to be taken will be dictated by the `manageMissingFonts` options as explained here in the next bullet point.

**Note**: If using an OAuth integration, Adobe Fonts can be used as a global font as well. If the global font is a custom font, please upload the font to one of the cloud storage types that is supported and specify the `href` and `storage` type in the `options.fonts` section of the request.

Specify the action to be taken if one or more fonts required for the add/edit operation(s) are missing: The `manageMissingFonts` field in the `options` section of the request can be used to specify this action. It can accept one of the following 2 values:

* `fail` to force the request/job to fail
* `useDefault` to use our system designated default font, which is: `ArialMT`

In this example we show you how to handle missing fonts using the `manageMissingFonts` and `globalFont` options.

### Limitations

Most of the text attributes retain their respective original values. There are some attributes however that do not retain their original values. For example (and not limited to): tracking, leading, kerning.

### Supported Fonts

This is a list of all of the supported Postscript fonts for Photoshop API.

### Photoshop CC

|                                   |
|---------------------------------- |
| AcuminVariableConcept             |
| AdobeArabic-Bold                  |
| AdobeArabic-BoldItalic            |
| AdobeArabic-Italic                |
| AdobeArabic-Regular               |
| AdobeDevanagari-Bold              |
| AdobeDevanagari-BoldItalic        |
| AdobeDevanagari-Italic            |
| AdobeDevanagari-Regular           |
| AdobeFanHeitiStd-Bold             |
| AdobeGothicStd-Bold               |
| AdobeGurmukhi-Bold                |
| AdobeGurmukhi-Regular             |
| AdobeHebrew-Bold                  |
| AdobeHebrew-BoldItalic            |
| AdobeHebrew-Italic                |
| AdobeHebrew-Regular               |
| AdobeHeitiStd-Regular             |
| AdobeMingStd-Light                |
| AdobeMyungjoStd-Medium            |
| AdobePiStd                        |
| AdobeSongStd-Light                |
| AdobeThai-Bold                    |
| AdobeThai-BoldItalic              |
| AdobeThai-Italic                  |
| AdobeThai-Regular                 |
| CourierStd                        |
| CourierStd-Bold                   |
| CourierStd-BoldOblique            |
| CourierStd-Oblique                |
| EmojiOneColor                     |
| KozGoPr6N-Bold                    |
| KozGoPr6N-Medium                  |
| KozGoPr6N-Regular                 |
| KozMinPr6N-Regular                |
| MinionPro-Regular                 |
| MinionVariableConcept-Italic      |
| MinionVariableConcept-Roman       |
| MyriadArabic-Bold                 |
| MyriadArabic-BoldIt               |
| MyriadArabic-It                   |
| MyriadArabic-Regular              |
| MyriadHebrew-Bold                 |
| MyriadHebrew-BoldIt               |
| MyriadHebrew-It                   |
| MyriadHebrew-Regular              |
| MyriadPro-Bold                    |
| MyriadPro-BoldIt                  |
| MyriadPro-It                      |
| MyriadPro-Regular                 |
| MyriadVariableConcept-Italic      |
| MyriadVariableConcept-Roman       |
| NotoSansKhmer-Regular             |
| NotoSansLao-Regular               |
| NotoSansMyanmar-Regular           |
| NotoSansSinhala-Regular           |
| SourceCodeVariable-Italic         |
| SourceCodeVariable-Roman          |
| SourceSansVariable-Italic         |
| SourceSansVariable-Roman          |
| SourceSerifVariable-Roman         |
| TrajanColor-Concept               |

