// Espera o conteúdo da página carregar completamente antes de executar o script.
// É uma boa prática para evitar erros de JavaScript tentando acessar elementos
// que ainda não existem na página.
document.addEventListener('DOMContentLoaded', () => {

    // 1. SELECIONANDO O ELEMENTO
    // ----------------------------
    // Primeiro, precisamos de uma referência ao nosso elemento <textarea>.
    // Usamos 'document.getElementById' para pegar o elemento pelo 'id' que definimos no HTML.
    const blocoDeNotas = document.getElementById('blocoDeNotas');
    const btnLimparNotas = document.getElementById('limparNotas');
    const btnSalvarNotas = document.getElementById('salvarNotas');
    const btnEstiloAleatorio = document.getElementById('estiloAleatorio');
    // 2 Adicionando um evento de clique ao botão de limpar notas
    // ------------------------------------
    btnLimparNotas.addEventListener('click', () => {
        // Limpando o conteúdo do bloco de notas
        blocoDeNotas.value = '';
        // Removendo a nota salva do localStorage
        localStorage.removeItem('minhaNota');
        console.log("Notas limpas!");
    });
    // 3 FUNÇÃO PARA SALVAR NOTAS
    // ------------------------------------
    btnSalvarNotas.addEventListener('click', () => {
        localStorage.setItem('minhaNota', blocoDeNotas.value);
        console.log("Notas salvas!");
    });
    // 4 FUNÇÃO PARA APLICAR ESTILO ALEATÓRIO
    // ------------------------------------
    btnEstiloAleatorio.addEventListener('click', () => {
        const cores = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A1'];
        const fonteTamanhos = ['16px', '18px', '20px', '22px', '24px'];
        const corFundo = cores[Math.floor(Math.random() * cores.length)];
        const corTexto = cores[Math.floor(Math.random() * cores.length)];
        const tamanhoFonte = fonteTamanhos[Math.floor(Math.random() * fonteTamanhos.length)];

        document.body.style.backgroundColor = corFundo;
        document.body.style.color = corTexto;
        document.body.style.fontSize = tamanhoFonte;

        blocoDeNotas.style.backgroundColor = corFundo;
        blocoDeNotas.style.color = corTexto;
        blocoDeNotas.style.fontSize = tamanhoFonte;

        console.log("Estilo aleatório aplicado!");
    });

    // 4 CARREGANDO DADOS DO LOCALSTORAGE
    // ------------------------------------
    // O 'localStorage' é um recurso do navegador que permite salvar informações
    // que persistem mesmo depois que o navegador é fechado.
    // Usamos 'localStorage.getItem()' para buscar um item salvo.
    // Aqui, estamos procurando por um item que salvamos com a chave 'minhaNota'.
    const notaSalva = localStorage.getItem('minhaNota');

    // Verificamos se encontramos alguma nota salva.
    if (notaSalva) {
        // Se 'notaSalva' não for nulo (ou seja, existe algo salvo),
        // nós colocamos o valor salvo de volta no nosso 'blocoDeNotas'.
        blocoDeNotas.value = notaSalva;
    };

});
