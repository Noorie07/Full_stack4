let currentInput = '';
let operator = null;
let previousInput = '';

const result = document.getElementById('result');
const buttons = document.querySelectorAll('.buttons button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'AC') {
      clear();
    } else if (value === 'DEL') {
      deleteLastDigit();
    } else if (value === '=') {
      calculate();
    } else if (['+', '-', '×', '÷'].includes(value)) {
      handleOperator(value);
    } else if (value === '.') {
      handleDecimal();
    } else {
      appendNumber(value);
    }
  });
});

function appendNumber(number) {
  if (currentInput.length < 12) { // Limit input length
    currentInput += number;
    updateDisplay();
  }
}

function handleOperator(op) {
  if (currentInput === '') return;
  if (previousInput !== '') {
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = '';
  updateDisplay();
}

function handleDecimal() {
  if (!currentInput.includes('.')) {
    currentInput += '.';
    updateDisplay();
  }
}

function calculate() {
  if (operator === null || currentInput === '') return;

  let computation;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  switch (operator) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '×':
      computation = prev * current;
      break;
    case '÷':
      computation = prev / current;
      break;
    default:
      return;
  }

  if (isNaN(computation) || !isFinite(computation)) {
    currentInput = 'Error';
  } else {
    currentInput = computation.toString();
  }
  operator = null;
  previousInput = '';
  updateDisplay();
}

function clear() {
  currentInput = '';
  operator = null;
  previousInput = '';
  updateDisplay();
}

function deleteLastDigit() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function updateDisplay() {
  result.value = currentInput || '0';
}