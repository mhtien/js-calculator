const calculatorBtns = document.querySelectorAll("button");

// all buttons in array
let btnArray = [...calculatorBtns];

// creating eventlisteners to all buttons
for (let i = 0; i < btnArray.length; i++) {
    btnArray[i].addEventListener("click", showWhatIsPressed)
    btnArray[i].addEventListener("click", showCalculation)
}

// target the pressing button display
const pressedBtnDisplay = document.getElementById("pressed-btn");

// variable for pressed button display
let btnDisplay = "";

function showWhatIsPressed(event) {
    // variable for the button pressed
    let target = event.target.innerText;

    // if statement for clear button pressed
    if (btnDisplay === totalSum || target === "AC") {
        btnDisplay = "";
    }

    // if statement for if any of sum symbols pressed
    if (target === "+"
        || target === "-"
        || target === "/"
        || target === "x") {
        // if statement to see if new symbol is pressed in leui of old symbol 
        if (previousTarget === "+"
            || previousTarget === "-"
            || previousTarget === "/"
            || previousTarget === "x") {                
                totalArray.splice(totalArray.length-1,1);
                btnDisplay = target;
                totalArray.push(btnDisplay)
            } else {
                totalArray.push(btnDisplay);
                btnDisplay = target;
                totalArray.push(btnDisplay)
            }
    }
    // if statement for when decimal is pressed and the number doesnt have a decimal already
    if (target === "." && pressedBtnDisplay.innerText.includes(".") === false) {
        btnDisplay = btnDisplay + target;
    }

    // if statement for when numbers are pressed
    if (target <= 9 && target >= 0) {
        if (btnDisplay === "+"
            || btnDisplay === "-"
            || btnDisplay === "/"
            || btnDisplay === "x") {
            btnDisplay = target;
        } else {
            btnDisplay = btnDisplay + target;
        }

    }
    // if statement when equals sign is pressedBtnDisplay, to perform and show calculation
    if (target === "=") {
        totalArray.push(btnDisplay);
        calculateTotal (totalArray);
        btnDisplay = totalSum;
    }
    pressedBtnDisplay.innerHTML = btnDisplay;
}

// target for calculation display container
const calculationDisplay = document.getElementById("calculation");
// variable for showing calculation
let calcDisplay = "";


function showCalculation(event) {
    let targetText = event.target.innerText;

    if (targetText === "AC") {
        calcDisplay = "";
        totalSum = 0;
        totalArray = [];
    }

    if (previousTarget === "=") {
        if (targetText === "+"
            || targetText === "-"
            || targetText === "/"
            || targetText === "x") {
            calcDisplay = totalSum;
            totalArray = [totalSum];
        } else {
            calcDisplay = "";
            totalSum = 0;
            totalArray = [];
        }
    }

    if (targetText === "=") {
        calcDisplay = calcDisplay + targetText + totalSum;
    }

    if ((targetText <= 9 && targetText >= 0) || targetText === ".") {
        calcDisplay = calcDisplay + targetText;
    }

    if (targetText === "+"
        || targetText === "-"
        || targetText === "/"
        || targetText === "x") {
        if (previousTarget === "+"
            || previousTarget === "-"
            || previousTarget === "/"
            || previousTarget === "x") {
            calcDisplay = calcDisplay.substring(0, calcDisplay.length - 1);
            calcDisplay += targetText;
        } else {
            calcDisplay = calcDisplay + targetText;
        }
    }
    console.log(totalArray);


    calculationDisplay.innerHTML = calcDisplay;

    // changes the value of the previous target variable  
    previousTarget = targetText;

}

// total sum
let totalSum = 0;

// previous button pressed
let previousTarget = "";

let totalArray = [];

