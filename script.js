// Espera o conteúdo da página carregar completamente antes de executar o script.
// É uma boa prática para evitar erros de JavaScript tentando acessar elementos
// que ainda não existem na página.
document.addEventListener('DOMContentLoaded', () => {

    // 1. SELECIONANDO O ELEMENTO
    // ----------------------------
    // Primeiro, precisamos de uma referência ao nosso elemento <textarea>.
    // Usamos 'document.getElementById' para pegar o elemento pelo 'id' que definimos no HTML.
    const blocoDeNotas = document.getElementById('blocoDeNotas');
    const limparNotas = document.getElementById('limpar');
    const salvarNotas = document.getElementById('salvar');
    const dimfonte = document.getElementById('dimfonte');
    const aumfonte = document.getElementById('aumfonte');

    // Adicionando um evento de clique ao botão "Limpar Notas"
    limparNotas.addEventListener('click', () => {
        // Quando o botão é clicado, limpamos o conteúdo do bloco de notas
        blocoDeNotas.value = ''; // Definimos o valor do <textarea> como uma string vazia
        // E também removemos a nota salva do localStorage
        localStorage.removeItem('minhaNota'); //Remove a nota salva
        console.log("Notas limpas!"); // Mensagem no console para confirmar que as notas foram limpas
    }); 

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

    // 3. ADICIONANDO UM 'EVENTLISTENER'
    // ---------------------------------
    // Agora, a parte principal: queremos fazer algo sempre que o usuário digitar.
    // O 'addEventListener' é como um "ouvinte" que fica esperando por uma ação específica.
    //
    // Parâmetros do addEventListener:
    //   - O primeiro é o TIPO DE EVENTO que queremos ouvir. 'input' é disparado
    //     toda vez que o valor do <textarea> muda (ou seja, o usuário digita, apaga, etc).
    //   - O segundo é a FUNÇÃO que será executada quando o evento acontecer.
    //     Esta função é chamada de "callback".

    salvarNotas.addEventListener('click', () => {
        // Quando o usuário clicar no botão "Salvar Notas", vamos salvar o conteúdo
        // do bloco de notas no 'localStorage'.
        localStorage.setItem('minhaNota', blocoDeNotas.value);
        console.log("Notas salvas!"); // Mensagem no console para confirmar que as notas foram salvas
        
    }); 

    dimfonte.addEventListener('click', () => {
        // Diminuindo o tamanho da fonte do bloco de notas
        let currentSize = parseFloat(window.getComputedStyle(blocoDeNotas).fontSize);
        blocoDeNotas.style.fontSize = (currentSize - 2) + 'px'; // Diminui a fonte em 2px
        console.log("Fonte diminuída!"); // Mensagem no console para confirmar que a fonte foi diminuída
    });

    aumfonte.addEventListener('click', () => {
        // Aumentando o tamanho da fonte do bloco de notas
        let currentSize = parseFloat(window.getComputedStyle(blocoDeNotas).fontSize);
        blocoDeNotas.style.fontSize = (currentSize + 2) + 'px'; // Aumenta a fonte em 2px
        console.log("Fonte aumentada!"); // Mensagem no console para confirmar que a fonte foi aumentada
    }); 

    //aleatorizar a cor de fundo e voltar a cor original
    const corAleatoria = document.getElementById('coraleatoria');
    const corOriginal = document.getElementById('cororiginal');
    corAleatoria.addEventListener('click', () => {
        // Gera uma cor aleatória em formato hexadecimal
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        // Aplica a cor aleatória ao fundo do bloco de notas
        blocoDeNotas.style.backgroundColor = randomColor;
        console.log("Cor aleatória aplicada!"); // Mensagem no console para confirmar que a cor foi alterada
    });
    corOriginal.addEventListener('click', () => {
        // Define a cor de fundo original do bloco de notas
        blocoDeNotas.style.backgroundColor = ''; // Limpa a cor de fundo, voltando ao padrão
        console.log("Cor original restaurada!"); // Mensagem no console para confirmar que a cor foi restaurada
    });

    // Modo escuro
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        // Alterna a classe 'dark-mode' no corpo do documento
        document.body.classList.toggle('dark-mode');
        console.log("Modo escuro alternado!"); // Mensagem no console para confirmar que o modo escuro foi ativado/desativado
    });


});