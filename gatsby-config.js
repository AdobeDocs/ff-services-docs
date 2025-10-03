/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

module.exports = {
  pathPrefix: process.env.PATH_PREFIX || "/firefly-services/docs/",

  siteMetadata: {
    pages: [
      {
        title: "All Firefly Services",
        path: "/guides/",
      },
      {
        title: "Firefly API",
        description: "Docs and references for Firefly API",
        path: "/firefly-api/",
      },
      {
        title: "Photoshop API",
        description: "Docs and references for Photoshop API",
        path: "https://developer.adobe.com/firefly-services/docs/photoshop/?aio_internal",
      },
      {
        title: "Lightroom API",
        description: "Docs and references for Lightroom API",
        path: "/lightroom/",
      },
      {
        title: "Audio/Video API",
        description: "Docs and references for Audio/Video API",
        path: "https://developer.adobe.com/audio-video-firefly-services/?aio_internal",
      },
      {
        title: "InDesign API",
        description: "Docs and references for InDesign API",
        path: "/indesign-apis/",
      },
      {
        title: "Substance 3D API",
        description: "Unlock generative AI for rendering and object composites.",
        path: "https://developer.adobe.com/firefly-services/docs/s3dapi/?aio_internal",
      },
      {
        title: "Content Tagging API",
        description: "Docs and references for Content Tagging services",
        path: "https://experienceleague.adobe.com/docs/experience-platform/intelligent-services/content-commerce-ai/overview.html",
      },
    ],
    ///////////////////////////////////////////////
      // Firefly Services - specific left side nav
      ///////////////////////////////////////////////
    subPages: [
      // Main Firefly Services docs - left side nav
      {
        title: "Overview",
        path: "/guides/",
      },
      {
        title: "Quickstart",
        path: "/guides/quickstart"
      },
      {
        title: "Getting Credentials",
        path: "/guides/get-started.md",
      },
      {
        title: "Tutorials",
        path: "/guides/tutorials",
        pages: [
          {
            title: "Creating Product Images at Scale with Firefly Services",
            path: "/guides/tutorials/create-product-images-with-ff.md",
          },
          /*
          {
            title: "Getting Started with the Firefly Services SDK",
            path: "/guides/tutorials/using-the-sdk.md",
          },
          */
        ],
      },
      /*
      {
        title: "SDK",
        path: "/guides/sdks",
      },
      */
      ///////////////////////////////////////////////
      // Firefly API-specific left side nav
      ///////////////////////////////////////////////
      {
        title: "Overview",
        path: "/firefly-api/",
      },
      {
        title: "Quickstart",
        path: "/firefly-api/guides/",
      },
      {
        title: "Concepts",
        path: "/firefly-api/guides/concepts/authentication/",
        pages: [
          {
            title: "Adobe Developer Console",
            path: "/firefly-api/guides/concepts/dev-console/",
          },
          {
            title: "Authentication",
            path: "/firefly-api/guides/concepts/authentication/",
          },
          {
            title: "Image Upload",
            path: "/firefly-api/guides/concepts/image-upload/",
          },
          {
            title: "Masking",
            path: "/firefly-api/guides/concepts/masking/",
          },
          {
            title: "Placement",
            path: "/firefly-api/guides/concepts/placement/",
          },
          {
            title: "Rate limits",
            path: "/firefly-api/guides/concepts/rate-limits/",
          },
          {
            title: "Seeds",
            path: "/firefly-api/guides/concepts/seeds",
          },
          {
            title: "Structure Image Reference",
            path: "/firefly-api/guides/concepts/structure-image-reference/",
          },
          {
            title: "Style Image Reference",
            path: "/firefly-api/guides/concepts/style-image-reference/",
          },
          {
            title: "Style Presets",
            path: "/firefly-api/guides/concepts/style-presets/",
          },
          {
            title: "Custom Models",
            path: "/firefly-api/guides/concepts/custom-models/",
          },
        ],
      },
      {
        title: "How-Tos",
        path: "/firefly-api/guides/how-tos/firefly-generate-image-api-tutorial.md/",
        pages: [
          {
            title: "Generate Image API Tutorial",
            path: "/firefly-api/guides/how-tos/firefly-generate-image-api-tutorial.md",
          },
          {
            title: "Generate Image from Custom Model Tutorial",
            path: "/firefly-api/guides/how-tos/cm-generate-image/",
          },
          {
            title: "Expand Image API Tutorial",
            path: "/firefly-api/guides/how-tos/firefly-expand-image-api-tutorial.md",
          },
          {
            title: "Fill Image API Tutorial",
            path: "/firefly-api/guides/how-tos/firefly-fill-image-api-tutorial.md",
          },
          {
            title: "Grant Access to a Custom Model",
            path: "/firefly-api/guides/how-tos/cm-share-model/",
          },
          {
            title: "Using the Firefly Asynchronous APIs",
            path: "/firefly-api/guides/how-tos/using-async-apis.md",
          },
        ],
      },
      {
        title: "API Reference",
        path: "/firefly-api/guides/api/image_generation/V3/",
        pages: [
          {
            title: "List Custom Models",
            path: "/firefly-api/guides/api/list_custom_models",
          },
          {
            title: "Generate Images",
            path: "/firefly-api/guides/api/image_generation/V3/",
            pages: [
              {
                title: "v3 async",
                path: "/firefly-api/guides/api/image_generation/V3_Async/",
              },
            ],
          },
          {
            title: "Generate Similar Images",
            path: "/firefly-api/guides/api/generate-similar/V3/",
            pages: [
              {
                title: "v3 async",
                path: "/firefly-api/guides/api/generate-similar/V3_Async/",
              },
            ],
          },
          {
            title: "Generate Object Composite",
            path: "/firefly-api/guides/api/generate-object-composite/V3/",
            pages: [
              {
                title: "v3 async",
                path: "/firefly-api/guides/api/generate-object-composite/V3_Async/",
              },
            ],
          },
          {
            title: "Expand Image",
            path: "/firefly-api/guides/api/generative_expand/V3/",
            pages: [
              {
                title: "v3 async",
                path: "/firefly-api/guides/api/generative_expand/V3_Async/",
              },
            ],
          },
          {
            title: "Fill Image",
            path: "/firefly-api/guides/api/generative_fill/V3/",
            pages: [
              {
                title: "v3 async",
                path: "/firefly-api/guides/api/generative_fill/V3_Async/",
              },
            ],
          },
          {
            title: "Upload",
            path: "/firefly-api/guides/api/upload_image/V2/",
            pages: [
              {
                title: "v2",
                path: "/firefly-api/guides/api/upload_image/V2/",
              },
            ],
          },
          {
            title: "Generate Video",
            path: "/firefly-api/guides/api/generate_video/V3_Async/",
            pages: [
              {
                title: "v3 async",
                path: "/firefly-api/guides/api/generate_video/V3_Async/",
              },
            ],
          },
        ],
      },
      {
        title: "Changelog",
        path: "/firefly-api/guides/changelog/",
      },
      {
        title: "Help",
        path: "/firefly-api/guides/help/best-practices/",
        pages: [
          {
            title: "Best Practices",
            path: "/firefly-api/guides/help/best-practices/",
          },
          {
            title: "Troubleshooting",
            path: "/firefly-api/guides/help/troubleshooting/",
          },
          {
            title: "Usage Notes",
            path: "/firefly-api/guides/help/usage_notes/",
          },
        ],
      },
      // END Firefly API left nav
      ///////////////////////////////////////////////
      // Lightroom API-specific left side nav
      ///////////////////////////////////////////////
      {
        title: "Overview",
        path: "/lightroom/",
      },
      {
        title: 'Quickstart',
        path: '/lightroom/quickstart/'
      },
      {
        title: "General Workflow",
        path: "/lightroom/general-workflow/",
      },
      {
        title: "Features",
        path: "/lightroom/features/",
      },
      {
        title: "Code Samples",
        path: "/lightroom/code-sample/",
      },
      {
        title: "API Reference",
        path: "/lightroom/api/lightroom_applyPresets.md",
        pages: [
          {
            title: "Apply Presets",
            path: "/lightroom/api/lightroom_applyPresets.md",
          },
          {
            title: "Apply XMP",
            path: "/lightroom/api/lightroom_applyXMP.md",
          },
          {
            title: "Apply Edits",
            path: "/lightroom/api/lightroom_edits.md",
          },
          {
            title: "Auto Straighten",
            path: "/lightroom/api/lightroom_autoStraighten.md",
          },
          {
            title: "Auto Tone",
            path: "/lightroom/api/lightroom_autoTone.md",
          },
          {
            title: "Get Status",
            path: "/lightroom/api/lightroom_getStatus.md",
          },
        ],
      },
            ///////////////////////////////////////////////
      // InDesign API-specific left side nav
      ///////////////////////////////////////////////
      {
        title: "Overview",
        path: "/indesign-apis/index.md",
      },
      {
        title: "Concepts",
        path: "/indesign-apis/concepts/index.md",
      },
      {
        title: "How-tos",
        path: "/indesign-apis/how-tos/logging/",
        pages: [
          {
            title: "Logging",
            path: "/indesign-apis/how-tos/logging/",
          },
          {
            title: "Working with Data Merge API",
            path: "/indesign-apis/how-tos/working-with-datamerge-api/",
          },
          {
            title: "Working with Rendition API",
            path: "/indesign-apis/how-tos/working-with-rendition-api/",
          },
          {
            title: "Working with Custom Scripts API",
            path: "/indesign-apis/how-tos/working-with-custom-scripts-api/",
          },
          {
            title: "Writing scripts for Custom Scripts API",
            path: "/indesign-apis/how-tos/writing-scripts-for-custom-scripts-api/",
          },
        ],
      },
      {
        title: "API Reference",
        path: "/indesign-apis/api/datamerge.md",
        pages: [
          {
            title: "Data Merge API",
            path: "/indesign-apis/api/datamerge.md",
          },
          {
            title: "Rendition API ",
            path: "/indesign-apis/api/rendition.md",
          },
          {
            title: "Custom Scripts API",
            path: "/indesign-apis/api/scripts.md",
          },
          {
            title: "Remap Links API",
            path: "/indesign-apis/api/remaplinks.md",
          },
          {
            title: "Status API",
            path: "/indesign-apis/api/status.md",
          },
        ],
      },
      {
        title: "Changelog",
        path: "/indesign-apis/changelog/index.md",
      },
      {
        title: "Help",
        path: "/indesign-apis/help/usage_notes/",
        pages: [
          {
            title: "Usage Notes",
            path: "/indesign-apis/help/usage_notes/",
          }
        ]
      },
      ///////////////////////////////////////////////
    ],
  },
  plugins: [`@adobe/gatsby-theme-aio`],
};
