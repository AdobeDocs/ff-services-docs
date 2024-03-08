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
        title: "Firefly Services", // Links back to microsite (mkt pages)
        path: "https://developer.adobe.com/firefly-services?aio_internal",
      },            
      {
        title: 'Overview',
        path: '/guides/'
      },
      {
        title: 'Firefly API',
        description: 'Docs and references for Firefly API',
        path: 'https://developer.adobe.com/firefly-api/?aio_internal' // TODO: this needs to get content from transclusion
      },
      {
        title: 'Photoshop API',
        description: 'Docs and references for Photoshop API',
        path: 'https://developer.adobe.com/photoshop/photoshop-api-docs/?aio_internal'
      },
      {
        title: 'Lightroom API',
        description: 'Docs and references for Lightroom API',
        path: 'https://developer.adobe.com/lightroom/lightroom-api-docs/?aio_internal'
      },
      {
        title: 'Content Tagging',
        description: 'Docs and references for Content Tagging services',
        path: 'https://experienceleague.adobe.com/docs/experience-platform/intelligent-services/content-commerce-ai/overview.html?aio_internal'
      },
    ],
    subPages: [      
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
            title: 'x-API tutorial 1',
            path: '/guides/tutorials/tut1.md'
          },
          {
            title: 'x-API tutorial 2',
            path: '/guides/tutorials/tut2.md'
          }
        ]
      },                 
      {
        title: 'SDKs',
        path: '/guides/sdks',       
        pages: [
          {
            title: 'JavaScript SDK',
            path: '/guides/sdks/sdk1.md'
          },
          {
            title: 'SDK 2',
            path: '/guides/sdks/sdk2.md'
          }
        ]
      },
      // {
      //   title: 'Overview',
      //   path: '/support/',
      //   header: true,
      //   pages: [
      //     {
      //       title: 'Help',
      //       path: '/support/'
      //     },
      //     {
      //       title: 'FAQ',
      //       path: '/support/FAQ/'
      //     },
      //     {
      //       title: 'How to contribute',
      //       path: '/support/contribute/'
      //     }
      //   ]
      // },
      // {
      //   title: 'Community',
      //   path: '/support/community/',
      //   header: true,
      //   pages: [
      //     {
      //       title: 'Information',
      //       path: '/support/community/'
      //     }
      //   ]
      // }
    ]
  },
  plugins: [`@adobe/gatsby-theme-aio`]
};
