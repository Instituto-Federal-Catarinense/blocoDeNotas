// Espera o carregamento completo do DOM antes de executar qualquer código JavaScript.
// Isso garante que todos os elementos HTML estejam disponíveis para manipulação.
document.addEventListener('DOMContentLoaded', () => {

    // 1. SELEÇÃO DOS ELEMENTOS HTML
    // -----------------------------
    // Seleciona o <textarea> onde o usuário digita as notas.
    // O ID 'blocoDeNotas' é definido no HTML.
    const blocoDeNotas = document.getElementById('blocoDeNotas');

    // Seleciona o botão de limpar notas pelo ID 'LimparNotas'.
    // Esse botão será usado para apagar o conteúdo do bloco de notas e do localStorage.
    const limparNotas = document.getElementById('LimparNotas');

    // Seleciona o botão de salvar notas pelo ID 'SalvarNotas'.
    // Esse botão permite ao usuário salvar manualmente o conteúdo digitado.
    const salvarNotas = document.getElementById('SalvarNotas');

    // 2. EVENTO PARA LIMPAR NOTAS
    // ---------------------------
    // Adiciona um ouvinte de evento ao botão de limpar.
    // Quando o botão é clicado, executa a função abaixo.
    limparNotas.addEventListener('click', () => {
        // Limpa o conteúdo do textarea, deixando-o vazio.
        blocoDeNotas.value = '';
        // Remove a nota salva do localStorage, apagando o dado persistente.
        localStorage.removeItem('minhaNota');
        // Exibe uma mensagem no console para indicar que as notas foram limpas.
        console.log("Notas limpas!");
    });

    // 3. CARREGAMENTO AUTOMÁTICO DAS NOTAS SALVAS
    // --------------------------------------------
    // Ao carregar a página, tenta recuperar uma nota salva anteriormente no localStorage.
    // O localStorage é uma área de armazenamento persistente do navegador.
    const notaSalva = localStorage.getItem('minhaNota');

    // Se existir uma nota salva (ou seja, não for nulo), preenche o textarea com esse valor.
    if (notaSalva) {
        blocoDeNotas.value = notaSalva;
    }

    // 4. EVENTO PARA SALVAR NOTAS MANUALMENTE
    // ---------------------------------------
    // Adiciona um ouvinte de evento ao botão de salvar.
    // Quando o botão é clicado, executa a função abaixo.
    salvarNotas.addEventListener('click', () => {
        // Salva o conteúdo atual do textarea no localStorage, usando a chave 'minhaNota'.
        // Assim, mesmo que o usuário feche ou recarregue a página, a nota permanece salva.
        localStorage.setItem('minhaNota', blocoDeNotas.value);
        // Exibe uma mensagem no console para indicar que a nota foi salva.
        console.log("Nota salva no localStorage!");
    });

    // 5. LÓGICA DE TROCA DE TEMAS (CLARO/ESCURO)
    // ------------------------------------------
    // Seleciona o botão responsável por alternar entre os temas claro e escuro.
    const btnModo = document.getElementById('MudarModos');

    // Define um array com os nomes das classes CSS dos temas disponíveis.
    // Essas classes estão definidas no arquivo style.css.
    const themes = ['light-theme', 'dark-theme'];

    // Variável para controlar qual tema está ativo no momento.
    // 0 = claro, 1 = escuro.
    let currentThemeIndex = 0;

    // Ao carregar a página, verifica se existe um tema salvo no localStorage.
    // Se existir e for válido, define o tema correspondente como ativo.
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo && themes.includes(temaSalvo)) {
        currentThemeIndex = themes.indexOf(temaSalvo);
    }

    // Aplica a classe do tema atual ao <body>, ativando o tema visualmente.
    document.body.classList.add(themes[currentThemeIndex]);

    // Adiciona um ouvinte de evento ao botão de mudar o modo.
    // Quando clicado, alterna entre os temas claro e escuro.
    btnModo.addEventListener('click', () => {
        // Remove a classe do tema atual do <body>.
        document.body.classList.remove(themes[currentThemeIndex]);
        // Atualiza o índice para o próximo tema (volta para o início se passar do último).
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        // Adiciona a classe do novo tema ao <body>.
        document.body.classList.add(themes[currentThemeIndex]);
        // Salva o tema escolhido no localStorage para manter a preferência do usuário.
        localStorage.setItem('tema', themes[currentThemeIndex]);
    });

    // Fim do bloco principal do DOMContentLoaded.
});