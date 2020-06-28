// targetting all the buttons
const calculatorBtns = document.querySelectorAll("button");

// all buttons copied into array
let btnArray = [...calculatorBtns];

// creating eventlisteners for all buttons
for (let i = 0; i < btnArray.length; i++) {
    btnArray[i].addEventListener("click", showInput);
}

// target the pressing button display
const pressedBtnDisplay = document.getElementById("pressed-btn");

// variable for pressed button display
let btnDisplay = "";

// target for calculation display container
const calculationDisplay = document.getElementById("calculation");

// variable for showing calculation
let calcDisplay = "";

// array for operators prioritisng multiply and divide
const operatorsArray = ["x", "/", "+", "-"];

let isMinusNumber = false;

//function for showing both the 'button' display and the calculation display
function showInput(event) {

    // variable for the button pressed
    let target = event.target.innerText;

    // if statement for clear button pressed
    if (target === "AC") {
        btnDisplay = "0";
        calcDisplay = "";
        totalSum = 0;
        totalArray = [];
    }

    // if statement for if any of sum symbols pressed
    if (operatorsArray.includes(target)) {
        // if statement to see if new symbol is pressed in leui of old symbol
        if (previousTarget === "=") {
            totalArray.push(target);
            btnDisplay = target;
            calcDisplay = totalSum + target;
            totalSum = 0;
        } else if (operatorsArray.includes(previousTarget) && target !== "-") {
            totalArray.splice(totalArray.length - 1, 1);
            btnDisplay = target;
            calcDisplay = calcDisplay.substr(0, calcDisplay.length - 1) + target;
            totalArray.push(btnDisplay)
        } else if (operatorsArray.includes(previousTarget) && target === "-") {
            btnDisplay = target;
            calcDisplay = calcDisplay + target;
            isMinusNumber = true;
        } else {
            totalArray.push(btnDisplay);
            btnDisplay = target;
            calcDisplay = calcDisplay + target;
            totalArray.push(btnDisplay)
        }
    }

    // if statement for when decimal is pressed and the number doesnt have a decimal already
    if (target === "." && pressedBtnDisplay.innerText.includes(".") === false) {
        btnDisplay = btnDisplay + target;
        calcDisplay = calcDisplay + target;
    }

    if (target === "." && previousTarget === "=") {
        btnDisplay = target;
        calcDisplay = target;
        totalSum = 0;
        totalArray = [];
    }

    // if statement for when numbers are pressed
    if (target <= 9 && target >= 0) {
        if (operatorsArray.includes(btnDisplay) && btnDisplay !== "-") {
            btnDisplay = target;
            calcDisplay = calcDisplay + target;
        } else if (operatorsArray.includes(btnDisplay) && btnDisplay === "-") {
            if (isMinusNumber === true) {
                btnDisplay = btnDisplay + target;
                calcDisplay = calcDisplay + target;
                isMinusNumber = false;
            } else {
                btnDisplay = target;
                calcDisplay = calcDisplay + target;
            }
        } else if (previousTarget === "=") {
            btnDisplay = target;
            calcDisplay = target;
            totalSum = 0;
            totalArray = [];
        } else if (btnDisplay === "0") {
            btnDisplay = target;
            calcDisplay = calcDisplay.substr(0, calcDisplay.length - 1) + target;
        } else {
            btnDisplay = btnDisplay + target;
            calcDisplay = calcDisplay + target;
        }

    }
    // if statement when equals sign is pressed, to perform and show calculation
    if (target === "=" && previousTarget !== "=") {

        if (operatorsArray.includes(previousTarget)) {
            totalArray.splice(totalArray.length - 1, 1);
            calcDisplay = calcDisplay.substr(0, calcDisplay.length - 1);
        }

        if (!operatorsArray.includes(previousTarget)) {
            totalArray.push(btnDisplay);
        }

        calculateTotal(totalArray);
        btnDisplay = totalSum;
        calcDisplay = calcDisplay + target + totalSum;
        totalArray.push(totalSum);
    }
    pressedBtnDisplay.innerText = btnDisplay;
    calculationDisplay.innerText = calcDisplay;
    // changes the value of the previous target variable  
    previousTarget = target;
}


// total sum
let totalSum = 0;

// previous button pressed
let previousTarget = "";

let totalArray = [];




//function for calculating the total
function calculateTotal(equation) {
    console.log(equation);
    // returns the number or zero if calculation doesnt consist of two operands and one operator
    if (equation.length === 1) {
        totalSum = equation.join("");
        totalArray = [];
        return;
    }

    if (operatorsArray.includes(equation[equation.length - 1])) {
        equation.pop();
    }
    // while loops for all operators - prioritising multiple and divide

    for (let i = 0; i < operatorsArray.length; i++) {
        while (equation.includes(operatorsArray[i])) {
            let pIndex = equation.indexOf(operatorsArray[i]);
            let sum = 0;
            let numLeft = Number(equation[pIndex - 1]);
            let numRight = Number(equation[pIndex + 1]);
            if (operatorsArray[i] === "x") {
                sum = numLeft * numRight;
            } else if (operatorsArray[i] === "/") {
                sum = numLeft / numRight;
            } else if (operatorsArray[i] === "+") {
                sum = numLeft + numRight;
            } else if (operatorsArray[i] === "-") {
                sum = numLeft - numRight;
            }
            equation.splice(pIndex - 1, 3, sum);
        }
    }

    console.log(equation);

    // rounding numbers to 4 decimal places if required

    let roundNumber = Number(equation[0].toFixed(4));
    equation[0] = roundNumber;

    // setting total sum, and emptying calculation array
    totalSum = equation.join("");
    totalArray = [];

}

// key press function to initialise a click of the same button
function pressKey(event) {

    if (event.key === "x" || event.key === "*") {
        btnArray[5].click();
    }

    if (event.key === "Enter") {
        event.preventDefault();
        btnArray[16].click();
    }
    // for loop to find the innerText of each button to match one with event.key value
    for (let i = 0; i < btnArray.length; i++) {
        // if statement to determine match, and initialise a click of the button

        if (btnArray[i].innerText === event.key) {
            btnArray[i].click()
        }
    }
}

//function to utilise backspace as 'AC'
function keyDown(event) {
    if (event.key === "Backspace") {
        btnArray[0].click();
    }
}

// event listener for any key presses
document.addEventListener("keypress", pressKey);
// event listener for any key presses
document.addEventListener("keydown", keyDown);