#!/usr/bin/env node

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

/**
 * Firefly API Repository Setup Script
 * 
 * This script transforms a Gatsby repository into a standardized Firefly API repository by:
 * - Updating gatsby-config.js with Firefly API information architecture
 * - Removing placeholder files and directories
 * - Creating new directory structure with boilerplate files
 * 
 * Usage: node scripts/setup-firefly-api-repo.js
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Configuration
const CONFIG = {
  gatsbyConfigPath: 'gatsby-config.js',
  filesToRemove: [
    'src/pages/guides/migrating',
    'src/pages/support',
    'src/pages/api/1.4.md'
  ],
  globPatternsToRemove: [
    { dir: 'src/pages/guides', pattern: /^dummy/ }
  ],
  directoriesToCreate: [
    {
      path: 'src/pages/getting-started',
      title: 'Authentication',
      description: ''
    },
    {
      path: 'src/pages/getting-started/usage',
      title: 'Technical Usage Notes',
      description: ''
    },
    {
      path: 'src/pages/getting-started/storage-solutions',
      title: 'Storage Solutions',
      description: ''
    }
  ]
};

// New siteMetadata structure for Firefly API
const NEW_SITE_METADATA = `  siteMetadata: {
    pages: [
      {
        title: 'All Firefly Services',
        path: 'https://developer.adobe.com/firefly-services/docs/guides/?aio_internal'
      },
      {
        title: 'About <> API',
        path: '/'
      },
      {
        title: 'Getting Started',
        path: '/getting-started/'
      },
      {
        title: 'Guides',
        path: '/guides/'
      },
      {
        title: 'API Reference',
        path: '/api/'
      },
    ],
    subPages: [
      {
        title: 'Getting Started',
        path: '/getting-started/',
        header: true,
        pages: [
          {
            title: 'Authentication',
            path: '/getting-started/'
          },
          {
            title: 'Technical Usage Notes',
            path: '/getting-started/usage'
          },
          {
            title: 'Storage Solutions',
            path: '/getting-started/storage-solutions'
          }
        ]
      },
      {
        title: 'Guides',
        path: '/guides/',
        header: true,
        pages: [
        ]
      }
    ]
  }`;

// Template for index.md page
const INDEX_PAGE_TEMPLATE = `---
title: Overview - <> API
description: This is the overview page for Firefly's <>> API.
keywords:

---

<Hero slots="heading, text"/>

# <> API

[Brief API Description]

## What is <> API?

[Describe the new API]

## Discover

<DiscoverBlock slots="heading, link, text"/>

### Get Started

[Authentication](guides/)

Get started with API authentication.

<DiscoverBlock slots="link, text"/>

[Try the API](api/)

See the full API details and schemas on the reference page.
`;

/**
 * Logs a message with color
 */
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Logs a section header
 */
function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'cyan');
  console.log('='.repeat(60));
}

/**
 * Recursively removes a directory and its contents
 */
function removeDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return false;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      removeDirectory(fullPath);
    } else {
      fs.unlinkSync(fullPath);
    }
  }
  
  fs.rmdirSync(dirPath);
  return true;
}

/**
 * Removes a file or directory
 */
function removeFileOrDirectory(targetPath) {
  if (!fs.existsSync(targetPath)) {
    log(`  ⊘ Skipped (not found): ${targetPath}`, 'yellow');
    return false;
  }

  const stats = fs.statSync(targetPath);
  
  if (stats.isDirectory()) {
    removeDirectory(targetPath);
    log(`  ✓ Removed directory: ${targetPath}`, 'green');
  } else {
    fs.unlinkSync(targetPath);
    log(`  ✓ Removed file: ${targetPath}`, 'green');
  }
  
  return true;
}

/**
 * Removes files matching a glob pattern in a directory
 */
function removeMatchingFiles(dirPath, pattern) {
  if (!fs.existsSync(dirPath)) {
    log(`  ⊘ Directory not found: ${dirPath}`, 'yellow');
    return 0;
  }

  let removedCount = 0;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    if (pattern.test(entry.name)) {
      const fullPath = path.join(dirPath, entry.name);
      if (removeFileOrDirectory(fullPath)) {
        removedCount++;
      }
    }
  }
  
  return removedCount;
}

/**
 * Creates a directory with an index.md file
 */
function createDirectoryWithIndex(dirConfig) {
  const { path: dirPath, title, description } = dirConfig;
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    log(`  ✓ Created directory: ${dirPath}`, 'green');
  } else {
    log(`  ⊘ Directory already exists: ${dirPath}`, 'yellow');
  }
  
  // Create index.md file
  const indexPath = path.join(dirPath, 'index.md');
  const content = `---
title: "${title}"
description: ${description}
---
`;
  
  if (fs.existsSync(indexPath)) {
    log(`  ⊘ File already exists: ${indexPath}`, 'yellow');
  } else {
    fs.writeFileSync(indexPath, content, 'utf8');
    log(`  ✓ Created file: ${indexPath}`, 'green');
  }
}

