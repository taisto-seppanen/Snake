const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
// фон игрового поля
const ground = new Image();
ground.src = "ground.png";
// картинка еды
const foodImg = new Image();
foodImg.src = "food.png";
// картинка для проигрыша
const loseImg = new Image();
loseImg.src = "lose.png";

const box = 30;
let score = 0;
let speed = 150;

let food = {
  x: Math.floor(Math.random() * 18) * box,
  y: Math.floor(Math.random() * 18 + 1) * box,
};

// змейка представляется как массив
let snake = [];
snake[0] = {
  x: 10 * box,
  y: 10 * box,
};

document.addEventListener("keydown", direction);

let dir; // направление движения

// Обработка нажатий клавишь
function direction(event) {
  if (event.keyCode == 37 && dir != "right") {
    dir = "left";
  } else if (event.keyCode == 38 && dir != "down") {
    dir = "up";
  } else if (event.keyCode == 39 && dir != "left") {
    dir = "right";
  } else if (event.keyCode == 40 && dir != "up") {
    dir = "down";
  }
}

// проверяет не съеден ли хвост
function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) lose();
  }
}

// обработка события проигрыша
function lose() {
  ctx.drawImage(loseImg, 0, 0);
  dieSound.play();
  clearInterval(game);
  ask();
}

// подключаем озвучку
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}
const eatSound = new sound("./EatSound.ogg");
const dieSound = new sound("./DieSound.ogg");

// Методы для перезагрузки игры
const forceReload = () => {
  clearInterval(game);
  location.reload(true);
};

function ask() {
  const tryAgain = confirm(`Вы проиграли, ваш счет: ${score} Начать заново?`);
  tryAgain ? forceReload() : clearInterval(game);
}

// отрисовка игры
function drawGame() {
  ctx.drawImage(ground, 0, 0);
  ctx.drawImage(foodImg, food.x, food.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "red" : "pink";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "red";
  ctx.font = "30px arial";
  ctx.fillText(score, 100, 27);

  let snakeY = snake[0].y;
  let snakeX = snake[0].x;

  console.log("food.x = ", food.x, "food.y = ", food.y);

  // обрабатываем поедание яблок
  if (snakeX == food.x && snakeY == food.y) {
    eatSound.play();
    score++;
    food = {
      x: Math.floor(Math.random() * 6 + 1) * box,
      y: Math.floor(Math.random() * 6 + 1) * box,
    };
  } else {
    snake.pop();
  }

  // Обрабатываем столкновение с стеной
  if (snakeX > box * 19 || snakeX < 0 || snakeY > box * 19 || snakeY == 0) {
    lose();
  }

  // обработка направления движения
  if (dir == "up") snakeY -= box;
  if (dir == "down") snakeY += box;
  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  eatTail(newHead, snake);
  snake.unshift(newHead);
}

let game = setInterval(drawGame, speed);
