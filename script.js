const calculatorBtns = document.querySelectorAll("button");

// all buttons in array
let btnArray = [...calculatorBtns];

// creating eventlisteners to all buttons
for (let i = 0; i < btnArray.length; i++) {
    btnArray[i].addEventListener("click", showWhatIsPressed)
    // btnArray[i].addEventListener("click", showCalculation)
}

// target the pressing button display
const pressedBtnDisplay = document.getElementById("pressed-btn");

// variable for pressed button display
let btnDisplay = "";

let symbolArray = ["+","-","x","/"];

function showWhatIsPressed(event) {
    // variable for the button pressed
    let target = event.target.innerText;

    // if statement for clear button pressed
    if (target === "AC") {
        btnDisplay = "";
        totalSum = 0;
        totalArray = [];
    }

    // if statement for if any of sum symbols pressed
    if (target === "+"
        || target === "-"
        || target === "/"
        || target === "x") {
        // if statement to see if new symbol is pressed in leui of old symbol
        if (previousTarget === "=") {
            totalArray.push(target);
            btnDisplay = target;
            totalSum =0;
        } else if (previousTarget === "+"
            || previousTarget === "-"
            || previousTarget === "/"
            || previousTarget === "x") {
            totalArray.splice(totalArray.length - 1, 1);
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
        } else if (previousTarget === "=") {
            btnDisplay = target;
            totalSum = 0;
            totalArray = [];
        } else {
            btnDisplay = btnDisplay + target;
        }

    }
    // if statement when equals sign is pressedBtnDisplay, to perform and show calculation
    if (target === "=") {
        totalArray.push(btnDisplay);
        calculateTotal(totalArray);
        btnDisplay = totalSum;
        totalArray.push(totalSum);
    }
    pressedBtnDisplay.innerHTML = btnDisplay;
    // changes the value of the previous target variable  
    previousTarget = target;
}

// target for calculation display container
const calculationDisplay = document.getElementById("calculation");
// variable for showing calculation
let calcDisplay = "";


// function showCalculation(event) {
//     let targetText = event.target.innerText;

//     if (targetText === "AC") {
//         calcDisplay = "";
//     }

//     if (previousTarget === "=") {
//         if (targetText === "+"
//             || targetText === "-"
//             || targetText === "/"
//             || targetText === "x") {
//             calcDisplay = totalSum;
//             totalArray = [totalSum];
//         } else {
//             calcDisplay = "";
//             totalSum = 0;
//             totalArray = [];
//         }
//     }

//     if (targetText === "=") {
//         calcDisplay = calcDisplay + targetText + totalSum;
//     }

//     if ((targetText <= 9 && targetText >= 0) || targetText === ".") {
//         calcDisplay = calcDisplay + targetText;
//     }

//     if (targetText === "+"
//         || targetText === "-"
//         || targetText === "/"
//         || targetText === "x") {
//         if (previousTarget === "+"
//             || previousTarget === "-"
//             || previousTarget === "/"
//             || previousTarget === "x") {
//             calcDisplay = calcDisplay.substring(0, calcDisplay.length - 1);
//             calcDisplay += targetText;
//         } else {
//             calcDisplay = calcDisplay + targetText;
//         }
//     }
//     calculationDisplay.innerHTML = calcDisplay;



// }

// total sum
let totalSum = 0;

// previous button pressed
let previousTarget = "";

let totalArray = [];

// calculating the sum

function calculateTotal(array) {
    const filterNumbers = array.filter(val => {
        if (Number(val)) {
            return val;
        }
    })

    const filterSymbols = array.filter(val => {
        if (val === "+" || val === "-" || val === "/" || val === "x") {
            return val;
        }
    })

    let sum = 0;

    for (let i = 0; i < filterNumbers.length; i++) {
        if (filterSymbols.length === 0) {
            sum = filterNumbers[0];
        }
        if (i === 0) {
            sum = filterNumbers[i];
        }
        if (filterSymbols[i] === "+") {
            sum = Number(sum) + Number(filterNumbers[i + 1]);
        }
        if (filterSymbols[i] === "-") {
            sum = sum - filterNumbers[i + 1];

        }
        if (filterSymbols[i] === "/") {
            sum = sum / filterNumbers[i + 1];

        }
        if (filterSymbols[i] === "x") {
            sum = sum * filterNumbers[i + 1];
        }
    }
    console.log("totalArray", array);
    console.log("filterNum", filterNumbers);
    console.log("filterSym", filterSymbols);

    totalSum += sum;
    totalArray = [];

}
