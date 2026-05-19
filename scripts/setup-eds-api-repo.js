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
 * Firefly EDS API Repository Setup Script
 *
 * This script transforms an EDS template repository (e.g. genstudio-experience-api) into a
 * standardized Firefly Services API docs repo by:
 * - Updating src/pages/config.md with Firefly API information architecture
 * - Removing placeholder files and directories
 * - Seeding getting-started pages and API reference boilerplate
 *
 * Usage: node scripts/setup-eds-api-repo.js
 * (Run from the target EDS repo root; script may live in ff-services-docs hub repo.)
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const CONFIG = {
  configPath: 'src/pages/config.md',
  authTemplatePath: path.join(__dirname, '../templates/ffs-auth-page-template.md'),
  filesToRemove: [
    'src/pages/guides/migrating',
    'src/pages/support',
    'src/pages/api/1-4.md'
  ],
  globPatternsToRemove: [
    { dir: 'src/pages/guides', pattern: /^dummy/ }
  ],
  directoriesToCreate: [
    {
      path: 'src/pages/getting-started/usage-notes',
      title: 'Technical Usage Notes',
      description: ''
    },
    {
      path: 'src/pages/getting-started/changelog',
      title: 'Changelog',
      description: ''
    }
  ]
};

const NEW_CONFIG_BODY = `- pages:
    - All Firefly Services
      - [Firefly Services Home](https://developer.adobe.com/firefly-services/docs/guides/?aio_internal) Introduction and general information about all Firefly services.
      - [Firefly API](https://developer.adobe.com/firefly-services/docs/firefly-api/?aio_internal) Docs and references for Firefly API.
      - [Photoshop API](https://developer.adobe.com/firefly-services/docs/photoshop/?aio_internal) Docs and references for Photoshop API.
      - [Lightroom API](https://developer.adobe.com/firefly-services/docs/lightroom/?aio_internal) Docs and references for Lightroom API.
      - [Audio/Video API](https://developer.adobe.com/audio-video-firefly-services/?aio_internal) Docs and references for Audio/Video API.
      - [InDesign API](https://developer.adobe.com/firefly-services/docs/indesign-apis/?aio_internal) Docs and references for InDesign API.
      - [Substance 3D API](https://developer.adobe.com/firefly-services/docs/s3dapi/?aio_internal) Unlock generative AI for rendering and object composites.
      - [Illustrator API](https://developer.adobe.com/firefly-services/docs/illustrator/?aio_internal) Docs and references for Illustrator API.
      - [Creative Production API](https://developer.adobe.com/firefly-services/docs/workflow-builder-api/?aio_internal) Docs and references for Firefly Creative Production API.
      - [Express API](https://developer.adobe.com/firefly-services/docs/express-api/?aio_internal) Docs and references for Express API.
      - [Content Tagging API](https://experienceleague.adobe.com/docs/experience-platform/intelligent-services/content-commerce-ai/overview.html) Docs and references for Content Tagging services.
    - [About <> API](/index.md)
    - [Getting Started](/getting-started/index.md)
    - [Guides](/guides/index.md)
    - [API Reference](/api/index.md)

- buttons:
    - [Support](https://airtable.com/appu5RTWgdM95jynx/pagyuT1qspNJcPU2E/form)
    - [Console](https://developer.adobe.com/console/) consoleId

- subPages:
    - Getting Started header
    - [Authentication](/getting-started/index.md)
    - [Create Credentials](/getting-started/create-credentials/index.md)
    - [Technical Usage Notes](/getting-started/usage-notes/index.md)
    - [Changelog](/getting-started/changelog/index.md)
`;

const INDEX_PAGE_TEMPLATE = `---
title: Overview - <> API
description: This is the overview page for Firefly's <>> API.
keywords:

---

<Superhero slots="heading, text"/>

# [API Name] API

[Brief API Description]

## What is [API Name] API?

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

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'cyan');
  console.log('='.repeat(60));
}

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

function createDirectoryWithIndex(dirConfig) {
  const { path: dirPath, title, description } = dirConfig;

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    log(`  ✓ Created directory: ${dirPath}`, 'green');
  } else {
    log(`  ⊘ Directory already exists: ${dirPath}`, 'yellow');
  }

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

function extractPathPrefixBlock(content) {
  const match = content.match(/- pathPrefix:\s*\n(?:[ \t]+-[^\n]+\n)+/);
  return match ? match[0] : null;
}

function extractPathPrefix(content) {
  const block = extractPathPrefixBlock(content);
  if (!block) {
    return null;
  }

  const valueMatch = block.match(/[ \t]+- ([^\n]+)/);
  if (!valueMatch) {
    return null;
  }

  let prefix = valueMatch[1].trim();
  if (!prefix.endsWith('/')) {
    prefix += '/';
  }
  return prefix;
}

function transformConfigMd() {
  const configPath = CONFIG.configPath;

  if (!fs.existsSync(configPath)) {
    log(`  ✗ Error: config.md not found at ${configPath}`, 'red');
    return { success: false, pathPrefix: null };
  }

  if (fs.existsSync('gatsby-config.js')) {
    log('  ⚠ Warning: gatsby-config.js found — this script is for EDS repos only', 'yellow');
  }

  const content = fs.readFileSync(configPath, 'utf8');
  const pathPrefixBlock = extractPathPrefixBlock(content);
  const pathPrefix = extractPathPrefix(content);

  if (!pathPrefixBlock || !pathPrefix) {
    log('  ✗ Error: Could not find pathPrefix in config.md', 'red');
    return { success: false, pathPrefix: null };
  }

  const newConfig = `${pathPrefixBlock}
