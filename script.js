let number1 = "";
let number2 = "";
let operator = "";

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["+", "-", "x", "÷", "%"];

const buttons = document.querySelectorAll("button");
let viewItem = document.getElementById("viewItem");

// RESETTING THE CALCULATOR AFTER EQUATION EXECUTED

function reset() {
  number1 = "";
  number2 = "";
  operator = "";
}

// UPDATES THE DISPLAY OF THE CALCULATOR

function updateDisplay(display) {
  viewItem.textContent = display;
}

// ADDS NUMBER TO EXISTING NUMBER (INPUT NUMBERS FUNCTIONS)

function updateNumber(btnText, number) {
  if (number === number1) {
    if (number1.length === 0) {
      number1 += btnText;
      updateDisplay(btnText);
    } else {
      number1 += btnText;
      updateDisplay(viewItem.textContent + btnText);
    }
  } else if (number === number2) {
    number2 += btnText;
    updateDisplay(viewItem.textContent + btnText);
  }
}

/// MATH OPERATIONS ///

function add(fnumber, snumber) {
  if ((fnumber + snumber).toString().length > 7) {
    updateDisplay((fnumber + snumber).toFixed(7));
  } else {
    updateDisplay(fnumber + snumber);
  }
}

function subtract(fnumber, snumber) {
  if ((fnumber - snumber).toString().length > 7) {
    updateDisplay((fnumber - snumber).toFixed(7));
  } else {
    updateDisplay(fnumber - snumber);
  }
}

function multiply(fnumber, snumber) {
  if ((fnumber * snumber).toString().length > 7) {
    updateDisplay((fnumber * snumber).toFixed(7));
  } else {
    updateDisplay(fnumber * snumber);
  }
}

function divide(fnumber, snumber) {
  if ((fnumber / snumber).toString().length > 7) {
    updateDisplay((fnumber / snumber).toFixed(7));
  } else {
    updateDisplay(fnumber / snumber);
  }
}

function mod(fnumber, snumber) {
  if ((fnumber % snumber).toString().length > 7) {
    updateDisplay((fnumber % snumber).toFixed(7));
  } else {
    updateDisplay(fnumber % snumber);
  }
}

//OPERATE FUNCTION FOR CALCULATOR

function operate(fnumber, operator, snumber) {
  if (operator === "+") {
    add(fnumber, snumber);
  }
  if (operator === "-") {
    subtract(fnumber, snumber);
  }
  if (operator === "x") {
    multiply(fnumber, snumber);
  }
  if (operator === "÷") {
    if (snumber === 0) {
      reset();
      updateDisplay("ERROR");
    } else {
      divide(fnumber, snumber);
    }
  }
  if (operator === "%") {
    if (snumber === 0) {
      reset();
      updateDisplay("Undefined");
    } else {
      mod(fnumber, snumber);
    }
  }
}

// INNUT A NUMBER

function inputNumbers(btnText) {
  if (!(viewItem.textContent.length === 0) && number1.length === 0) {
    updateDisplay("");
    updateNumber(btnText, number1);
  } else if (operator.length === 0 && !(number1.length === 0)) {
    updateNumber(btnText, number1);
  } else if (!(operator.length === 0)) {
    if (number2.length === 0) {
      updateNumber(btnText, number2);
    } else {
      updateNumber(btnText, number2);
    }
  } else if (number1.length === 0) {
    updateNumber(btnText, number1);
  }
}

// INPUT AN OPERATOR

function inputOperator(btnText) {
  if (!(number1.length === 0)) {
    if (operator.length === 0) {
      operator = btnText;
      updateDisplay(viewItem.textContent + btnText);
    } else if (!(operator.length === 1 && number2.length === 0)) {
      operate(parseFloat(number1), operator, parseFloat(number2));
      reset();
      number1 += viewItem.textContent;
      operator = btnText;
      updateDisplay(viewItem.textContent + btnText);
    }
  } else if (!(viewItem.textContent.length === 0) && number1.length === 0) {
    number1 += viewItem.textContent;
    operator = btnText;
    updateDisplay(number1 + btnText);
  }
}

// BACK SPACE

function backSpace() {
  if (!(viewItem.textContent.length === 0) && number1.length === 0) {
    number1 = viewItem.textContent;
    let newNum = number1.split("");
    if (number1.includes("-") && number1.length == 2) {
      let newF = newNum.filter((n) => n !== "-");
      newNum = newF;
    }
    newNum.pop();
    number1 = newNum.join("");
  } else {
    if (!(number2.length === 0)) {
      let newNum = number2.split("");
      if (number2.includes("-") && number2.length === 2) {
        let newF = newNum.filter((n) => n !== "-");
        newNum = newF;
      }
      newNum.pop();
      number2 = newNum.join("");
    } else if (operator.length > 0) {
      operator = "";
    } else if (!(number1.length === 0)) {
      let newNum = number1.split("");
      if (number1.includes("-") && number1.length === 2) {
        let newF = newNum.filter((n) => n !== "-");
        newNum = newF;
      }
      newNum.pop();
      number1 = newNum.join("");
    }
  }
  updateDisplay(number1 + operator + number2);
}

// ADD DECIMAL TO NUMBER

function addDecimal() {
  if (!(number2.length === 0) && !number2.includes(".")) {
    number2 += ".";
  } else if (number2.length === 0 && !(operator.length === 0)) {
    number2 = "0.";
  } else if (
    !(number1.length === 0) &&
    operator.length === 0 &&
    !number1.includes(".")
  ) {
    number1 += ".";
  } else if (number1.length === 0 && operator.length === 0) {
    number1 = "0.";
  }
  updateDisplay(number1 + operator + number2);
}

// CONVERT NUMBERS TO NEGATIVE/REVERSE

function convertToNeg() {
  if (!(viewItem.textContent.length === 0) && number1.length === 0) {
    number1 = viewItem.textContent;
    let newNum = number1.split("");
    if (!number1.includes("-")) {
      if (!(number1 === "0")) {
        newNum.splice(0, 0, "-");
        number1 = newNum.join("");
      }
    } else if (number1.includes("-")) {
      let newF = newNum.filter((n) => n !== "-");
      number1 = newF.join("");
    }
  } else {
    if (!(number2.length === 0)) {
      let newNum = number2.split("");
      if (!number2.includes("-")) {
        if (!(number2 === "0")) {
          newNum.splice(0, 0, "-");
          number2 = newNum.join("");
        }
      } else if (number2.includes("-")) {
        let newF = newNum.filter((n) => n !== "-");
        number2 = newF.join("");
      }
    } else if (!(number1.length === 0) && operator.length === 0) {
      let newNum = number1.split("");
      if (!number1.includes("-")) {
        if (!(number1 === "0")) {
          newNum.splice(0, 0, "-");
          number1 = newNum.join("");
        }
      } else if (number1.includes("-")) {
        let newF = newNum.filter((n) => n !== "-");
        number1 = newF.join("");
      }
    }
  }
  updateDisplay(number1 + operator + number2);
}

// MAIN //

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    btnText = button.textContent;

    if (numbers.includes(btnText)) {
      inputNumbers(btnText);
    } else if (operators.includes(btnText)) {
      inputOperator(btnText);
    } else if (btnText === "=") {
      operate(parseFloat(number1), operator, parseFloat(number2));
      reset();
    } else if (btnText === "AC") {
      reset();
      updateDisplay("");
    } else if (btnText === "<") {
      backSpace();
    } else if (btnText === ".") {
      addDecimal();
    } else if (btnText === "+/-") {
      convertToNeg();
    }
  });
});
