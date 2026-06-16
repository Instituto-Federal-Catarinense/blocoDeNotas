// Espera o conteúdo da página carregar completamente antes de executar o script.
// É uma boa prática para evitar erros de JavaScript tentando acessar elementos
// que ainda não existem na página.
document.addEventListener('DOMContentLoaded', () => {

    // 1. SELECIONANDO O ELEMENTO
    // ----------------------------
    // Primeiro, precisamos de uma referência ao nosso elemento <textarea>.
    // Usamos 'document.getElementById' para pegar o elemento pelo 'id' que definimos no HTML.
    const blocoDeNotas = document.getElementById('blocoDeNotas');
    const btnLimparNotas = document.getElementById('btnLimparNotas');
    const btnSalvarNota = document.getElementById('btnSalvarNota');
    const btnDestacar = document.getElementById('btnDestacar');

    // Alterna a classe no <body> ao clicar no botão
    btnDestacar.addEventListener('click', () => {
        document.body.classList.toggle('destacar-pagina');
    
        // Atualiza o texto do botão dinamicamente
        if (document.body.classList.contains('destacar-pagina')) {
            btnDestacar.textContent = "Remover Tema";
        } else {
            btnDestacar.textContent = "Mudar Tema";
        }
    
        console.log("Cor da página alterada com destaque.");
    });
    


    //Adicionamos um evento de clique ao botão para limpar notas
    btnLimparNotas.addEventListener('click', () => {
        //Quando o botão é clicado, limpamos o conteúdo do bloco de notas
        blocoDeNotas.value = '' ;
        //E também removemos a nota salva do localStorage
        localStorage.removeItem('minhaNota');
        //Mensagem de confirmação no console
        console.log("Notas limpas e removidas do localStorage");

    });

    btnSalvarNota.addEventListener('click', () => {
        // Pegamos o valor atual do bloco de notas e o salvamos no localStorage.
        // Usamos 'localStorage.setItem()' para isso.
        //
        // Parâmetros do setItem:
        //   - O primeiro é a CHAVE (o "nome" do nosso dado): 'minhaNota'.
        //   - O segundo é o VALOR que queremos salvar: blocoDeNotas.value.
        localStorage.setItem('minhaNota', blocoDeNotas.value);

        console.log("Nota salva manualmente ao clicar no botão!");
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
    btnSalvarNota.addEventListener('click', () => {
        // Pegamos o valor atual do bloco de notas e o salvamos no localStorage.
        // Usamos 'localStorage.setItem()' para isso.
        //
        // Parâmetros do setItem:
        //   - O primeiro é a CHAVE (o "nome" do nosso dado): 'minhaNota'.
        //   - O segundo é o VALOR que queremos salvar: blocoDeNotas.value.
        localStorage.setItem('minhaNota', blocoDeNotas.value);

        console.log("Nota salva manualmente ao clicar no botão!");
    });

});