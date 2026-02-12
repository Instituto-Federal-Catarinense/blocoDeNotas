document.addEventListener("DOMContentLoaded", () => {
  const blocoDeNotas = document.getElementById("blocoDeNotas");
  const btnLimparNotas = document.getElementById("btnLimparNotas");
  const btnSalvarNotas = document.getElementById("btnSalvarNotas");
  const btnTrocarFundo = document.getElementById("btnTrocarFundo");

  // Carrega nota salva
  const notaSalva = localStorage.getItem("minhaNota");
  if (notaSalva) {
    blocoDeNotas.value = notaSalva;
  }

  // Limpar notas
  btnLimparNotas.addEventListener("click", () => {
    blocoDeNotas.value = "";
    localStorage.removeItem("minhaNota");
    console.log("Notas limpas e removidas do localStorage");
  });

  // Salvar notas
  btnSalvarNotas.addEventListener("click", () => {
    localStorage.setItem("minhaNota", blocoDeNotas.value);
    console.log("Nota salva no localStorage!");
    alert("Nota salva com sucesso! 💖");
  });

  // Trocar fundo (modo claro / escuro)
  btnTrocarFundo.addEventListener("click", () => {
    //blocoDeNotas.classList.toggle("fundo-escuro");
    if (blocoDeNotas.classList.contains("fundo-escuro")) {
      blocoDeNotas.classList.remove("fundo-escuro");
      blocoDeNotas.style.backgroundColor = "#fff"; // Modo claro
    } else {
      blocoDeNotas.classList.add("fundo-escuro");
      blocoDeNotas.style.backgroundColor = "#333"; // Modo escuro
    }
    console.log("Cor de fundo alterada!");
  });
});
