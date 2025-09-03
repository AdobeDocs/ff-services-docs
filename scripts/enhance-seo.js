#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// SEO keyword mappings for different content types
const seoKeywords = {
  'indesign-apis': {
    primary: ['Adobe InDesign API', 'InDesign automation', 'document processing'],
    secondary: ['Data Merge API', 'Rendition API', 'Custom Scripts API', 'Remap Links API'],
    technical: ['REST API', 'cloud services', 'enterprise solutions'],
    longTail: ['design automation', 'creative automation', 'content delivery', 'batch processing']
  },
  'photoshop': {
    primary: ['Adobe Photoshop API', 'image editing API', 'image automation'],
    secondary: ['Remove Background API', 'image processing', 'AI image editing'],
    technical: ['REST API', 'AI-powered', 'batch processing'],
    longTail: ['background removal', 'automatic masking', 'transparent backgrounds']
  },
  'firefly-api': {
    primary: ['Adobe Firefly API', 'generative AI', 'AI image generation'],
    secondary: ['text-to-image', 'image generation', 'creative AI'],
    technical: ['REST API', 'AI models', 'generative content'],
    longTail: ['AI art generation', 'creative automation', 'content creation']
  },
  'lightroom': {
    primary: ['Adobe Lightroom API', 'photo editing API', 'image enhancement'],
    secondary: ['preset application', 'photo processing', 'image optimization'],
    technical: ['REST API', 'batch editing', 'cloud processing'],
    longTail: ['photo automation', 'bulk editing', 'preset management']
  }
};

// Function to generate SEO keywords based on content type and file path
function generateKeywords(filePath, existingKeywords = []) {
  const pathParts = filePath.split('/');
  const contentType = pathParts.find(part => seoKeywords[part]);
  
  if (!contentType) {
    return existingKeywords.length > 0 ? existingKeywords : ['API documentation', 'REST API'];
  }
  
  const keywords = seoKeywords[contentType];
  const allKeywords = [
    ...keywords.primary,
    ...keywords.secondary,
    ...keywords.technical,
    ...keywords.longTail
  ];
  
  // Add existing keywords if they're not duplicates
  existingKeywords.forEach(keyword => {
    if (!allKeywords.includes(keyword)) {
      allKeywords.push(keyword);
    }
  });
  
  return allKeywords.slice(0, 15); // Limit to 15 keywords
}

// Function to generate optimized title
function generateTitle(currentTitle, filePath) {
  if (currentTitle.includes('API') && currentTitle.length > 50) {
    return currentTitle;
  }
  
  const pathParts = filePath.split('/');
  const contentType = pathParts.find(part => seoKeywords[part]);
  
  if (contentType === 'indesign-apis') {
    return currentTitle.includes('API') ? currentTitle : `${currentTitle} - InDesign API`;
  } else if (contentType === 'photoshop') {
    return currentTitle.includes('API') ? currentTitle : `${currentTitle} - Photoshop API`;
  }
  
  return currentTitle;
}

// Function to generate optimized description
function generateDescription(currentDesc, filePath) {
  if (currentDesc.length > 150) {
    return currentDesc.substring(0, 147) + '...';
  }
  
  const pathParts = filePath.split('/');
  const contentType = pathParts.find(part => seoKeywords[part]);
  
  if (contentType === 'indesign-apis') {
    return currentDesc.includes('InDesign') ? currentDesc : `${currentDesc} for InDesign automation and document processing.`;
  } else if (contentType === 'photoshop') {
    return currentDesc.includes('Photoshop') ? currentDesc : `${currentDesc} for Photoshop image editing and automation.`;
  }
  
  return currentDesc;
}

// Function to add social media metadata (without og:image)
function addSocialMetadata(frontmatter, title, description) {
  // Remove old format social media metadata
  const cleanedFrontmatter = { ...frontmatter };
  delete cleanedFrontmatter['og:title'];
  delete cleanedFrontmatter['og:description'];
  delete cleanedFrontmatter['twitter:card'];
  delete cleanedFrontmatter['twitter:title'];
  delete cleanedFrontmatter['twitter:description'];
  
  return {
    ...cleanedFrontmatter,
    og: {
      title: title,
      description: description
    },
    twitter: {
      card: 'summary',
      title: title,
      description: description
    }
  };
}

// Main function to enhance SEO
function enhanceSEO(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: markdown } = matter(content);
    
    // Skip files that already have comprehensive SEO
    if (frontmatter.keywords && frontmatter.keywords.length > 10) {
      // Still update social media metadata even if keywords are comprehensive
      const enhancedFrontmatter = addSocialMetadata(frontmatter, frontmatter.title || '', frontmatter.description || '');
      const enhancedContent = matter.stringify(markdown, enhancedFrontmatter);
      fs.writeFileSync(filePath, enhancedContent);
      console.log(`✅ Updated social media metadata for ${filePath}`);
      return;
    }
    
    // Generate enhanced metadata
    const enhancedTitle = generateTitle(frontmatter.title || '', filePath);
    const enhancedDescription = generateDescription(frontmatter.description || '', filePath);
    const enhancedKeywords = generateKeywords(filePath, frontmatter.keywords || []);
    const enhancedFrontmatter = addSocialMetadata(frontmatter, enhancedTitle, enhancedDescription);
    
    // Update frontmatter
    enhancedFrontmatter.title = enhancedTitle;
    enhancedFrontmatter.description = enhancedDescription;
    enhancedFrontmatter.keywords = enhancedKeywords;
    
    // Write back to file
    const enhancedContent = matter.stringify(markdown, enhancedFrontmatter);
    fs.writeFileSync(filePath, enhancedContent);
    
    console.log(`✅ Enhanced SEO for ${filePath}`);
    console.log(`   Title: ${enhancedTitle}`);
    console.log(`   Keywords: ${enhancedKeywords.length} keywords added`);
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// Function to find all markdown files
function findMarkdownFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

// Main execution
if (require.main === module) {
  const srcDir = path.join(__dirname, '..', 'src', 'pages');
  
  if (!fs.existsSync(srcDir)) {
    console.error('❌ src/pages directory not found');
    process.exit(1);
  }
  
  console.log('🔍 Finding markdown files...');
  const markdownFiles = findMarkdownFiles(srcDir);
  
  console.log(`📝 Found ${markdownFiles.length} markdown files`);
  console.log('🚀 Enhancing SEO metadata...\n');
  
  markdownFiles.forEach(enhanceSEO);
  
  console.log('\n✅ SEO enhancement complete!');
  console.log('💡 Remember to:');
  console.log('   - Review and customize keywords for each page');
  console.log('   - Test search functionality');
  console.log('   - Monitor search performance');
}

module.exports = { enhanceSEO, generateKeywords, generateTitle, generateDescription };
