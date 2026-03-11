let gameseq = [];
let userseq = [];

let btns = ["Brown", "Orange", "Yellow", "Blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");


// START GAME WHEN CLICKING ANYWHERE (EXCEPT BUTTONS)
document.addEventListener("click", function (event) {
    if (!started && !event.target.classList.contains("btn")) {
        console.log("Game Started");
        started = true;
        levelUP();
    }
});


// GAME BUTTON FLASH
function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}


// USER BUTTON FLASH
function userFlash(btn) {
    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}


// LEVEL UP
function levelUP() {

    userseq = [];
    level++;

    h2.innerText = `Level ${level}`;

    let randomidx = Math.floor(Math.random() * btns.length);
    let randomcolor = btns[randomidx];

    let randombtn = document.querySelector(`.${randomcolor}`);

    gameseq.push(randomcolor);

    console.log("Game Sequence:", gameseq);

    gameFlash(randombtn);
}


// CHECK USER INPUT
function check(idx) {

    if (userseq[idx] === gameseq[idx]) {

        if (userseq.length === gameseq.length) {
            setTimeout(levelUP, 1000);
        }

    } else {

        let score = level - 1;

        h2.innerHTML = `Game Over! Your Score was <b>${score}</b> <br> Click anywhere to Start Again`;

        document.body.style.backgroundColor = "red";

        setTimeout(function () {
            document.body.style.backgroundColor = "rgb(192 214 223)";
        }, 200);

        reset();
    }
}


// BUTTON PRESS
function btnPress() {

    if (!started) return;

    let btn = this;

    userFlash(btn);

    let usercolor = btn.getAttribute("id");

    userseq.push(usercolor);

    console.log("User Sequence:", userseq);

    check(userseq.length - 1);
}


// ADD EVENT LISTENERS TO BUTTONS
let allbtns = document.querySelectorAll(".btn");

for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}


// RESET GAME
function reset() {

    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}