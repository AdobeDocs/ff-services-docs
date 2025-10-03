---
title: Style Presets - Adobe Firefly APIs
description: A guide to using style presets with the Firefly Image Model APIs.
keywords:
  - Styles
  - Adobe Firefly Services
  - Firefly API
  - Developer documentation
  - generateImages
  - Style concepts
  - UI styling
  - CSS
  - Design system
  - Styling guidelines
  - Theme customization
  - User interface design
  - Responsive design
  - Custom styles
  - Style overrides
  - Design tokens
  - CSS variables
contributors:
  - 'https://github.com/bishoysefin'
  - 'https://github.com/amandahuarng'
  - 'https://github.com/nimithajalal'
  - 'https://github.com/hollyschinsky'
hideBreadcrumbNav: true
og:
  title: Style Presets - Adobe Firefly APIs
  description: A guide to using style presets with the Firefly Image Model APIs.
twitter:
  card: summary
  title: Style Presets - Adobe Firefly APIs
  description: A guide to using style presets with the Firefly Image Model APIs.
---

# Style Presets

Use style presets to customize the look and feel of your generated images.

## Understanding style presets

Firefly offers a collection of style presets to use with the [Generate Images API][1] that can give generated images a specific visual style or mood. By indicating these presets in the API request, you have more control, beyond the prompt, to create image variations.

Style presets are defined in the `presets` array in the Generate Images API request. All presets in the array apply to the generated image. To influence the impact of the presets, add or adjust the `strength` value.

<CodeBlock slots="heading, code" languages="JSON" />

Request parameter for presets

```json
// ... API request cURL ...
--data '{
    "prompt": "a puppy dressed as a renaissance artist",
    "numVariations": 4,
    "style": {
        // array of style presets for image variations
        "presets": [   
            "bw", "fantasy", "dramatic_light"
        ],
        "strength": 100
    }
}'
```

## Style Presets examples

Here are the style presets available and examples of the images they generate. Use these presets, in snake_case, in the API request.

