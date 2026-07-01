document.addEventListener('DOMContentLoaded', () => {

    const blocoDeNotas = document.getElementById('blocoDeNotas');
    const btnLimparNotas = document.getElementById('btnlimparNotas');
    const btnSalvarNotas = document.getElementById('btnSalvarNotas');
    const btnAlternarTema = document.getElementById('btnAlternarTema');
    const body = document.body;

    // Carregando nota salva
    const notaSalva = localStorage.getItem('minhaNota');
    if (notaSalva) {
        blocoDeNotas.value = notaSalva;
    }

    // Salvando nota
    btnSalvarNotas.addEventListener('click', () => {
        localStorage.setItem('minhaNota', blocoDeNotas.value);
        console.log("Nota salva no localStorage!");
    });

    // Limpando nota
    btnLimparNotas.addEventListener('click', () => {
        blocoDeNotas.value = '';
        localStorage.removeItem('minhaNota');
        console.log("Nota removida do localStorage.");
    });

    // Alternar entre claro e escuro
    btnAlternarTema.addEventListener('click', () => {
        body.classList.toggle('modo-escuro');

        // Salva a preferência no localStorage
        const modoAtual = body.classList.contains('modo-escuro') ? 'escuro' : 'claro';
        localStorage.setItem('temaPreferido', modoAtual);
    });

    // Aplica o tema salvo
    const temaSalvo = localStorage.getItem('temaPreferido');
    if (temaSalvo === 'escuro') {
        body.classList.add('modo-escuro');
    }

});
