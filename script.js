const calculatorBtns = document.querySelectorAll("button");

// all buttons in array
let btnArray = [...calculatorBtns];

// creating eventlisteners to all buttons
for (let i = 0; i < btnArray.length; i++) {
    btnArray[i].addEventListener("click", showInput);
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

const symbolArray = ["+", "-", "x", "/"];

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
    if (symbolArray.includes(target)) {
        // if statement to see if new symbol is pressed in leui of old symbol
        if (previousTarget === "=") {
            totalArray.push(target);
            btnDisplay = target;
            calcDisplay = totalSum + target;
            totalSum = 0;
        } else if (symbolArray.includes(previousTarget)) {
            totalArray.splice(totalArray.length - 1, 1);
            btnDisplay = target;
            calcDisplay = calcDisplay.substr(0,calcDisplay.length-1) + target;
            totalArray.push(btnDisplay)
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

    // if statement for when numbers are pressed
    if (target <= 9 && target >= 0) {
        if (symbolArray.includes(btnDisplay)) {
            btnDisplay = target;
            calcDisplay = calcDisplay + target;
        } else if (previousTarget === "=") {
            btnDisplay = target;
            calcDisplay = target;
            totalSum = 0;
            totalArray = [];
        } else {
            btnDisplay = btnDisplay + target;
            calcDisplay = calcDisplay + target;
        }

    }
    // if statement when equals sign is pressedBtnDisplay, to perform and show calculation
    if (target === "=" && previousTarget !== "=") {
        totalArray.push(btnDisplay);
        calculateTotal(totalArray);
        btnDisplay = totalSum;
        calcDisplay = calcDisplay + target + totalSum;
        totalArray.push(totalSum);
    }
    pressedBtnDisplay.innerHTML = btnDisplay;
    calculationDisplay.innerText = calcDisplay;
    // changes the value of the previous target variable  
    previousTarget = target;
}



// function showCalculation(event) {
//     console.log("1",previousTarget);
//     let target = event.target.innerText;

//     if (target === "AC") {
//         calcDisplay = "";
//     }

//     if (symbolArray.includes(target)) {
//         if (previousTarget === "=") {
//             calcDisplay = calcDisplay + target;
//         }
        
//         if (symbolArray.includes(previousTarget)) {
//             calcDisplay = calcDisplay.substr(0,calcDisplay.length-1);
//         } 
//             // calcDisplay = calcDisplay + target;
//     }

//     if (target === "." && btnDisplay.includes(".") === false) {
//         calcDisplay = calcDisplay + target;
//     }

//     if (target <=9 && target >=0) {
//         if (previousTarget === "=") {
//             calcDisplay = target;
//         } else {
//             calcDisplay = calcDisplay + target;
//         }
//     }

//     if (target === "=" && previousTarget !== "=") {
//         calcDisplay = calcDisplay + target + btnDisplay;
//     }

//     calculationDisplay.innerText = calcDisplay;
//     console.log("2",previousTarget);

// }

// total sum
let totalSum = 0;

// previous button pressed
let previousTarget = "";

let totalArray = [];

// calculating the sum

function calculateTotal(array) {

    if (array.length === 1) {
        return totalSum = array[0];
    }
    do {
        if (array.includes("x") && array.includes("/")) {
            if (array.indexOf("x") < array.indexOf("/")) {
                let pIndex = array.indexOf("x");
                let mSum = array[pIndex - 1] * array[pIndex + 1];
                array.splice(pIndex - 1, 3, mSum);
            } else {
                let pIndex = array.indexOf("/");
                let mSum = array[pIndex - 1] / array[pIndex + 1];
                array.splice(pIndex - 1, 3, mSum);
            }
        }

        if (array.includes("x") || array.includes("/")) {
            if (array.indexOf("x") > 0 && array.indexOf("/") < 0) {
                let priorityIndex = array.indexOf("x");
                let miniSum = array[priorityIndex - 1] * array[priorityIndex + 1];
                array.splice(priorityIndex - 1, 3, miniSum);
            } else if (array.indexOf("x") < 0 && array.indexOf("/") > 0) {
                let priorityIndex = array.indexOf("/");
                let miniSum = array[priorityIndex - 1] / array[priorityIndex + 1];
                array.splice(priorityIndex - 1, 3, miniSum);
            }
        }
    } while (array.includes("x") || array.includes("/"));

    do {
        if (array.includes("+") && array.includes("-")) {
            if (array.indexOf("+") < array.indexOf("-")) {
                let pIndex = array.indexOf("+");
                let mSum = Number(array[pIndex - 1]) + Number(array[pIndex + 1]);
                array.splice(pIndex - 1, 3, mSum);
            } else {
                let pIndex = array.indexOf("-");
                let mSum = array[pIndex - 1] - array[pIndex + 1];
                array.splice(pIndex - 1, 3, mSum);
            }
        }

        if (array.includes("+") || array.includes("-")) {
            if (array.indexOf("+") > 0 && array.indexOf("-") < 0) {
                let priorityIndex = array.indexOf("+");
                let miniSum = Number(array[priorityIndex - 1]) + Number(array[priorityIndex + 1]);
                array.splice(priorityIndex - 1, 3, miniSum);
            } else if (array.indexOf("+") < 0 && array.indexOf("-") > 0) {
                let priorityIndex = array.indexOf("-");
                let miniSum = array[priorityIndex - 1] - array[priorityIndex + 1];
                array.splice(priorityIndex - 1, 3, miniSum);
            }
        }
    }
    while (array.includes("+") || array.includes("-"))

    totalSum = array.join("");
    totalArray = [];

}