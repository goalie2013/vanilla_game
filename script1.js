//import { detectCollision } from "./collisions";
"use strict";

const velocity = 30;
let ballsArr = [];
let positionX, positionY, isGoingRight, isGoingDown;
const startMenu = document.getElementById("startMenu");
const startBtn = document.getElementById("startBtn");
const ball = document.getElementById("ball");
const ball2 = document.getElementById("ball2");
const avatar = document.getElementById("avatar");
const resetBtn = document.getElementById("resetBtn");
const mainMenuBtn = document.getElementById("mainMenuBtn");
const menuBoard = document.querySelector(".menuBoard");
const score = document.getElementById("score");
const highScore = document.getElementById("high-score");

const init = function () {
  positionX = 0;
  positionY = 0;
  isGoingRight = true;
  isGoingDown = true;

  // Initial ball location
  ball.style.left = positionX + "px";
  ball.style.top = positionY + "px";

  // Check for new Highscore
  if (score.textContent > highScore.textContent)
    highScore.textContent = score.textContent;
  score.textContent = 0;

  // Remove all other balls
  for (let i = ballsArr.length - 1; i >= 0; i--) {
    ballsArr[i].remove();
    ballsArr.pop();
  }
};

// Event Listener to move avatar
document.addEventListener("keydown", keyPressed);

// Event Listener to start the game
startBtn.addEventListener("click", function () {
  startMenu.style.display = "none";
  ball.style.display = "block";
  menuBoard.classList.remove("hidden");
  init();
});

// Event Listener to restart the game
resetBtn.addEventListener("click", function () {
  init();
});

// Event Listener to end game and go to main menu
mainMenuBtn.addEventListener("click", function () {
  startMenu.style.display = "block";
  ball.style.display = "none";
  menuBoard.classList.add("hidden");
  init();
});

////// Setup game features

init();

setInterval(moveBall, 100);

function moveBall() {
  // console.log(distanceBtwnEls(ball, ball2));
  //console.log("aPos.x: ", ballPos.x);
  // console.log("centerPt.style.left: ", centerPt.style.left);
  //console.log("ballsArr size: ", ballsArr.length);
  // console.log("outerWidth: ", window.outerWidth);
  // console.log("innerWidth: ", window.innerWidth);
  // console.log("ball.style.width: ", ball.getBoundingClientRect().width);
  // console.log("ball.style.left: ", ball.style.left);

  if (ball.style.display === "none") {
    console.log("NONEEEEE");
    return;
  }

  const screenWdth = window.outerWidth - ball.getBoundingClientRect().width;
  const screenHeight = window.outerHeight - ball.getBoundingClientRect().height;

  // Move ball horizontally
  if (isGoingRight) {
    positionX = positionX + velocity;
    ball.style.left = positionX + "px";
  } else {
    positionX = positionX - velocity;
    ball.style.left = positionX + "px";
  }

  // Move ball vertically
  if (isGoingDown) {
    positionY = positionY + velocity;
    ball.style.top = positionY + "px";
  } else {
    positionY = positionY - velocity;
    ball.style.top = positionY + "px";
  }

  // Change x direction when x-boundary hit
  if (positionX >= screenWdth || positionX <= 0) isGoingRight = !isGoingRight;

  // Change y direction when y-boundary hit
  if (positionY >= screenHeight || positionY <= 0) isGoingDown = !isGoingDown;

  // Detect collision between ball and user
  detectCollision(ball, avatar, ballsArr);
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
      avatar.style.left = Number(avatar.style.left.slice(0, -2)) + 20 + "px";
      break;
    case "ArrowLeft":
      // ball2.style.left = Number(ball2.style.left.slice(0, -2)) - 20 + "px";
      avatar.style.left = Number(avatar.style.left.slice(0, -2)) - 20 + "px";
      break;
  }
}
