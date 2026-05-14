/// Espera o conteúdo da página carregar completamente antes de executar o script.
// É uma boa prática para evitar erros de JavaScript tentando acessar elementos
// que ainda não existem na página.
document.addEventListener('DOMContentLoaded', () => {

    // 1. SELECIONANDO OS ELEMENTOS
    // ----------------------------
    // Primeiro, precisamos de referências aos elementos que vamos manipular.
    // Usamos 'document.getElementById' para pegar os elementos pelo 'id' definidos no HTML.
    const blocoDeNotas = document.getElementById('blocoDeNotas');
    const btnLimparNotas = document.getElementById('btnLimparNotas');
    const btnSalvarNotas = document.getElementById('btnSalvarNotas');
    const btnPersonalizar = document.getElementById('btnPersonalizar');

    // 2. EVENTO DO BOTÃO LIMPAR NOTAS
    // -------------------------------
    // Quando clicado, limpa o conteúdo do textarea e remove a nota salva do localStorage.
    btnLimparNotas.addEventListener('click', () => {
        blocoDeNotas.value = '';
        localStorage.removeItem('minhaNota');
        console.log("Notas limpas e removidas do localStorage!");
    });

    // 3. CARREGANDO DADOS DO LOCALSTORAGE
    // ------------------------------------
    // O 'localStorage' permite salvar dados que permanecem mesmo após fechar o navegador.
    // Aqui buscamos o valor salvo com a chave 'minhaNota'.
    const notaSalva = localStorage.getItem('minhaNota');

    // Se houver uma nota salva, ela é carregada no textarea.
    if (notaSalva) {
        blocoDeNotas.value = notaSalva;
    }

    // 4. EVENTO DO BOTÃO SALVAR NOTAS
    // -------------------------------
    // Quando clicado, salva o conteúdo do textarea no localStorage.
    btnSalvarNotas.addEventListener('click', () => {
        localStorage.setItem('minhaNota', blocoDeNotas.value);
        console.log("Nota salva no localStorage!");
    });

    // 5. EVENTO DO BOTÃO PERSONALIZAR TEMA
    // ------------------------------------
    // Alterna a classe 'dark-theme' no body para ativar ou desativar o tema azul escuro.
    btnPersonalizar.addEventListener('click', () => {
        document.body.classList.add('dark-theme');
        console.log("Tema personalizado alternado.");
    });    

});
