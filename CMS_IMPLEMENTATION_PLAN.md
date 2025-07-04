# CMS Implementation Plan for Studio Arteamo Portfolio

## Executive Summary
This document outlines the plan to transform the static Studio Arteamo portfolio into a dynamic content management system (CMS) that allows for easy management of projects through a web-based admin interface.

## Current State Analysis
- **Static Site**: 15 website variations with hardcoded project data
- **No Backend**: Pure HTML/CSS/JavaScript
- **Manual Updates**: Projects added by editing HTML files
- **Hosting**: Netlify (static hosting)

## Proposed Architecture

### 1. Technology Stack

#### Option A: Serverless Architecture (Recommended)
- **Frontend**: Keep existing HTML/CSS/JS
- **Admin Panel**: React-based SPA
- **Backend**: Netlify Functions (AWS Lambda)
- **Database**: Fauna DB or Supabase
- **File Storage**: Cloudinary or Netlify Large Media
- **Authentication**: Netlify Identity or Auth0

**Pros**: 
- Minimal changes to existing setup
- Cost-effective (pay-per-use)
- No server management
- Scales automatically

#### Option B: Traditional Server Architecture
- **Frontend**: Keep existing HTML/CSS/JS
- **Admin Panel**: React or Vue.js
- **Backend**: Node.js + Express
- **Database**: PostgreSQL or MongoDB
- **File Storage**: AWS S3 or local storage
- **Authentication**: JWT + bcrypt

**Pros**:
- More control over infrastructure
- Can be self-hosted
- More flexibility for complex features

### 2. Database Schema

```sql
-- Projects Table
CREATE TABLE projects (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    name_translations JSONB, -- {bg: "", en: "", ru: "", es: ""}
    category VARCHAR(50), -- residential, commercial, office, medical
    year INTEGER,
    area_sqm INTEGER,
    description TEXT,
    description_translations JSONB,
    folder_name VARCHAR(255),
    cover_image VARCHAR(500),
    display_order INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Project Images Table
CREATE TABLE project_images (
    id UUID PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    image_url VARCHAR(500),
    thumbnail_url VARCHAR(500),
    alt_text VARCHAR(255),
    display_order INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Users Table (for admin access)
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP
);

-- Settings Table (for site configuration)
CREATE TABLE settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB,
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3. API Endpoints

```javascript
// Project Management
GET    /api/projects          // List all projects
GET    /api/projects/:id      // Get single project
POST   /api/projects          // Create new project
PUT    /api/projects/:id      // Update project
DELETE /api/projects/:id      // Delete project

// Image Management
POST   /api/projects/:id/images     // Upload images
DELETE /api/images/:id              // Delete image
PUT    /api/images/:id/order        // Reorder images

// Authentication
POST   /api/auth/login        // Admin login
POST   /api/auth/logout       // Admin logout
GET    /api/auth/verify       // Verify token

// Settings
GET    /api/settings          // Get all settings
PUT    /api/settings          // Update settings
```

### 4. Admin Interface Features

#### Dashboard
- Overview of total projects
- Recent additions/updates
- Quick actions

#### Project Management
- **List View**
  - Table/grid view of all projects
  - Search and filter capabilities
  - Bulk actions (delete, activate/deactivate)
  - Drag-and-drop reordering

- **Add/Edit Project**
  - Multi-language support for titles/descriptions
  - Category selection
  - Year picker
  - Area input
  - Cover image selection
  - Image gallery management
  - Preview before save

#### Image Management
- Drag-and-drop upload
- Bulk upload support
- Automatic thumbnail generation
- Image optimization
- Alt text management
- Reorder capability
- Delete with confirmation

#### Settings
- Site-wide configuration
- Language management
- Category management
- User preferences

### 5. Implementation Phases

#### Phase 1: Backend Setup (Week 1-2)
- Set up database
- Create API endpoints
- Implement authentication
- Set up file storage

#### Phase 2: Admin Interface (Week 3-4)
- Create admin login page
- Build project list view
- Implement add/edit forms
- Add image upload functionality

#### Phase 3: Frontend Integration (Week 5)
- Create API client for frontend
- Replace hardcoded data with API calls
- Implement caching strategy
- Update all 15 website variations

#### Phase 4: Migration & Testing (Week 6)
- Migrate existing projects to database
- Import all existing images
- Comprehensive testing
- Performance optimization

#### Phase 5: Deployment (Week 7)
- Deploy backend services
- Configure production environment
- Set up monitoring
- Create backup strategy

### 6. Security Considerations

- **Authentication**: Secure admin access with JWT tokens
- **Authorization**: Role-based access control
- **Input Validation**: Sanitize all user inputs
- **File Upload**: Validate file types and sizes
- **HTTPS**: Enforce SSL for all connections
- **Rate Limiting**: Prevent abuse of API endpoints
- **Backup**: Regular automated backups

### 7. Migration Strategy

1. **Data Export**: Extract project data from HTML files
2. **Image Inventory**: Catalog all existing images
3. **Database Import**: Populate database with existing data
4. **Verification**: Ensure all projects display correctly
5. **Gradual Rollout**: Test with one website variant first

### 8. Cost Estimation

#### Serverless Option (Monthly)
- Netlify Functions: ~$25 (based on usage)
- Database (Fauna/Supabase): ~$25
- Image Storage (Cloudinary): ~$30
- Total: ~$80/month

#### Traditional Server Option (Monthly)
- VPS Hosting: ~$40
- Database Hosting: ~$20
- Image Storage (S3): ~$20
- Total: ~$80/month

### 9. Maintenance Plan

- **Regular Updates**: Security patches and dependencies
- **Backups**: Daily automated backups
- **Monitoring**: Uptime and performance monitoring
- **Support**: Documentation and training for client

### 10. Alternative: Headless CMS Solutions

Instead of building custom, consider existing headless CMS:

1. **Strapi** (Self-hosted)
   - Open source
   - Customizable
   - Built-in admin panel

2. **Contentful** (SaaS)
   - Robust API
   - Great developer experience
   - Higher cost

3. **Sanity** (SaaS)
   - Real-time collaboration
   - Flexible content modeling
   - Good free tier

4. **Netlify CMS** (Git-based)
   - Works with existing setup
   - No database needed
   - Free and open source

## Recommendation

For Studio Arteamo, I recommend:

1. **Short-term**: Implement Netlify CMS for immediate CMS functionality
   - Minimal changes to existing setup
   - Free and maintainable
   - Git-based workflow

2. **Long-term**: Build custom serverless CMS
   - Better control over features
   - Scalable and cost-effective
   - Modern architecture

## Next Steps

1. Client approval of approach
2. Finalize technology choices
3. Set up development environment
4. Begin Phase 1 implementation
5. Regular progress reviews

---

**Timeline**: 6-8 weeks for full implementation
**Budget**: ~$80/month operational costs
**Team**: 1-2 developers needed