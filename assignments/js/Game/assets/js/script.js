const cvs = document.getElementById("frame");
const ctx = cvs.getContext("2d");

const ROW = 20;
const COL = 10;
const SQ  = 20;//squareSize
const VACANT = "#F0EBCE";

let board = [];


function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ);

    ctx.strokeStyle = "#F0EBCE";
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
}

for (r=0; r < ROW; r++ ){
    board[r] = [];
    for(c=0; c < COL; c++){
        board[r,c] = VACANT;
    }
}

function drawBoard() {
    for (r=0; r < ROW; r++){
        for (c=0; c < COL; c++){
           drawSquare(c,r,board[r][c]);
        }
    }
}

drawBoard();



