# blocoDeNotas

Projeto Piloto: Um Bloco de Notas Simples para Ensinar `eventListeners` e `localStorage`.

## Mudanças recentes

- Refatorado `script.js`: modularização, verificação de `localStorage`, tratamento de exceções e `debounce` para salvar com menos frequência.
- Melhorada acessibilidade: `textarea` agora tem `aria-label`.

## Como testar

1. Abra `index.html` no navegador ou execute um servidor local.
2. Digite na área de texto; o conteúdo será salvo automaticamente no `localStorage`.
3. Verifique o texto de status abaixo da área de texto para confirmar que as alterações foram salvas.

## Resultado esperado

- A nota carregada anteriormente reaparece automaticamente.
- Após digitar, a mensagem muda para `Alterações salvas.`.
- Se o `localStorage` não estiver disponível, aparece aviso amigável e a nota não é salva.
