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
    docs: {
        title: 'Support',
        path: 'https://airtable.com/appu5RTWgdM95jynx/pagyuT1qspNJcPU2E/form'
    },
    pages: [
      {
        title: "All Firefly Services",
        path: "/guides/",
      },
      {
        title: "Firefly API",
        description: "Docs and references for Firefly API",
        path: "https://developer.adobe.com/firefly-services/docs/firefly-api/?aio_internal",
      },
      {
        title: "Creative Production API",
        description: "Docs and references for Workflow Builder API",
        path: "https://developer.adobe.com/firefly-services/docs/workflow-builder-api/?aio_internal",
      },
      {
        title: "Photoshop API",
        description: "Docs and references for Photoshop API",
        path: "https://developer.adobe.com/firefly-services/docs/photoshop/?aio_internal",
      },
      {
        title: "Lightroom API",
        description: "Docs and references for Lightroom API",
        path: "https://developer.adobe.com/firefly-services/docs/lightroom/?aio_internal",
      },
      {
        title: "Audio/Video API",
        description: "Docs and references for Audio/Video API",
        path: "https://developer.adobe.com/audio-video-firefly-services/?aio_internal",
      },
      {
        title: "InDesign API",
        description: "Docs and references for InDesign API",
        path: "https://developer.adobe.com/firefly-services/docs/indesign-apis/?aio_internal",
      },
      {
        title: "Substance 3D API",
        description: "Unlock generative AI for rendering and object composites.",
        path: "https://developer.adobe.com/firefly-services/docs/s3dapi/?aio_internal",
      },
      {
        title: "Illustrator API",
        description: "Docs and references for Illustrator API",
        path: "https://developer.adobe.com/firefly-services/docs/illustrator/?aio_internal",
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
        title: "Getting credentials",
        path: "/guides/get-started.md",
      },
      {
        title: "Support",
        path: "/guides/support/",
      },
      {
        title: "Firefly tutorials",
        path: "/guides/tutorials",
        pages: [
          {
            title: "Creating Product Images at Scale",
            path: "/guides/tutorials/create-product-images-with-ff.md",
          },
          {
            title: "Automate a Content Workflow",
            path: "/guides/tutorials/automate-workflow.md",
          },
          {
            title: "Getting Started with the SDK",
            path: "/guides/tutorials/using-the-sdk.md",
          },  
        ],
      },
      /*
      {
        title: "SDK",
        path: "/guides/sdks",
      },
      */
    ],
  },
  plugins: [`@adobe/gatsby-theme-aio`],
};
