const STORAGE_KEY = 'blocoDeNotasApp.conteudo';
const SAVE_DELAY_MS = 500;

function supportsLocalStorage() {
    try {
        const testKey = '__storage_test__';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
}

function getSavedNote() {
    if (!supportsLocalStorage()) return '';
    return localStorage.getItem(STORAGE_KEY) || '';
}

function setSavedNote(value) {
    if (!supportsLocalStorage()) return;
    try {
        localStorage.setItem(STORAGE_KEY, value);
    } catch (error) {
        console.warn('Não foi possível salvar a nota:', error);
    }
}

function debounce(callback, delay) {
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => callback(...args), delay);
    };
}

function updateStatus(element, message, timeout = 1500) {
    if (!element) return;
    element.textContent = message;
    clearTimeout(element.dataset.timeoutId);

    const timeoutId = window.setTimeout(() => {
        element.textContent = '';
        delete element.dataset.timeoutId;
    }, timeout);

    element.dataset.timeoutId = timeoutId;
}

document.addEventListener('DOMContentLoaded', () => {
    const blocoDeNotas = document.getElementById('blocoDeNotas');
    const status = document.getElementById('status');
    const limparNota = document.getElementById('limparNota');

    blocoDeNotas.value = getSavedNote();

    const saveNote = () => {
        setSavedNote(blocoDeNotas.value);
        updateStatus(status, 'Salvo');
    };

    const debouncedSave = debounce(saveNote, SAVE_DELAY_MS);

    blocoDeNotas.addEventListener('input', () => {
        updateStatus(status, 'Salvando...', 1200);
        debouncedSave();
    });

    limparNota.addEventListener('click', () => {
        blocoDeNotas.value = '';
        setSavedNote('');
        updateStatus(status, 'Nota limpa');
        blocoDeNotas.focus();
    });
});