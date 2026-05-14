# Db2 Education Series

A modern web application for managing and displaying IBM Db2 training sessions and educational materials.

## Features

✅ **Modern, Responsive Design** - Light color scheme with smooth animations
✅ **Left Sidebar Navigation** - Quick access to all sessions
✅ **Automatic Session Management** - Add new sessions through admin panel
✅ **Google Drive Integration** - Automatic conversion of sharing links to direct downloads
✅ **Feedback System** - Collect visitor feedback with star ratings
✅ **Timeline View** - Sessions displayed in reverse chronological order
✅ **Direct Downloads** - All resources download automatically when clicked

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd "/Users/rohitraut/Desktop/Customer Education"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   - Main Site: http://localhost:3000/index.html
   - Admin Panel: http://localhost:3000/admin.html

## Usage

### Adding a New Session

1. **Start the server** (if not already running):
   ```bash
   npm start
   ```

2. **Open the Admin Panel:**
   - Navigate to http://localhost:3000/admin.html

3. **Fill in the session details:**
   - Session Date (Month & Year)
   - Session Title
   - Session Description
   - Add resources (presentations, documents, scripts)

4. **For Google Drive files:**
   - Upload file to Google Drive
   - Get sharing link (set to "Anyone with the link can view")
   - Paste the sharing link in the Resource URL field
   - The system will automatically convert it to a direct download link

5. **Click "Generate Session HTML":**
   - The session will be automatically added to index.html
   - The page will be updated immediately
   - Click the link in the success message to view the updated page

### Using Google Drive Links

**Step 1:** Upload your file to Google Drive and get the sharing link:
```
https://drive.google.com/file/d/1ABC123xyz456/view?usp=sharing
```

**Step 2:** Paste it in the admin panel - it will be automatically converted to:
```
https://drive.google.com/uc?export=download&id=1ABC123xyz456&confirm=t
```

See `GOOGLE_DRIVE_SETUP.md` for detailed instructions.

### Viewing Feedback

Feedback is stored in the browser's localStorage. To view all feedback:

1. Open the browser console (F12)
2. Run:
   ```javascript
   JSON.parse(localStorage.getItem('db2Feedbacks'))
   ```

## File Structure

```
Customer Education/
├── index.html              # Main page with all sessions
├── admin.html              # Admin panel for adding sessions
├── server.js               # Node.js backend server
├── package.json            # Node.js dependencies
├── README.md               # This file
└── GOOGLE_DRIVE_SETUP.md   # Google Drive integration guide
```

## API Endpoints

### POST /api/add-session
Add a new training session to the site.

**Request Body:**
```json
{
  "date": "2024-06",
  "title": "Session Title",
  "description": "Session description",
  "resources": [
    {
      "type": "presentation",
      "name": "Presentation Name",
      "url": "https://..."
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Session added successfully!",
  "sessionId": "session-2024-06"
}
```

### GET /api/sessions
Get list of all sessions.

**Response:**
```json
{
  "success": true,
  "sessions": [
    { "id": "session-june-2024" },
    { "id": "session-march-2024" }
  ]
}
```

## Development

### Running in Development Mode

Use nodemon for auto-restart on file changes:

```bash
npm run dev
```

### Stopping the Server

Press `Ctrl+C` in the terminal where the server is running.

## Troubleshooting

### Server won't start
- Make sure Node.js is installed: `node --version`
- Check if port 3000 is already in use
- Try a different port by editing `server.js`

### Sessions not updating
- Make sure the server is running
- Check browser console for errors
- Verify file permissions on index.html

### Google Drive links not downloading
- Ensure file permissions are set to "Anyone with the link can view"
- For large files (>100MB), the link format includes `&confirm=t`
- Test the converted link directly in browser

## Support

For issues or questions, refer to:
- `GOOGLE_DRIVE_SETUP.md` for Google Drive integration
- Browser console for error messages
- Server terminal for backend errors

## License

MIT License - Feel free to use and modify as needed.