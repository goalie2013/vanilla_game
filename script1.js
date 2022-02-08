//import { detectCollision } from "./collisions";

const velocity = 30;
let ballsArr = [];
let positionX, positionY, isGoingRight, isGoingDown;
const startMenu = document.getElementById("startMenu");
const startBtn = document.getElementById("startBtn");
const ball = document.getElementById("ball");
const ball2 = document.getElementById("ball2");
const trampoline = document.getElementById("trampoline");
const resetBtn = document.getElementById("resetBtn");
const mainMenuBtn = document.getElementById("mainMenuBtn");
const score = document.getElementById("score");
const highScore = document.getElementById("high-score");
const scoreDiv = document.getElementById("scorediv");

const init = function () {
  positionX = 0;
  positionY = 0;
  isGoingRight = true;
  isGoingDown = true;
  ball.style.left = positionX + "px";
  ball.style.top = positionY + "px";

  if (score.textContent > highScore.textContent) {
    highScore.textContent = score.textContent;
  }
  score.textContent = 0;

  //for (ball of ballsArr) {
  //  ball.style.display = "none";
  //}
  for (let i = ballsArr.length - 1; i >= 0; i--) {
    ballsArr[i].remove();
    ballsArr.pop();
  }
  //ballsArr.push(createBall());
};

document.addEventListener("keydown", keyPressed);
startBtn.addEventListener("click", function () {
  init();
  startMenu.style.display = "none";
  scoreDiv.style.display = "block";
  resetBtn.style.display = "block";
  mainMenuBtn.style.display = "block";
  ball.style.display = "block";
});
resetBtn.addEventListener("click", function () {
  init();
});
mainMenuBtn.addEventListener("click", function () {
  startMenu.style.display = "block";
  scoreDiv.style.display = "none";
  resetBtn.style.display = "none";
  mainMenuBtn.style.display = "none";
  ball.style.display = "none";
  init();
});

init();

setInterval(moveBall, 100);

function moveBall() {
  // const ballPos = getPositionAtCenter(ball);
  // const ball2Pos = getPositionAtCenter(ball2);
  // console.log(distanceBtwnEls(ball, ball2));
  //console.log("ball.style.left: ", ball.style.left);
  //console.log("aPos.x: ", ballPos.x);
  // console.log("centerPt.style.left: ", centerPt.style.left);
  //console.log("ballsArr size: ", ballsArr.length);
  console.log("outerWidth: ", window.outerWidth);
  console.log("innerWidth: ", window.innerWidth);
  console.log("ball.style.width: ", ball.getBoundingClientRect().width);

  const screenWdth = window.outerWidth - ball.getBoundingClientRect().width;
  const screenHeight = window.outerHeight - ball.getBoundingClientRect().height;

  if (isGoingRight) {
    positionX = positionX + velocity;
    ball.style.left = positionX + "px";
  } else {
    positionX = positionX - velocity;
    ball.style.left = positionX + "px";
  }

  if (isGoingDown) {
    positionY = positionY + velocity;
    ball.style.top = positionY + "px";
  } else {
    positionY = positionY - velocity;
    ball.style.top = positionY + "px";
  }

  if (positionX >= screenWdth || positionX <= 0) {
    //score.textContent++;
    isGoingRight = !isGoingRight;
  }

  if (positionY >= screenHeight || positionY <= 0) {
    //score.textContent++;
    isGoingDown = !isGoingDown;
  }

  detectCollision(ball, trampoline, ballsArr);
}

function getPositionAtCenter(el) {
  const { top, left, width, height } = el.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

function distanceBtwnEls(a, b) {
  const aPos = getPositionAtCenter(a);
  const bPos = getPositionAtCenter(b);
  return Math.hypot(aPos.x - bPos.x, aPos.y - bPos.y);
}

function keyPressed() {
  switch (event.code) {
    case "ArrowDown":
      ball2.style.top = Number(ball2.style.top.slice(0, -2)) + 20 + "px";
      break;
    case "ArrowUp":
      ball2.style.top = Number(ball2.style.top.slice(0, -2)) - 20 + "px";
      break;
    case "ArrowRight":
      // ball2.style.left = Number(ball2.style.left.slice(0, -2)) + 20 + "px";
      trampoline.style.left =
        Number(trampoline.style.left.slice(0, -2)) + 20 + "px";
      break;
    case "ArrowLeft":
      // ball2.style.left = Number(ball2.style.left.slice(0, -2)) - 20 + "px";
      trampoline.style.left =
        Number(trampoline.style.left.slice(0, -2)) - 20 + "px";
      break;
  }
}
