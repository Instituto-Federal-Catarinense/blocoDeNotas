// Espera o conteúdo da página carregar completamente antes de executar o script.
// É uma boa prática para evitar erros de JavaScript tentando acessar elementos
// que ainda não existem na página.
document.addEventListener('DOMContentLoaded', () => {

    // 1. SELECIONANDO O ELEMENTO
    // ----------------------------
    // Primeiro, precisamos de uma referência ao nosso elemento <textarea>.
    // Usamos 'document.getElementById' para pegar o elemento pelo 'id' que definimos no HTML.
    const blocoDeNotas = document.getElementById('blocoDeNotas');
    const SalvarNotas = document.getElementById('SalvarNotas');
    const Personalizar = document.getElementById('Personalizar');
    const Resetar = document.getElementById('Resetar');
    const btnLimparNotas = document.getElementById('LimparNotas');

    SalvarNotas.addEventListener('click', () =>{

        localStorage.setItem('minhaNota', blocoDeNotas.value); 

        console.log("Nota salva no localStorage!"); // Uma mensagem no console para fins de depuração.
    });

    // Adicionando um evento de clique ao botão "Limpar Notas"
    btnLimparNotas.addEventListener('click', () =>{
        // Quando o botão é clicado, limpamos o conteúdo do bloco de notas.
        blocoDeNotas.value = ''; // Define o valor do <textarea> como uma string vazia.
        // Também removemos a nota salva do localStorage.
        localStorage.removeItem('minhaNota'); // Remove o item "minhaNota" do localStorage.
        console.log("Notas Limpas!"); // Mensagem no console para confirmar que as notas foram limpas.
    });

    Personalizar.addEventListener('click', () =>{
       document.getElementById('background').style.backgroundColor = '#000000';
       

        console.log("Personalização Feita"); // Uma mensagem no console para fins de depuração.
    });

    Resetar.addEventListener('click', () =>{
        document.getElementById('background').style.backgroundColor = '';
 
         console.log("Personalização Feita"); // Uma mensagem no console para fins de depuração.
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
   

});