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
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);
    if(operator === 'add') return firstNum + secondNum;
    if(operator === 'subtract') return firstNum - secondNum;
    if(operator === 'multiply') return firstNum * secondNum;
    if(operator === 'divide') return firstNum / secondNum;
}

//listening for clicking on the calculator
keys.addEventListener('click', e => {
    if(e.target.matches('button')){

        const key = e.target; //which html element clicked on 
        const action = key.dataset.action; //logs action - if the button has one
        const keyContent = key.textContent; //text in key pressed
        const displayContent = display.textContent; //display content
        const previousKeyType = calculator.dataset.previousKeyType //remember previous key

        //if key doesn't have an action i.e. number key 
        if(!action){
            if(displayContent === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayContent + keyContent;
            }
            calculator.dataset.previousKeyType = 'number';
        }

        //if press decimal key
        if(action === 'decimal' && !displayContent.includes('.')) {
            if(previousKeyType === 'operator' || previousKeyType === 'calculate'){
                display.textContent = '0.';
            } else {
                display.textContent = displayContent + '.';
            }
            calculator.dataset.previousKeyType = 'decimal';
        } 

        //if press an operator key
        if(action === 'add' || action === 'subtract' || action === 'divide' || action === 'multiply') {  
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayContent;

            if(firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate'){
                const calcValue = calculate(firstValue, operator, secondValue);
                display.textContent = calcValue;
                calculator.dataset.firstValue = calcValue;
            } else {
                //keep first value recorded
                calculator.dataset.firstValue = displayContent;
            }

            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.operator = action;
        }
        
        //pressing the reset button
        if(action === 'reset') {
            display.textContent = '0'
            calculator.dataset.firstValue = '';
            calculator.dataset.operator = '';
            calculator.dataset.modValue = '';
            calculator.dataset.previousKeyType = 'reset';
        }
        
        //pressing the delete button
        if(action === 'delete') {
            if(displayContent.length > 1) {
                let editedContent = displayContent.slice(0,-1);
                display.textContent = editedContent;
            }
            
            if(displayContent.length === 1) {
                display.textContent = '0';
            }
        } 
        
        //pressing the equals button
        if(action === 'equals') {
            let firstValue = calculator.dataset.firstValue;
            let secondValue = displayContent;
            const operator = calculator.dataset.operator;

            if(firstValue){
                if(previousKeyType === 'calculate') {
                    firstValue = displayContent;
                    secondValue = calculator.dataset.modValue;
                }
                
                display.textContent = calculate(firstValue, operator, secondValue);
            } 
            
            calculator.dataset.modValue = secondValue;
            calculator.dataset.previousKeyType = 'calculate';
        }
    }
})

//onclick of operator buttons - make it look clicked - border shadow on click? 