/**
 * Transforms gatsby-config.js with new Firefly API structure
 */
function transformGatsbyConfig() {
  const configPath = CONFIG.gatsbyConfigPath;
  
  if (!fs.existsSync(configPath)) {
    log(`  ✗ Error: gatsby-config.js not found at ${configPath}`, 'red');
    return false;
  }
  
  // Read the current config
  const content = fs.readFileSync(configPath, 'utf8');
  
  // Extract the pathPrefix line
  const pathPrefixMatch = content.match(/pathPrefix:\s*.*?,/);
  if (!pathPrefixMatch) {
    log('  ✗ Error: Could not find pathPrefix in gatsby-config.js', 'red');
    return false;
  }
  
  const pathPrefixLine = pathPrefixMatch[0];
  
  // Extract copyright header (everything before module.exports)
  const headerMatch = content.match(/(\/\*[\s\S]*?\*\/[\s\n]*)/);
  const header = headerMatch ? headerMatch[1] : '';
  
  // Build the new config
  const newConfig = `${header}
module.exports = {
  ${pathPrefixLine}

${NEW_SITE_METADATA},
  plugins: [\`@adobe/gatsby-theme-aio\`]
};
`;
  
  // Write the new config
  fs.writeFileSync(configPath, newConfig, 'utf8');
  log(`  ✓ Updated gatsby-config.js`, 'green');
  log(`  ℹ Preserved pathPrefix: ${pathPrefixLine.trim()}`, 'blue');
  
  return true;
}

/**
 * Reformats the index.md page with the standard template
 */
function reformatIndexPage() {
  const indexPath = 'src/pages/index.md';
  
  if (!fs.existsSync(indexPath)) {
    log(`  ⊘ Index page not found: ${indexPath}`, 'yellow');
    log(`  ✓ Creating new index page with template`, 'green');
  } else {
    log(`  ✓ Reformatting existing index page`, 'green');
  }
  
  // Ensure the directory exists
  const dirPath = path.dirname(indexPath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  // Write the template
  fs.writeFileSync(indexPath, INDEX_PAGE_TEMPLATE, 'utf8');
  log(`  ✓ Updated ${indexPath} with standard template`, 'green');
  
  return true;
}

/**
 * Main execution function
 */
function main() {
  log('\n🚀 Firefly API Repository Setup Script', 'cyan');
  log('This script will transform your repository into a Firefly API repo\n', 'cyan');
  
  let hasErrors = false;
  
  // Step 1: Transform gatsby-config.js
  logSection('1. Updating gatsby-config.js');
  if (!transformGatsbyConfig()) {
    hasErrors = true;
  }
  
  // Step 2: Reformat index.md page
  logSection('2. Reformatting index.md page');
  if (!reformatIndexPage()) {
    hasErrors = true;
  }
  
  // Step 3: Remove placeholder files
  logSection('3. Removing placeholder files and directories');
  
  // Remove specific files/directories
  for (const filePath of CONFIG.filesToRemove) {
    removeFileOrDirectory(filePath);
  }
  
  // Remove files matching glob patterns
  for (const { dir, pattern } of CONFIG.globPatternsToRemove) {
    log(`  Removing files matching pattern in ${dir}...`);
    const count = removeMatchingFiles(dir, pattern);
    if (count > 0) {
      log(`  ✓ Removed ${count} matching file(s)`, 'green');
    }
  }
  
  // Step 4: Create new directory structure
  logSection('4. Creating new directory structure');
  for (const dirConfig of CONFIG.directoriesToCreate) {
    createDirectoryWithIndex(dirConfig);
  }
  
  // Summary
  logSection('✨ Setup Complete!');
  
  if (hasErrors) {
    log('⚠ Some operations encountered errors. Please review the output above.', 'yellow');
    process.exit(1);
  } else {
    log('✓ Repository successfully configured as a Firefly API repository!', 'green');
    log('\nNext steps:', 'cyan');
    log('  1. Review the updated gatsby-config.js');
    log('  2. Update "About <> API" title in gatsby-config.js with your API name');
    log('  3. Update the index.md placeholders (<> API, descriptions) with your API details');
    log('  4. Add your API documentation to the appropriate directories');
    log('  5. Run your build to verify everything works correctly\n');
    process.exit(0);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { transformGatsbyConfig, reformatIndexPage, removeFileOrDirectory, createDirectoryWithIndex };

