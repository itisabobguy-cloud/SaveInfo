const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'fileForPersonalInfo.txt');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let currentEntry = null;

async function loadFromFile() {
    try {
        const content = await fs.readFile(FILE_PATH, 'utf8');
        const blocks = content.split('---').filter(b => b.trim());
        
        if (blocks.length > 0) {
            const block = blocks[blocks.length - 1];
            const lines = block.trim().split('\n');
            let textContent = [];
            
            for (let line of lines) {
                if (!line.startsWith('[ID:') && !line.startsWith('[Date:') && line.trim()) {
                    textContent.push(line);
                }
            }
            
            if (textContent.length > 0) {
                currentEntry = textContent.join('\n');
            }
        }
        
        console.log('✓ Entry loaded from file');
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('✓ File does not exist, will create on first save');
        } else {
            console.error('✗ Error loading file:', error);
        }
    }
}

async function saveToFile(content) {
    try {
        const id = Date.now();
        const timestamp = new Date().toISOString();
        const fileContent = `[ID: ${id}]\n[Date: ${timestamp}]\n${content}\n---\n\n`;
        
        const dir = path.dirname(FILE_PATH);
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(FILE_PATH, fileContent, 'utf8');
        console.log('✓ Saved to file');
        return true;
    } catch (error) {
        console.error('✗ Error saving file:', error);
        return false;
    }
}

app.get('/api/entry', (req, res) => {
    console.log('→ GET /api/entry');
    res.json({ content: currentEntry || '' });
});

app.post('/api/entry', async (req, res) => {
    console.log('→ POST /api/entry');
    const { content } = req.body;
    
    if (!content || !content.trim()) {
        return res.status(400).json({ error: 'Content is required' });
    }
    
    const success = await saveToFile(content.trim());
    
    if (success) {
        currentEntry = content.trim();
        res.json({ success: true });
    } else {
        res.status(500).json({ error: 'Failed to save' });
    }
});

loadFromFile().then(() => {
    app.listen(PORT, () => {
        console.log('\n╔════════════════════════════════════╗');
        console.log('║   NEW APP SERVER STARTED v3.0      ║');
        console.log('╚════════════════════════════════════╝');
        console.log(`Server: http://localhost:${PORT}`);
        console.log(`File: ${FILE_PATH}`);
        console.log('Routes: GET /api/entry, POST /api/entry\n');
    });
});
