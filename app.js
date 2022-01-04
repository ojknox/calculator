// DOM Elements
const body = document.body;
const theme1 = document.getElementById('theme1');
const theme2 = document.getElementById('theme2');
const theme3 = document.getElementById('theme3');
const toggle = document.getElementById('toggle');

//toggle locations
const theme1Pos = '3px';
const theme2Pos = '18px';
const theme3Pos = '35px';

//button event handlers
theme1.onclick = () => {
    body.classList.replace(body.classList.value, 'theme1');
    toggle.style.left = theme1Pos;
}

theme2.onclick = () => {
    body.classList.replace(body.classList.value, 'theme2');
    toggle.style.left = theme2Pos;
}

theme3.onclick = () => {
    body.classList.replace(body.classList.value, 'theme3');
    toggle.style.left = theme3Pos;
}

//Keyboard clicking
const keys = document.querySelector('.grid');
const display = document.querySelector('.screen');
const calculator = document.querySelector('.calculator');

const calculate = (n1, operator, n2) => {
    let result = '';
    if(operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2);
    } else if(operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2);
    } else if(operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2);
    } else if(operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2);
    }
    return result;
}

keys.addEventListener('click', e => {
    if(e.target.matches('button')){
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayContent = display.textContent;

        if(action === 'add' || action === 'subtract' || action === 'divide' || action === 'multiply') {
            //note if operator key pressed
            calculator.dataset.prevKey = 'operator';
            //keep first value recorded
            calculator.dataset.firstValue = displayContent;
            //record action clicked
            calculator.dataset.operator = action;
        }

        if(!action){
            if(displayContent === '0' || calculator.dataset.prevKey === 'operator') {
                display.textContent = keyContent;
                calculator.dataset.prevKey = '';
            } else {
                display.textContent = displayContent + keyContent;
            }
        } else if(action === 'decimal') {
            display.textContent = displayContent + '.';
        } else if(action === 'reset') {
            display.textContent = '0';
        } else if(action === 'equals') {
            const firstValue = calculator.dataset.firstValue;
            const secondValue = displayContent;
            const operator = calculator.dataset.operator;
            display.textContent = calculate(firstValue, operator, secondValue);
        }
    }
})

//need to make more robust. 