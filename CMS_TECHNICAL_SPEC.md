# CMS Technical Specification

## Admin Interface Mockups

### 1. Login Page
```
┌─────────────────────────────────────────┐
│          STUDIO ARTEAMO CMS             │
│                                         │
│         ┌─────────────────────┐         │
│         │ Email               │         │
│         └─────────────────────┘         │
│         ┌─────────────────────┐         │
│         │ Password            │         │
│         └─────────────────────┘         │
│         [     Login Button    ]         │
│                                         │
└─────────────────────────────────────────┘
```

### 2. Dashboard
```
┌─────────────────────────────────────────────────────┐
│ 🏠 Dashboard | Projects | Settings | Logout         │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Welcome to Studio Arteamo CMS                     │
│                                                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐  │
│  │ 11 Projects │ │ 165 Images  │ │ 4 Languages │  │
│  └─────────────┘ └─────────────┘ └─────────────┘  │
│                                                     │
│  Recent Projects:                                   │
│  • Flavia Garden 2024                              │
│  • Del Mar Office 2022                             │
│  • Trakata Residence 2021                          │
│                                                     │
│  Quick Actions:                                     │
│  [+ Add New Project] [⚙ Site Settings]             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 3. Projects List
```
┌─────────────────────────────────────────────────────┐
│ Projects                              [+ Add New]    │
├─────────────────────────────────────────────────────┤
│ Search: [_____________] Filter: [All Categories ▼]  │
├─────────────────────────────────────────────────────┤
│ ☐ | Cover | Name | Category | Year | Actions       │
├─────────────────────────────────────────────────────┤
│ ☐ | [img] | Flavia Garden | Residential | 2024 |   │
│    |       |               |            |       |   │
│    |       | 120 m² • 29 images        | ✏️ 🗑️ |   │
├─────────────────────────────────────────────────────┤
│ ☐ | [img] | Elite Clinic | Medical | 2021 |        │
│    |       |              |         |      |        │
│    |       | 250 m² • 17 images       | ✏️ 🗑️ |    │
├─────────────────────────────────────────────────────┤
│ [Showing 1-10 of 11] [Previous] [1] [2] [Next]     │
└─────────────────────────────────────────────────────┘
```

### 4. Add/Edit Project Form
```
┌─────────────────────────────────────────────────────┐
│ Add New Project                        [Cancel] [Save]│
├─────────────────────────────────────────────────────┤
│                                                     │
│ Basic Information                                   │
│ ─────────────────                                   │
│ Project Name (BG): [_____________________________] │
│ Project Name (EN): [_____________________________] │
│ Project Name (RU): [_____________________________] │
│ Project Name (ES): [_____________________________] │
│                                                     │
│ Category: [Residential ▼]  Year: [2024 ▼]          │
│ Area (m²): [______]                                 │
│                                                     │
│ Description (BG):                                   │
│ ┌─────────────────────────────────────────────────┐│
│ │                                                 ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ Cover Image:                                        │
│ ┌─────────────────┐                                │
│ │   Drop image    │ [Select from Gallery]          │
│ │      here       │                                │
│ └─────────────────┘                                │
│                                                     │
│ Project Gallery                                     │
│ ─────────────────                                   │
│ ┌───┐ ┌───┐ ┌───┐ ┌─────────────┐                │
│ │img│ │img│ │img│ │ Drop images │                 │
│ │ X │ │ X │ │ X │ │    here     │                 │
│ └───┘ └───┘ └───┘ └─────────────┘                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Implementation Details

### 1. Netlify CMS Configuration (Quick Start)

```yaml
# static/admin/config.yml
backend:
  name: git-gateway
  branch: master

media_folder: "static/images/uploads"
public_folder: "/images/uploads"

collections:
  - name: "projects"
    label: "Projects"
    folder: "content/projects"
    create: true
    slug: "{{year}}-{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Title (BG)", name: "title_bg", widget: "string"}
      - {label: "Title (RU)", name: "title_ru", widget: "string"}
      - {label: "Title (ES)", name: "title_es", widget: "string"}
      - {label: "Category", name: "category", widget: "select", 
         options: ["residential", "commercial", "office", "medical"]}
      - {label: "Year", name: "year", widget: "number"}
      - {label: "Area (m²)", name: "area", widget: "number"}
      - {label: "Cover Image", name: "cover", widget: "image"}
      - {label: "Description", name: "description", widget: "text"}
      - {label: "Description (BG)", name: "description_bg", widget: "text"}
      - {label: "Description (RU)", name: "description_ru", widget: "text"}
      - {label: "Description (ES)", name: "description_es", widget: "text"}
      - {label: "Gallery", name: "gallery", widget: "list", field: 
         {label: "Image", name: "image", widget: "image"}}
```

### 2. API Client for Frontend

