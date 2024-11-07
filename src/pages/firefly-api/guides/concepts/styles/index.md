---
title: Styles - Adobe Firefly APIs
description: A guide to using styles with the Firefly Image Model APIs.
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
  - https://github.com/amandahuarng
  - https://github.com/nimithajalal
  - https://github.com/hollyschinsky
hideBreadcrumbNav: true
---

# Image Model Styles

Certain Firefly API endpoints, including the [Generate Images](../../api/image_generation/V3/) and [Generate Object Composite](../../api/generate-object-composite/) APIs allow you to specify optional content classes and image styles which influence the generated output.

The table below exemplifies the visual representations of each of the content classes and image styles/presets available. Simply specify the `Preset ID` as a string to the Firefly API call where they are supported. 

<InlineAlert variant="success" slots="text" />

Check out the [Using Content Class and Style Presets](../../how-tos/using-content-class-style-preset.md) guide for more details on using content class and style presets.

||
|:-------------------| :--------:
| photo              | ![Photo](../../images/styles/2x/Photo.png) <p style="text-align:center">photo</p>
| art                | ![Art](../../images/styles/2x/Art.png)
| graphic            | ![Graphic](../../images/styles/2x/Graphic.png)
| bw                 | ![Black and white](../../images/styles/2x/Black_and_white.png)
| cool_colors        | ![Cool tone](../../images/styles/2x/Cool_tone.png)
| golden             | ![Golden](../../images/styles/2x/Golden.png)
| monochromatic      | ![Monochromatic](../../images/styles/2x/Monochromatic.png)
| muted_color        | ![Muted color](../../images/styles/2x/Muted_color.png)
| pastel_color       | ![Pastel color](../../images/styles/2x/Pastel_color.png)
| toned_image        | ![Toned image](../../images/styles/2x/Toned_image.png)
| vibrant_colors     | ![Vibrant colors](../../images/styles/2x/Vibrant_colors.png)
| warm_tone          | ![Warm tone](../../images/styles/2x/Warm_tone.png)
| closeup            | ![Closeup](../../images/styles/2x/Closeup.png)
| knolling           | ![Knolling](../../images/styles/2x/Knolling.png)
| landscape_photography | ![Landscape photography](../../images/styles/2x/Landscape_photography.png)
| macrophotography   | ![Macrophotography](../../images/styles/2x/Macrophotography.png)
| photographed_through_window | ![Photographed through window](../../images/styles/2x/Photographed_through_window.png)
| shallow_depth_of_field | ![Shallow depth of field](../../images/styles/2x/Shallow_depth_of_field.png)
| shot_from_above    | ![Shot from above](../../images/styles/2x/Shot_from_above.png)
| shot_from_below    | ![Shot from below](../../images/styles/2x/Shot_from_below.png)
| surface_detail     | ![Surface detail](../../images/styles/2x/Surface_detail.png)
| wide_angle         | ![Wide angle](../../images/styles/2x/Wide_angle.png)
| beautiful          | ![Beautiful](../../images/styles/2x/Beautiful.png)
| bohemian           | ![Bohemian](../../images/styles/2x/Bohemian.png)
| chaotic            | ![Chaotic](../../images/styles/2x/Chaotic.png)
| dais               | ![Dais](../../images/styles/2x/Dais.png)
| divine             | ![Divine](../../images/styles/2x/Divine.png)
| eclectic           | ![Eclectic](../../images/styles/2x/Eclectic.png)
| futuristic         | ![Futuristic](../../images/styles/2x/Futuristic.png)
| kitschy            | ![Kitschy](../../images/styles/2x/Kitschy.png)
| nostalgic          | ![Nostalgic](../../images/styles/2x/Nostalgic.png)
| simple             | ![Simple](../../images/styles/2x/Simple.png)
| antique_photo      | ![Antique photo](../../images/styles/2x/Antique_photo.png)
| bioluminescent     | ![Bioluminescent](../../images/styles/2x/Bioluminescent.png)
| bokeh              | ![Bokeh effect](../../images/styles/2x/Bokeh_effect.png)
| color_explosion    | ![Color explosion](../../images/styles/2x/Color_explosion.png)
| dark               | ![Dark](../../images/styles/2x/Dark.png)
| faded_image        | ![Faded image](../../images/styles/2x/Faded_image.png)
| fisheye            | ![Fisheye](../../images/styles/2x/Fisheye.png)
| gomori_photography | ![Gomori photography](../../images/styles/2x/Gomori_photography.png)
| grainy_film        | ![Grainy film](../../images/styles/2x/Grainy_film.png)
| iridescent         | ![Iridescent](../../images/styles/2x/Iridescent.png)
| isometric          | ![Isometric](../../images/styles/2x/Isometric.png)
| misty              | ![Misty](../../images/styles/2x/Misty.png)
| neon               | ![Neon](../../images/styles/2x/Neon.png)
| otherworldly_depiction | ![Otherworldly depiction](../../images/styles/2x/Otherworldly_depiction.png)
| ultraviolet        | ![Ultraviolet](../../images/styles/2x/Ultraviolet.png)
| underwater         | ![Underwater](../../images/styles/2x/Underwater.png)
| backlighting       | ![Backlighting](../../images/styles/2x/Backlighting.png)
| dramatic_light     | ![Dramatic light](../../images/styles/2x/Dramatic_lighting.png)
| golden_hour        | ![Golden hour](../../images/styles/2x/Golden_hour.png)
| harsh_light        | ![Harsh light](../../images/styles/2x/Harsh_light.png)
| long-time_exposure | ![Long-time exposure](../../images/styles/2x/Long_time_exposure.png)
| low_lighting       | ![Low lighting](../../images/styles/2x/Low_lighting.png)
| multiexposure      | ![Multiexposure](../../images/styles/2x/Multiexposure.png)
| studio_light       | ![Studio light](../../images/styles/2x/Studio_light.png)
| surreal_lighting   | ![Surreal lighting](../../images/styles/2x/Surreal_lighting.png)
| 3d_patterns        | ![3d patterns](../../images/styles/2x/3d_patterns.png)
| charcoal           | ![Charcoal](../../images/styles/2x/Charcoal.png)
| claymation         | ![Claymation](../../images/styles/2x/Claymation.png)
| fabric             | ![Fabric](../../images/styles/2x/Fabric.png)
| fur                | ![Fur](../../images/styles/2x/Fur.png)
| guilloche_patterns | ![Guilloche patterns](../../images/styles/2x/Guilloche_patterns.png)
| layered_paper      | ![Layered paper](../../images/styles/2x/Layered_paper.png)
| marble_sculpture   | ![Marble](../../images/styles/2x/Marble.png)
| made_of_metal      | ![Metal](../../images/styles/2x/Metal.png)
| origami            | ![Origami](../../images/styles/2x/Origami.png)
| paper_mache        | ![Paper mache](../../images/styles/2x/Paper_mache.png)
| polka-dot_pattern  | ![Polka-dot pattern](../../images/styles/2x/Polka_dot_pattern.png)
| strange_patterns   | ![Strange patterns](../../images/styles/2x/Strange_patterns.png)
| wood_carving       | ![Wood carving](../../images/styles/2x/Wood_carving.png)
| yarn               | ![Yarn](../../images/styles/2x/Yarn.png)
| art_deco           | ![Art deco](../../images/styles/2x/Art_deco.png)
| art_nouveau        | ![Art nouveau](../../images/styles/2x/Art_nouveau.png)
| baroque            | ![Baroque](../../images/styles/2x/Baroque.png)
| bauhaus            | ![Bauhaus](../../images/styles/2x/Bauhaus.png)
| constructivism     | ![Constructivism](../../images/styles/2x/Constructivism.png)
| cubism             | ![Cubism](../../images/styles/2x/Cubism.png)
| cyberpunk          | ![Cyberpunk](../../images/styles/2x/Cyberpunk.png)
| fantasy            | ![Fantasy](../../images/styles/2x/Fantasy.png)
| fauvism            | ![Fauvism](../../images/styles/2x/Fauvism.png)
| film_noir          | ![Film noir](../../images/styles/2x/Film_noir.png)
| glitch_art         | ![Glitch art](../../images/styles/2x/Glitch_art.png)
| impressionism      | ![Impressionism](../../images/styles/2x/Impressionism.png)
| industrialism      | ![Industrial](../../images/styles/2x/Industrial.png)
| maximalism         | ![Maximalism](../../images/styles/2x/Maximalism.png)
| minimalism         | ![Minimalism](../../images/styles/2x/Minimalism.png)
| modern_art         | ![Modern art](../../images/styles/2x/Modern_art.png)
| modernism          | ![Modernism](../../images/styles/2x/Modernism.png)
| neo-expressionism  | ![Neo-expressionism](../../images/styles/2x/Neoexpressionism.png)
| pointillism        | ![Pointillism](../../images/styles/2x/Pointillism.png)
| psychedelic        | ![Psychedelic](../../images/styles/2x/Psychedelic.png)
| science_fiction    | ![Science fiction](../../images/styles/2x/Science_fiction.png)
| steampunk          | ![Steampunk](../../images/styles/2x/Steampunk.png)
| surrealism         | ![Surrealism](../../images/styles/2x/Surrealism.png)
| synthetism         | ![Synthetism](../../images/styles/2x/Synthetism.png)
| synthwave          | ![Synthwave](../../images/styles/2x/Synthwave.png)
| vaporwave          | ![Vaporwave](../../images/styles/2x/Vaporwave.png)
| acrylic_paint      | ![Acrylic paint](../../images/styles/2x/Acrylic_paint.png)
| bold_lines         | ![Bold lines](../../images/styles/2x/Bold_lines.png)
| chiaroscuro        | ![Chiaroscuro](../../images/styles/2x/Chiaroscuro.png)
| color_shift_art    | ![Color shift art](../../images/styles/2x/Color_shift_art.png)
| daguerreotype      | ![Daguerreotype](../../images/styles/2x/Daguerreotype.png)
| digital_fractal    | ![Digital fractal](../../images/styles/2x/Digital_fractal.png)
| doodle_drawing     | ![Doodle drawing](../../images/styles/2x/Doodle_drawing.png)
| double_exposure_portrait | ![Double exposure](../../images/styles/2x/Double_exposure.png)
| fresco             | ![Fresco](../../images/styles/2x/Fresco.png)
| geometric_pen      | ![Geometric pen](../../images/styles/2x/Geometric_pen.png)
| halftone           | ![Halftone](../../images/styles/2x/Halftone.png)
| ink                | ![Ink](../../images/styles/2x/Ink.png)
| light_painting     | ![Light painting](../../images/styles/2x/Light_painting.png)
| line_drawing       | ![Line drawing](../../images/styles/2x/Line_drawing.png)
| linocut            | ![Linocut](../../images/styles/2x/Linocut.png)
| oil_paint          | ![Oil paint](../../images/styles/2x/Oil_paint.png)
| paint_spattering   | ![Paint Spattering](../../images/styles/2x/Paint_spattering.png)
| painting           | ![Painting](../../images/styles/2x/Painting.png)
| palette_knife      | ![Palette knife](../../images/styles/2x/Palette_knife.png)
| photo_manipulation | ![Photo manipulation](../../images/styles/2x/Photo_manipulation.png)
| scribble_texture   | ![Scribble texture](../../images/styles/2x/Scribble_texture.png)
| sketch             |![Sketch](../../images/styles/2x/Sketch.png)
| splattering        | ![Splattering](../../images/styles/2x/Splattering.png)
| stippling_drawing  | ![Stippling](../../images/styles/2x/Stippling.png)
| watercolor         | ![Watercolor](../../images/styles/2x/Watercolor.png)
| 3d                 | ![3d](../../images/styles/2x/3d.png)
| anime              | ![Anime](../../images/styles/2x/Anime.png)
| cartoon            | ![Cartoon](../../images/styles/2x/Cartoon.png)
| cinematic          | ![Cinematic](../../images/styles/2x/Cinematic.png)
| comic_book         | ![Comic book](../../images/styles/2x/Comic_book.png)
| concept_art        | ![Concept art](../../images/styles/2x/Concept_art.png)
| cyber_matrix       | ![Cyber matrix](../../images/styles/2x/Cyber_matrix.png)
| digital_art        | ![Digital art](../../images/styles/2x/Digital_art.png)
| flat_design        | ![Flat design](../../images/styles/2x/Flat_design.png)
| geometric          | ![Geometric](../../images/styles/2x/Geometric.png)
| glassmorphism      | ![Glassmorphism](../../images/styles/2x/Glassmorphism.png)
| glitch_graphic     | ![Glitch graphic](../../images/styles/2x/Glitch_graphic.png)
| graffiti           | ![Graffiti](../../images/styles/2x/Graffiti.png)
| hyper_realistic    | ![Hyper realistic](../../images/styles/2x/Hyper_realistic.png)
| interior_design    | ![Interior design](../../images/styles/2x/Interior_design.png)
| line_gradient      | ![Line gradient](../../images/styles/2x/Line_gradient.png)
| low_poly           | ![Low poly](../../images/styles/2x/Low_poly.png)
| newspaper_collage  | ![Newspaper collage](../../images/styles/2x/Newspaper_collage.png)
| optical_illusion   | ![Optical illusion](../../images/styles/2x/Optical_illusion.png)
| pattern_pixel      | ![Pattern pixel](../../images/styles/2x/Pattern_pixel.png)
| pixel_art          | ![Pixel art](../../images/styles/2x/Pixel_art.png)
| pop_art            | ![Pop art](../../images/styles/2x/Pop_art.png)
| product_photo      | ![Product photo](../../images/styles/2x/Product_photo.png)
| psychedelic_background | ![Psychedelic background](../../images/styles/2x/Psychedelic_background.png)
| psychedelic_wonderland | ![Psychedelic wonderland](../../images/styles/2x/Psychedelic_wonderland.png)
| scandinavian       | ![Scandinavian](../../images/styles/2x/Scandinavian.png)
| splash_images      | ![Splash images](../../images/styles/2x/Splash_images.png)
| stamp              | ![Stamp](../../images/styles/2x/Stamp.png)
| trompe_loeil       | ![Trompe l'oeil](../../images/styles/2x/Trompe_loeil.png)
| vector_look        | ![Vector look](../../images/styles/2x/Vector_look.png)
| wireframe          | ![Wireframe](../../images/styles/2x/Wireframe.png)
