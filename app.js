const canvas = document.getElementById("brick-canvas");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const canvasContext = canvas.getContext("2d");
let circleX = 160;
let circleY = 60;
let radius = 20;
let xSpeed = 20;
let ySpeed = 20;
let groundX = 100;
let groundY = 500;
let groundHeight = 5;
let brickArray = [];

// add mouse move event within canvas element
canvas.addEventListener("mousemove", (event) => {
  groundX = event.clientX;
});

class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    brickArray.push(this);
  }

  drawBrick() {
    canvasContext.fillStyle = "lightgreen";
    canvasContext.fillRect(this.x, this.y, this.width, this.height);
  }
}

const getRandomBrick = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

// prepare all the coordinators of bricks
for (let i = 0; i < 10; i++) {
  new Brick(getRandomBrick(0, 950), getRandomBrick(0, 550));
}

const drawCircle = () => {
  // check if the ball hit the floor
  if (
    circleX >= groundX - radius &&
    circleX <= groundX + 200 + radius &&
    circleY >= groundY - radius &&
    circleY <= groundY + radius
  ) {
    if (ySpeed > 0) {
      circleY -= 40;
    } else {
      circleY += 40;
    }
    ySpeed *= -1;
  }

  // check if the ball hit the wall
  // right wall and left wall
  if (circleX >= canvasWidth - radius || circleX <= radius) {
    xSpeed *= -1;
  }
  // bottom wall and top wall
  if (circleY >= canvasHeight - radius || circleY <= radius) {
    ySpeed *= -1;
  }

  // change the coordinates of ball
  circleX += xSpeed;
  circleY += ySpeed;

  // reset canvas background
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

  // draw all bricks
  brickArray.forEach((brick) => {
    brick.drawBrick();
  });

  // draw movable floor
  canvasContext.fillStyle = "lightBlue";
  canvasContext.fillRect(groundX, groundY, 200, groundHeight);

  // draw round shaped: x, y, radius, startAngle, endAngle
  canvasContext.beginPath();
  canvasContext.arc(circleX, circleY, radius, 0, 2 * Math.PI);
  canvasContext.stroke();
  canvasContext.fillStyle = "yellow";
  canvasContext.fill();
};

const game = setInterval(drawCircle, 25);
