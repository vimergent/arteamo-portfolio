# Studio Arteamo CMS

A lightweight, static-first Content Management System for managing the Studio Arteamo portfolio websites.

## Features

- **Platform Independent**: No dependency on specific hosting services
- **Static Output**: Generates JavaScript configuration files
- **Multi-language Support**: Manage content in 4 languages (BG, EN, RU, ES)
- **Image Management**: Upload, optimize, and organize project images
- **Offline Capable**: Works without internet connection
- **Zero Backend**: Everything runs in the browser
- **Export/Import**: Easy backup and deployment

## Quick Start

1. Open `cms.html` in your web browser
2. Login with the default password: `admin123`
3. Start managing your projects!

## Default Credentials

- **Password**: `admin123`

⚠️ **Important**: Change the default password in the code before deployment!

## Usage Guide

### Managing Projects

1. **Create New Project**
   - Click "New Project" button
   - Fill in project details
   - Add content in all languages
   - Upload project images
   - Save the project

2. **Edit Existing Project**
   - Click "Edit" on any project card
   - Update information as needed
   - Save changes

3. **Delete Project**
   - Click "Delete" on the project card
   - Confirm deletion

### Multi-language Content

- Switch between language tabs when editing
- English content is required
- Other languages will fall back to English if not provided

### Image Management

- **Drag & Drop**: Drop images directly onto the upload area
- **Click to Upload**: Click the upload area to select files
- **Supported Formats**: JPG, PNG, WebP
- **Automatic Optimization**: Images are compressed automatically
- **Thumbnails**: Generated for preview display

### Exporting Data

1. Click "Export Data" in the sidebar
2. The system generates:
   - `project-config.js` - Project configuration file
   - `translations.js` - UI translations (if modified)
   - `cms-backup.json` - Complete backup

3. Replace the existing files in your website directory
4. Commit and deploy the changes

### Importing Data

1. Click "Import" in the header
2. Select a backup file or existing `project-config.js`
3. Data will be imported and merged

## Technical Details

### Data Storage

- **Projects**: Stored in browser's localStorage
- **Images**: Temporarily stored as base64 in localStorage
- **Settings**: Saved in localStorage

### Generated Files

#### project-config.js
```javascript
const projectConfig = {
  "Project Folder Name": {
    name: { bg: "", en: "", ru: "", es: "" },
    subtitle: { bg: "", en: "", ru: "", es: "" },
    description: { bg: "", en: "", ru: "", es: "" },
    category: "residential",
    year: 2024,
    area: "120 m²",
    coverImage: "image.jpg",
    images: ["img1.jpg", "img2.jpg"]
  }
};
```

### Browser Requirements

- Modern browser with ES6 support
- localStorage enabled
- Sufficient storage space for images

### Security Considerations

1. **Password Protection**: Simple authentication (not for production)
2. **Data Encryption**: Not implemented (add if needed)
3. **Session Management**: Uses sessionStorage for auth tokens
4. **HTTPS**: Recommended when hosting online

## Customization

### Changing Password

Edit line in `cms.html`:
```javascript
const validPassword = 'admin123'; // Change this!
```

### Adding Categories

Add new options to the category select in `cms.html`:
```html
<option value="new-category">New Category</option>
```

### Modifying Languages

Update the language tabs and content fields as needed.

## Troubleshooting

### Images Not Displaying
- Check browser console for errors
- Ensure images are in supported formats
- Verify localStorage has space available

### Cannot Export Data
- Check browser permissions
- Ensure pop-ups are not blocked
- Try a different browser

### Lost Data
- Check browser's localStorage
- Look for auto-saved backups
- Import from last manual backup

## Best Practices

1. **Regular Backups**: Export data frequently
2. **Image Optimization**: Use web-optimized images
3. **Content Validation**: Fill all required fields
4. **Version Control**: Commit exported files to Git
5. **Testing**: Test on target websites before deployment

## Future Enhancements

- [ ] Cloud storage integration
- [ ] Real-time collaboration
- [ ] Advanced image editing
- [ ] SEO metadata management
- [ ] Preview on actual websites
- [ ] Batch import from folders
- [ ] Translation API integration
- [ ] Advanced user roles

## Support

For issues or questions, please refer to the main project documentation or contact the development team.