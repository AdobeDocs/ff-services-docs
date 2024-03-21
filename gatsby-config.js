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
  pathPrefix: process.env.PATH_PREFIX || '/firefly-services/docs/',
  
  siteMetadata: {    
    pages: [
      {
        title: 'Firefly Services',
        path: '/guides/'
      },                  
      {
        title: 'Firefly API',
        description: 'Docs and references for Firefly API',
        path: '/firefly-api/' 
      },
      {
        title: 'Photoshop API',
        description: 'Docs and references for Photoshop API',
        path: '/photoshop/'
      },
      {
        title: 'Lightroom API',
        description: 'Docs and references for Lightroom API',
        path: '/lightroom/'
      },
      {
        title: 'Content Tagging',
        description: 'Docs and references for Content Tagging services',
        // path: 'https://experienceleague.adobe.com/docs/experience-platform/intelligent-services/content-commerce-ai/overview.html?aio_internal'
        path: 'https://experienceleague.adobe.com/docs/experience-platform/intelligent-services/content-commerce-ai/overview.html'
      },
    ],
    subPages: [  
      // Main Firefly Services docs - left side nav    
      {
        title: 'Overview',
        path: '/guides/',
      },
      {
        title: 'Getting Started',
        path: '/guides/get-started.md',        
      },
      {
        title: 'Tutorials',
        path: '/guides/tutorials',        
        pages: [
          {
            title: 'Creating Product Images at Scale with Firefly Services',
            path: '/guides/tutorials/create-product-images-with-ff.md'
          },
        ]
      },                 
      {
        title: 'SDKs',
        path: '/guides/sdks'
      },
      ///////////////////////////////////////////////
      // Firefly API-specific left side nav      
      ///////////////////////////////////////////////
      {
        title: 'Overview',
        path: '/firefly-api/',
      },
      {
        title: 'Quickstart',
        path: '/firefly-api/guides/'
      },
      {
        title: 'Concepts',
        path: '/firefly-api/guides/concepts/',
        pages: [
          {
            title: 'Get Credentials',
            path: '/firefly-api/guides/concepts/create-credentials/'
          },
          {
            title: 'Authentication',
            path: '/firefly-api/guides/concepts/authentication/'
          },
          {
            title: 'Image Model Styles',
            path: '/firefly-api/guides/concepts/styles/'
          },
          {
            title: 'Rate limits',
            path: '/firefly-api/guides/concepts/rate-limits/'
          },
          {
            title: 'Seed ID',
            path: '/firefly-api/guides/concepts/seed-id'
          }
        ]
      },
      {
        title: 'How-Tos',
        path: '/firefly-api/guides/how-tos/create-your-first-ff-application.md',
        pages: [
          {
            title: 'Create Your First Firefly API Implementation',
            path: '/firefly-api/guides/how-tos/create-your-first-ff-application.md'
          },
          {
            title: 'Harnassing the Firefly Services APIs in PowerAutomate',
            path: '/firefly-api/guides/how-tos/firefly-services-with-powerautomate'
          }
        ]
      },
      {
        title: 'API Reference',
        path: '/firefly-api/guides/api/upload_image',
        pages: [
          {
            title: "Upload Image",
            path: "/firefly-api/guides/api/upload_image/"
          },
          {
            title: "Text to Image",
            path: "/firefly-api/guides/api/image_generation/"
          },
          {
            title: "Generative Expand",
            path: "/firefly-api/guides/api/generative_expand/"
          },
          {
            title: "Generative Fill",
            path: "/firefly-api/guides/api/generative_fill/"
          }
        ]
      },
      {
        title: 'Release Notes',
        path: '/firefly-api/guides/release-notes/',
      },
      {
        title: 'Help',
        path: '/firefly-api/guides/help/best-practices/',
        pages: [
          {
            title: 'Best Practices',
            path: '/firefly-api/guides/help/best-practices/'
          },
          {
            title: 'Troubleshooting',
            path: '/firefly-api/guides/help/troubleshooting/'
          }
        ]
      },         
      // END Firefly API left nav
      ///////////////////////////////////////////////
      // Photoshop API-specific left side nav
      /////////////////////////////////////////////// 
      {
        title: 'Overview',
        path: '/photoshop/',
      },        
      {
        title: 'Getting Started',
        path: '/photoshop/getting-started/'
      },
      {
        title: 'General Workflow',
        path: '/photoshop/general-workflow/'
      },
      {
        title: 'Features',
        path: '/photoshop/features/'
      },
      {
        title: 'Code Samples',
        path: '/photoshop/code-sample/'
      },
      {
        title: 'API Documentation',
        path: '/photoshop/api/',
        pages: [
          {
            title: 'Photoshop API',
            path: '/photoshop/api/'
          }
        ]
      },    
      {
        title: 'Support',
        path: '/photoshop/support'
      },
      ///////////////////////////////////////////////
      // Lightroom API-specific left side nav
      /////////////////////////////////////////////// 
      {
        title: 'Overview',
        path: '/lightroom/',
      },        
      {
        title: 'Getting Started',
        path: '/lightroom/getting-started/'
      },
      {
        title: 'General Workflow',
        path: '/lightroom/general-workflow/'
      },
      {
        title: 'Features',
        path: '/lightroom/features/'
      },
      {
        title: 'Code Samples',
        path: '/lightroom/code-sample/'
      },
      {
        title: 'API Documentation',
        path: '/lightroom/api/',
        pages: [
          {
            title: 'Lightroom API',
            path: '/lightroom/api/'
          },
          {
            title: 'Lightroom AutoStraighten',
            path: '/lightroom/api/lightroom_autoStraighten.md'
          },
          {
            title: 'Lightroom AutoStraighten',
            path: '/lightroom/api/lightroom_applyPresets.md'
          },
          {
            title: 'Lightroom AutoStraighten',
            path: '/lightroom/api/lightroom_applyXMP.md'
          },
        ]
      },    
      {
        title: 'Support',
        path: '/lightroom/support'
      }
      // END PS API left nav
      /////////////////////////////////////////////////////
      // TODO: Revisit including a file but one that's flattened, these roll to the API overview root
      // menu
      // {
      //   title: 'Firefly API Overview',
      //   path: '/firefly-api/',
      //   pages: require("./reference-firefly.js"),   
      // },        
      // 
      // {
      //   title: 'Photoshop API Overview',
      //   path: '/photoshop/',     
      //   pages: require("./reference-photoshop.js"),   
      // },
      ///////////////////////////////////////////////////// 
    ]
  },
  plugins: [`@adobe/gatsby-theme-aio`]
};
