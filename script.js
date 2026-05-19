const STORAGE_KEY = 'blocoDeNotas.nota';
const SAVE_DELAY = 300;

const noteApp = {
    init() {
        this.cacheElements();
        this.attachEvents();
        this.loadNote();
    },

    cacheElements() {
        this.textarea = document.getElementById('blocoDeNotas');
        this.clearButton = document.getElementById('limparBtn');
        this.statusLabel = document.getElementById('status');
    },

    attachEvents() {
        const debouncedSave = this.debounce(() => this.saveNote(), SAVE_DELAY);

        this.textarea.addEventListener('input', debouncedSave);
        this.clearButton.addEventListener('click', () => this.clearNote());
    },

    loadNote() {
        const savedNote = this.getSavedNote();

        if (savedNote) {
            this.textarea.value = savedNote;
            this.showStatus('Anotação carregada');
        }
    },

    getSavedNote() {
        if (!this.isStorageAvailable()) {
            return '';
        }

        return localStorage.getItem(STORAGE_KEY) || '';
    },

    saveNote() {
        if (!this.isStorageAvailable()) {
            this.showStatus('Armazenamento local não disponível');
            return;
        }

        localStorage.setItem(STORAGE_KEY, this.textarea.value);
        this.showStatus('Anotação salva');
    },

    clearNote() {
        this.textarea.value = '';
        if (this.isStorageAvailable()) {
            localStorage.removeItem(STORAGE_KEY);
        }
        this.showStatus('Anotação removida');
    },

    isStorageAvailable() {
        try {
            const testKey = '__storage_test__';
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    },

    showStatus(message) {
        if (!this.statusLabel) {
            return;
        }

        this.statusLabel.textContent = message;

        clearTimeout(this.statusTimer);
        this.statusTimer = setTimeout(() => {
            this.statusLabel.textContent = '';
        }, 2200);
    },

    debounce(fn, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), delay);
        };
    }
};

document.addEventListener('DOMContentLoaded', () => noteApp.init());