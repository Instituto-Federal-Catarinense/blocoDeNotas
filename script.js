// Espera o conteúdo da página carregar completamente antes de executar o script.
// É uma boa prática para evitar erros de JavaScript tentando acessar elementos
// que ainda não existem na página.
document.addEventListener('DOMContentLoaded', () => {

    // 1. SELECIONANDO O ELEMENTO
    // ----------------------------
    // Primeiro, precisamos de uma referência ao nosso elemento <textarea>.
    // Usamos 'document.getElementById' para pegar o elemento pelo 'id' que definimos no HTML.
    const blocoDeNotas = document.getElementById('blocoDeNotas');

    // 2. CARREGANDO DADOS DO LOCALSTORAGE
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
    }

    const limparNotas = document.getElementById('limparNotas');
    limparNotas.addEventListener('click', () => {
        blocoDeNotas.value = '';
        localStorage.removeItem('minhaNota');
    })

    const salvarNotas = document.getElementById('salvarNotas');
    salvarNotas.addEventListener('click', () => {
        localStorage.setItem('minhaNota', blocoDeNotas.value);
        console.log("Nota salva no localStorage!"); // Mensagem de depuração
    })

    const endauti = document.getElementById('endauti');
    endauti.addEventListener('click', () => {
        // Gera uma cor aleatória em formato hexadecimal
        const corAleatoria = '#' + Math.floor(Math.random() * 16777215).toString(16);
        
        // Aplica a cor aleatória ao fundo do bloco de notas
        blocoDeNotas.style.backgroundColor = corAleatoria;
    })
    
    const agrumiti = document.getElementById('agrumiti');
    agrumiti.addEventListener('click', () => {
        const fonteAbuble = Math.floor(Math.random() *300); // Gera um tamanho de fonte aleatório entre 12 e 40px

        blocoDeNotas.style.fontSize = fonteAbuble + 'px';
    })

    const hamburguer = document.getElementById('hamburguer');
    hamburguer.addEventListener('click', () => {
        const fonteColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

        blocoDeNotas.style.color = fonteColor;
    })
});