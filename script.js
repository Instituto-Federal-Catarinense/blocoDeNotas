const STORAGE_KEY = 'blocoDeNotasConteudo';
const SAVE_DELAY_MS = 250;

const blocoDeNotas = document.getElementById('blocoDeNotas');
const limparNotaButton = document.getElementById('limparNota');
const statusElement = document.getElementById('status');
let saveTimeout = null;

function isLocalStorageAvailable() {
    try {
        const testKey = '__teste_localstorage__';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
}

function getSavedNote() {
    if (!isLocalStorageAvailable()) {
        updateStatus('LocalStorage não disponível.');
        return null;
    }

    try {
        return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
        console.error('Erro ao ler nota salva:', error);
        updateStatus('Falha ao carregar a nota.');
        return null;
    }
}

function saveNote(content) {
    if (!isLocalStorageAvailable()) {
        updateStatus('LocalStorage não disponível.');
        return;
    }

    try {
        localStorage.setItem(STORAGE_KEY, content);
        updateStatus('Salvo automaticamente.');
    } catch (error) {
        console.error('Erro ao salvar nota:', error);
        updateStatus('Erro ao salvar.');
    }
}

function updateStatus(message) {
    if (!statusElement) {
        return;
    }

    statusElement.textContent = message;
}

function scheduleSave() {
    updateStatus('Salvando...');

    if (saveTimeout !== null) {
        clearTimeout(saveTimeout);
    }

    saveTimeout = setTimeout(() => {
        saveNote(blocoDeNotas.value);
    }, SAVE_DELAY_MS);
}

function clearNote() {
    blocoDeNotas.value = '';
    saveNote('');
    blocoDeNotas.focus();
}

document.addEventListener('DOMContentLoaded', () => {
    const savedNote = getSavedNote();

    if (savedNote) {
        blocoDeNotas.value = savedNote;
        updateStatus('Nota carregada.');
    } else {
        updateStatus('Digite sua primeira nota.');
    }

    blocoDeNotas.addEventListener('input', scheduleSave);
    limparNotaButton?.addEventListener('click', clearNote);
});