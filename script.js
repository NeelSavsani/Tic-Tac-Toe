let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbtn");
let newbtn = document.querySelector("#newbtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
let count = 0;

let winningPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log(`Clicked on box`);
        if(turn0 == true)
        {
            box.innerText = "O";
            turn0 = false;
        }
        else
        {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if(count === 9 && !isWinner)
        {
            gameDraw();
        }
    })
});

const gameDraw = () => {
    msg.innerText = "Game was a draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () => {
    for (let box of boxes)
    {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes)
    {
        box.disabled = false;
        box.innerText = "";
        msgContainer.classList.add("hide");
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`; 
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winningPatterns){
        // console.log(pattern[0], pattern[1], pattern[2]);
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        // console.log(pos1, pos2, pos3);
        if(pos1 != "" && pos2 != "" && pos3 != "")
        {
            if(pos1 == pos2 && pos2 == pos3)
            {
                showWinner(pos1);
            }
        }
    }
}

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    count = 0;

}

resetbtn.addEventListener("click", resetGame);
newbtn.addEventListener("click", resetGame);
