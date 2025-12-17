---
description: Use when modifications are made or requested in a gatsby.config file
globs: 
alwaysApply: false
---
# Gatsby Configuration Navigation Rules

## Overview
This rule documents the navigation patterns and best practices for the `@adobe/gatsby-theme-aio` theme in Gatsby configuration. Use these patterns to create and modify navigation structures in `gatsby-config.js`.

## Navigation Components

### 1. Top Navigation (`pages` array)
```javascript
pages: [
  {
    title: "Page Title",    // Required: Display name in top nav
    path: "/path/",        // Required: URL path
  }
]
```
- Used for main navigation bar items
- Limited to 5-7 items for clean UX
- Each item requires both `title` and `path`
- No nesting allowed by default (but see Menus below)

#### Top Navigation Dropdown Menus

You can create dropdown menus in the Global Navigation (header bar) by using the `menu` field instead of `path`:

```javascript
pages: [
  {
    title: 'Adobe Analytics',
    path: 'index.md'
  },
  {
    title: 'Guides',
    path: 'guides.md'
  },
  {
    title: 'API Reference',
    menu: [{
      title: 'v2.0',
      description: 'Version 2.0 of API', // optional
      path: '2.0/api.index'
    }, {
      title: 'v1.4',
      description: 'Version 1.4 of API', // optional
      path: '1.4/api.index'
    }]
  }
]
```

**Key Points:**
- Use `menu` field instead of `path` to create a Global navigation dropdown
- Each menu item requires `title` and `path`
- `description` is optional but helpful for differentiating items
- Common use cases:
  - Multiple API versions
  - Language or framework variations
  - Related products or services
  - Documentation sets

### 2. Side Navigation (`subPages` array)
```javascript
subPages: [
  {
    title: "Section Title",    // Required: Main section name
    path: "/section-path/",    // Required: Base URL for section
    header: true,             // Required: Makes it a main section
    pages: [                  // Required: Array of section items
      // Pattern A: Regular page
      {
        title: "Page Title",
        path: "/section-path/page/"
      },
      // Pattern B: Subsection with dropdown
      {
        title: "Subsection Title",
        path: "/section-path/subsection/",
        header: true,         // Creates subsection
        pages: [             // Creates dropdown
          {
            title: "Dropdown Item",
            path: "/section-path/subsection/item/"
          }
        ]
      }
    ]
  }
]
```

### 3. Hero Pages with Side Navigation

**CRITICAL**: By default, Hero pages do NOT display side navigation in the `@adobe/gatsby-theme-aio` theme.

**To enable side navigation on a Hero page:**

1. **File Structure**: Place the `index.md` file in a **subdirectory** within `/src/pages/`, not at the root
   - ❌ Wrong: `/src/pages/index.md` (root level - no sidenav)
   - ✅ Correct: `/src/pages/about/index.md` (subdirectory - sidenav works)

2. **Configuration**: The `subPages` array must match the subdirectory path
   ```javascript
   // Top nav
   pages: [
     {
       title: 'About Photoshop API',
       path: '/about/'  // Points to subdirectory
     }
   ]
   
   // Side nav
   subPages: [
     {
       title: 'About Photoshop API',
       path: '/about/',
       header: true,
       pages: [
         {
           title: 'Overview',
           path: '/about/'  // The Hero page itself
         },
         {
           title: 'Getting Started',
           path: '/about/getting_started/',
           header: true,
           pages: [
             // ... subsections
           ]
         }
       ]
     }
   ]
   ```

3. **Hero Component**: The Hero component can remain in the markdown file as usual
   ```markdown
   ---
   title: Page Title
   description: Description
   hideBreadcrumbNav: true
   ---
   
   <Hero slots="image, heading, text"/>
   
   ![Hero image](./hero.png)
   
   # Heading
   
   Hero text content
   ```

**Result**: Both the Hero component AND the side navigation will display together.

## Common Patterns

### A. Simple Section
```javascript
{
  title: "Simple Section",
  path: "/simple/",
  header: true,
  pages: [
    {
      title: "Page 1",
      path: "/simple/page1/"
    },
    {
      title: "Page 2",
      path: "/simple/page2/"
    }
  ]
}
```

### B. Section with Dropdown
```javascript
{
  title: "Section with Dropdown",
  path: "/section/",
  header: true,
  pages: [
    {
      title: "Regular Page",
      path: "/section/regular/"
    },
    {
      title: "Dropdown Section",
      path: "/section/dropdown/",
      header: true,
      pages: [
        {
          title: "Dropdown Item 1",
          path: "/section/dropdown/item1/"
        }
      ]
    }
  ]
}
```

### C. Section Title (Non-Dropdown)
```javascript
{
  title: "Section Title",
  path: "/section/",
  header: true,
  pages: [
    {
      title: "Page 1",
      path: "/section/page1/"
    },
    {
      title: "Page 2",
      path: "/section/page2/"
    }
  ]
}
```
- Use this pattern when you want a section to appear as a title rather than a dropdown
- Place the section at the root level of `subPages` array
- All pages appear directly under the section title
- Example use cases: Help section, Updates section, Reference section

