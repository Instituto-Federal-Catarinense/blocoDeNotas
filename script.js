// Espera o conteúdo da página carregar completamente antes de executar o script.
// É uma boa prática para evitar erros de JavaScript tentando acessar elementos
// que ainda não existem na página.
document.addEventListener('DOMContentLoaded', () => {

    // 1. SELECIONANDO O ELEMENTO
    // ----------------------------
    // Primeiro, precisamos de uma referência ao nosso elemento <textarea>.
    // Usamos 'document.getElementById' para pegar o elemento pelo 'id' que definimos no HTML.
    const blocoDeNotas = document.getElementById('blocoDeNotas');
    const btnlimparNotas = document.getElementById('btnLimparNotas');
    const btnSalvarNotas = document.getElementById('btnSalvarNotas');
    const btnDarkMode = document.getElementById('btnDarkMode');
    // Adicionaremos um evento de clique ao botão parar limpar as
    btnlimparNotas.addEventListener('click', () => {
        // Quando o botão é clicado, limpamos o conteúdo do bloco de notas
        blocoDeNotas.value = "";
        // E também removemos a nota salva do LocalStorage
        localStorage.removeItem('minhaNota');
        console.log("Notas limpas e removidads do LocalStorage!")
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
    btnSalvarNotas.addEventListener('click', () => {
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

    // 5. ALTERANDO O MODO ESCURO (DARK MODE)
    // ---------------------------------------
    // Adicionamos um evento de clique ao botão de modo escuro.
    // Quando o botão é clicado, alternamos entre o modo claro e escuro da página.
    // Usamos 'classList' para adicionar ou remover a classe 'dark' nos elementos.
    // Isso muda o estilo da página conforme definido no CSS.
    //
    // Parâmetros do addEventListener:
    //   - O primeiro é o TIPO DE EVENTO: 'click', ou seja, quando o botão é pressionado.
    //   - O segundo é a FUNÇÃO de callback que executa a lógica de alternância.
    btnDarkMode.addEventListener('click', () => {
        const body = document.body; // Referência ao elemento <body>
        const areaNotas = document.getElementById('areaNotas'); // Área que envolve o bloco de notas

        // Verifica se o modo escuro já está ativado
        if (body.classList.contains("dark")) {
            // Se estiver, remove a classe 'dark' dos elementos para voltar ao modo claro
            body.classList.remove("dark");
            areaNotas.classList.remove("dark");
            blocoDeNotas.classList.remove("dark");
            console.log("DarkMode desligado");
        } else {
            // Se não estiver, adiciona a classe 'dark' aos elementos para ativar o modo escuro
            body.classList.add("dark");
            areaNotas.classList.add("dark");
            blocoDeNotas.classList.add("dark");
            console.log("DarkMode ligado");
        }
    });


});