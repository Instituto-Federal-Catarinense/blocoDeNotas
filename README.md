# blocoDeNotas
Projeto piloto: bloco de notas com salvamento automático no navegador.

## Recursos
- Salva automaticamente o texto digitado usando `localStorage`
- Recupera a nota ao recarregar a página
- Botão para limpar a nota atual
- Feedback de estado para confirmar salvamento ou erro

## Como usar
1. Abra `index.html` no navegador.
2. Digite suas anotações no campo.
3. A aplicação salva automaticamente.
4. Use o botão "Limpar nota" para apagar o conteúdo e salvar em branco.

## Observações
- O sistema verifica se `localStorage` está disponível antes de salvar.
- As notas permanecem no navegador mesmo depois de fechar a aba.

