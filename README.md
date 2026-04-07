# Personal Info Notepad

A simple browser-based notepad app for storing personal information. Only keeps one entry at a time - new saves replace the old one.

## Features

- Notepad-style interface
- Template with common fields (Name, Password, Birth, Email, etc.)
- Only one entry at a time
- Auto-saves to local text file
- Clean, minimal design

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser:
```
http://localhost:3000
```

## Configuration

Edit `app-server.js` line 8 to change the file path:
```javascript
const FILE_PATH = 'C:\\Users\\YOUR_USERNAME\\path\\to\\file.txt';
```

## Usage

1. Fill in the template fields
2. Click "Save"
3. Your entry is saved to the text file
4. Next save will replace the previous entry

## Tech Stack

- Backend: Node.js + Express
- Frontend: HTML, CSS, JavaScript
- Storage: Plain text file

## License

Free to use and modify
