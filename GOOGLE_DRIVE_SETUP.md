# Google Drive Setup Guide for Db2 Education Series

## How to Get Direct Download Links from Google Drive

### Step 1: Upload File to Google Drive
1. Upload your file to Google Drive
2. Right-click on the file → Get link
3. Change permissions to "Anyone with the link can view"
4. Copy the sharing link

### Step 2: Convert to Direct Download Link

**Original Google Drive Link Format:**
```
https://drive.google.com/file/d/FILE_ID/view?usp=sharing
```

**Convert to Direct Download Format:**
```
https://drive.google.com/uc?export=download&id=FILE_ID
```

### Example:

**Original Link:**
```
https://drive.google.com/file/d/1ABC123xyz456/view?usp=sharing
```

**Direct Download Link:**
```
https://drive.google.com/uc?export=download&id=1ABC123xyz456
```

### Step 3: Use in Your HTML

Add the direct download link to your resource links:

```html
<a href="https://drive.google.com/uc?export=download&id=FILE_ID" 
   class="resource-link presentation" 
   download="filename.pptx">
   Presentation
</a>
```

## Quick Conversion Tool

You can use this JavaScript snippet in the browser console to convert links:

```javascript
function convertGDriveLink(shareLink) {
    const fileId = shareLink.match(/\/d\/([^\/]+)/)[1];
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

// Usage:
convertGDriveLink("https://drive.google.com/file/d/1ABC123xyz456/view?usp=sharing");
```

## For Large Files (>100MB)

For files larger than 100MB, Google Drive shows a warning page. Use this format instead:

```
https://drive.google.com/uc?export=download&id=FILE_ID&confirm=t
```

The `&confirm=t` parameter bypasses the warning for large files.

## Tips

1. **Always test your links** after adding them to ensure they download correctly
2. **Keep files organized** in a dedicated Google Drive folder
3. **Use descriptive filenames** so users know what they're downloading
4. **Check permissions** - make sure files are set to "Anyone with the link can view"
5. **For very large files** (>1GB), consider using Google Drive's folder sharing instead

## Updating Links in the Education Series

1. Open `admin.html` in your browser
2. Fill in the session details
3. For Resource URL, paste the **direct download link** (converted format)
4. Generate the HTML code
5. Copy and paste into `index.html`

## Alternative: Using Google Drive Folder

If you have many files, you can:
1. Create a Google Drive folder with all session materials
2. Share the folder link
3. Add a single "View All Materials" link to the session

Example:
```html
<a href="https://drive.google.com/drive/folders/FOLDER_ID" 
   class="resource-link" 
   target="_blank">
   View All Materials
</a>