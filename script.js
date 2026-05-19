document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'blocoDeNotas.conteudo';
    const blocoDeNotas = document.getElementById('blocoDeNotas');
    const botaoLimpar = document.getElementById('botaoLimpar');
    const status = document.getElementById('status');

    let statusTimer = null;

    const mostrarStatus = (mensagem) => {
        if (!status) return;
        status.textContent = mensagem;
        status.classList.add('visible');

        if (statusTimer) {
            clearTimeout(statusTimer);
        }

        statusTimer = setTimeout(() => {
            status.classList.remove('visible');
        }, 1800);
    };

    const carregarNota = () => {
        try {
            return localStorage.getItem(STORAGE_KEY) || '';
        } catch (erro) {
            console.warn('localStorage indisponível:', erro);
            return '';
        }
    };

    const salvarNota = (texto) => {
        try {
            localStorage.setItem(STORAGE_KEY, texto);
            mostrarStatus('Anotações salvas automaticamente');
        } catch (erro) {
            console.warn('Falha ao salvar a nota localmente:', erro);
            mostrarStatus('Não foi possível salvar localmente');
        }
    };

    const limparNota = () => {
        blocoDeNotas.value = '';
        salvarNota('');
        blocoDeNotas.focus();
    };

    const debouncedSave = () => {
        if (typeof blocoDeNotas.value !== 'string') return;
        if (debouncedSave.timeoutId) {
            clearTimeout(debouncedSave.timeoutId);
        }
        debouncedSave.timeoutId = setTimeout(() => salvarNota(blocoDeNotas.value), 250);
    };

    blocoDeNotas.value = carregarNota();
    blocoDeNotas.addEventListener('input', debouncedSave);
    botaoLimpar.addEventListener('click', limparNota);
});