const snakeLenght = document.querySelector(".lenght span");
const restart = document.querySelector(".restart");
const restButton = document.querySelector(".restart .button");
const canvas = document.querySelector("#canvas");

const ctx = canvas.getContext("2d");
const scale = 10;
const rows = canvas.width / scale;
const columns = canvas.height / scale;
const lvlUp = 10;
let gameSpeed = 200;

restButton.addEventListener("click", setup);
addEventListener("keydown", e => snake.move(e.key));

function setup() {
  restart.style.display = "none";
  gameSpeed = 200;

  fruit = new Fruit();
  snake = new Snake();
  fruit.pickLocation();
  fruit.draw();
  snake.draw();
  myInt = new SnakeInterval(gameSpeed);
}

function SnakeInterval() {
  this.myInt = setInterval(() => {
    snakeLenght.innerHTML = snake.total + 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruit.draw();
    snake.update();
    snake.draw();
    snake.eat(fruit) ? fruit.pickLocation() : null;
    snake.die() ? clearInterval(myInt.myInt) + newGameWindow() : null;
  }, gameSpeed);
}
function Fruit() {
  this.x;
  this.y;
  this.pickLocation = () => {
    this.x = Math.floor(Math.random() * rows) * scale;
    this.y = Math.floor(Math.random() * columns) * scale;
  };
  this.draw = () => {
    ctx.fillStyle = "rgb(40,140,40)";

    ctx.beginPath();
    ctx.arc(this.x + scale / 2, this.y + scale / 2, scale / 2, 0, 2 * Math.PI);
    ctx.fill();
  };
}

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xSpeed = scale * 1;
  this.ySpeed = 0;
  this.total = 0;
  this.tail = [];
  this.direction = "right";
  this.buffer = true;

  this.draw = () => {
    ctx.fillStyle = "rgb(40,40,100)";

    this.tail.forEach((e, i) =>
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale)
    );
    ctx.fillStyle = "rgb(40,40,200)";

    ctx.fillRect(this.x, this.y, scale, scale);
  };
  this.move = m => {
    if (this.buffer) {
      m == "ArrowUp" && this.direction != "down"
        ? (this.xSpeed = 0) +
          (this.ySpeed = -scale * 1) +
          (this.direction = "up")
        : null;
      m == "ArrowDown" && this.direction != "up"
        ? (this.xSpeed = 0) +
          (this.ySpeed = scale * 1) +
          (this.direction = "down")
        : null;
      m == "ArrowLeft" && this.direction != "right"
        ? (this.xSpeed = -scale * 1) +
          (this.ySpeed = 0) +
          (this.direction = "left")
        : null;
      m == "ArrowRight" && this.direction != "left"
        ? (this.xSpeed = scale * 1) +
          (this.ySpeed = -0) +
          (this.direction = "right")
        : null;
      this.buffer = false;
    }
    setTimeout(() => (this.buffer = true), gameSpeed);
  };

  this.update = () => {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    this.tail[this.total - 1] = { x: this.x, y: this.y };

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    this.x > canvas.width - scale ? (this.x = 0) : null;
    this.y > canvas.height - scale ? (this.y = 0) : null;
    this.x < 0 ? (this.x = canvas.width - scale) : null;
    this.y < 0 ? (this.y = canvas.height - scale) : null;
  };

  this.eat = fruit => {
    let ret;
    this.x == fruit.x && this.y == fruit.y
      ? (ret = true) +
        this.total++ +
        clearInterval(myInt.myInt) +
        (gameSpeed = gameSpeed - lvlUp) +
        (myInt = new SnakeInterval(gameSpeed))
      : (ret = false);
    return ret;
  };

  this.die = () => this.tail.some(a => this.x == a.x && this.y == a.y);
}

const newGameWindow = () => {
  restart.style.display = "inline-block";
};
