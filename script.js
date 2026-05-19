const STORAGE_KEY = 'blocoDeNotas';
const statusMessages = {
    waiting: 'Aguardando alterações...',
    saved: 'Alterações salvas localmente.',
    cleared: 'Notas limpas.',
    unsupported: 'LocalStorage não disponível neste navegador.'
};

const isLocalStorageAvailable = () => {
    try {
        const testKey = '__storage_test__';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch {
        return false;
    }
};

const getElements = () => ({
    blocoDeNotas: document.getElementById('blocoDeNotas'),
    status: document.getElementById('status'),
    limparNotas: document.getElementById('limparNotas')
});

const saveNote = (texto) => {
    if (!isLocalStorageAvailable()) {
        return false;
    }

    localStorage.setItem(STORAGE_KEY, texto);
    return true;
};

const loadNote = () => {
    if (!isLocalStorageAvailable()) {
        return null;
    }

    return localStorage.getItem(STORAGE_KEY) ?? '';
};

const updateStatus = (element, message) => {
    element.textContent = message;
};

const init = () => {
    const { blocoDeNotas, status, limparNotas } = getElements();
    const savedNote = loadNote();

    if (savedNote !== null) {
        blocoDeNotas.value = savedNote;
        updateStatus(status, statusMessages.saved);
    } else {
        updateStatus(status, statusMessages.unsupported);
    }

    blocoDeNotas.addEventListener('input', (event) => {
        if (saveNote(event.target.value)) {
            updateStatus(status, statusMessages.saved);
        } else {
            updateStatus(status, statusMessages.unsupported);
        }
    });

    limparNotas.addEventListener('click', () => {
        blocoDeNotas.value = '';
        saveNote('');
        updateStatus(status, statusMessages.cleared);
    });
};

document.addEventListener('DOMContentLoaded', init);