const gameBoard = document.getElementById('snake-board');
const context =gameBoard.getContext('2d');
const scoreText= document.getElementById('scoreValue')


const Width = gameBoard.width;
const Height = gameBoard.height;

let UNIT = 25;
let foodX;
let foodY;
let velX = 25;
let velY = 0;
let score = 0;
let active = true;
let start = false;

let snake = [
        {x:UNIT*3,y:0},
        {x:UNIT*2,y:0},
        {x:UNIT,y:0},
        {x:0,y:0}
    
]
window.addEventListener('keydown',keyPress)


startGame();


function startGame(){
context.fillStyle = "white";
context.fillRect(0,0,Width,Height)

createFood();
FoodDisplay();
//moveSnake();
//clearBoard()
//drawSnake();
drawSnake()

}
function clearBoard(){
context.fillStyle = "white";
context.fillRect(0,0,Width,Height)

}

function createFood(){
    foodX = Math.floor(Math.random()*Width/UNIT)*UNIT;
    foodY = Math.floor(Math.random()*Height/UNIT)*UNIT;
}


function FoodDisplay(){
    context.fillStyle = 'Deepskyblue'
    context.fillRect(foodX,foodY,UNIT,UNIT);
}
function drawSnake(){
    context.fillStyle='yellow';
    context.strokeStyle = 'green';
    snake.forEach((snakePart)=>{
        context.fillRect(snakePart.x,snakePart.y,UNIT,UNIT)
        context.strokeRect(snakePart.x,snakePart.y,UNIT,UNIT)
    })
}
function moveSnake(){
    const head = {
        x:snake[0].x+velX,y:snake[0].y+velY
    }

    snake.unshift(head)
    if(snake[0].x==foodX && snake[0].y==foodY){
        createFood();
        score+=1;
        scoreText.textContent = score;

    }
    else
    snake.pop();
}

function nextTick(){
if(active){

    setTimeout(()=>{
        clearBoard();
        FoodDisplay();
        moveSnake();
        drawSnake();
        checkGameOver();
        nextTick();

    },200)
}
else{
    clearBoard();
    context.font = "bold 50px serif ";
    context.fillStyle ='black';
    context.textAlign = 'center';
    context.fillText ("Game Over!!",Width/2,Height/2)

   
}
}

function keyPress(event){
    if(!start){
        start=true;
        nextTick();
    }
    const LEFT =37;
    const UP = 38;
    const RIGHT =39;
    const DOWN =40;

    switch(true){
        case(event.keyCode==LEFT && velX!=UNIT):
        velX = -UNIT;
        velY = 0;
        break;

        case(event.keyCode==RIGHT && velX!=-UNIT):
        velX = UNIT;
        velY=0;
        break;

        case(event.keyCode==UP && velY!=UNIT):
        velX =0 ;
        velY =-UNIT ;
        break;

        case(event.keyCode==DOWN && velY!=UNIT):
        velX = 0;
        velY =UNIT;
        break;


        
    }

}
function checkGameOver(){

    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=Width):
        case(snake[0].y<0):
        case(snake[0].y>=Height):
      
        active  = false;

    }
}
 