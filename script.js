// Bloco de notas com salvamento automático delicado ✨
(() => {
  "use strict";

  const STORAGE_KEY = "minhaNota";

  const textarea = document.getElementById("blocoDeNotas");

  if (!textarea) return;

  const statusElement = document.getElementById("saveStatus");

  // Verifica suporte ao localStorage
  const supportsLocalStorage = (() => {
    try {
      const testKey = "__teste__";

      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);

      return true;
    } catch (e) {
      return false;
    }
  })();

  // Atualiza texto de status
  const setStatus = (message, type = "") => {
    if (!statusElement) return;

    statusElement.textContent = message;

    statusElement.className = type ? `status ${type}` : "status";
  };

  // Salvar
  const saveNow = (value) => {
    if (!supportsLocalStorage) {
      setStatus("O navegador não permite salvar notas.", "error");

      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, value);

      setStatus("✨ Alterações salvas", "saved");

      // Remove mensagem após alguns segundos
      setTimeout(() => {
        setStatus("");
      }, 2000);
    } catch (e) {
      console.warn("Erro ao salvar:", e);

      setStatus("Não foi possível salvar a nota.", "error");
    }
  };

  // Carregar conteúdo salvo
  const load = () => {
    if (!supportsLocalStorage) return "";

    return localStorage.getItem(STORAGE_KEY) || "";
  };

  // Debounce
  const debounce = (fn, wait = 400) => {
    let timer = null;

    return (...args) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        fn(...args);
      }, wait);
    };
  };

  // Inicializa conteúdo
  textarea.value = load();

  setStatus(
    supportsLocalStorage
      ? "💖 Conteúdo carregado"
      : "Notas não serão salvas automaticamente.",
    "saved",
  );

  // Salvamento automático
  const saveDebounced = debounce((e) => saveNow(e.target.value), 500);

  textarea.addEventListener("input", saveDebounced);
})();
