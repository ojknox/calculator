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

//calculator function
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

//listening for clicking on the calculator
keys.addEventListener('click', e => {
    if(e.target.matches('button')){
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayContent = display.textContent;

        if(action === 'add' || action === 'subtract' || action === 'divide' || action === 'multiply') {
            //if press another operator - check to see if already have a first value and operator
            if(calculator.dataset.firstValue && calculator.dataset.operator && calculator.dataset.prevKey !== 'operator'){
                const calcValue = calculate(calculator.dataset.firstValue, calculator.dataset.operator, displayContent);
                console.log('calculated');
                display.textContent = calcValue;
                calculator.dataset.firstValue = calcValue;
                console.log(calculator.dataset.firstValue);
            } else {
                //note if operator key pressed
                calculator.dataset.prevKey = 'operator';
                console.log(`prevKey = ${calculator.dataset.prevKey}`);
                //keep first value recorded
                calculator.dataset.firstValue = displayContent;
                console.log(`firstValue = ${calculator.dataset.firstValue}`);
                //record action clicked
                calculator.dataset.operator = action;  
                console.log(`operator = ${calculator.dataset.operator}`); 
            }
        }

        if(!action){
            if(displayContent === '0' || calculator.dataset.prevKey === 'operator') {
                display.textContent = keyContent;
                calculator.dataset.prevKey = '';
            } else {
                display.textContent = displayContent + keyContent;
            }
        } else if(action === 'decimal' && !displayContent.includes('.')) {
            if(calculator.dataset.prevKey === 'operator'){
                display.textContent = '0.';
                calculator.dataset.prevKey = '';
            } else {
                display.textContent = displayContent + '.';
            }
        } else if(action === 'reset') {
            display.textContent = '0';
            calculator.dataset.prevKey = '';
            calculator.dataset.firstValue = '';
        } else if(action === 'equals') {
            const firstValue = calculator.dataset.firstValue;
            const secondValue = displayContent;
            const operator = calculator.dataset.operator;
            display.textContent = calculate(firstValue, operator, secondValue);
            //reset screen
            calculator.dataset.prevKey = 'operator';
        }
    }
})

//onclick of operator buttons - make it look clicked - border shadow on click? 