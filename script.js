// Espera o conteúdo da página carregar completamente antes de executar o script.
// É uma boa prática para evitar erros de JavaScript tentando acessar elementos
// que ainda não existem na página.
document.addEventListener('DOMContentLoaded', () => {

    // 1. SELECIONANDO O ELEMENTO
    // ----------------------------
    // Primeiro, precisamos de uma referência ao nosso elemento <textarea>.
    // Usamos 'document.getElementById' para pegar o elemento pelo 'id' que definimos no HTML.
    const blocoDeNotas = document.getElementById('blocoDeNotas');
    const btnLimparNotas = document.getElementById('butao');
    const salvanota = document.getElementById('salvanota');
    const aumentaFonte = document.getElementById('persoNota');
    const persoDiminui = document.getElementById('persoDiminui');
    const modoEscuro = document.getElementById('modoEscuro');

    
    modoEscuro.addEventListener('click', () => {
        // Alterna entre os modos escuro e claro adicionando ou removendo uma classe no body
        document.body.classList.toggle('modo-escuro');
    
        // Opcional: salva a preferência do usuário
        const estaEmModoEscuro = document.body.classList.contains('modo-escuro');
        localStorage.setItem('modoEscuro', estaEmModoEscuro ? 'ativado' : 'desativado');
    
        console.log(`Modo escuro ${estaEmModoEscuro ? 'ativado' : 'desativado'}`);
    });
    

    aumentaFonte.addEventListener('click', () => {
        const estiloAtual = window.getComputedStyle(blocoDeNotas).fontSize;
        const tamanhoAtual = parseFloat(estiloAtual);
        const novoTamanho = tamanhoAtual + 2; // aumenta 2px
    
        blocoDeNotas.style.fontSize = `${novoTamanho}px`;
        console.log(`Fonte aumentada para: ${novoTamanho}px`);
    });

    persoDiminui.addEventListener('click', () => {
        const estiloAtual = window.getComputedStyle(blocoDeNotas).fontSize;
        const tamanhoAtual = parseFloat(estiloAtual);
        const novoTamanho = tamanhoAtual - 2; // diminui 2px
    
        blocoDeNotas.style.fontSize = `${novoTamanho}px`;
        console.log(`Fonte aumentada para: ${novoTamanho}px`);
    });
    


    btnLimparNotas.addEventListener('click', () => {
        blocoDeNotas.value = '';
        localStorage.removeItem('minhanota');
        console.log("notas limpas");
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
    salvanota.addEventListener('click', () => {
        // 4. SALVANDO DADOS NO LOCALSTORAGE
        // -----------------------------------
        // Dentro da nossa função de callback, pegamos o valor atual do bloco de notas
        // e o salvamos no localStorage.
        // Usamos 'localStorage.setItem()' para isso.
        //
        // Parâmetros do setItem:
        //   - O primeiro é a CHAVE (o "nome" do nosso dado). Usaremos a mesma chave 'minhaNota'.
        //   - O segundo é o VALOR que queremos salvar. 'blocoDeNotas.value' contém o texto
        //     que está atualmente na área de texto.
        localStorage.setItem('minhaNota', blocoDeNotas.value);

        console.log("Nota salva no localStorage!"); // Uma mensagem no console para fins de depuração.
    });

    

});