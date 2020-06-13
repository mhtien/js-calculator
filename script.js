// number buttons

const zeroBtn = document.getElementById("zero");
const oneBtn = document.getElementById("one");
const twoBtn = document.getElementById("two");
const threeBtn = document.getElementById("three");
const fourBtn = document.getElementById("four");
const fiveBtn = document.getElementById("five");
const sixBtn = document.getElementById("six");
const sevenBtn = document.getElementById("seven");
const eightBtn = document.getElementById("eight");
const nineBtn = document.getElementById("nine");

// sum buttons

const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");
const addBtn = document.getElementById("add");
const subtractBtn = document.getElementById("subtract");
const multiplyBtn = document.getElementById("multiply");
const decimalBtn = document.getElementById("decimal");
const divideBtn = document.getElementById("divide");

const calculatorBtns = document.querySelectorAll("button");
// all buttons in array
let btnArray = [...calculatorBtns];

for (let i = 0; i<btnArray.length; i++) {
    let innerText = btnArray[i].innerText;
    btnArray[i].addEventListener("click",function() {
    console.log("you clicked " + innerText)
    })
}



