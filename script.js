
document.addEventListener('DOMContentLoaded', () => {


    const blocoDeNotas = document.getElementById('blocoDeNotas');
    const btnLimparNotas =  document.getElementById('LimparNotas');
    const btnSalvarNotas = document.getElementById('SalvarNotas');
    const btnApagarTexto = document.getElementById('ApagarTexto');
    const btnRandomColor = document.getElementById('RandomColor');


    const notaSalva = localStorage.getItem('minhaNota');


    if (notaSalva) {

        blocoDeNotas.value = notaSalva;
    }

    btnLimparNotas.addEventListener('click', () => {
        localStorage.removeItem('minhaNota');
        console.log("Notas Limpas!");
    });

     btnSalvarNotas.addEventListener('click', () => {
        localStorage.setItem('minhaNota', blocoDeNotas.value);
        console.log("Notas Salvas!");
    });

     btnApagarTexto.addEventListener('click', () => {
        blocoDeNotas.value = '';
        console.log("Texto Excluído");
    });

     btnApagarTexto.addEventListener('click', () => {
        blocoDeNotas.value = '';
        console.log("Texto Excluído");
    });

     btnRandomColor.addEventListener('click', () => {
        document.getElementById("Background").style.backgroundColor = '#000b42';
        console.log("Cor mudada");
    });

});