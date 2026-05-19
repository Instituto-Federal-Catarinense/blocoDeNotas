const STORAGE_KEY = 'blocoDeNotas';
const SAVE_DELAY = 300;

const blocoDeNotas = document.getElementById('blocoDeNotas');
const limparBtn = document.getElementById('limparBtn');
const restaurarBtn = document.getElementById('restaurarBtn');
const statusLabel = document.getElementById('status');

let saveTimeoutId = null;

function isLocalStorageAvailable() {
    try {
        const testKey = '__storage_test__';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch {
        return false;
    }
}

function setStatus(message, type = '') {
    statusLabel.textContent = message;
    statusLabel.className = type ? `status ${type}` : 'status';
}

function saveNote() {
    if (!isLocalStorageAvailable()) {
        setStatus('Não foi possível salvar. Verifique as configurações do navegador.', 'error');
        return;
    }

    localStorage.setItem(STORAGE_KEY, blocoDeNotas.value);
    setStatus('Nota salva automaticamente.', 'success');
}

function loadNote() {
    if (!isLocalStorageAvailable()) {
        setStatus('LocalStorage indisponível. Nenhuma nota será persistida.', 'error');
        return;
    }

    const savedNote = localStorage.getItem(STORAGE_KEY);

    if (savedNote !== null) {
        blocoDeNotas.value = savedNote;
        setStatus('Nota carregada do navegador.', 'success');
    } else {
        setStatus('Nenhuma nota salva ainda.', '');
    }
}

function clearNote() {
    blocoDeNotas.value = '';
    saveNote();
}

function restoreNote() {
    loadNote();
}

function handleInput() {
    setStatus('Salvando...', '');

    clearTimeout(saveTimeoutId);
    saveTimeoutId = window.setTimeout(saveNote, SAVE_DELAY);
}

document.addEventListener('DOMContentLoaded', () => {
    loadNote();

    blocoDeNotas.addEventListener('input', handleInput);
    limparBtn.addEventListener('click', clearNote);
    restaurarBtn.addEventListener('click', restoreNote);
});