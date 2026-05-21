const STORAGE_KEY = 'minhaNota';
const TITLE_KEY = 'tituloNota';
const THEME_KEY = 'blocoDeNotasTema';
const AUTO_SAVE_DELAY = 600;
const DEFAULT_THEME = 'light';

function formatStatus(message, isError = false) {
    const status = document.getElementById('statusMessage');
    status.textContent = message;
    status.className = isError ? 'status error' : 'status success';
}

function safeGetItem(key) {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.error('Erro ao ler localStorage:', error);
        formatStatus('Não foi possível carregar os dados.', true);
        return null;
    }
}

function safeSetItem(key, value) {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
        formatStatus('Não foi possível salvar os dados.', true);
        return false;
    }
}

function carregarNota() {
    const notaSalva = safeGetItem(STORAGE_KEY);
    const tituloSalvo = safeGetItem(TITLE_KEY);

    if (notaSalva !== null) {
        document.getElementById('blocoDeNotas').value = notaSalva;
        formatStatus('Nota carregada com sucesso.');
    }

    if (tituloSalvo !== null) {
        document.getElementById('noteTitle').value = tituloSalvo;
    }
}

function salvarNota() {
    const texto = document.getElementById('blocoDeNotas').value;
    if (safeSetItem(STORAGE_KEY, texto)) {
        formatStatus('Nota salva automaticamente.');
    }
}

function salvarTitulo() {
    const titulo = document.getElementById('noteTitle').value;
    safeSetItem(TITLE_KEY, titulo);
}

function limparNota() {
    const campo = document.getElementById('blocoDeNotas');
    campo.value = '';
    localStorage.removeItem(STORAGE_KEY);
    formatStatus('Nota removida.');
}

function limparTitulo() {
    const campo = document.getElementById('noteTitle');
    campo.value = '';
    localStorage.removeItem(TITLE_KEY);
}

function confirmarLimpeza() {
    return window.confirm('Tem certeza que deseja limpar a nota? Isso apagará também o título.');
}

function limparNotaComConfirmacao() {
    if (!confirmarLimpeza()) {
        formatStatus('Limpeza cancelada.');
        return;
    }

    limparNota();
    limparTitulo();
}

function sanitizeFileName(value) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || 'nota';
}

function exportarNota() {
    const texto = document.getElementById('blocoDeNotas').value;
    const titulo = document.getElementById('noteTitle').value.trim();
    const exportText = titulo ? `Título: ${titulo}\n\n${texto}` : texto;
    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
    const titleSlug = titulo ? sanitizeFileName(titulo) : `nota`;

    link.href = url;
    link.download = `${titleSlug}-${timestamp}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    formatStatus('Nota exportada como arquivo.');
}

function processarArquivoImportado(text) {
    const linhas = text.replace(/\r\n/g, '\n').split('\n');
    let titulo = '';
    let corpo = text;

    if (linhas[0].startsWith('Título:')) {
        titulo = linhas[0].replace(/^Título:\s*/i, '').trim();
        corpo = linhas.slice(2).join('\n');
    }

    document.getElementById('noteTitle').value = titulo;
    document.getElementById('blocoDeNotas').value = corpo;
    salvarTitulo();
    salvarNota();
    formatStatus('Arquivo importado com sucesso.');
}

function importarNota() {
    const input = document.getElementById('fileInput');
    if (!input) {
        formatStatus('Não foi possível abrir o seletor de arquivos.', true);
        return;
    }
    input.value = '';
    input.click();
}

function aplicarTema(theme) {
    document.documentElement.dataset.theme = theme;
    const temaBtn = document.getElementById('temaBtn');
    if (temaBtn) {
        temaBtn.textContent = theme === 'dark' ? 'Tema claro' : 'Tema escuro';
    }
    safeSetItem(THEME_KEY, theme);
}

function carregarTema() {
    const temaSalvo = safeGetItem(THEME_KEY) || DEFAULT_THEME;
    aplicarTema(temaSalvo);
}

function alternarTema() {
    const atual = document.documentElement.dataset.theme || DEFAULT_THEME;
    aplicarTema(atual === 'dark' ? 'light' : 'dark');
}

function debounce(fn, delay) {
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => fn(...args), delay);
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const blocoDeNotas = document.getElementById('blocoDeNotas');
    const noteTitle = document.getElementById('noteTitle');
    const exportBtn = document.getElementById('exportBtn');
    const importBtn = document.getElementById('importBtn');
    const fileInput = document.getElementById('fileInput');
    const limparBtn = document.getElementById('limparBtn');
    const temaBtn = document.getElementById('temaBtn');

    carregarNota();
    carregarTema();

    const autoSalvar = debounce(salvarNota, AUTO_SAVE_DELAY);
    blocoDeNotas.addEventListener('input', autoSalvar);
    noteTitle.addEventListener('input', debounce(salvarTitulo, AUTO_SAVE_DELAY));

    exportBtn.addEventListener('click', exportarNota);
    importBtn.addEventListener('click', importarNota);
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files && event.target.files[0];
        if (!file) {
            formatStatus('Nenhum arquivo selecionado.', true);
            return;
        }

        const reader = new FileReader();
        reader.onload = () => processarArquivoImportado(reader.result);
        reader.onerror = () => formatStatus('Erro ao ler o arquivo.', true);
        reader.readAsText(file, 'UTF-8');
    });

    limparBtn.addEventListener('click', limparNotaComConfirmacao);
    temaBtn.addEventListener('click', alternarTema);
});
