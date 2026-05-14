# GitHub Pages Deployment Guide

## Overview

GitHub Pages only supports static HTML/CSS/JavaScript files. The Node.js backend won't work on GitHub Pages, but you have two options:

## Option 1: Static Site (Recommended for GitHub Pages)

Use the current HTML files as-is and manually update `sessions.json` when adding new sessions.

### Setup Steps:

1. **Push to GitHub:**
   ```bash
   cd "/Users/rohitraut/Desktop/Customer Education"
   git init
   git add index.html admin.html sessions.json GOOGLE_DRIVE_SETUP.md
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/rohitrautibm/Education.github.io.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Click **Save**
   - Your site will be live at: `https://rohitrautibm.github.io/Education.github.io/`

3. **Adding New Sessions:**
   
   **Method A: Edit sessions.json directly on GitHub**
   - Go to your repository
   - Click on `sessions.json`
   - Click the pencil icon (Edit)
   - Add your new session at the top of the array
   - Commit changes
   
   **Method B: Use admin.html locally, then copy JSON**
   - Open `admin-github.html` (see below)
   - Fill in session details
   - Copy the generated JSON
   - Update `sessions.json` on GitHub

### Example: Adding a New Session to sessions.json

```json
{
  "sessions": [
    {
      "id": "session-august-2024",
      "date": "August 2024",
      "title": "Your New Session Title",
      "description": "Session description here",
      "resources": [
        {
          "type": "presentation",
          "name": "Presentation",
          "url": "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID",
          "filename": "presentation.pptx"
        }
      ]
    },
    // ... existing sessions below
  ]
}
```

## Option 2: Use a Free Backend Service

Deploy the Node.js backend to a free hosting service and connect it to GitHub Pages.

### Recommended Services:

1. **Vercel** (Easiest)
   - Sign up at https://vercel.com
   - Install Vercel CLI: `npm install -g vercel`
   - Deploy: `vercel`
   - Update admin.html to use your Vercel URL

2. **Render** (Free tier available)
   - Sign up at https://render.com
   - Create new Web Service
   - Connect your GitHub repository
   - Deploy server.js

3. **Railway** (Free tier available)
   - Sign up at https://railway.app
   - Create new project
   - Deploy from GitHub

### Steps for Vercel Deployment:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Create vercel.json:**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ]
   }
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Update admin.html:**
   Change the API endpoint from `localhost:3000` to your Vercel URL:
   ```javascript
   fetch('https://your-app.vercel.app/api/add-session', {
   ```

## Option 3: Hybrid Approach (Best of Both Worlds)

1. **GitHub Pages** for the main site (index.html)
2. **Local Node.js server** for admin panel (when you need to add sessions)
3. **Manual commit** of updated files to GitHub

### Workflow:

1. **Run locally when adding sessions:**
   ```bash
   npm start
   ```

2. **Add session via admin panel:**
   - Open http://localhost:3000/admin.html
   - Add your session
   - index.html is automatically updated

3. **Push changes to GitHub:**
   ```bash
   git add index.html sessions.json
   git commit -m "Added new session"
   git push
   ```

4. **GitHub Pages updates automatically**

## Recommended Approach for Your Use Case

Since you're already using GitHub Pages, I recommend **Option 3 (Hybrid)**:

✅ Keep your site on GitHub Pages (free, fast, reliable)
✅ Run the Node.js server locally only when adding sessions
✅ Commit and push changes to GitHub after adding sessions
✅ No need for additional hosting services

### Quick Commands:

```bash
# When adding a new session:
cd "/Users/rohitraut/Desktop/Customer Education"
npm start
# Open http://localhost:3000/admin.html
# Add your session
# Press Ctrl+C to stop server

# Push to GitHub:
git add .
git commit -m "Added new session"
git push
```

## Files to Include in GitHub Repository

**Essential files:**
- ✅ index.html
- ✅ sessions.json (optional, if using JSON-based approach)
- ✅ GOOGLE_DRIVE_SETUP.md
- ✅ README.md

**Optional (for local admin use):**
- admin.html
- server.js
- package.json

**Don't include:**
- node_modules/ (add to .gitignore)
- .DS_Store (add to .gitignore)

## .gitignore File

Create a `.gitignore` file:

```
node_modules/
.DS_Store
.env
*.log
```

## Summary

For GitHub Pages deployment:
1. Use the static HTML files (index.html)
2. Run Node.js server locally when adding sessions
3. Push updated files to GitHub
4. GitHub Pages serves the updated site automatically

This gives you the best of both worlds: easy session management locally + free, fast hosting on GitHub Pages!