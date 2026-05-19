document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'blocoDeNotas:conteudo';
    const campoNota = document.getElementById('blocoDeNotas');
    const botaoLimpar = document.getElementById('limparNota');
    const statusNota = document.getElementById('status');
    let statusTimeout = null;

    const isLocalStorageDisponivel = () => {
        try {
            const chaveTeste = '__teste_localstorage__';
            localStorage.setItem(chaveTeste, chaveTeste);
            localStorage.removeItem(chaveTeste);
            return true;
        } catch (erro) {
            console.warn('localStorage não disponível:', erro);
            return false;
        }
    };

    const carregarNota = () => {
        if (!isLocalStorageDisponivel()) {
            return '';
        }

        return localStorage.getItem(STORAGE_KEY) || '';
    };

    const salvarNota = (valor) => {
        if (!isLocalStorageDisponivel()) {
            exibirStatus('Atenção: não foi possível salvar localmente.', true);
            return;
        }

        localStorage.setItem(STORAGE_KEY, valor);
        exibirStatus('Nota salva', false);
    };

    const limparNota = () => {
        campoNota.value = '';
        salvarNota('');
        campoNota.focus();
        exibirStatus('Nota apagada', false);
    };

    const exibirStatus = (mensagem, erro = false) => {
        statusNota.textContent = mensagem;
        statusNota.classList.toggle('status--error', erro);
        statusNota.classList.remove('status--hidden');

        if (statusTimeout) {
            clearTimeout(statusTimeout);
        }

        statusTimeout = setTimeout(() => {
            statusNota.classList.add('status--hidden');
        }, 2500);
    };

    const inicializar = () => {
        campoNota.value = carregarNota();
        campoNota.addEventListener('input', () => salvarNota(campoNota.value));
        botaoLimpar.addEventListener('click', limparNota);
    };

    inicializar();
});