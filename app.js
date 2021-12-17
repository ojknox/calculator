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

keys.addEventListener('click', e => {
    if(e.target.matches('button')){
        const key = e.target;
        const action = key.dataset.action;

        if(!action) {
            console.log('number key!')
        } else {
            console.log(action);
        }
    }
})

//access text in the screen => if 0 replace with clicked number, if not 0 then append clicked number
//to the number on the screen.

//decimal = decimal should appear on the display. If number hit after decimal key then should be appended

//