${NEW_CONFIG_BODY}`;

  fs.writeFileSync(configPath, newConfig, 'utf8');
  log('  ✓ Updated config.md', 'green');
  log(`  ℹ Preserved pathPrefix: ${pathPrefix}`, 'blue');

  return { success: true, pathPrefix };
}

function reformatIndexPage() {
  const indexPath = 'src/pages/index.md';

  if (!fs.existsSync(path.dirname(indexPath))) {
    fs.mkdirSync(path.dirname(indexPath), { recursive: true });
  }

  fs.writeFileSync(indexPath, INDEX_PAGE_TEMPLATE, 'utf8');
  log(`  ✓ Updated ${indexPath} with standard template`, 'green');

  return true;
}

function seedApiIndexPage(pathPrefix) {
  const apiDir = 'src/pages/api';
  const apiIndexPath = path.join(apiDir, 'index.md');
  const openApiSrc = `${pathPrefix}petstore.json`;

  if (!fs.existsSync(apiDir)) {
    fs.mkdirSync(apiDir, { recursive: true });
  }

  const content = `---
title: API Reference - <> API
description: Reference for the <> API
layout: none
---

<RedoclyAPIBlock src="${openApiSrc}" hideTryItPanel scrollYOffset={64} generateCodeSamples="languages: [{lang: 'curl'}]" />
`;

  fs.writeFileSync(apiIndexPath, content, 'utf8');
  log(`  ✓ Updated ${apiIndexPath} with RedoclyAPIBlock (src="${openApiSrc}")`, 'green');

  return true;
}

function seedAuthenticationPage() {
  const gettingStartedDir = 'src/pages/getting-started';
  const authIndexPath = path.join(gettingStartedDir, 'index.md');
  const templatePath = CONFIG.authTemplatePath;

  if (!fs.existsSync(templatePath)) {
    log(`  ✗ Error: Auth template not found at ${templatePath}`, 'red');
    return false;
  }

  if (fs.existsSync(authIndexPath)) {
    log(`  ⊘ File already exists: ${authIndexPath}`, 'yellow');
    return true;
  }

  if (!fs.existsSync(gettingStartedDir)) {
    fs.mkdirSync(gettingStartedDir, { recursive: true });
    log(`  ✓ Created directory: ${gettingStartedDir}`, 'green');
  }

  const templateContent = fs.readFileSync(templatePath, 'utf8');
  fs.writeFileSync(authIndexPath, templateContent, 'utf8');
  log(`  ✓ Created ${authIndexPath} from auth template`, 'green');

  return true;
}

function main() {
  log('\n🚀 Firefly EDS API Repository Setup Script', 'cyan');
  log('This script will transform your EDS repository into a Firefly API repo\n', 'cyan');

  let hasErrors = false;
  let pathPrefix = null;

  logSection('1. Updating config.md');
  const configResult = transformConfigMd();
  if (!configResult.success) {
    hasErrors = true;
  } else {
    pathPrefix = configResult.pathPrefix;
  }

  logSection('2. Reformatting index.md page');
  if (!reformatIndexPage()) {
    hasErrors = true;
  }

  logSection('3. Writing api/index.md Redocly block');
  if (pathPrefix) {
    if (!seedApiIndexPage(pathPrefix)) {
      hasErrors = true;
    }
  } else {
    log('  ✗ Skipped api/index.md — pathPrefix not available', 'red');
    hasErrors = true;
  }

  logSection('4. Removing placeholder files and directories');
  for (const filePath of CONFIG.filesToRemove) {
    removeFileOrDirectory(filePath);
  }

  for (const { dir, pattern } of CONFIG.globPatternsToRemove) {
    log(`  Removing files matching pattern in ${dir}...`);
    const count = removeMatchingFiles(dir, pattern);
    if (count > 0) {
      log(`  ✓ Removed ${count} matching file(s)`, 'green');
    }
  }

  logSection('5. Seeding getting-started pages');
  if (!seedAuthenticationPage()) {
    hasErrors = true;
  }

  for (const dirConfig of CONFIG.directoriesToCreate) {
    createDirectoryWithIndex(dirConfig);
  }

  logSection('✨ Setup Complete!');

  if (hasErrors) {
    log('⚠ Some operations encountered errors. Please review the output above.', 'yellow');
    process.exit(1);
  }

  log('✓ Repository successfully configured as a Firefly EDS API repository!', 'green');
  log('\nNext steps:', 'cyan');
  log('  1. Review config.md — replace "About <> API" with your API name');
  log('  2. Update index.md placeholders (<> API, descriptions) with your API details');
  log('  3. Customize getting-started/index.md — replace {API or feature} and {relevant_scopes}');
  log('  4. Replace usage-notes and changelog stub content as needed');
  log('  5. Replace static/petstore.json with your OpenAPI spec (update RedoclyAPIBlock src if needed)');
  log('  6. Add guides content under src/pages/guides/');
  log('  7. Run your build to verify everything works correctly\n');
  process.exit(0);
}

if (require.main === module) {
  main();
}

module.exports = {
  transformConfigMd,
  extractPathPrefix,
  extractPathPrefixBlock,
  reformatIndexPage,
  seedApiIndexPage,
  seedAuthenticationPage,
  removeFileOrDirectory,
  createDirectoryWithIndex
};
