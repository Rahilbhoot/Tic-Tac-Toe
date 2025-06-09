let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let gif = document.querySelector(".gif");
let counter = 0;
let msg = document.querySelector(".msg");

let turnO = true;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    counter = 0;
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#548687"
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "#b0413e"
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    })
})

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    if (gif.classList.contains("hide")) {
        gif.classList.remove("hide");
    }
    let Audio1 = new Audio("./Assets/popsound.wav");
    Audio1.play();
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const draw = () => {
    counter++;
    if (counter === 9) {
        msg.innerText = `The Game was draw. 🚩`;
        let Audio2 = new Audio("./Assets/Drawgame.wav");
        Audio2.play();
        gif.classList.add("hide");
        msgContainer.classList.remove("hide");
    }
}

const checkWinner = () => {
    for (pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
            }
        }
    }
    draw();
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);