```javascript
// cms-client.js
class CMSClient {
    constructor() {
        this.apiUrl = process.env.API_URL || '/.netlify/functions';
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }

    async getProjects() {
        const cacheKey = 'projects-all';
        const cached = this.getFromCache(cacheKey);
        if (cached) return cached;

        try {
            const response = await fetch(`${this.apiUrl}/projects`);
            const data = await response.json();
            this.setCache(cacheKey, data);
            return data;
        } catch (error) {
            console.error('Failed to fetch projects:', error);
            return this.getFallbackData();
        }
    }

    async getProject(id) {
        const cacheKey = `project-${id}`;
        const cached = this.getFromCache(cacheKey);
        if (cached) return cached;

        try {
            const response = await fetch(`${this.apiUrl}/projects/${id}`);
            const data = await response.json();
            this.setCache(cacheKey, data);
            return data;
        } catch (error) {
            console.error('Failed to fetch project:', error);
            return null;
        }
    }

    getFromCache(key) {
        const item = this.cache.get(key);
        if (!item) return null;
        
        if (Date.now() - item.timestamp > this.cacheTimeout) {
            this.cache.delete(key);
            return null;
        }
        
        return item.data;
    }

    setCache(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    getFallbackData() {
        // Return existing static data as fallback
        return window.staticProjectData || [];
    }
}

// Initialize client
const cmsClient = new CMSClient();
```

### 3. Progressive Enhancement Strategy

```javascript
// enhanced-gallery.js
async function loadProjectsFromCMS() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    try {
        // Try to load from CMS
        const projects = await cmsClient.getProjects();
        
        // Clear existing static content
        projectsGrid.innerHTML = '';
        
        // Render dynamic content
        projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
        
    } catch (error) {
        // Fall back to static content
        console.log('CMS unavailable, using static content');
    }
}

function createProjectCard(project) {
    const lang = getCurrentLanguage();
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.category = project.category;
    card.dataset.year = project.year;
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.coverImage}" alt="${project.title[lang]}" loading="lazy">
            <div class="project-overlay">
                <h3>${translations[lang].projects.viewProject}</h3>
            </div>
        </div>
        <div class="project-info">
            <h3>${project.title[lang]}</h3>
            <p class="project-meta">
                <span>${translations[lang].projectData[project.category]}</span> 
                • ${project.year} 
                • ${project.area} m²
            </p>
            <p class="project-desc">${project.description[lang]}</p>
        </div>
    `;
    
    card.addEventListener('click', () => {
        openProjectGallery(project.id, project.title[lang]);
    });
    
    return card;
}
```

### 4. Deployment Configuration

```javascript
// netlify.toml additions
[build]
  functions = "functions"

[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-functions-install-core"

[[headers]]
  for = "/api/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Headers = "Content-Type, Authorization"
    Access-Control-Allow-Methods = "GET, POST, PUT, DELETE, OPTIONS"
```

### 5. Security Implementation

```javascript
// functions/auth-middleware.js
const jwt = require('jsonwebtoken');

exports.requireAuth = (handler) => {
    return async (event, context) => {
        const token = event.headers.authorization?.replace('Bearer ', '');
        
        if (!token) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'No token provided' })
            };
        }
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            event.user = decoded;
            return handler(event, context);
        } catch (error) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'Invalid token' })
            };
        }
    };
};
```

## Migration Script

```javascript
// scripts/migrate-to-cms.js
const fs = require('fs');
const path = require('path');

const projects = [
    {
        id: 'flavia-garden-2024',
        folder: 'Apartament Flavia Garden 2024',
        title: {
            bg: 'Апартамент Флавия Гардън',
            en: 'Flavia Garden Apartment',
            ru: 'Апартамент Флавия Гарден',
            es: 'Apartamento Flavia Garden'
        },
        category: 'residential',
        year: 2024,
        area: 120,
        // ... rest of data
    }
    // ... other projects
];

async function migrateProjects() {
    for (const project of projects) {
        // Create project in database
        await createProject(project);
        
        // Upload images
        const imagesPath = path.join(__dirname, '..', project.folder);
        const images = fs.readdirSync(imagesPath);
        
        for (const image of images) {
            await uploadImage(project.id, path.join(imagesPath, image));
        }
    }
}
```

## Performance Optimization

1. **Static Generation**: Pre-render project pages at build time
2. **Image Optimization**: Auto-resize and convert to WebP
3. **CDN Caching**: Cache API responses at edge locations
4. **Lazy Loading**: Load projects as user scrolls
5. **Service Worker**: Offline support for viewed projects

## Monitoring & Analytics

1. **Error Tracking**: Sentry integration
2. **Performance**: Web Vitals monitoring
3. **Usage Analytics**: Track popular projects
4. **Admin Activity**: Audit log for changes
5. **Uptime Monitoring**: StatusPage integration