const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname));

// API endpoint to add new session
app.post('/api/add-session', (req, res) => {
    try {
        const { date, title, description, resources } = req.body;
        
        // Read the current index.html
        const indexPath = path.join(__dirname, 'index.html');
        let htmlContent = fs.readFileSync(indexPath, 'utf8');
        
        // Format date
        const dateObj = new Date(date + '-01');
        const monthYear = dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        
        // Create session ID
        const sessionId = `session-${date.replace('-', '-').toLowerCase()}`;
        
        // Build resources HTML
        let resourcesHTML = '';
        resources.forEach(resource => {
            const className = resource.type === 'document' ? 'resource-link' : `resource-link ${resource.type}`;
            const filename = resource.name.replace(/[^a-z0-9]/gi, '_');
            resourcesHTML += `                            <a href="${resource.url}" class="${className}" download="${filename}">${resource.name}</a>\n`;
        });
        
        // Create new session HTML
        const newSessionHTML = `
                    <!-- ${monthYear} Session -->
                    <div class="session-card" id="${sessionId}">
                        <div class="session-header">
                            <span class="session-date">${monthYear}</span>
                            <h2>${title}</h2>
                            <p class="session-description">${description}</p>
                        </div>
                        <div class="resources">
${resourcesHTML}                        </div>
                    </div>
`;
        
        // Find the timeline section and add the new session at the beginning
        const timelineStart = htmlContent.indexOf('<div class="timeline">');
        const firstSessionStart = htmlContent.indexOf('<!-- June 2024 Session -->', timelineStart);
        
        if (timelineStart !== -1 && firstSessionStart !== -1) {
            // Insert new session before the first existing session
            htmlContent = htmlContent.slice(0, firstSessionStart) + 
                         newSessionHTML + 
                         htmlContent.slice(firstSessionStart);
            
            // Update the sidebar navigation
            const sidebarNavStart = htmlContent.indexOf('<ul class="sidebar-nav">');
            const firstLiStart = htmlContent.indexOf('<li>', sidebarNavStart);
            
            if (sidebarNavStart !== -1 && firstLiStart !== -1) {
                const newNavItem = `
                    <li>
                        <a href="#${sessionId}">
                            <span class="session-date-nav">${monthYear}</span>
                            <span class="session-title-nav">${title}</span>
                        </a>
                    </li>`;
                
                htmlContent = htmlContent.slice(0, firstLiStart) + 
                             newNavItem + 
                             htmlContent.slice(firstLiStart);
            }
            
            // Update session count in stats bar
            const sessionCountMatch = htmlContent.match(/<span class="stat-number">(\d+)<\/span>\s*<span class="stat-label">Training Sessions<\/span>/);
            if (sessionCountMatch) {
                const currentCount = parseInt(sessionCountMatch[1]);
                const newCount = currentCount + 1;
                htmlContent = htmlContent.replace(
                    sessionCountMatch[0],
                    `<span class="stat-number">${newCount}</span>\n                        <span class="stat-label">Training Sessions</span>`
                );
            }
            
            // Write back to file
            fs.writeFileSync(indexPath, htmlContent, 'utf8');
            
            res.json({ 
                success: true, 
                message: 'Session added successfully!',
                sessionId: sessionId
            });
        } else {
            res.status(500).json({ 
                success: false, 
                message: 'Could not find timeline section in HTML' 
            });
        }
        
    } catch (error) {
        console.error('Error adding session:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error adding session: ' + error.message 
        });
    }
});

// API endpoint to get all sessions
app.get('/api/sessions', (req, res) => {
    try {
        const indexPath = path.join(__dirname, 'index.html');
        const htmlContent = fs.readFileSync(indexPath, 'utf8');
        
        // Extract session information (basic parsing)
        const sessions = [];
        const sessionRegex = /<div class="session-card" id="([^"]+)">/g;
        let match;
        
        while ((match = sessionRegex.exec(htmlContent)) !== null) {
            sessions.push({ id: match[1] });
        }
        
        res.json({ success: true, sessions });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error reading sessions: ' + error.message 
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 Db2 Education Series Server Running!`);
    console.log(`📝 Admin Panel: http://localhost:${PORT}/admin.html`);
    console.log(`🎓 Main Site: http://localhost:${PORT}/index.html`);
    console.log(`\nPress Ctrl+C to stop the server\n`);
});

// Made with Bob
