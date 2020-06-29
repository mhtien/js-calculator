// targetting all the buttons
const calculatorBtns = document.querySelectorAll("button");

// all buttons copied into array
let btnArray = [...calculatorBtns];

// creating eventlisteners for all buttons
btnArray.forEach(button => {
    button.addEventListener("click", showInput);
});

// event listener for any key presses
document.addEventListener("keypress", pressKey);
// event listener for any key presses
document.addEventListener("keydown", keyDown);

// target the pressing button display
const pressedBtnDisplay = document.getElementById("pressed-btn");

// initial value
pressedBtnDisplay.innerText = "0";
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
    if (operatorsArray.includes(target) && target === "-") {
        pressMinus(target);
    }

    if (operatorsArray.includes(target) && target !== "-") {
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

function pressMinus(target) {
    if (previousTarget === "AC") {
        //for AC
        btnDisplay = target;
        calcDisplay = target;
        isMinusNumber = true;
    } else if (!operatorsArray.includes(calcDisplay.slice(-2, -1)) && operatorsArray.includes(calcDisplay.slice(-1))) {
        //for one operator immediately logged before
        btnDisplay = target;
        calcDisplay += target;
        isMinusNumber = true;
        //for two operators immediately logged before
    } else if (operatorsArray.includes(calcDisplay.slice(-2, -1)) && operatorsArray.includes(calcDisplay.slice(-1))) {
        btnDisplay = target;
        calcDisplay = calcDisplay.slice(0, -2) + target;
        isMinusNumber = false;
        totalArray.pop();
        totalArray.push(btnDisplay);
    } else if (previousTarget === "=") {
        totalArray.push(btnDisplay);
        btnDisplay = target;
        calcDisplay = totalSum + target;
        totalArray.push(btnDisplay);
    } else {
        totalArray.push(btnDisplay);
        btnDisplay = target;
        calcDisplay += target;
        totalArray.push(btnDisplay);
    }

}

function pressOperators(target) {
    if (previousTarget === "AC") {
        //do nothing
    } else if (!operatorsArray.includes(calcDisplay.slice(-2, -1)) && operatorsArray.includes(calcDisplay.slice(-1))) {
        //for one operator immediately logged before
        btnDisplay = target;
        calcDisplay = calcDisplay.slice(0, -1) + target;
        totalArray.pop();
        totalArray.push(btnDisplay);
    } else if (operatorsArray.includes(calcDisplay.slice(-2, -1)) && operatorsArray.includes(calcDisplay.slice(-1))) {
        //for two operators immediately logged before
        btnDisplay = target;
        calcDisplay = calcDisplay.slice(0, -2) + target;
        isMinusNumber = false;
        totalArray.pop();
        totalArray.push(btnDisplay);
    } else if (previousTarget === "=") {
        totalArray.push(btnDisplay);
        btnDisplay = target;
        calcDisplay = totalSum + target;
        totalArray.push(btnDisplay);
    } else {
        totalArray.push(btnDisplay);
        btnDisplay = target;
        calcDisplay += target;
        totalArray.push(btnDisplay);
    }

}




function pressDecimal(target) {
    if (previousTarget === "=" || previousTarget === "AC") {
        //for AC and equals
        btnDisplay = "0" + target;
        calcDisplay = "0" + target;
    } else if (operatorsArray.includes(previousTarget) && isMinusNumber === false) {
        //for all operators and if isMinusNumber is false
        btnDisplay = "0" + target;
        calcDisplay += "0" + target;
    } else if (isMinusNumber === true) {
        //if minus number is true
        btnDisplay += "0" + target;
        calcDisplay += "0" + target;
        isMinusNumber = false;
    } else if (!btnDisplay.includes(".")) {
        btnDisplay += target;
        calcDisplay += target;
    }
}

function pressNumber(target) {
    if (previousTarget === "=" || previousTarget === "AC") {
        //for AC and equals
        btnDisplay = target;
        calcDisplay = target;
    } else if (operatorsArray.includes(previousTarget) && isMinusNumber === false) {
        //for all operators if isMinusNumber is false
        btnDisplay = target;
        calcDisplay += target;
    } else if (isMinusNumber === true) {
        //if minus number is true
        btnDisplay += target;
        calcDisplay += target;
        isMinusNumber = false;
    } else if (btnDisplay === "0") {
        //to prevent multiply zeros
        btnDisplay = target;
        calcDisplay = calcDisplay.slice(0, -1) + target;
    } else {
        //for numbers and decimals
        btnDisplay += target;
        calcDisplay += target;
    }

}


function pressEquals(target) {

    if (previousTarget === "AC") {
        //for AC 
        // do nothing
    } else if (operatorsArray.includes(previousTarget) && isMinusNumber === false) {
        //for all operators
        calcDisplay = calcDisplay.slice(0, -1);
    } else if (isMinusNumber === true) {
        //if minus number is true
        calcDisplay = calcDisplay.slice(0, -2);
        isMinusNumber = false;
    } else if (previousTarget === ".") {
        //to prevent decimal point without number after
        btnDisplay = btnDisplay.slice(0, -1);
        calcDisplay = calcDisplay.slice(0,-1);
        totalArray.push(btnDisplay)
    } else {
        //for numbers
        totalArray.push(btnDisplay)
    }

    if (previousTarget !== "AC") {
    calculateTotal(totalArray);
    btnDisplay = totalSum;
    calcDisplay = calcDisplay + target + totalSum;
    isMinusNumber = false;
    }
}




//function for calculating the total
function calculateTotal(equation) {
    // removes all operators after last number
    while (operatorsArray.includes(equation[equation.length-1])) {
        equation.pop();
    }

    // returns the number or zero if calculation doesnt consist of two operands and one operator
    if (equation.length === 1) {
        totalSum = equation.join("");
        totalArray = [];
        return;
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

