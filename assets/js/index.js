import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
console.log(board.grid);

// Your code here

// Phase One: Board
const gameBoard = document.createElement("main");
gameBoard.setAttribute("id", "board");

board.grid.forEach((row, i) => {
    row.forEach((box, j) => {
        const boardDiv = document.createElement("div");
        boardDiv.id = `${i}-${j}`;
        boardDiv.className = "square";
        boardDiv.dataset.row = i;
        boardDiv.dataset.col = j;

        gameBoard.append(boardDiv)
    });
});


// Clicking squares
document.body.append(gameBoard);
let checkClicks = event => {
    if (event.target.className === "square") {
        let hitOrMiss = board.makeHit(event.target.dataset.row, event.target.dataset.col);
        if (!hitOrMiss) {
            event.target.style.backgroundColor = "red";
        } else {
            event.target.style.backgroundColor = "green";
            event.target.innerText = hitOrMiss;
        }
    }
};
gameBoard.addEventListener("click", checkClicks);


// Phase Two: Game Over Message
const gameOverMsg = document.createElement("h2");
gameOverMsg.innerText = "You Win"
gameOverMsg.id = "game-over-msg"

gameBoard.addEventListener("click", event => {
    if (board.isGameOver()) {
        document.body.insertBefore(gameOverMsg, gameBoard);
        gameBoard.removeEventListener("click", checkClicks);
    } else {
        gameOverMsg.remove();
    }
});

// Phase Three: Add a reset button
const resetBtn = document.createElement("button");
resetBtn.setAttribute("type", "reset");
resetBtn.innerText = "Reset Game";
resetBtn.setAttribute("id", "reset");

document.body.insertBefore(resetBtn, gameBoard);

resetBtn.addEventListener("click", event => {
    const reset = confirm("Do you want to reset?");
    if (reset) {
        window.location.reload();
    }
});
