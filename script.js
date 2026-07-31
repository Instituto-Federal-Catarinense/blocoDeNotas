// Espera o conteúdo da página carregar completamente antes de executar o script.
// É uma boa prática para evitar erros de JavaScript tentando acessar elementos
// que ainda não existem na página.
document.addEventListener('DOMContentLoaded', () => {

    // 1. SELECIONANDO O ELEMENTO
    // ----------------------------
    // Primeiro, precisamos de uma referência ao nosso elemento <textarea>.
    // Usamos 'document.getElementById' para pegar o elemento pelo 'id' que definimos no HTML.
    const blocoDeNotas = document.getElementById('blocoDeNotas');
    const btnLimpar = document.getElementById('limpar');
    const btnSalvar = document.getElementById('salvar');
    const btnAlterar = document.getElementById('alterar');

    btnLimpar.addEventListener('click', () => {
        localStorage.removeItem('minhaNota');
        blocoDeNotas.value = notaSalva;
        console.log("Notas apagadas do local storage.");
    })

    btnSalvar.addEventListener('click', () => {
        localStorage.setItem('minhaNota', blocoDeNotas.value);
        carregarNotas
        console.log("Notas salvas no local storage.");
    })

    btnAlterar.addEventListener('click', () => {
        body = document.getElementById('body');
        body.classList.toggle("amarelo");
        console.log("Cor do fundo alterada.")
    })

    // 2. CARREGANDO DADOS DO LOCALSTORAGE
    // ------------------------------------
    // O 'localStorage' é um recurso do navegador que permite salvar informações
    // que persistem mesmo depois que o navegador é fechado.
    // Usamos 'localStorage.getItem()' para buscar um item salvo.
    // Aqui, estamos procurando por um item que salvamos com a chave 'minhaNota'.
    const notaSalva = localStorage.getItem('minhaNota');

    function carregarNotas() {
        blocoDeNotas.value = notaSalva
    }
    // Verificamos se encontramos alguma nota salva.
    if (notaSalva) {
        // Se 'notaSalva' não for nulo (ou seja, existe algo salvo),
        // nós colocamos o valor salvo de volta no nosso 'blocoDeNotas'.
        blocoDeNotas.value = notaSalva;
    }
});