let input = document.querySelector('#input');

const numbersBtn = document.querySelectorAll('[data-number]'); // números
const operatorsBtn = document.querySelectorAll('[data-operators]'); // operadores
const equalsBtn = document.querySelector('[data-equals]'); // =
const clearBtn = document.querySelector('[data-clear]'); // c
const deleteBtn = document.querySelector('[data-delete]'); // ←
const previousOperationText = document.querySelector(
  '[data-previous-operation]'
); //texto que já foi digitado na tela da calculadora
const currentOperationText = document.querySelector('[data-current-operation'); //texto que está sendo digitado na tela da calculadora

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText; //texto que já foi digitado
    this.currentOperationText = currentOperationText; //texto que está sendo digitado
    this.currentOperation = ''; //operação que está sendo digitada
  }

  //insere digito no visor
  insertDigit(digit) {
    if (digit === '.' && this.currentOperationText.innerText.includes('.')) {
      //impede de colocar mais de '.' no texto da operação atual
      return;
    }
    this.currentOperation = digit;
    this.updateScreen(); //atualiza a tela
  }

  //operações
  processOperation(operation) {
    //checar se o texto que está sendo digitado está vazio
    if (this.currentOperationText.innerText === '' && operation !== 'C') {
      if (this.previousOperationText.innerText !== '') {
        // se não estiver vazio, muda a operação conforme o operador
        this.changeOperation(operation);
      }
      return; //se estiver vazio, retorna
    }

    //valor atual e valor anterior
    let operationValue; //resultado da operação
    const previous = +this.previousOperationText.innerText.split(' ')[0]; //número que já foi digitado + um espaço
    const current = +this.currentOperationText.innerText; //número que está sendo digitado

    //verifica a operação
    switch (operation) {
      case '+': //em caso de soma
        operationValue = previous + current; //resultado da operação = número que já foi digitado + número que está sendo digitado
        this.updateScreen(operationValue, operation, current, previous); //atualiza a tela
        break;
      case '-': //em caso de subtração
        operationValue = previous - current; //resultado da operação = número que já foi digitado - número que está sendo digitado
        this.updateScreen(operationValue, operation, current, previous); //atualiza a tela
        break;
      case '/': //em caso de divisão
        operationValue = previous / current; //resultado da operação = número que já foi digitado / número que está sendo digitado
        this.updateScreen(operationValue, operation, current, previous); //atualiza a tela
        break;
      case '*': //em caso de multiplicação
        operationValue = previous * current; //resultado da operação = número que já foi digitado * número que está sendo digitado
        this.updateScreen(operationValue, operation, current, previous); //atualiza a tela
        break;
      case '←': //em caso delete
        this.processDelete(); //deleta o último dígito
        break;
      case 'C': //em caso delete
        this.processClear(); //limpa a tela da calculadora
        break;
      case '=': //em caso de igual
        this.processEqual(); //
        break;

      default:
        return;
    }
  }

  //muda valores da tela da calculadora
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      //se o resultado da operação for igual a null:
      this.currentOperationText.innerText += this.currentOperation; //acrescenta o número da texto que está sendo digitado na tela da calculadora com a operação que está sendo digitada
    } else {
      //se não:
      if (previous === 0) {
        //caso o número que já foi digitado seja igual a 0:
        operationValue = current; //resultado da operação = número que está sendo digitado
      } //se for diferente de 0 e null:
      this.previousOperationText.innerText = `${operationValue} ${operation}`; //texto que já foi digitado na tela da calculadora recebe o resultado da operação e concatena o operador
      this.currentOperationText.innerText = ''; //texto que está sendo digitado na tela da calculadora fica vazio
    }
  }

  //muda a operação matemática
  changeOperation(operation) {
    const mathOperations = ['+', '-', '*', '/']; //array com as operações possíveis

    if (!mathOperations.includes(operation)) {
      //se for clicado em uma operação diferente do array de operações possível
      return; //retorna
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation; //texto que já foi digitado na tela da calculadora recebe o texto e concatena a operação
  }

  //deleta o último dígito
  processDelete() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  } //texto que está sendo digitado na tela da calculadora

  processClear() {
    this.currentOperationText.innerText = ''; //limpa o campo do texto que está sendo digitado na tela da calculadora
    this.previousOperationText.innerText = ''; //limpa o campo do texto que já foi digitado na tela da calculadora
  }

  processEqual() {
    const operation = previousOperationText.innerText.split(' ')[1]; //operation = o valor da operação
    this.processOperation(operation); //executa a operação
  }
}

const calc = new Calculator(previousOperationText, currentOperationText); //nova instancia da calculadora

function getButtonValue(e) {
  const value = e.target.innerText; //texto do evento
  calc.processOperation(value);
}

//para cada número
numbersBtn.forEach((num) => {
  num.addEventListener('click', (e) => {
    const value = e.target.innerText; //texto do evento
    calc.insertDigit(value);
  });
});

//para cada operador
operatorsBtn.forEach((op) => {
  op.addEventListener('click', getButtonValue);
});

//para delete
deleteBtn.addEventListener('click', getButtonValue);

//para clear
clearBtn.addEventListener('click', getButtonValue);

//para equal
equalsBtn.addEventListener('click', getButtonValue);
