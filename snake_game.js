const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src= "ground.png";

const foodImg = new Image();
foodImg.src= "food.png";

const loseImg = new Image();
loseImg.src= "lose.png";

let box = 30;
let score = 0;


let food = {
    x: Math.floor(Math.random() * 18) * box,
    y: Math.floor(Math.random() * 18) * box,
};


let snake = [];

snake[0] = {
    x: 10 * box,
    y: 10 * box,
};

document.addEventListener("keydown", direction);

let dir;

// Обработка нажатий клавишь
function direction(event)    {
    if (event.keyCode == 37 && dir != "right")    {
        dir = "left";
        console.log(dir);
    }
    else if (event.keyCode == 38 && dir != "down")    {
        dir = "up";
        console.log(dir);

    }
    else if (event.keyCode == 39 && dir != "left")    {
        dir = "right";
        console.log(dir);

    }
    else if (event.keyCode == 40 && dir != "up")    {
        dir = "down";
        console.log(dir);

    }
}

// проверяет не съеден ли хвост
function eatTail(head, arr)  {
    for ( let i = 0; i < arr.length; i++)   {
        if ( head.x == arr[i].x || head.y == arr[i].y )
        lose();
        }
    }
// обработка события проигрыша 

    function lose() {
        clearInterval(game);
        ctx.fillStyle = "red";
        ctx.font = "50px Impact";    
        ctx.fillText("YOU LOSE", 200, 200)
        ctx.drawImage(loseImg, 0, 0);
        
    }

function drawGame () {
ctx.drawImage(ground, 0, 0);

ctx.drawImage(foodImg, food.x, food.y);

for ( let i = 0; i < snake.length; i++)  {
    ctx.fillStyle = i == 0 ? "red" :   "pink";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

ctx.fillStyle = "red";
ctx.font = "30px arial";    
ctx.fillText(score, 100, 27) 


let snakeY = snake[0].y;
let snakeX = snake[0].x;

// обрабатываем поедание яблок
if (snakeX == food.x && snakeY == food.y)   {
    score++;
    food = {
        x: Math.floor(Math.random() * 6 + 1) * box,
        y: Math.floor(Math.random() * 6 + 1) * box,
    };
} else {
    snake.pop();    }

    // Обрабатываем столкновение с стеной
    if(snakeX > box*19 || snakeX < 0 || snakeY > box*19 || snakeY == 0)
    {
        lose();

    }

if (dir == "up") snakeY -= box;
if (dir == "down") snakeY += box;
if (dir == "left") snakeX -= box;
if (dir == "right") snakeX += box;


let newHead = {
    x: snakeX,
    y: snakeY,
};

snake.unshift(newHead); 

};

let game = setInterval(drawGame, 200);

