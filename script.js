const STORAGE_KEY = 'minhaNota';

function getLocalStorage() {
    try {
        const testKey = '__bloco_de_notas_teste__';
        window.localStorage.setItem(testKey, testKey);
        window.localStorage.removeItem(testKey);
        return window.localStorage;
    } catch (error) {
        console.warn('localStorage não disponível:', error);
        return null;
    }
}

function debounce(callback, delay = 250) {
    let timeoutId = null;

    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => callback(...args), delay);
    };
}

function loadSavedNote(textarea, storage) {
    if (!storage) {
        return;
    }

    const savedNote = storage.getItem(STORAGE_KEY);
    if (savedNote) {
        textarea.value = savedNote;
    }
}

function saveNoteValue(storage, value) {
    if (!storage) {
        return;
    }

    storage.setItem(STORAGE_KEY, value);
}

function saveNote(storage, value) {
    saveNoteValue(storage, value);
    const status = document.getElementById('statusMessage');
    if (status) {
        status.textContent = 'Anotação salva com sucesso!';
        window.setTimeout(() => {
            status.textContent = '';
        }, 1800);
    }
}

function clearNote(storage, textarea) {
    if (textarea) {
        textarea.value = '';
    }

    if (storage) {
        storage.removeItem(STORAGE_KEY);
    }
}

function init() {
    const textarea = document.getElementById('blocoDeNotas');
    const salvarBtn = document.getElementById('salvarBtn');
    const limparBtn = document.getElementById('limparBtn');

    if (!textarea) {
        return;
    }

    const storage = getLocalStorage();
    loadSavedNote(textarea, storage);

    const debouncedSave = debounce((event) => {
        saveNoteValue(storage, event.target.value);
    }, 200);

    textarea.addEventListener('input', debouncedSave);

    if (salvarBtn) {
        salvarBtn.addEventListener('click', () => saveNote(storage, textarea.value));
    }

    if (limparBtn) {
        limparBtn.addEventListener('click', () => clearNote(storage, textarea));
    }
}

document.addEventListener('DOMContentLoaded', init);
