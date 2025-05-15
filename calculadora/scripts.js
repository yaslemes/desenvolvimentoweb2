document.addEventListener("DOMContentLoaded", () => {
  /****************************************************************
   * Seleção dos elementos HTML
   ****************************************************************/
  const btnBotoes = document.querySelectorAll("[btn-numero]");
  const btnOperacoes = document.querySelectorAll("[btn-operador]");
  const btnIgual = document.querySelector("[btn-igual]");
  const btnDelete = document.querySelector("[btn-delete]");
  const btnAC = document.querySelector("[btn-ac]");

  const bufferElemento = document.querySelector("[txt-buffer]");
  const displayElemento = document.querySelector("[txt-display]");

  const calculadora = {
    operandoAnterior: "",
    operandoAtual: "",
    operador: "",
    bufferTextoElemento: bufferElemento,
    displayTextoElemento: displayElemento,
  };

  /****************************************************************
   * Associar funções aos eventos dos elementos HTML
   ****************************************************************/
  btnAC.addEventListener("click", () => limpaVariaveis(calculadora));
  btnDelete.addEventListener("click", () => apagaDigito(calculadora));
  btnIgual.addEventListener("click", () => executaCalculo(calculadora));

  btnBotoes.forEach(btn =>
    btn.addEventListener("click", () => adicionaNumero(calculadora, btn.textContent))
  );

  btnOperacoes.forEach(btn =>
    btn.addEventListener("click", () => escolheOperador(calculadora, btn.textContent))
  );

  /****************************************************************
   * Suporte ao teclado físico
   ****************************************************************/
  window.addEventListener("keydown", (e) => {
    const tecla = e.key;

    if (!isNaN(tecla) || tecla === ".") {
      adicionaNumero(calculadora, tecla);
    }

    if (["+", "-", "*", "/"].includes(tecla)) {
      const op = tecla === "/" ? "÷" : tecla;
      escolheOperador(calculadora, op);
    }

    if (tecla === "Enter" || tecla === "=") {
      executaCalculo(calculadora);
    }

    if (tecla === "Backspace") {
      apagaDigito(calculadora);
    }

    if (tecla.toLowerCase() === "c") {
      limpaVariaveis(calculadora);
    }
  });

  /****************************************************************
   * Regras da aplicação
   ****************************************************************/
  function atualizaDisplay(calc) {
    calc.displayTextoElemento.textContent = calc.operandoAtual || "0";
    calc.bufferTextoElemento.textContent =
      calc.operandoAnterior && calc.operador
        ? `${calc.operandoAnterior} ${calc.operador}`
        : "";
  }

  function limpaVariaveis(calc) {
    calc.operandoAnterior = "";
    calc.operandoAtual = "";
    calc.operador = "";
    atualizaDisplay(calc);
  }

  function adicionaNumero(calc, numero) {
    if (numero === "." && calc.operandoAtual.includes(".")) return;
    calc.operandoAtual += numero;
    atualizaDisplay(calc);
  }

  function escolheOperador(calc, operador) {
    if (calc.operandoAtual === "") return;

    if (calc.operandoAnterior !== "") {
      executaCalculo(calc);
    }

    calc.operador = operador;
    calc.operandoAnterior = calc.operandoAtual;
    calc.operandoAtual = "";
    atualizaDisplay(calc);
  }

  function executaCalculo(calc) {
    const anterior = parseFloat(calc.operandoAnterior);
    const atual = parseFloat(calc.operandoAtual);
    if (isNaN(anterior) || isNaN(atual)) return;

    let resultado;
    switch (calc.operador) {
      case "+":
        resultado = anterior + atual;
        break;
      case "-":
        resultado = anterior - atual;
        break;
      case "*":
        resultado = anterior * atual;
        break;
      case "÷":
        resultado = atual === 0 ? "Erro" : anterior / atual;
        break;
      default:
        return;
    }

    calc.operandoAtual = resultado.toString();
    calc.operador = "";
    calc.operandoAnterior = "";
    atualizaDisplay(calc);
  }

  function apagaDigito(calc) {
    calc.operandoAtual = calc.operandoAtual.slice(0, -1);
    atualizaDisplay(calc);
  }
});
