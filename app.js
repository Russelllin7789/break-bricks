const canvas = document.getElementById("brick-canvas");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const canvasContext = canvas.getContext("2d");
let circle_x = 160;
let circle_y = 60;
let radius = 20;
let x_speed = 20;
let y_speed = 20;

const drawCircle = () => {
  // check if the ball hit the wall
  // right wall and left wall
  if (circle_x >= canvasWidth - radius || circle_x <= radius) {
    x_speed *= -1;
  }
  // bottom wall and top wall
  if (circle_y >= canvasHeight - radius || circle_y <= radius) {
    y_speed *= -1;
  }

  // change the coordinates of ball
  circle_x += x_speed;
  circle_y += y_speed;

  // reset canvas background
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

  // draw round shaped: x, y, radius, startAngle, endAngle
  canvasContext.beginPath();
  canvasContext.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
  canvasContext.stroke();
  canvasContext.fillStyle = "yellow";
  canvasContext.fill();
};

const game = setInterval(drawCircle, 25);
