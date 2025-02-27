let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO

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

const resetGame = ()=>{
    turnO = true;
    enabledBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enabledBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}


const showWinner = (winner)=>{
  setTimeout(()=>{
    msg.innerText = `Congratulations!!! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  },1000);
};

const matchDraw = ()=>{
  setTimeout(()=>{
    msg.innerText = `The match was draw!!!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  },1000);
};

const checkWinner = () => {
  let filledBoxes = 0;
  for (let pattern of winPatterns) {   
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if(pos1 != "" && pos2 != "" && pos3 != ""){
        if(pos1 === pos2 && pos2 === pos3){
            showWinner(pos1);
        }
    }
  }
  
boxes.forEach(box => {
  if(box.innerText !== ""){
    filledBoxes++;
  }
});

if(filledBoxes === 9){
  matchDraw();
}
};

newGameBtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame)