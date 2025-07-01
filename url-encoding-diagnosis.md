# URL Encoding Issue Diagnosis

## Problem Summary

The image loading issue affects projects with Cyrillic characters in their folder names. The root cause is that folder names are not being URL-encoded when constructing image paths.

## Affected Projects

1. **Apartament Кв. Чайка, Варна_2017**
   - Raw: `Apartament Кв. Чайка, Варна_2017`
   - Encoded: `Apartament%20%D0%9A%D0%B2.%20%D0%A7%D0%B0%D0%B9%D0%BA%D0%B0%2C%20%D0%92%D0%B0%D1%80%D0%BD%D0%B0_2017`

2. **Apartament Симфония - Бриз, Варна_ 2019**
   - Raw: `Apartament Симфония - Бриз, Варна_ 2019`
   - Encoded: `Apartament%20%D0%A1%D0%B8%D0%BC%D1%84%D0%BE%D0%BD%D0%B8%D1%8F%20-%20%D0%91%D1%80%D0%B8%D0%B7%2C%20%D0%92%D0%B0%D1%80%D0%BD%D0%B0_%202019`

3. **Apartament Траката, Варна_2021**
   - Raw: `Apartament Траката, Варна_2021`
   - Encoded: `Apartament%20%D0%A2%D1%80%D0%B0%D0%BA%D0%B0%D1%82%D0%B0%2C%20%D0%92%D0%B0%D1%80%D0%BD%D0%B0_2021`

## Code Locations with Issues

### 1. dynamic-projects.js (Line 67)
```javascript
src="../${folderName}/${coverImage}"
```
Should be:
```javascript
src="../${encodeURIComponent(folderName)}/${coverImage}"
```

### 2. gallery-premium.html (Line 874)
```javascript
projectImages = project.images.map(img => `../${projectFolder}/${img}`);
```
Should be:
```javascript
projectImages = project.images.map(img => `../${encodeURIComponent(projectFolder)}/${img}`);
```

### 3. gallery-premium.html (Line 889)
```javascript
heroImage.src = projectImages[0];
```
This uses the already-constructed URLs from projectImages array.

## URL Encoding Requirements

- Spaces must be encoded as `%20`
- Cyrillic characters must be percent-encoded (e.g., 'К' becomes `%D0%9A`)
- Special characters like commas must be encoded (`,` becomes `%2C`)
- The underscore `_` does NOT need encoding
- The hyphen `-` does NOT need encoding

## Test Results

Using the test pages created:

1. **Raw URLs (no encoding)**: ❌ FAIL - 404 errors for Cyrillic folders
2. **Single encoding with encodeURIComponent**: ✅ SUCCESS - Images load correctly
3. **Double encoding**: ❌ FAIL - Over-encoded URLs don't match file paths
4. **encodeURI instead of encodeURIComponent**: ❌ FAIL - Doesn't encode all necessary characters

## Solution

Apply `encodeURIComponent()` to folder names when constructing image URLs in:
1. All website variations that use dynamic project loading
2. The gallery-premium.html page
3. Any other location where image paths are constructed dynamically

## Implementation Note

The fix should be applied consistently across all website variations to ensure uniform behavior.