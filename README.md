# Bloco de Notas

Projeto simples de bloco de notas que salva automaticamente o conteúdo no `localStorage` do navegador.

## Como usar

1. Abra `index.html` no navegador.
2. Digite suas anotações no campo.
3. O texto é salvo automaticamente após alguns instantes.
4. Use o botão `Salvar` para salvar manualmente ou `Limpar` para apagar o conteúdo.

## Arquivos

- `index.html` — marcação da página.
- `style.css` — estilo visual e responsivo.
- `script.js` — lógica de carregamento, salvamento e gerenciamento de notas.

## Melhorias feitas

- Adicionada acessibilidade com `label` e `aria-live`.
- Inserido tratamento de erros ao acessar o `localStorage`.
- Implementado debounce para salvamento automático.
- Botão de salvar removido, pois o texto já é salvo automaticamente.
- Adicionado botão de exportar para baixar a nota como arquivo `.txt`.
- Adicionado campo de título para incluir um título no arquivo exportado.
- O título é usado no conteúdo e no nome do arquivo exportado.
- Adicionado botão para importar notas a partir de um arquivo `.txt` selecionado.
- Ao importar, o arquivo pode incluir uma linha inicial `Título: ...` para definir o título.
- Adicionado botão de troca de tema com persistência no navegador.
- Estilização mais consistente e legível.

