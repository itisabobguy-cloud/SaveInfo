const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

// CONFIGURATION - Change these values
const FILE_PATH = path.join(__dirname, 'fileForPersonalInfo.txt');
const OWNER_PASSWORD = 'mypassword123'; // Change this!

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let entries = [];

// Load entries from file on startup
async function loadEntriesFromFile() {
    try {
        const content = await fs.readFile(FILE_PATH, 'utf8');
        const blocks = content.split('---').filter(b => b.trim());
        entries = [];
        
        for (let block of blocks) {
            const lines = block.trim().split('\n');
            let id = null;
            let timestamp = null;
            let textContent = [];
            
            for (let line of lines) {
                if (line.startsWith('[ID:')) {
                    id = parseInt(line.match(/\[ID: (\d+)\]/)[1]);
                } else if (line.startsWith('[Date:')) {
                    timestamp = line.match(/\[Date: (.+)\]/)[1];
                } else if (line.trim()) {
                    textContent.push(line);
                }
            }
            
            if (id && textContent.length > 0) {
                entries.push({
                    id,
                    content: textContent.join('\n'),
                    timestamp: timestamp || new Date(id).toISOString()
                });
            }
        }
        
        console.log(`Loaded ${entries.length} entries from file`);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('File does not exist, will create on first entry');
            entries = [];
        } else {
            console.error('Error loading file:', error);
        }
    }
}

// Save entries to file
async function saveEntriesToFile() {
    try {
        let content = '';
        for (let entry of entries) {
            content += `[ID: ${entry.id}]\n`;
            content += `[Date: ${entry.timestamp}]\n`;
            content += `${entry.content}\n`;
            content += '---\n\n';
        }
        
        const dir = path.dirname(FILE_PATH);
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(FILE_PATH, content, 'utf8');
        console.log('Saved to file');
    } catch (error) {
        console.error('Error saving file:', error);
    }
}

// API Routes
app.get('/api/entries', (req, res) => {
    res.json(entries);
});

app.post('/api/entries', async (req, res) => {
    const { content } = req.body;
    
    if (!content || !content.trim()) {
        return res.status(400).json({ error: 'Content is required' });
    }
    
    const entry = {
        id: Date.now(),
        content: content.trim(),
        timestamp: new Date().toISOString()
    };
    
    entries.push(entry);
    await saveEntriesToFile();
    
    res.json({ success: true, entry });
});

app.delete('/api/entries/:id', async (req, res) => {
    const { password } = req.body;
    const id = parseInt(req.params.id);
    
    if (password !== OWNER_PASSWORD) {
        return res.status(401).json({ error: 'Invalid password' });
    }
    
    const index = entries.findIndex(e => e.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Entry not found' });
    }
    
    entries.splice(index, 1);
    await saveEntriesToFile();
    
    res.json({ success: true });
});

// Start server
loadEntriesFromFile().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
        console.log(`File path: ${FILE_PATH}`);
    });
});
