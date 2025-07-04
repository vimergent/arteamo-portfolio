# Studio Arteamo Admin Panel - User Manual

## Getting Started

### Accessing the Admin Panel
1. Open your web browser
2. Go to: https://arteamo.net/admin/
3. Enter password: `arteamo2024admin`
4. Click "Login"

## Main Features

### 1. Dashboard Overview
When you login, you'll see:
- List of all projects
- Edit buttons for each project
- Add New Project button
- Import/Export options

### 2. Managing Existing Projects

#### To Edit a Project:
1. Find the project in the list
2. Click "Edit" button
3. Update any fields:
   - Project name (in all languages)
   - Category (Residential/Commercial/Public)
   - Year
   - Description (in all languages)
   - Images

4. Click "Save Project"
5. Changes appear immediately on website

#### To Delete a Project:
1. Click "Edit" on the project
2. Scroll to bottom
3. Click "Delete Project"
4. Confirm deletion
⚠️ **Warning**: This cannot be undone!

### 3. Adding New Projects

#### Step-by-Step:
1. Click "Add New Project" button
2. Fill in the form:

**Basic Information:**
- Project Name (in all 6 languages)
- Year (e.g., 2024)
- Category: Select from dropdown
  - residential = Жилищни
  - commercial = Търговски
  - public = Обществени

**Descriptions** (in all languages):
- Bulgarian (BG)
- English (EN)
- Russian (RU)
- Spanish (ES)
- Hebrew (HE)
- Chinese (ZH)

💡 **Tip**: Use Google Translate for languages you don't know

**Images:**
1. Click "Choose Files"
2. Select multiple images at once
3. Wait for upload to complete
4. Images auto-arrange by filename

#### Image Requirements:
- Format: JPEG or PNG
- Max size: 5MB per image (2MB recommended)
- Dimensions: 2000px maximum width
- Names: Use simple names (no special characters)

Good: `living-room-01.jpg`
Bad: `гостиная#комната@2024.jpg`

### 4. Image Management

#### Reordering Images:
1. Edit the project
2. Drag and drop images to reorder
3. Click "Save Project"

#### Deleting Images:
1. Edit the project
2. Click "×" on image thumbnail
3. Confirm deletion
4. Save project

#### Adding More Images:
1. Edit existing project
2. Click "Add More Images"
3. Select new images
4. Save project

### 5. Data Backup

#### Export Data (Backup):
1. Click "Export Data" in top menu
2. File downloads as `arteamo-projects-[date].json`
3. Save this file safely!

**When to backup:**
- Before major changes
- Monthly routine backup
- After adding new projects

#### Import Data (Restore):
1. Click "Import Data"
2. Select your backup file
3. Click "Import"
4. All projects replaced with backup

⚠️ **Warning**: Import replaces ALL current data!

### 6. Multi-Language Content

#### Language Fields:
Each project needs content in 6 languages:
- 🇧🇬 Bulgarian (Original)
- 🇬🇧 English
- 🇷🇺 Russian  
- 🇪🇸 Spanish
- 🇮🇱 Hebrew (Right-to-left)
- 🇨🇳 Chinese

#### Translation Tips:
1. Write Bulgarian first (original)
2. Use professional translator for best results
3. Or use Google Translate:
   - Copy Bulgarian text
   - Go to translate.google.com
   - Paste and select target language
   - Copy translation to admin panel

### 7. Preview Changes

After saving:
1. Open new browser tab
2. Go to https://arteamo.net
3. Navigate to projects
4. Check your changes
5. Test all languages

### 8. Troubleshooting

#### Changes Not Showing:
1. Clear browser cache:
   - Windows: Ctrl + F5
   - Mac: Cmd + Shift + R
2. Wait 2-3 minutes
3. Try different browser

#### Login Not Working:
1. Check password: `arteamo2024admin`
2. Clear browser cookies
3. Try incognito/private mode

#### Images Not Uploading:
1. Check file size (under 5MB)
2. Check file format (JPEG/PNG)
3. Try fewer images at once
4. Check internet connection

### 9. Best Practices

#### DO:
✅ Backup before major changes
✅ Test after each save
✅ Use consistent naming for images
✅ Fill all language fields
✅ Optimize images before upload

#### DON'T:
❌ Delete projects without backup
❌ Use special characters in filenames
❌ Upload images over 5MB
❌ Leave language fields empty
❌ Make changes without testing

### 10. Mobile Editing

The admin panel works on mobile, but:
- Better on tablet/desktop
- Image upload may be slower
- Drag-drop doesn't work on mobile
- Use desktop for major updates

## Quick Reference Card

### Common Tasks:

**Add Project Photo:**
Edit Project → Add More Images → Select → Save

**Change Project Year:**
Edit Project → Change Year → Save

**Update Description:**
Edit Project → Edit Text → Save

**Reorder Projects:**
Currently manual - contact developer

**Backup Everything:**
Export Data → Save File

**Fix Mistake:**
Import Data → Select Backup → Import

## Need Help?

### Before Contacting Support:
1. Check this manual
2. Try different browser
3. Clear cache
4. Check internet connection

### Contact Support:
- Email: [Developer email]
- Include screenshots
- Describe what you clicked
- Note any error messages

---

Remember: The admin panel saves to your browser. Always use Export Data to create backups!