||
| --- | --- | --- |
| ![Graphic](../../images/styles/2x/Graphic.png) <p style="text-align:center">graphic</p> | ![Wireframe](../../images/styles/2x/Wireframe.png) <p style="text-align:center">wireframe</p> | ![Vector look](../../images/styles/2x/Vector_look.png) <p style="text-align:center">vector_look</p>
| ![Black and white](../../images/styles/2x/Black_and_white.png) <p style="text-align:center">bw</p> | ![Cool tone](../../images/styles/2x/Cool_tone.png) <p style="text-align:center">cool_colors</p> | ![Golden](../../images/styles/2x/Golden.png) <p style="text-align:center">golden</p>
| ![Monochromatic](../../images/styles/2x/Monochromatic.png) <p style="text-align:center">monochromatic</p> | ![Muted color](../../images/styles/2x/Muted_color.png) <p style="text-align:center">muted_color</p> | ![Pastel color](../../images/styles/2x/Pastel_color.png) <p style="text-align:center">pastel_color</p>
| ![Toned image](../../images/styles/2x/Toned_image.png) <p style="text-align:center">toned_image</p> | ![Vibrant colors](../../images/styles/2x/Vibrant_colors.png) <p style="text-align:center">vibrant_colors</p> | ![Warm tone](../../images/styles/2x/Warm_tone.png) <p style="text-align:center">warm_tone</p>
| ![Closeup](../../images/styles/2x/Closeup.png) <p style="text-align:center">closeup</p> | ![Knolling](../../images/styles/2x/Knolling.png) <p style="text-align:center">knolling</p> | ![Landscape photography](../../images/styles/2x/Landscape_photography.png) <p style="text-align:center">landscape_photography</p>
| ![Macrophotography](../../images/styles/2x/Macrophotography.png) <p style="text-align:center">macrophotography</p> | ![Photographed through window](../../images/styles/2x/Photographed_through_window.png) <p style="text-align:center">photographed_through_window</p> | ![Shallow depth of field](../../images/styles/2x/Shallow_depth_of_field.png) <p style="text-align:center">shallow_depth_of_field</p>
| ![Shot from above](../../images/styles/2x/Shot_from_above.png) <p style="text-align:center">shot_from_above</p> | ![Shot from below](../../images/styles/2x/Shot_from_below.png) <p style="text-align:center">shot_from_below</p> | ![Surface detail](../../images/styles/2x/Surface_detail.png) <p style="text-align:center">surface_detail</p>
| ![Wide angle](../../images/styles/2x/Wide_angle.png) <p style="text-align:center">wide_angle</p> | ![Beautiful](../../images/styles/2x/Beautiful.png) <p style="text-align:center">beautiful</p> | ![Bohemian](../../images/styles/2x/Bohemian.png) <p style="text-align:center">bohemian</p>
| ![Chaotic](../../images/styles/2x/Chaotic.png) <p style="text-align:center">chaotic</p> | ![Dais](../../images/styles/2x/Dais.png) <p style="text-align:center">dais</p> | ![Divine](../../images/styles/2x/Divine.png) <p style="text-align:center">divine</p>
| ![Eclectic](../../images/styles/2x/Eclectic.png) <p style="text-align:center">eclectic</p> | ![Futuristic](../../images/styles/2x/Futuristic.png) <p style="text-align:center">futuristic</p> | ![Kitschy](../../images/styles/2x/Kitschy.png) <p style="text-align:center">kitschy</p>
| ![Nostalgic](../../images/styles/2x/Nostalgic.png) <p style="text-align:center">nostalgic</p> | ![Simple](../../images/styles/2x/Simple.png) <p style="text-align:center">simple</p> | ![Antique photo](../../images/styles/2x/Antique_photo.png) <p style="text-align:center">antique_photo</p>
| ![Bioluminescent](../../images/styles/2x/Bioluminescent.png) <p style="text-align:center">bioluminescent</p> | ![Bokeh effect](../../images/styles/2x/Bokeh_effect.png) <p style="text-align:center">bokeh</p> | ![Color explosion](../../images/styles/2x/Color_explosion.png) <p style="text-align:center">color_explosion</p>
| ![Dark](../../images/styles/2x/Dark.png) <p style="text-align:center">dark</p> | ![Faded image](../../images/styles/2x/Faded_image.png) <p style="text-align:center">faded_image</p> | ![Fisheye](../../images/styles/2x/Fisheye.png) <p style="text-align:center">fisheye</p>
| ![Gomori photography](../../images/styles/2x/Gomori_photography.png) <p style="text-align:center">gomori_photography</p> | ![Grainy film](../../images/styles/2x/Grainy_film.png) <p style="text-align:center">grainy_film</p> | ![Iridescent](../../images/styles/2x/Iridescent.png) <p style="text-align:center">iridescent</p>
| ![Isometric](../../images/styles/2x/Isometric.png) <p style="text-align:center">isometric</p> | ![Misty](../../images/styles/2x/Misty.png) <p style="text-align:center">misty</p> | ![Neon](../../images/styles/2x/Neon.png) <p style="text-align:center">neon</p>
| ![Otherworldly depiction](../../images/styles/2x/Otherworldly_depiction.png) <p style="text-align:center">otherworldly_depiction</p> | ![Ultraviolet](../../images/styles/2x/Ultraviolet.png) <p style="text-align:center">ultraviolet</p> | ![Underwater](../../images/styles/2x/Underwater.png) <p style="text-align:center">underwater</p>
| ![Backlighting](../../images/styles/2x/Backlighting.png) <p style="text-align:center">backlighting</p> | ![Dramatic light](../../images/styles/2x/Dramatic_lighting.png) <p style="text-align:center">dramatic_light</p> | ![Golden hour](../../images/styles/2x/Golden_hour.png) <p style="text-align:center">golden_hour</p>
| ![Harsh light](../../images/styles/2x/Harsh_light.png) <p style="text-align:center">harsh_light</p> | ![Long-time exposure](../../images/styles/2x/Long_time_exposure.png) <p style="text-align:center">long</p> | ![Low lighting](../../images/styles/2x/Low_lighting.png) <p style="text-align:center">low_lighting</p>
| ![Multiexposure](../../images/styles/2x/Multiexposure.png) <p style="text-align:center">multiexposure</p> | ![Studio light](../../images/styles/2x/Studio_light.png) <p style="text-align:center">studio_light</p> | ![Surreal lighting](../../images/styles/2x/Surreal_lighting.png) <p style="text-align:center">surreal_lighting</p>
| ![3d patterns](../../images/styles/2x/3d_patterns.png) <p style="text-align:center">3d_patterns</p> | ![Charcoal](../../images/styles/2x/Charcoal.png) <p style="text-align:center">charcoal</p> | ![Claymation](../../images/styles/2x/Claymation.png) <p style="text-align:center">claymation</p>
| ![Fabric](../../images/styles/2x/Fabric.png) <p style="text-align:center">fabric</p> | ![Fur](../../images/styles/2x/Fur.png) <p style="text-align:center">fur</p> | ![Guilloche patterns](../../images/styles/2x/Guilloche_patterns.png) <p style="text-align:center">guilloche_patterns</p>
| ![Layered paper](../../images/styles/2x/Layered_paper.png) <p style="text-align:center">layered_paper</p> | ![Marble](../../images/styles/2x/Marble.png) <p style="text-align:center">marble_sculpture</p> | ![Metal](../../images/styles/2x/Metal.png) <p style="text-align:center">made_of_metal</p>
| ![Origami](../../images/styles/2x/Origami.png) <p style="text-align:center">origami</p> | ![Paper mache](../../images/styles/2x/Paper_mache.png) <p style="text-align:center">paper_mache</p> | ![Polka-dot pattern](../../images/styles/2x/Polka_dot_pattern.png) <p style="text-align:center">polka</p>
| ![Strange patterns](../../images/styles/2x/Strange_patterns.png) <p style="text-align:center">strange_patterns</p> | ![Wood carving](../../images/styles/2x/Wood_carving.png) <p style="text-align:center">wood_carving</p> | ![Yarn](../../images/styles/2x/Yarn.png) <p style="text-align:center">yarn</p>
| ![Art deco](../../images/styles/2x/Art_deco.png) <p style="text-align:center">art_deco</p> | ![Art nouveau](../../images/styles/2x/Art_nouveau.png) <p style="text-align:center">art_nouveau</p> | ![Baroque](../../images/styles/2x/Baroque.png) <p style="text-align:center">baroque</p>
| ![Bauhaus](../../images/styles/2x/Bauhaus.png) <p style="text-align:center">bauhaus</p> | ![Constructivism](../../images/styles/2x/Constructivism.png) <p style="text-align:center">constructivism</p> | ![Cubism](../../images/styles/2x/Cubism.png) <p style="text-align:center">cubism</p>
| ![Cyberpunk](../../images/styles/2x/Cyberpunk.png) <p style="text-align:center">cyberpunk</p> | ![Fantasy](../../images/styles/2x/Fantasy.png) <p style="text-align:center">fantasy</p> | ![Fauvism](../../images/styles/2x/Fauvism.png) <p style="text-align:center">fauvism</p>
| ![Film noir](../../images/styles/2x/Film_noir.png) <p style="text-align:center">film_noir</p> | ![Glitch art](../../images/styles/2x/Glitch_art.png) <p style="text-align:center">glitch_art</p> | ![Impressionism](../../images/styles/2x/Impressionism.png) <p style="text-align:center">impressionism</p>
| ![Industrial](../../images/styles/2x/Industrial.png) <p style="text-align:center">industrialism</p> | ![Maximalism](../../images/styles/2x/Maximalism.png) <p style="text-align:center">maximalism</p> | ![Minimalism](../../images/styles/2x/Minimalism.png) <p style="text-align:center">minimalism</p>
| ![Modern art](../../images/styles/2x/Modern_art.png) <p style="text-align:center">modern_art</p> | ![Modernism](../../images/styles/2x/Modernism.png) <p style="text-align:center">modernism</p> | ![Neo-expressionism](../../images/styles/2x/Neoexpressionism.png) <p style="text-align:center">neo</p>
| ![Pointillism](../../images/styles/2x/Pointillism.png) <p style="text-align:center">pointillism</p> | ![Psychedelic](../../images/styles/2x/Psychedelic.png) <p style="text-align:center">psychedelic</p> | ![Science fiction](../../images/styles/2x/Science_fiction.png) <p style="text-align:center">science_fiction</p>
| ![Steampunk](../../images/styles/2x/Steampunk.png) <p style="text-align:center">steampunk</p> | ![Surrealism](../../images/styles/2x/Surrealism.png) <p style="text-align:center">surrealism</p> | ![Synthetism](../../images/styles/2x/Synthetism.png) <p style="text-align:center">synthetism</p>
| ![Synthwave](../../images/styles/2x/Synthwave.png) <p style="text-align:center">synthwave</p> | ![Vaporwave](../../images/styles/2x/Vaporwave.png) <p style="text-align:center">vaporwave</p> | ![Acrylic paint](../../images/styles/2x/Acrylic_paint.png) <p style="text-align:center">acrylic_paint</p>
| ![Bold lines](../../images/styles/2x/Bold_lines.png) <p style="text-align:center">bold_lines</p> | ![Chiaroscuro](../../images/styles/2x/Chiaroscuro.png) <p style="text-align:center">chiaroscuro</p> | ![Color shift art](../../images/styles/2x/Color_shift_art.png) <p style="text-align:center">color_shift_art</p>
| ![Daguerreotype](../../images/styles/2x/Daguerreotype.png) <p style="text-align:center">daguerreotype</p> | ![Digital fractal](../../images/styles/2x/Digital_fractal.png) <p style="text-align:center">digital_fractal</p> | ![Doodle drawing](../../images/styles/2x/Doodle_drawing.png) <p style="text-align:center">doodle_drawing</p>
| ![Double exposure](../../images/styles/2x/Double_exposure.png) <p style="text-align:center">double_exposure_portrait</p> | ![Fresco](../../images/styles/2x/Fresco.png) <p style="text-align:center">fresco</p> | ![Geometric pen](../../images/styles/2x/Geometric_pen.png) <p style="text-align:center">geometric_pen</p>
| ![Halftone](../../images/styles/2x/Halftone.png) <p style="text-align:center">halftone</p> | ![Ink](../../images/styles/2x/Ink.png) <p style="text-align:center">ink</p> | ![Light painting](../../images/styles/2x/Light_painting.png) <p style="text-align:center">light_painting</p>
| ![Line drawing](../../images/styles/2x/Line_drawing.png) <p style="text-align:center">line_drawing</p> | ![Linocut](../../images/styles/2x/Linocut.png) <p style="text-align:center">linocut</p> | ![Oil paint](../../images/styles/2x/Oil_paint.png) <p style="text-align:center">oil_paint</p>
| ![Paint Spattering](../../images/styles/2x/Paint_spattering.png) <p style="text-align:center">paint_spattering</p> | ![Painting](../../images/styles/2x/Painting.png) <p style="text-align:center">painting</p> | ![Palette knife](../../images/styles/2x/Palette_knife.png) <p style="text-align:center">palette_knife</p>
| ![Photo manipulation](../../images/styles/2x/Photo_manipulation.png) <p style="text-align:center">photo_manipulation</p> | ![Scribble texture](../../images/styles/2x/Scribble_texture.png) <p style="text-align:center">scribble_texture</p> |![Sketch](../../images/styles/2x/Sketch.png) <p style="text-align:center">sketch</p>
| ![Splattering](../../images/styles/2x/Splattering.png) <p style="text-align:center">splattering</p> | ![Stippling](../../images/styles/2x/Stippling.png) <p style="text-align:center">stippling_drawing</p> | ![Watercolor](../../images/styles/2x/Watercolor.png) <p style="text-align:center">watercolor</p>
| ![3d](../../images/styles/2x/3d.png) <p style="text-align:center">3d</p> | ![Anime](../../images/styles/2x/Anime.png) <p style="text-align:center">anime</p> | ![Cartoon](../../images/styles/2x/Cartoon.png) <p style="text-align:center">cartoon</p>
| ![Cinematic](../../images/styles/2x/Cinematic.png) <p style="text-align:center">cinematic</p> | ![Comic book](../../images/styles/2x/Comic_book.png) <p style="text-align:center">comic_book</p> | ![Concept art](../../images/styles/2x/Concept_art.png) <p style="text-align:center">concept_art</p>
| ![Cyber matrix](../../images/styles/2x/Cyber_matrix.png) <p style="text-align:center">cyber_matrix</p> | ![Digital art](../../images/styles/2x/Digital_art.png) <p style="text-align:center">digital_art</p> | ![Flat design](../../images/styles/2x/Flat_design.png) <p style="text-align:center">flat_design</p>
| ![Geometric](../../images/styles/2x/Geometric.png) <p style="text-align:center">geometric</p> | ![Glassmorphism](../../images/styles/2x/Glassmorphism.png) <p style="text-align:center">glassmorphism</p> | ![Glitch graphic](../../images/styles/2x/Glitch_graphic.png) <p style="text-align:center">glitch_graphic</p>
| ![Graffiti](../../images/styles/2x/Graffiti.png) <p style="text-align:center">graffiti</p> | ![Hyper realistic](../../images/styles/2x/Hyper_realistic.png) <p style="text-align:center">hyper_realistic</p> | ![Interior design](../../images/styles/2x/Interior_design.png) <p style="text-align:center">interior_design</p>
| ![Line gradient](../../images/styles/2x/Line_gradient.png) <p style="text-align:center">line_gradient</p> | ![Low poly](../../images/styles/2x/Low_poly.png) <p style="text-align:center">low_poly</p> | ![Newspaper collage](../../images/styles/2x/Newspaper_collage.png) <p style="text-align:center">newspaper_collage</p>
| ![Optical illusion](../../images/styles/2x/Optical_illusion.png) <p style="text-align:center">optical_illusion</p> | ![Pattern pixel](../../images/styles/2x/Pattern_pixel.png) <p style="text-align:center">pattern_pixel</p> | ![Pixel art](../../images/styles/2x/Pixel_art.png) <p style="text-align:center">pixel_art</p>
| ![Pop art](../../images/styles/2x/Pop_art.png) <p style="text-align:center">pop_art</p> | ![Product photo](../../images/styles/2x/Product_photo.png) <p style="text-align:center">product_photo</p> | ![Psychedelic background](../../images/styles/2x/Psychedelic_background.png) <p style="text-align:center">psychedelic_background</p>
| ![Psychedelic wonderland](../../images/styles/2x/Psychedelic_wonderland.png) <p style="text-align:center">psychedelic_wonderland</p> | ![Scandinavian](../../images/styles/2x/Scandinavian.png) <p style="text-align:center">scandinavian</p> | ![Splash images](../../images/styles/2x/Splash_images.png) <p style="text-align:center">splash_images</p>
| ![Stamp](../../images/styles/2x/Stamp.png) <p style="text-align:center">stamp</p> | ![Trompe l'oeil](../../images/styles/2x/Trompe_loeil.png) <p style="text-align:center">trompe_loeil</p>

## Concepts in action

Let's use style presets to generate a few image variations.

<InlineAlert variant="warning" slots="header, text" />

Before you start

You'll need a Firefly **Client ID** and **Access Token** for this exercise. Learn how to retrieve them in the [Authentication Guide][2]. **Securely store these credentials and never expose them in client-side or public code.**

1. First, open a secure terminal and `export` your **Client ID** and **Access Token** as environment variables:

```bash
export FIREFLY_SERVICES_CLIENT_ID=<your_Client_ID>
export FIREFLY_SERVICES_ACCESS_TOKEN=<your_Access_Token>
```

2. Next, make the request to the Generate Images API. We'll use a prompt for a Shakespearean puppy, and enter a few presets so that they apply together:

```bash
curl --location 'https://firefly-api.adobe.io/v3/images/generate-async' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header "x-api-key: $FIREFLY_SERVICES_CLIENT_ID" \
--header "Authorization: Bearer $FIREFLY_SERVICES_ACCESS_TOKEN" \
--data '{
    "prompt": "a puppy dressed as a renaissance artist",
    "numVariations": 4,
    "style": {
        "presets": [
            "bw", "fantasy", "dramatic_light"
        ]
    }
}'
```

The request returns a rapid response for the asynchronous job:

```json
{   
    "jobId":"<YOUR_JOB_ID>",
    "statusUrl":"https://firefly-epo854211.adobe.io/v3/status/urn:ff:jobs:...",
    "cancelUrl":"https://firefly-epo854211.adobe.io/v3/cancel/urn:ff:jobs:..."
}
```

3. Use the `jobId` to see the result:

<InlineAlert variant="info" slots="header, text" />

NOTE

The `numVariations` value creates four generated images that will be easy to compare. Four URLs are returned in the response.

```bash
curl -X GET "https://firefly-api.adobe.io/v3/status/<YOUR_JOB_ID>" \
    -H "x-api-key: $FIREFLY_SERVICES_CLIENT_ID" \
    -H "Authorization: Bearer $FIREFLY_SERVICES_ACCESS_TOKEN" \
    -H "Content-Type: application/json"
```

You'll see results similar to our example below. Notice that all the defined presets were applied to the prompt for a renaissance puppy!

**Sample Result**

![A renaissance artist puppy generated with presets][3]

<!-- links -->
[1]: ../../api/image_generation/V3_Async/
[2]: ../authentication/index.md
[3]: ../../images/puppy-renaissance-artist.jpeg
