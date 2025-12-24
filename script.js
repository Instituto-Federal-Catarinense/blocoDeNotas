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
    const toggleDark = document.getElementById('toggle-dark'); // Novo botão modo escuro
    const seletorCores = document.getElementById('seletor-cores'); // Seletor de cor de fundo
    const btnSalvarNotas = document.getElementById('btnSalvarNotas'); // Botão salvar notas

    // add um evento de clique 
    btnLimparNotas.addEventListener('click', () => {
        blocoDeNotas.value = '';
        localStorage.removeItem('minhaNota');
        console.log("Notas Limpas e removidas do LocalStorege!");
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
        localStorage.setItem('minhaNota', blocoDeNotas.value);

        console.log("Nota salva no localStorage!"); // Uma mensagem no console para fins de depuração.
    });

    // 5. CARREGANDO O MODO ESCURO
    // ----------------------------
    // Verifica se o modo escuro estava ativado da última vez
    if (localStorage.getItem("temaDark") === "true") {
        document.body.classList.add("dark");
        toggleDark.textContent = "☀️ Modo Claro";
    }

    // 6. CARREGANDO COR DE FUNDO
    // ---------------------------
    const cores = localStorage.getItem("cores") || "";
    if (cores) {
        document.body.classList.add(cores);
        seletorCores.value = cores;
    }

    // 7. BOTÃO MODO ESCURO/CLARO
    // ---------------------------
    // Alterna entre o modo escuro e claro ao clicar no botão
    toggleDark.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        toggleDark.textContent = isDark ? "☀️ Modo Claro" : "🌙 Modo Escuro";
        localStorage.setItem("temaDark", isDark);
    });

    // 8. SELETOR DE CORES
    // --------------------
    // Altera a cor de fundo com base na seleção do usuário
    seletorCores.addEventListener("change", () => {
        document.body.classList.remove("azul", "amarelo", "rosa");
        const valor = seletorCores.value;
        if (valor) {
            document.body.classList.add(valor);
        }
        localStorage.setItem("cores", valor);
    });

});
