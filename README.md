<div align="center">

# 📝 Personal Info Notepad

**A simple browser-based notepad for storing personal information securely on your local machine.**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🖊️ Notepad Interface | Classic notepad-style editor with menu bar and status bar |
| 📋 Template Fields | Pre-filled template: Name, Password, Birth, Email, Home, Internet |
| 💾 Save to File | Saves your data to a local `.txt` file on button click |
| 🔄 One Entry | Only keeps one entry at a time — new saves replace the old one |
| 📂 Auto-Load | Loads your last saved entry when the server starts |

---

## 🚀 Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/itisabobguy-cloud/SaveInfo.git
cd SaveInfo

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

Then open **http://localhost:3000** in your browser.

---

## 🔧 How It Works

```
Browser (localhost:3000)  →  Express Server  →  fileForPersonalInfo.txt
        ↑                         ↓
        └─── Loads last entry ────┘
```

1. Open the app in your browser — you see a notepad with template fields
2. Fill in your info and click **Save**
3. Data is written to `fileForPersonalInfo.txt` in the project folder
4. Next time you start the server, your last entry is loaded back

---

## 📁 Project Structure

```
SaveInfo/
├── app-server.js        # Main server (Express)
├── package.json         # Dependencies
├── public/
│   ├── index.html       # Notepad UI
│   ├── styles.css       # Styling
│   └── app.js           # Frontend logic
└── fileForPersonalInfo.txt  # Your saved data (created on first save)
```

---

## 🛠️ Tech Stack

- **Backend:** Node.js + Express
- **Frontend:** HTML, CSS, vanilla JavaScript
- **Storage:** Plain text file (no database needed)

---

## 📜 License

Free to use and modify.
