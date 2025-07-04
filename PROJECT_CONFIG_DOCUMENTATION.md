# Project Configuration System Documentation

## Overview
This document describes the centralized project configuration system implemented to prevent missing projects in galleries and ensure consistency across all website variations.

## Problem Solved
Previously, project data was hardcoded in multiple files:
- `gallery-premium.html` had its own project definitions
- Each website variation had separate project lists
- Projects like "Chayka District" and "Playground Grand Mall" were missing from some galleries
- Adding new projects required updating multiple files

## Solution Architecture

### 1. Centralized Configuration File
**File**: `/root/Interiori/websites/project-config.js`

This file contains:
- All 11 projects with complete metadata
- Multi-language support (BG, EN, RU, ES) for all text
- Consistent data structure for all projects
- Complete image lists for each project

### 2. Data Structure
```javascript
projectConfig = {
    'Project Folder Name': {
        name: { bg: '', en: '', ru: '', es: '' },
        subtitle: { bg: '', en: '', ru: '', es: '' },
        description: { bg: '', en: '', ru: '', es: '' },
        category: 'residential|commercial|office|medical|hospitality',
        year: 2024,
        area: 120,
        coverImage: 'image.jpg',
        images: ['image1.jpg', 'image2.jpg', ...]
    }
}
```

### 3. Implementation

#### Gallery Premium
- Loads `project-config.js`
- Dynamically transforms data based on current language
- No more hardcoded project data
- Automatically includes all projects

#### Website Variations
- All websites load `project-config.js`
- Random gallery uses centralized data
- Project cards generated from config
- Consistent project information across all sites

## Benefits

1. **Single Source of Truth**: One file to manage all project data
2. **No Missing Projects**: All projects automatically available everywhere
3. **Easy Maintenance**: Add/edit projects in one place
4. **Multi-language Support**: Consistent translations across all sites
5. **Future-proof**: New projects automatically appear in all galleries

## Adding New Projects

To add a new project:

1. Add project folder to `/root/Interiori/websites/`
2. Add entry to `project-config.js`:
```javascript
'New Project Folder 2025': {
    name: {
        bg: 'Нов Проект',
        en: 'New Project',
        ru: 'Новый Проект',
        es: 'Nuevo Proyecto'
    },
    // ... rest of configuration
}
```
3. All galleries and websites automatically include the new project

## Files Modified

1. **Created**:
   - `/root/Interiori/websites/project-config.js` - Central configuration

2. **Updated**:
   - `/root/Interiori/websites/gallery-premium.html` - Uses dynamic config
   - `/root/Interiori/websites/website1-minimalist/index.html` - Random gallery uses config
   - (All other website variations should be updated similarly)

## Testing

Run comprehensive tests:
```bash
node test-all-project-galleries.js
```

This verifies:
- All 11 projects load correctly
- No 404 errors for images
- Correct metadata displays
- Multi-language support works

## Current Project List

1. Apartament Flavia Garden 2024 (29 images)
2. Elite Clinic 2021 (17 images)
3. Apartament K55_2021 (10 images)
4. Balev Corporation 2020 (6 images)
5. Apartament Симфония - Бриз, Варна_ 2019 (20 images)
6. Oliv vilas sv.Vlas 2019 (11 images)
7. Playground Grand Mall Varna 2018 (15 images)
8. Apartament Кв. Чайка, Варна_2017 (6 images)
9. Apartament Траката, Варна_2021 (25 images)
10. Gichev sped 2019 (13 images)
11. Work Del Mar 2022 (13 images)

Total: 165 images across 11 projects

## Maintenance Notes

- Always update `project-config.js` when adding/modifying projects
- Test changes with `test-all-project-galleries.js`
- Ensure all website variations load `project-config.js`
- Keep translations consistent across all languages