const API_URL = 'http://localhost:3000/api';

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

contentInput.value = TEMPLATE;
updateCharCount();

loadEntry();

saveBtn.addEventListener('click', saveEntry);
contentInput.addEventListener('input', updateCharCount);

function updateCharCount() {
    charCount.textContent = `${contentInput.value.length} characters`;
}

async function loadEntry() {
    try {
        const response = await fetch(`${API_URL}/entry`);
        const data = await response.json();
        if (data.content) {
            contentInput.value = data.content;
            updateCharCount();
        }
        statusText.textContent = 'Ready';
    } catch (error) {
        statusText.textContent = 'Server not connected';
    }
}

async function saveEntry() {
    const content = contentInput.value.trim();

    if (!content) {
        statusText.textContent = 'Nothing to save';
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
