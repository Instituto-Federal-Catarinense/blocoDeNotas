// Espera o conteúdo da página carregar completamente antes de executar o script.
// É uma boa prática para evitar erros de JavaScript tentando acessar elementos
// que ainda não existem na página.
document.addEventListener('DOMContentLoaded', () => {

    // 1. SELECIONANDO O ELEMENTO
    // ----------------------------
    // Primeiro, precisamos de uma referência ao nosso elemento <textarea>.
    // Usamos 'document.getElementById' para pegar o elemento pelo 'id' que definimos no HTML.
    const blocoDeNotas = document.getElementById('blocoDeNotas');
    const btnSalvar = document.getElementById('SalvarNotas');
    // Aqui, estamos pegando o botão que usamos para salvar as notas.
    const btnLimparNotas = document.getElementById('LimparNotas');
    let theme = "";
    // Aqui, estamos pegando o botão que usamos para limpar as notas.
     btnSalvar.addEventListener('click', () => {
        //quando o botao é clicado, salvamos o conteúdo do bloco de notas.//
        //tambem  a nota salva do localstorage// 
        localStorage.setItem('minhaNota', blocoDeNotas.value);
        console.log("Nota Salva"); //mensagem no console para confirmar que limpou// 
    });

    //adicionando um evento de clique ao botao "limpar notas"//
    btnLimparNotas.addEventListener('click', () => {
        //quando o botao é clicado, limpamos o conteúdo do bloco de notas.//
        blocoDeNotas.value = ''; //define o valor do <textarea/> como uma string vazia //
        //tambem removemos a nota salva do localstorage// 
        localStorage.removeItem('minhaNota');//remove o item 'minhanota', caso se fosse um vetor, nao seria bom pq apagaria todos os dados, porem, como é apenas aquela nota nao tem problema usar o remove.item//
        console.log("Notas Limpas"); //mensagem no console para confirmar que limpou// 
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
    blocoDeNotas.addEventListener('input', () => {
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

        //a cada input que ocorrer no bloco de notas eu executo a função que armazena no localStorage,//



        localStorage.setItem('minhaNota', blocoDeNotas.value);//value: texto que ta dentro do textarea, o conteudo//

        console.log("Nota salva no localStorage!"); // Uma mensagem no console para fins de depuração.

    });
    const btnAlterarEstilo = document.getElementById('AlterarEstilo');
    AlterarEstilo.addEventListener('click',function () {
        // Função para alterar o estilo do bloco de notas
        if(theme === 'novo-estilo') { 
            theme= '';
            document.body.classList.remove('novo-estilo'); // Adiciona a classe 'novo-estilo' ao body
            console.log("Estilo removido!"); // Mensagem no console para confirmar a alteração de estilo
        } else {
             document.body.classList.add('novo-estilo');
             theme= 'novo-estilo'; // Remove a classe 'novo-estilo' do body
             console.log("Estilo adicionado!"); // Mensagem no console para confirmar a alteração de estilo
        }}); 
       // Adicionando um evento de clique ao botão "Alterar Estilo"      
    
});