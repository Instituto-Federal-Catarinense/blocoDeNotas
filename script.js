// Espera o conteúdo da página carregar completamente antes de executar o script.
// É uma boa prática para evitar erros de JavaScript tentando acessar elementos
// que ainda não existem na página.
document.addEventListener('DOMContentLoaded', () => {

    const btnLimpar = document.getElementById("btnLimpar")
    const btnSalvar = document.getElementById("btnSalvar")
    const btnRandom = document.getElementById("btnRandom")
    const blocoDeNotas = document.getElementById('blocoDeNotas');
    const notaSalva = localStorage.getItem('minhaNota');
    const bodyHTML = document.body

    if (notaSalva) {
        blocoDeNotas.value = notaSalva;
    }

    btnSalvar.addEventListener('click', () => {
        localStorage.setItem('minhaNota', blocoDeNotas.value);
        console.log("Nota salva no localStorage!"); // Uma mensagem no console para fins de depuração.
    });

    btnLimpar.addEventListener("click", () => {
        blocoDeNotas.value = ""
        localStorage.removeItem("minhaNota")
        console.log("Notas limpas")
    })

    function gerarCor(){
        let corRandom = "#"
        for (let i = 0; i < 6; i++) {
            corRandom += Math.floor(Math.random() * 16).toString(16)
        }
        return corRandom
    }
    

    btnRandom.addEventListener('click', () =>{
        const cor = gerarCor()
        bodyHTML.style.backgroundColor = cor
    });

})