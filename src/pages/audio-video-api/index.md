<Hero slots="heading, text" background="rgb(233, 80, 80)"/>

# Video Reframing API

Harness the power of the Reframe API to programmatically reframe videos for social media.

## Overview

Say goodbye to the hassle of manually editing videos for use on different platforms! The Reframe API is a RESTful API that intelligently analyzes video content and dynamically adjusts frame composition to fit the aspect ratios you've specified.

<InlineAlert variant="info" slots="text"  />

All content in generated reframed output is derived solely from the original source video.

This API uses technology similar to the Auto Reframe feature currently available in Premiere Pro software. It can be integrated with third-party systems and workflows, subject to applicable terms and conditions. Performance and results may vary based on input parameters and system configurations.

![](reframe.gif)

Reframe features include:

1. **Generate Video Variations**: The API accepts video input, processes it, and delivers output with specific aspect ratios (including but not limited to 4:3, 9:16, and 1:1) via downloadable links.
2. **Analyze Scenes**: Enable scene edit detection to analyze video transitions and use the existing video characteristics to maintain compositional integrity across different aspect ratio outputs.
3. **Track Status**: Check a job's progress using a designated endpoint. Response times and update frequencies are subject to system load and configuration.
4. **Add Overlays**: Apply pre-generated graphic overlays, such as GIFs or PNGs, over videos with precise control over timing, positioning, scaling, and looping behavior. Customization ensures that overlays align across different aspect ratios and remain consistent with the visual layout.

<DiscoverBlock width="100%" slots="heading, link, text"/>

## Discover

[Reframe API](./api/specification.md)

Dive right into the API specification.

<Resources slots="heading, links"/>

### Next steps

* [Get authenticated](/getting_started/index.md)
* [Quickstart](/guides/index.md)
