const STORAGE_KEY = 'blocoDeNotas';
const SAVE_DELAY = 300;

const blocoDeNotas = document.getElementById('blocoDeNotas');
const limparBtn = document.getElementById('limparBtn');
const restaurarBtn = document.getElementById('restaurarBtn');
const statusLabel = document.getElementById('status');
const salvarBtn = document.getElementById('salvarBtn');
const baixarBtn = document.getElementById('baixarBtn');
const downloadPanel = document.getElementById('downloadPanel');
const filenameInput = document.getElementById('filenameInput');
const confirmarBaixarBtn = document.getElementById('confirmarBaixarBtn');
const cancelarBaixarBtn = document.getElementById('cancelarBaixarBtn');

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

function manualSave() {
    if (!isLocalStorageAvailable()) {
        setStatus('Não foi possível salvar. Verifique as configurações do navegador.', 'error');
        return;
    }

    localStorage.setItem(STORAGE_KEY, blocoDeNotas.value);
    const now = new Date();
    const time = now.toLocaleTimeString();
    setStatus(`Nota salva em ${time}.`, 'success');
}

function downloadNote(customFilename) {
    const content = blocoDeNotas.value || '';
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    let filename = customFilename;
    if (!filename) {
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        filename = `nota-${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}.txt`;
    }

    // ensure .txt
    if (!/\.txt$/i.test(filename)) filename = `${filename}.txt`;

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setStatus(`Arquivo "${filename}" preparado para download.`, 'success');
}

function showDownloadPanel() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const suggested = `nota-${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}.txt`;
    filenameInput.value = suggested;
    downloadPanel.setAttribute('aria-hidden', 'false');
    filenameInput.focus();
}

function hideDownloadPanel() {
    downloadPanel.setAttribute('aria-hidden', 'true');
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
    if (salvarBtn) salvarBtn.addEventListener('click', manualSave);
    if (baixarBtn) baixarBtn.addEventListener('click', () => showDownloadPanel());
    if (confirmarBaixarBtn) confirmarBaixarBtn.addEventListener('click', () => {
        downloadNote(filenameInput.value.trim());
        hideDownloadPanel();
    });
    if (cancelarBaixarBtn) cancelarBaixarBtn.addEventListener('click', hideDownloadPanel);

    // permitir Enter para confirmar quando estiver no input
    if (filenameInput) {
        filenameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                confirmarBaixarBtn.click();
            } else if (e.key === 'Escape') {
                hideDownloadPanel();
            }
        });
    }

    // Atalho Ctrl/Cmd+S para salvar
    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        if ((e.ctrlKey || e.metaKey) && key === 's') {
            e.preventDefault();
            manualSave();
        }
    });
});