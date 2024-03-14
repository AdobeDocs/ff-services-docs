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
        path: "https://developer.adobe.com/firefly-services",
      },            
      {
        title: 'Overview',
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
        path: '/photoshop/'
      },
      {
        title: 'Content Tagging',
        description: 'Docs and references for Content Tagging services',
        path: 'https://experienceleague.adobe.com/docs/experience-platform/intelligent-services/content-commerce-ai/overview.html'
      },
    ],
    subPages: [      
      {
        title: 'Overview',
        path: '/guides/',
      },
      {
        title: 'Firefly API Overview',
        path: '/firefly-api/',
        pages: require("./reference-firefly.js"),   
      },  
      {
        title: 'Photoshop API Overview',
        path: '/photoshop/',     
        pages: require("./reference-photoshop.js"),   
      },
  
    ]
  },
  plugins: [`@adobe/gatsby-theme-aio`]
};