### D. Multiple Subsections
```javascript
{
  title: "Main Section",
  path: "/main/",
  header: true,
  pages: [
    {
      title: "Subsection 1",
      path: "/main/sub1/",
      header: true,
      pages: [
        {
          title: "Sub1 Item 1",
          path: "/main/sub1/item1/"
        }
      ]
    }
  ]
}
```

## Best Practices

1. **Path Structure**
   - Use consistent path patterns within sections
   - Always end paths with `/`
   - Keep paths lowercase with underscores for spaces
   - Example: `/getting_started/authentication/`

2. **Navigation Depth**
   - Maximum 3 levels deep (main section → subsection → page)
   - Avoid deep nesting for better UX
   - Keep related items together in subsections

3. **Section Organization**
   - Group related content under logical sections
   - Use dropdowns sparingly (2-3 per section max)
   - Keep section names clear and concise
   - Use section titles (Pattern C) for:
     - Help/Support sections
     - Updates/Changelog sections
     - Reference sections
     - Any section that should be visually prominent

4. **Common Use Cases**
   - Getting Started: Basics and Advanced subsections
   - API Reference: Reference and Examples subsections
   - Updates: Release Notes and Changelog sections
   - Help: Best Practices and Troubleshooting sections

## Example Use Cases

### Documentation Site
```javascript
subPages: [
  {
    title: "Getting Started",
    path: "/getting_started/",
    header: true,
    pages: [
      {
        title: "Basics",
        path: "/getting_started/basics/",
        header: true,
        pages: [
          {
            title: "Installation",
            path: "/getting_started/basics/installation/"
          }
        ]
      }
    ]
  }
]
```

### Updates Section (Section Title Pattern)
```javascript
{
  title: "Updates",
  path: "/getting_started/updates/",
  header: true,
  pages: [
    {
      title: "Changelog",
      path: "/changelog/"
    }
  ]
}
```

### Help Section (Section Title Pattern)
```javascript
{
  title: "Help",
  path: "/guides/help/",
  header: true,
  pages: [
    {
      title: "Best Practices",
      path: "/guides/best_practices/"
    },
    {
      title: "Troubleshooting",
      path: "/guides/troubleshooting/"
    }
  ]
}
```

### Top Navigation with Menu Dropdowns
```javascript
// Example: Multi-version API documentation
module.exports = {
  siteMetadata: {
    pages: [
      {
        title: 'Overview',
        path: '/'
      },
      {
        title: 'Guides',
        path: '/guides/'
      },
      {
        title: 'API Reference',
        menu: [
          {
            title: 'v3.0',
            description: 'Latest version',
            path: '/api/v3/'
          },
          {
            title: 'v2.0',
            description: 'Previous stable version',
            path: '/api/v2/'
          },
          {
            title: 'v1.4',
            description: 'Legacy version',
            path: '/api/v1.4/'
          }
        ]
      }
    ]
  }
}
```

### Hero Page with Sidenav (Complete Example)
```javascript
// gatsby-config.js
module.exports = {
  siteMetadata: {
    pages: [
      {
        title: 'About Photoshop API',
        path: '/about/'
      },
      {
        title: 'API Reference',
        path: '/api/index.md'
      }
    ],
    subPages: [
      {
        title: 'About Photoshop API',
        path: '/about/',
        header: true,
        pages: [
          {
            title: 'Overview',
            path: '/about/'
          },
          {
            title: 'Getting Started',
            path: '/about/getting_started/',
            header: true,
            pages: [
              {
                title: 'Authentication',
                path: '/about/getting_started/'
              },
              {
                title: 'Webhooks',
                path: '/about/getting_started/webhooks/'
              }
            ]
          },
          {
            title: 'Guides',
            path: '/about/guides/',
            header: true,
            pages: [
              {
                title: 'Using these guides',
                path: '/about/guides/'
              }
            ]
          }
        ]
      }
    ]
  }
}
```

**File structure:**
```
src/pages/
├── about/
│   ├── index.md           (Hero page with sidenav)
│   ├── hero.png
│   ├── getting_started/
│   │   ├── index.md
│   │   └── webhooks/
│   │       └── index.md
│   └── guides/
│       └── index.md
└── api/
    └── index.md
```

## Common Requests

When modifying navigation, you can request:
1. "Create a simple section with X pages"
2. "Add a dropdown subsection to [section]"
3. "Create an Updates section with Release Notes dropdown"
4. "Add a new main section with multiple subsections"
5. "Move [page] to [section] dropdown"
6. "Create a section title for [content]"
7. "Convert [section] to a section title"
8. "Add a sidenav to a Hero landing page"
9. "Create a dropdown menu in the top navigation for API versions"
10. "Add a menu dropdown to the header bar"

## Notes
- All paths must be unique
- Header items can have both a path and dropdown pages
- Maximum nesting depth is 3 levels
- Keep navigation structure flat when possible
- Use dropdowns for related content grouping
- Use section titles (Pattern C) for prominent sections that should be visually distinct
