document.addEventListener('DOMContentLoaded', () => {
    const blocoDeNotas = document.getElementById('blocoDeNotas');
    const btnSalvarNota = document.getElementById('btnSalvarNota');
    const btnLimparNotas = document.getElementById('btnLimparNotas');
    const btnAplicarClasse = document.getElementById('btnAplicarClasse');
    const btnRemoverClasse = document.getElementById('btnRemoverClasse');
    const container = document.querySelector('.container');

    // Carregar nota salva
    const notaSalva = localStorage.getItem('minhaNota');
    if (notaSalva) {
        blocoDeNotas.value = notaSalva;
    }

    // Verificar se o tema escuro estava ativado antes
    const temaEscuroAtivado = localStorage.getItem('temaEscuro') === 'true';
    if (temaEscuroAtivado) {
        container.classList.add('temaEscuro');
        btnRemoverClasse.style.display = 'inline-block';
    }

    // Salvar nota
    btnSalvarNota.addEventListener('click', () => {
        localStorage.setItem('minhaNota', blocoDeNotas.value);
        console.log("Nota salva manualmente no localStorage.");
    });

    // Limpar nota
    btnLimparNotas.addEventListener('click', () => {
        blocoDeNotas.value = '';
        localStorage.removeItem('minhaNota');
        console.log("Nota removida do localStorage.");
    });

    // Ativar tema escuro
    btnAplicarClasse.addEventListener('click', () => {
        container.classList.add('temaEscuro');
        localStorage.setItem('temaEscuro', 'true');
        btnRemoverClasse.style.display = 'inline-block';
        console.log("Tema escuro ativado.");
    });

    // Remover tema escuro
    btnRemoverClasse.addEventListener('click', () => {
        container.classList.remove('temaEscuro');
        localStorage.removeItem('temaEscuro');
        btnRemoverClasse.style.display = 'none';
        console.log("Tema escuro removido.");
    });
});

