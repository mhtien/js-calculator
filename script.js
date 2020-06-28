// targetting all the buttons
const calculatorBtns = document.querySelectorAll("button");

// all buttons copied into array
let btnArray = [...calculatorBtns];

// creating eventlisteners for all buttons
for (let i = 0; i < btnArray.length; i++) {
    btnArray[i].addEventListener("click", showInput);
}

// event listener for any key presses
document.addEventListener("keypress", pressKey);
// event listener for any key presses
document.addEventListener("keydown", keyDown);

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


// setting initial variables
let totalSum = 0;
let previousTarget = "AC";
let totalArray = [];


let isMinusNumber = false;

//function for showing both the 'button' display and the calculation display
function showInput(event) {
    // variable for the button pressed
    let target = event.target.innerText;

    // if statement for clear button pressed
    if (target === "AC") {
        pressClear(target);
    }

    // if statement for any operators pressed
    if (operatorsArray.includes(target)) {
        pressOperators(target);
    }

    if (target === ".") {
        pressDecimal(target);
    }

    // if statement for when numbers are pressed
    if (target <= 9 && target >= 0) {
        pressNumber(target);
    }

    // if statement when equals sign is pressed, to perform and show calculation
    if (target === "=" && previousTarget !== "=") {
        pressEquals(target);
    }

    //displaying both buttons pressed, and calculation
    pressedBtnDisplay.innerText = btnDisplay;
    calculationDisplay.innerText = calcDisplay;

    // changes the value of the previous target variable  
    previousTarget = target;
}

function pressClear(target) {
    btnDisplay = "0";
    calcDisplay = "";
    totalArray = [];
}

function pressOperators(target) {
    // if there was a sum done previously and the number will be used
    if (previousTarget === "=") {
        totalArray.push(btnDisplay);
        btnDisplay = target;
        calcDisplay = totalSum + target;
        totalSum = 0;
        totalArray.push(btnDisplay);
    }
    // if you wanted to start with a minus number
    if (calcDisplay === "") {
        if (target === "-") {
            btnDisplay = target;
            calcDisplay = target;
            isMinusNumber = true;
        }
        // if one operator exists immeditely before
    } else if (operatorsArray.includes(calcDisplay.substr(calcDisplay.length - 1, 1)) &&
        !operatorsArray.includes(calcDisplay.substr(calcDisplay.length - 2, 1))) {
        if (target === "-") {
            btnDisplay = target;
            calcDisplay = calcDisplay + target;
            isMinusNumber = true;
        } else {
            totalArray.pop();
            btnDisplay = target;
            calcDisplay = calcDisplay.substr(0, calcDisplay.length - 1) + target;
            totalArray.push(btnDisplay)
        }
        // if more that one operator exists immediately before
    } else if (operatorsArray.includes(calcDisplay.substr(calcDisplay.length - 1, 1)) &&
        operatorsArray.includes(calcDisplay.substr(calcDisplay.length - 2, 1))) {
        if (target !== "-") {
            totalArray.pop();
            btnDisplay = target;
            calcDisplay = calcDisplay.substr(0, calcDisplay.length - 2) + target;
            totalArray.push(btnDisplay);
            isMinusNumber = false;
        }

        //for numbers only
    } else {
        totalArray.push(btnDisplay);
        btnDisplay = target;
        calcDisplay = calcDisplay + target;
        totalArray.push(btnDisplay)
    }
}


function pressDecimal(target) {
    // if statement for when decimal is pressed and the number doesnt have a decimal already
    if (pressedBtnDisplay.innerText.includes(".") === false) {
        if (!operatorsArray.includes(previousTarget)) {
            btnDisplay = btnDisplay + target;
            calcDisplay = calcDisplay + target;
        } else if (isMinusNumber === true) {
            btnDisplay = btnDisplay + "0" + target;
            calcDisplay = calcDisplay + "0" + target;
        } else {
            btnDisplay = "0" + target;
            calcDisplay = "0" + target;
        }

    } 
 
    if (previousTarget === "=") {
        btnDisplay = target;
        calcDisplay = target;
    }
}



function pressNumber(target) {

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
    } else if (btnDisplay === "0") {
        btnDisplay = target;
        calcDisplay = calcDisplay.substr(0, calcDisplay.length - 1) + target;
    } else {
        btnDisplay = btnDisplay + target;
        calcDisplay = calcDisplay + target;
    }

}


function pressEquals(target) {
    if (operatorsArray.includes(previousTarget)) {
        calcDisplay = calcDisplay.substr(0, calcDisplay.length - 1);
    }

    if (!operatorsArray.includes(previousTarget)) {
        totalArray.push(btnDisplay);
    }

    calculateTotal(totalArray);
    btnDisplay = totalSum;
    calcDisplay = calcDisplay + target + totalSum;
}



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

    // rounding numbers to 4 decimal places if required
    if (equation[0].toString().length > 5) {
        let roundNumber = Number(equation[0].toFixed(4));
        equation[0] = roundNumber;
    }
    // setting total sum, and emptying calculation array
    totalSum = equation.join("");
    totalArray = [];

}

// key press function to initialise a click of the same button
function pressKey(event) {

    if (event.key === "x" || event.key === "*") {
        btnArray[btnArray.findIndex(element => element.innerText === "x")].click();
    }

    if (event.key === "Enter") {
        event.preventDefault();
        btnArray[btnArray.findIndex(element => element.innerText === "=")].click()
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
        btnArray[btnArray.findIndex(element => element.innerText === "AC")].click()
    }
}

