const STORAGE_KEY = 'blocoDeNotas';
const DARK_MODE_KEY = 'modoEscuro';
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
    limparNotas: document.getElementById('limparNotas'),
    modoEscuro: document.getElementById('modoEscuro')
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

const toggleDarkMode = () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    if (isLocalStorageAvailable()) {
        localStorage.setItem(DARK_MODE_KEY, isDarkMode);
    }
};

const loadDarkMode = () => {
    if (!isLocalStorageAvailable()) {
        return false;
    }
    return localStorage.getItem(DARK_MODE_KEY) === 'true';
};

const applyDarkMode = (isDarkMode) => {
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
};

const init = () => {
    const { blocoDeNotas, status, limparNotas, modoEscuro } = getElements();
    const savedNote = loadNote();
    const isDarkMode = loadDarkMode();

    // Aplicar modo escuro se estava ativo
    applyDarkMode(isDarkMode);

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

    modoEscuro.addEventListener('click', toggleDarkMode);
};

document.addEventListener('DOMContentLoaded', init);

document.addEventListener('DOMContentLoaded', init);