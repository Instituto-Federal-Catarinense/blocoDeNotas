// Espera o conteúdo da página carregar completamente antes de executar o script.
// É uma boa prática para evitar erros de JavaScript tentando acessar elementos
// que ainda não existem na página.
document.addEventListener('DOMContentLoaded', () => {

    // 1. SELECIONANDO O ELEMENTO
    // ----------------------------
    // Primeiro, precisamos de uma referência ao nosso elemento <textarea>.
    // Usamos 'document.getElementById' para pegar o elemento pelo 'id' que definimos no HTML.
    const blocoDeNotas = document.getElementById('blocoDeNotas');
    const btnSalvar = document.getElementById('btnSalvar');
    const btnBaixar = document.getElementById('btnBaixar');
    const btnLimpar = document.getElementById('btnLimpar');
    const statusEl = document.getElementById('status');

    const STORAGE_KEY = 'minhaNota';
    const STORAGE_TIME = 'minhaNotaTime';
    const DEBOUNCE_MS = 800;
    let saveTimeout = null;

    // 2. CARREGANDO DADOS DO LOCALSTORAGE
    // ------------------------------------
    // O 'localStorage' é um recurso do navegador que permite salvar informações
    // que persistem mesmo depois que o navegador é fechado.
    // Usamos 'localStorage.getItem()' para buscar um item salvo.
    // Aqui, estamos procurando por um item que salvamos com a chave 'minhaNota'.
    const notaSalva = localStorage.getItem(STORAGE_KEY);
    const notaTime = localStorage.getItem(STORAGE_TIME);

    if (notaSalva) {
        blocoDeNotas.value = notaSalva;
    }

    function formatTime(ts) {
        try {
            return new Date(Number(ts)).toLocaleString('pt-BR', { hour12: false });
        } catch (e) {
            return '—';
        }
    }

    function updateStatus(text) {
        statusEl.textContent = text;
    }

    function saveNote() {
        localStorage.setItem(STORAGE_KEY, blocoDeNotas.value);
        const now = Date.now();
        localStorage.setItem(STORAGE_TIME, String(now));
        updateStatus('Último salvamento: ' + formatTime(now));
    }

    function scheduleSave() {
        updateStatus('Salvando...');
        if (saveTimeout) clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            saveNote();
            saveTimeout = null;
        }, DEBOUNCE_MS);
    }

    function downloadNote() {
        const content = blocoDeNotas.value || '';
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const name = 'nota-' + new Date().toISOString().slice(0,19).replace(/[:T]/g,'-') + '.txt';
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }

    function clearNote() {
        if (!confirm('Deseja limpar a nota? Esta ação não pode ser desfeita.')) return;
        blocoDeNotas.value = '';
        saveNote();
    }

    // Exibir último horário salvo (se houver)
    if (notaTime) {
        updateStatus('Último salvamento: ' + formatTime(notaTime));
    } else {
        updateStatus('Último salvamento: —');
    }

    // Eventos
    blocoDeNotas.addEventListener('input', scheduleSave);
    btnSalvar.addEventListener('click', saveNote);
    btnBaixar.addEventListener('click', downloadNote);
    btnLimpar.addEventListener('click', clearNote);

    // Atalho Ctrl/Cmd+S para salvar (evita comportamento padrão)
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
            e.preventDefault();
            saveNote();
        }
    });

});