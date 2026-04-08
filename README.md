# Personal Info Notepad

A simple browser-based notepad app for storing personal information. Only keeps one entry at a time - new saves replace the old one.

## Features

- Notepad-style interface
- Template with common fields (Name, Password, Birth, Email, etc.)
- Only one entry at a time
- Saves to a local text file (`fileForPersonalInfo.txt`) on button click
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

## How It Works

- The server saves your data to `fileForPersonalInfo.txt` in the project folder
- Each save replaces the previous entry (only one entry kept at a time)
- On startup, the server loads the last saved entry back into the editor

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
