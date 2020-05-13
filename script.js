var display = document.getElementById("display");
const del = document.getElementsByClassName("btnDel");
var signed = false;
var dotted = false;
var firstNumber = 0;
var op = null;
var startCollectingSecondNumber = false;

function showOnScreen(btn) {
    let currentDisplayLength = display.innerText.length;

    if (currentDisplayLength >= 10) {
        return;
    }
    var x = btn.value;
    if (x == ".") {
        if (dotted) {
            return;
        }
        dotted = true;
    }
    if (startCollectingSecondNumber || (display.innerText == "0" && x != ".")) {
        display.innerText = x;
    } else {
        display.innerText += x;
    }
    startCollectingSecondNumber = false;
}

function toggleSign() {
    if (signed) {
        display.innerText = display.innerText.substr(1);
        signed = false;
    } else if (display.innerText != "0") {
        display.innerText = "-" + display.innerText;
        signed = true;
    }
}

function clearDisplay(val) {
    display.innerText = "0";
    dotted = false;
    signed = false;
    op = null;
}

function backSpace() {
    let curDisplay = display.innerText;
    curDisplay = curDisplay.slice(0, -1);
    display.innerHTML = curDisplay;
}
del[0].addEventListener("click", backSpace, false);

function percentSign() {
    display.innerText = parseFloat(display.innerText) / 100;
}

function operate(btn) {
    if (firstNumber && op) {
        firstNumber = equalsTo();
    } else {
        firstNumber = parseFloat(display.innerText);
    }
    op = btn.value;
    startCollectingSecondNumber = true;
}

function equalsTo() {
    var value = 0;
    switch (op) {
        case "/":
            value = firstNumber / parseFloat(display.innerText);
            break;
        case "x":
            value = firstNumber * parseFloat(display.innerText);
            break;
        case "-":
            value = firstNumber - parseFloat(display.innerText);
            break;
        case "+":
            value = firstNumber + parseFloat(display.innerText);
            break;
    }

    display.innerHTML = +(Math.round(value + "e+" + 5) + "e-" + 5);

    dotted = false;
    signed = false;
    op = null;

    return value;
}
