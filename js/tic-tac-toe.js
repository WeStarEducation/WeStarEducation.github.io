var CROSS = -1;
var CIRCLE = 1;
var step = 0;
var boardRecord = [0,0,0,0,0,0,0,0,0]
var winner = 0;
var win = false;

var board;
var boardTop;
var boardLeft;
var ctx;

window.onload = function () {
    board = document.getElementById("board");
    setBoard(board);
    boardTop = board.offsetTop;
    boardLeft = board.offsetLeft;
   
    board.addEventListener("mousedown", function (event) {
        
        if (event.y >= boardTop && event.y <= boardTop + 300 &&
            event.x >= boardLeft && event.x <= boardLeft + 300 &&
            step < 9 && !win){
                checkBoard(event.x - boardLeft, event.y - boardTop);
                
            }
            
            
    }, false);
}

function setBoard(board){
    board.width = 300;
    board.height = 300;
    ctx = board.getContext("2d");
    ctx.lineWidth=5;
    drawLine(0, 100, 300, 100);
    drawLine(0, 200, 300, 200);
    drawLine(100, 0, 100, 300);
    drawLine(200, 0, 200, 300);
}

function drawLine(startX, startY, endX, endY){
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
}

function checkBoard(x, y){
    var row = Math.floor(y/100);
    var col = Math.floor(x/100);
    var blockNum = col + 3* row;
    
    if (boardRecord[blockNum] == 0){
        if (step % 2 == 0){
            boardRecord[blockNum] = 1;
            ctx.beginPath();
            ctx.arc(100*col+50, 100*row+50,30,0,2*Math.PI);
            ctx.stroke();
            
        }else{
            boardRecord[blockNum] = -1;
            drawLine(100*col+20, 100*row+20, 100*col+80, 100*row+80);
            drawLine(100*col+20, 100*row+80, 100*col+80, 100*row+20);
        }
        step += 1;
        checkBlock()
    }else{
        return;
    }
    
}

function checkBlock(){
    win = checkType("row") || checkType("col") || checkType("left") || checkType("right");
    if (win){
        var result = document.getElementById("result");
        if(winner>0){
            result.innerText="Player 1 wins."
        }else{
            result.innerText="Player 2 wins."
        }
    }
    if (step == 9 && !win){
        var result = document.getElementById("result");
        result.innerText="Draw"
    }
    
}

function checkType(type){
    if (type == "row"){
        for (var i=0;i<9;i=i+3)
        { 
            result = boardRecord[i]+boardRecord[i+1]+boardRecord[i+2];
            
            if (checkWinner(result) != 0){
                drawLine(0, i/3*100+50, 300, i/3*100+50);
                return true;
            }
            
        }
        return false;
    }else if (type == "col"){
        for (var i=0;i<9;i++)
        { 
            result = boardRecord[i]+boardRecord[i+3]+boardRecord[i+6];
            if (checkWinner(result) != 0){
                drawLine( i*100+50, 0, i*100+50, 300);
                return true;
            }
        }
        return false;
    }else if (type == "left"){
        result = boardRecord[0]+boardRecord[4]+boardRecord[8];
        if (checkWinner(result) != 0){
            drawLine(0, 0, 300, 300);
            return true;
        }
        return false;
    }else if (type == "right"){
        result = boardRecord[2]+boardRecord[4]+boardRecord[6];
        if (checkWinner(result) != 0){
            drawLine(0, 300, 300, 0);
            return true;
        }
        return false;
    }

}

function checkWinner(result){
    
    if (result == 3){
        winner = 1;
        
    }else if(result == -3){
        winner = -1;
    }
    return winner;
}

function reset(){
    setBoard(board);
    step = 0;
    boardRecord = [0,0,0,0,0,0,0,0,0]
    winner = 0;
    win = false;
    document.getElementById("result").innerText="";
}
    