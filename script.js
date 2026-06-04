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

document.addEventListener('DOMContentLoaded', initializeNotes);
