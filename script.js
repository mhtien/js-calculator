// targetting all the buttons
const btnArray = [...document.querySelectorAll("button")];

// creating eventlisteners for all buttons
btnArray.forEach(button => {
    button.addEventListener("click", showInput);
    button.addEventListener("click", changeButtonColors);
});

// event listener for any key presses
document.addEventListener("keydown", pressKey);

// target the pressing button display
const pressedBtnDisplay = document.getElementById("pressed-btn-display");
// initial value
pressedBtnDisplay.innerText = "0";
// variable for pressed button display
let btnDisplay = "";

// target for calculation display container
const calculationDisplay = document.getElementById("calculation-display");
// variable for showing calculation
let calcDisplay = "";
// array for operators prioritisng multiply and divide
const operatorsArray = ["x", "/", "+", "-"];


// setting initial variables
let totalSum = 0; //variable for calculation
let previousTarget = "AC";
let totalArray = []; // array for pushing operands and operators in
let isMinusNumber = false; // determines is the number input is going to be a negative number

//function for showing both the 'button' display and the calculation display, as well as pushing the operators and operands into the array for calculation
function showInput(event) {
    // limits character
    if (calcDisplay.length > 18 || btnDisplay.length > 10) {
        pressedBtnDisplay.innerText = "Exceeded Limit!";
        pressClear();
        return;
    }

    // variable for the button pressed
    let target = event.target.innerText;

    // if statement for clear button pressed
    if (target === "AC") {
        pressClear(target);
    }

    // if statement for any operators 
    if (operatorsArray.includes(target)) {
        pressOperators(target);
    }

    //if statement for decimal points
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

    //displaying both buttons pressed and calculation display
    pressedBtnDisplay.innerText = btnDisplay;
    calculationDisplay.innerText = calcDisplay;

    // changes the value of the previous target variable  
    previousTarget = target;
}

// function for "AC"
function pressClear(target) {
    btnDisplay = "0";
    calcDisplay = "";
    totalArray = [];
}

// function for "-"

function pressOperators(target) {
    const numSecondLast = !operatorsArray.includes(calcDisplay.slice(-2, -1));
    const operatorLast = operatorsArray.includes(calcDisplay.slice(-1));
    const twoOperatorsLast = operatorsArray.includes(calcDisplay.slice(-2, -1));

    if (previousTarget === "AC" && target === "-") {
        //for AC
        btnDisplay = target;
        calcDisplay = target;
        isMinusNumber = true; // as there are no numbers infront variable becomes true        
    } else if (target === "-" && numSecondLast && operatorLast) {
        // for minus operator when there is already an operator immediately logged before, and a number logged second to last
        btnDisplay = target;
        calcDisplay += target; // target added to calculation as assumes a minus number is going to be put in
        isMinusNumber = true; // variable is true as there is already an operator right before
    } else if (target !== "-" && numSecondLast && operatorLast) {
        // for all other operators when there is already an operator immediately logged before, and a number logged second to last
        btnDisplay = target;
        calcDisplay = calcDisplay.slice(0, -1) + target;
        totalArray.splice(-1, 1, btnDisplay); //removed previous operator and replaces with current
    } else if (twoOperatorsLast && operatorLast) {
        //for two operators immediately logged before i.e. assumes most cases that minus number variable is true, deletes both operator and replaces with one new one
        btnDisplay = target;
        calcDisplay = calcDisplay.slice(0, -2) + target;
        isMinusNumber = false;
        totalArray.splice(-1, 1, btnDisplay); //removed previous operator and replaces with current
    } else if (previousTarget === "=") {
        totalArray.push(btnDisplay); // pushes the number into the calculation array
        btnDisplay = target;
        calcDisplay = totalSum + target;
        totalArray.push(btnDisplay); // pushes the operator into the calculation array
    } else {
        totalArray.push(btnDisplay); // pushes the number into the calculation array
        btnDisplay = target;
        calcDisplay += target;
        totalArray.push(btnDisplay); // pushes the operator into the calculation array
    }
}

// function for decimal point
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

// function for numbers 
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

// function for equals
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
        calcDisplay = calcDisplay.slice(0, -1);
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
    while (operatorsArray.includes(equation[equation.length - 1])) {
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
        const operator = operatorsArray[i];
        while (equation.includes(operator)) {
            let pIndex = equation.indexOf(operator);
            let sum = 0;
            let numLeft = Number(equation[pIndex - 1]);
            let numRight = Number(equation[pIndex + 1]);
            if (operator === "x") {
                sum = numLeft * numRight;
            } else if (operator === "/") {
                sum = numLeft / numRight;
            } else if (operator === "+") {
                sum = numLeft + numRight;
            } else if (operator === "-") {
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

    let targetBtnText;
    if (event.key === "*") {
        targetBtnText = "x";
    } else if (event.key === "Enter") {
        targetBtnText = "=";
    } else if (event.key === "Backspace") {
        targetBtnText = "AC";
    } else {
        // targets al other buttons
        targetBtnText = event.key;
    }

    const targetBtn = btnArray.find(element => element.innerText === targetBtnText);

    // ignore none calculator buttons
    if (!targetBtn) {
        return
    }

    // key press calls associated click function
    targetBtn.click();

    //adds class of random color to targetted button and removes after 0.1s
    targetBtn.classList.add("active");
    setTimeout(function () {
        targetBtn.classList.remove("active");
    }, 100)

}

// colour array for when buttons are pressed
const colorArray = ["rgb(8, 247, 254)", "rgb(9, 251, 211)", "rgb(254, 83, 187)", "rgb(245, 211, 0)",
    "rgb(255, 172, 252)", "rgb(255, 34, 129)", "rgb(253, 199, 215)", "rgb(165, 216, 243)", "rgb(255, 148, 114)",
    "rgb(59, 85, 206)", "rgb(3, 122, 144)", "rgb(189, 189, 253)", "rgb(255, 170, 1)"];

// function for when any buttons are pressed to randomise background colour of keys, also includes the focus style to be 50% opacity of hidden colour

function changeButtonColors(event) {
    let randomNumber = Math.floor(Math.random() * colorArray.length);
    event.target.style.setProperty("--random-color", colorArray[randomNumber])
}

// initial colours set
btnArray.forEach(button => {
    let randomNumber = Math.floor(Math.random() * colorArray.length);
    button.style.setProperty("--random-color", colorArray[randomNumber])
})
