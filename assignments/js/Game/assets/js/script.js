const cvs = document.getElementById("frame");
const ctx = cvs.getContext("2d");
const scoreElement = document.getElementById("score");

const ROW = 20;
const COL = 10;
const SQ  = 20; //squareSize
const VACANT = "#30343f";

const PIECES = [
    [Z,"#143F6B"],
    [S,"#FEB139"],
    [T,"#EA047E"],
    [O,"#FF6D28"],
    [L,"#FCE700"],
    [I,"#367E18"],
    [J,"#00F5FF"]
];


let board = [];
let p = randomPiece();
let score = 0;

let dropStart = Date.now();
let gameOver = false;




function drawSquare(x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ);

    ctx.strokeStyle = "#494e54";
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
}

for( r = 0; r <ROW; r++){
    board[r] = [];
    for(c = 0; c < COL; c++){
        board[r][c] = VACANT;
    }
}

function drawBoard(){
    for( r = 0; r <ROW; r++){
        for(c = 0; c < COL; c++){
            drawSquare(c,r,board[r][c]);
        }
    }
}

drawBoard();

function randomPiece(){
    let r = randomN = Math.floor(Math.random() * PIECES.length)
    return new Piece( PIECES[r][0],PIECES[r][1]);
}

function Piece(shapes,color){
    this.shapes = shapes;
    this.color = color;

    this.shapeNo = 0;
    this.activeShape = this.shapes[this.shapeNo];

    this.x = 3;
    this.y = -2;
}


Piece.prototype.fill = function(color){
    for( r = 0; r < this.activeShape.length; r++){
        for(c = 0; c < this.activeShape.length; c++){
            if( this.activeShape[r][c]){
                drawSquare(this.x + c,this.y + r, color);
            }
        }
    }
}


Piece.prototype.draw = function(){
    this.fill(this.color);
}

Piece.prototype.unDraw = function(){
    this.fill(VACANT);
}


Piece.prototype.moveDown = function(){
    if(!this.collision(0,1,this.activeShape)){
        this.unDraw();
        this.y++;
        this.draw();
    }else{
        this.lock();
        p = randomPiece();
    }

}


Piece.prototype.moveRight = function(){
    if(!this.collision(1,0,this.activeShape)){
        this.unDraw();
        this.x++;
        this.draw();
    }
}

Piece.prototype.moveLeft = function(){
    if(!this.collision(-1,0,this.activeShape)){
        this.unDraw();
        this.x--;
        this.draw();
    }
}

Piece.prototype.rotate = function(){
    let nextPattern = this.shapes[(this.shapeNo + 1)%this.shapes.length];
    let kick = 0;

    if(this.collision(0,0,nextPattern)){
        if(this.x > COL/2){
            kick = -1; //left
        }else{
            kick = 1; //right
        }
    }

    if(!this.collision(kick,0,nextPattern)){
        this.unDraw();
        this.x += kick;
        this.shapeNo = (this.shapeNo + 1)%this.shapes.length;
        this.activeShape = this.shapes[this.shapeNo];
        this.draw();
    }
}


Piece.prototype.lock = function(){
    for( r = 0; r < this.activeShape.length; r++){
        for(c = 0; c < this.activeShape.length; c++){
            if( !this.activeShape[r][c]){
                continue;
            }
            if(this.y + r < 0){
                // alert("Game Over");    ///////////////////////////////////////////////////////////////////////////////
                let message =document.querySelector("#message");
                message.classList.add("show");

                let restartbtn = document.querySelector(".btnRestart");
                restartbtn.onclick=function (){
                    window.location.reload();
                }

                let displayScore= document.querySelector("#message>div:nth-child(3)");
                displayScore.innerHTML= "Score : "+score;

                gameOver = true;
                break;
            }
            board[this.y+r][this.x+c] = this.color;
        }
    }

    for(r = 0; r < ROW; r++){
        let isRowFull = true;
        for( c = 0; c < COL; c++){
            isRowFull = isRowFull && (board[r][c] != VACANT);
        }
        if(isRowFull){

            for( y = r; y > 1; y--){
                for( c = 0; c < COL; c++){
                    board[y][c] = board[y-1][c];
                }
            }

            for( c = 0; c < COL; c++){
                board[0][c] = VACANT;
            }

            score += 10;
        }
    }

    drawBoard();

    scoreElement.innerHTML = score;
}


Piece.prototype.collision = function(x,y,piece){
    for( r = 0; r < piece.length; r++){
        for(c = 0; c < piece.length; c++){

            if(!piece[r][c]){
                continue;
            }

            let newX = this.x + c + x;
            let newY = this.y + r + y;

            if(newX < 0 || newX >= COL || newY >= ROW){
                return true;
            }

            if(newY < 0){
                continue;
            }

            if( board[newY][newX] != VACANT){
                return true;
            }
        }
    }
    return false;
}


document.addEventListener("keydown",CONTROL);

function CONTROL(event){
    if(event.keyCode == 37){
        p.moveLeft();
        dropStart = Date.now();
    }else if(event.keyCode == 38){
        p.rotate();
        dropStart = Date.now();
    }else if(event.keyCode == 39){
        p.moveRight();
        dropStart = Date.now();
    }else if(event.keyCode == 40){
        p.moveDown();
    }
}

function drop(){
    let now = Date.now();
    let delta = now - dropStart;
    if(delta > 1000){
        p.moveDown();
        dropStart = Date.now();
    }
    if( !gameOver){
        requestAnimationFrame(drop);
    }
}

drop();



















