// Calculator Logic
// -1 was used as a return value to indicate an "error" state

function allClear() {
    displayInput.value = "";
    expression.num1 = "";
    expression.operator = "";
    expression.num2 = "";
    
    // If user used the control key to clear all => update accordingly
    showBackspace();
}

function showBackspace() {
    if (document.querySelector(".backspace").parentNode.className == "function-button hide") {
        document.querySelector(".backspace").parentNode.classList.remove("hide");
        document.querySelector(".AC").parentNode.classList.add("hide");
    }
    if (displayInput.value == "") {
        document.querySelector(".backspace").parentNode.classList.add("hide");
        document.querySelector(".AC").parentNode.classList.remove("hide");
    }
}

function backspace() {
    // "showBackspace" is used in the end to determine whether the display is empty and show AC if it is
    if (expression.operator != "" && expression.num2 != ""){
        expression.num2 = expression.num2.slice(0, -1);
    }
    else if (expression.operator != "" && expression.num2 == "") {
        expression.operator = "";
    }
    else {
        expression.num1 = expression.num1.slice(0, -1);
    }
    displayInput.value = expression.num1 + expression.operator + expression.num2;
    showBackspace();
}

function changeSign() {
    let position = (expression.operator == "") ? "num1" : "num2";
    if (expression[position].charAt(0) == "-"){
        expression[position] = expression[position].slice(1);
    }
    else {
        expression[position] = "-" + expression[position];
    }
    displayInput.value = expression.num1 + expression.operator + expression.num2;
}

function percentage() {
    let position = (expression.operator == "") ? "num1" : "num2";
    expression[position] = expression[position] / 100;
    expression[position] = (Math.round(expression[position] * 1000) / 1000).toString();
    displayInput.value = expression.num1 + expression.operator + expression.num2;
}

function addOperator(operator) {
    if (expression.num1 == ""){
        return -1;
    }

    if (expression.operator != "" && expression.num2 != ""){
        calculate();
    }
    expression.operator =  operator;
    displayInput.value = expression.num1 + expression.operator + expression.num2;
}

function buildNumber(num){
    let position = (expression.operator == "") ? "num1" : "num2";

    if (expression[position] == "0" && num != ".") {
        expression[position] = "";
    }
    if (expression[position].includes(".") && num == ".") {
        return -1;
    }

    expression[position] += num;
    displayInput.value = expression.num1 + expression.operator + expression.num2;
    showBackspace();
}

function calculate() {
    if (expression.num1 == "" || expression.operator == "" || expression.num2 == "") {
        return -1;
    }

    if (expression.operator == "/" && expression.num2 == "0"){
        displayInput.value = "Error: division by 0";
        return -1;
    }
    let operand1 = Number(expression.num1);
    let operand2 = Number(expression.num2);
    let result;
    
    switch (expression.operator) {
        case "/":
            result = operand1 / operand2
            result = Math.round(result * 1000) / 1000;
            break;

        case "*":
            result = operand1 * operand2
            result = Math.round(result * 1000) / 1000;
            break;

        case "-":
            result = operand1 - operand2
            result = Math.round(result * 1000) / 1000;
            break;

        case "+":
            result = operand1 + operand2
            result = Math.round(result * 1000) / 1000;
            break;
    }

    allClear();
    expression.num1 = result.toString();
    displayInput.value = expression.num1 + expression.operator + expression.num2;
}

const calcCont = document.querySelector(".calc-cont");
const displayInput = document.querySelector("#display-input");
const expression = {
    num1: "",
    operator: "",
    num2: "",
};


// Deduce what button was pressed on the calculator 
calcCont.addEventListener("click", (e) => {
    let target = e.target;
    switch (target.className) {

        case "AC":
            allClear();
            target.blur();
            break;

        case "backspace":
            backspace();
            target.blur();
            break;

        case "change-sign":
            changeSign();
            target.blur();
            break;

        case "percentage":
            percentage();
            target.blur();
            break;

        case "divide":
            addOperator("/");
            target.blur();
            break;

        case "multiply":
            addOperator("*");
            target.blur();
            break;

        case "subtract":
            addOperator("-");
            target.blur();
            break;

        case "add":
            addOperator("+");
            target.blur();
            break;

        case "equal":
            calculate();
            target.blur();
            break;

        case "decimal":
            buildNumber(".");
            target.blur();
            break;

        // This is an effective option because if we use default we have to account for users clicking div elements
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":    
        case "7":
        case "8":
        case "9":
            buildNumber(target.className);
            target.blur();
    }
});

document.addEventListener("keyup", (e) => {
    target = e.key;
    switch (target) {
        case "Control":
            allClear();
            break;
        case "Backspace":
            backspace();
            break;

        case "Shift":
            changeSign();
            break;

        case "/":
            addOperator("/");
            break;

        case "*":
            addOperator("*");
            break;

        case "-":
            addOperator("-");
            break;

        case "+":
            addOperator("+");
            break;

        case "Enter":
        case "=":
            calculate();
            break;

        case ".":
            buildNumber(".");
            break;

        // This is an effective option as it prevents unexpected input from being processed
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":    
        case "7":
        case "8":
        case "9":
            buildNumber(target);
    }
});

