const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api' 
    : null;

const contentInput = document.getElementById('content');
const saveBtn = document.getElementById('saveBtn');
const statusText = document.getElementById('statusText');
const charCount = document.getElementById('charCount');

const TEMPLATE = `Name: 
Password: 
Birth: 
E-Mail: 
Home: 
Internet: 
Internet password: 
Some more information you want to keep: `;

let useLocalStorage = !API_URL;

contentInput.value = TEMPLATE;
updateCharCount();

loadEntry();

saveBtn.addEventListener('click', saveEntry);
contentInput.addEventListener('input', updateCharCount);

function updateCharCount() {
    charCount.textContent = `${contentInput.value.length} characters`;
}

async function loadEntry() {
    if (useLocalStorage) {
        const saved = localStorage.getItem('personalInfo');
        if (saved) {
            contentInput.value = saved;
            updateCharCount();
        }
        statusText.textContent = 'Ready (browser storage)';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/entry`);
        const data = await response.json();
        if (data.content) {
            contentInput.value = data.content;
            updateCharCount();
        }
        statusText.textContent = 'Ready';
    } catch (error) {
        useLocalStorage = true;
        const saved = localStorage.getItem('personalInfo');
        if (saved) {
            contentInput.value = saved;
            updateCharCount();
        }
        statusText.textContent = 'Ready (browser storage)';
    }
}

async function saveEntry() {
    const content = contentInput.value.trim();

    if (!content) {
        statusText.textContent = 'Nothing to save';
        return;
    }

    if (useLocalStorage) {
        localStorage.setItem('personalInfo', content);
        statusText.textContent = 'Saved to browser';
        setTimeout(() => {
            statusText.textContent = 'Ready (browser storage)';
        }, 2000);
        return;
    }

    try {
        statusText.textContent = 'Saving...';
        const response = await fetch(`${API_URL}/entry`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content })
        });

        if (response.ok) {
            statusText.textContent = 'Saved successfully';
            setTimeout(() => {
                statusText.textContent = 'Ready';
            }, 2000);
        } else {
            statusText.textContent = 'Failed to save';
        }
    } catch (error) {
        statusText.textContent = 'Server not connected';
    }
}
