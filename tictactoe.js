let boxes= document.querySelectorAll(".box");
let reset= document.querySelector("#reset");
let newGameBtn= document.querySelector("#new-btn");
let msgContainer= document.querySelector(".msg-container");
let msg= document.querySelector("#msg");


let turnO= true;
let count=0;
const winPattern= [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame= () => {
    turnO= true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");

    const line= document.querySelector(".line");
    if (line) {
        line.remove();
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if(turnO) {
            box.innerText= "O";
            turnO = false;
        }else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled= true;
        count++;

        let isWinner= checkWinner();
        if (count ===9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText=`Game was a Draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled=true;
    }
};
const enableBoxes = () => {
        for(let box of boxes) {
            box.disabled= false;
            box.innerText="";
        }
};




const checkWinner= () => {
    for(let pattern of winPattern) {
        let pos1Val= boxes[pattern[0]].innerText;
        let pos2Val= boxes[pattern[1]].innerText;
        let pos3Val= boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                createLine(pattern);
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

const createLine = (pattern) => {
    const line = document.createElement("div");
    line.classList.add("line");
    const positions = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8],
        [0, 4, 8], 
        [2, 4, 6], 
    ];

    const lineStyles = [
        { top: "15%", left: "5%", width: "90%", rotate: "0deg" },
        { top: "50%", left: "5%", width: "90%", rotate: "0deg" },
        { top: "85%", left: "5%", width: "90%", rotate: "0deg" },
        { top: "5%", left: "15%", width: "90%", rotate: "90deg" }, 
        { top: "5%", left: "50%", width: "90%", rotate: "90deg" },
        { top: "5%", left: "85%", width: "90%", rotate: "90deg" },
        { top: "5%", left: "5%", width: "90%", rotate: "45deg" }, 
        { top: "5%", left: "5%", width: "90%", rotate: "-45deg" },
    ];

    const index = positions.findIndex((pos) =>
        pos.every((val, i) => val === pattern[i])
    );

    // if (index !== -1) {
        const { top, left, width, rotate } = lineStyles[index];
        line.style.top = top;
        line.style.left = left;
        line.style.width = width;
        line.style.transform = `rotate(${rotate})`;

        document.querySelector(".container").appendChild(line);

        setTimeout(() => {
            line.style.width = "90%";
        }, 50);
    };
// }; 

const showWinner = (winner) => {
    msg.innerText= `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

reset.addEventListener("click",resetGame);
newGameBtn.addEventListener("click",resetGame);

