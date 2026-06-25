const STORAGE_KEY = 'blocoDeNotas.conteudo';
const BACKUP_KEY = 'blocoDeNotas.backup';

function getSavedNote() {
    try {
        return localStorage.getItem(STORAGE_KEY) || '';
    } catch (error) {
        console.warn('Não foi possível acessar o localStorage.', error);
        return '';
    }
}

function getBackupNote() {
    try {
        return localStorage.getItem(BACKUP_KEY) || '';
    } catch (error) {
        console.warn('Não foi possível acessar o backup.', error);
        return '';
    }
}

function saveNote(content) {
    try {
        localStorage.setItem(STORAGE_KEY, content);
    } catch (error) {
        console.warn('Não foi possível salvar a nota.', error);
    }
}

function saveBackup(content) {
    try {
        localStorage.setItem(BACKUP_KEY, content);
    } catch (error) {
        console.warn('Não foi possível salvar o backup.', error);
    }
}

function initializeNotes() {
    const blocoDeNotas = document.getElementById('blocoDeNotas');
    const botaoLimpar = document.getElementById('limparNota');
    const botaoSalvar = document.getElementById('salvarNota');
    const botaoRestaurar = document.getElementById('restaurarNota');

    if (!blocoDeNotas || !botaoLimpar || !botaoSalvar || !botaoRestaurar) {
        console.error('Elementos necessários não foram encontrados no DOM.');
        return;
    }

    blocoDeNotas.value = getSavedNote();

    blocoDeNotas.addEventListener('input', event => {
        saveNote(event.target.value);
    });

    botaoSalvar.addEventListener('click', () => {
        const conteudo = blocoDeNotas.value;
        saveBackup(conteudo);
        saveNote(conteudo);
        alert('Notas salvas com sucesso!');
    });

    botaoLimpar.addEventListener('click', () => {
        blocoDeNotas.value = '';
        saveNote('');
        blocoDeNotas.focus();
    });

    botaoRestaurar.addEventListener('click', () => {
        const backup = getBackupNote();
        if (backup) {
            blocoDeNotas.value = backup;
            saveNote(backup);
            alert('Última nota salva foi restaurada!');
        } else {
            alert('Nenhuma nota salva anteriormente encontrada.');
        }
    });
}

//document.getElementsByTagName('p')[0].textContent = getBackupNote();
//teste
document.addEventListener('DOMContentLoaded', initializeNotes);

let xis = 0
let egoe = 0
const botao = document.getElementById("butao")
const reinicia = document.getElementById("res")
reinicia.style.display = "none"
botao.style.width = "300px";
botao.style.height = "75px";
botao.style.fontSize = "35px";
botao.style.borderRadius = "50%";
botao.style.backgroundColor = "var(--primary)";

reinicia.addEventListener("click", function (){
  xis = 0
  document.getElementById("sla").textContent = "quantidade de aura: " + xis
  document.getElementById("z").textContent= ""
  this.style.display = "none"
})

function mousefora() {
  becap = egoe
  egoe = 0
  document.getElementById("z").textContent= "+" + becap + " de aura"
  botao.style.backgroundColor = "var(--primary)"
  botao.style.color = "var(--panel)"
}
function aura() {
  xis += 10
  egoe += 10
  document.getElementById("sla").textContent = "quantidade de aura: " + xis
  document.getElementById("z").textContent= "+" + egoe + " de aura"
  botao.style.backgroundColor = "var(--accent)";
  botao.style.color = "var(--panel)"
  reinicia.style.display = "block"
}
function ego() {
  xis += 100000000
  document.getElementById("sla").textContent = "quantidade de aura: " + xis
   document.getElementById("z").textContent= "+100000000 de aura"
  botao.style.backgroundColor = "var(--muted)"
  botao.style.color = "var(--panel)"
  tiratexto()
}
function menosaura() {
  let calmacalabreso = 0
  calmacalabreso += ((Math.round(Math.random()*10 + 10))*(Math.round(Math.random() * 10) + 10))*10
  if (calmacalabreso < 0) { calmacalabreso *= -1 } else {}
  xis -= calmacalabreso
  document.getElementById("sla").textContent = "quantidade de aura: " + xis
  document.getElementById("z").textContent= "-" + calmacalabreso + " de aura"
  botao.style.backgroundColor = "var(--panel)";
  botao.style.color = "var(--muted)"
}
