const cvs = document.getElementById("frame");
const ctx = cvs.getContext("2d");

const ROW = 20;
const COL = 10;
const SQ  = 20;//squareSize
const VACANT = "#F0EBCE";

const PIECES = [
    [Z,"#F7A4A4"],
    [S,"#FEBE8C"],
    [T,"#FFFBC1"],
    [O,"#B6E2A1"],
    [L,"#B8E8FC"],
    [I,"#B1AFFF"],
    [J,"#F9C5D5"]
];


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



