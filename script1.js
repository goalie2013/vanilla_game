//import { detectCollision } from "./collisions";
"use strict";

let velocityX = 20;
let velocityY = 20;
let ballsArr = [];
const TOTAL_BRICKS = 20;
let positionX, positionY;
// let isGoingRight, isGoingDown;
const startMenu = document.getElementById("startMenu");
const startBtn = document.getElementById("startBtn");
const gameScreen = document.querySelector(".screenWrapper");
const ball = document.getElementById("ball");
// const ball2 = document.getElementById("ball2");
const avatar = document.getElementById("avatar");
const menuBoard = document.querySelector(".menuBoard");
const resetBtn = document.getElementById("resetBtn");
const mainMenuBtn = document.getElementById("mainMenuBtn");
const score = document.getElementById("score");
const highScore = document.getElementById("high-score");
const brickArea = document.getElementById("brickWrapper");
const bricksArr = [];

const init = function () {
  // Initial Ball Position (in px)
  positionX = 120;
  positionY = 300;
  // isGoingRight = true;
  // isGoingDown = true;

  // Initial ball location
  ball.style.left = positionX + "px";
  ball.style.top = positionY + "px";

  // ball.style.top = avatar.getBoundingClientRect().top + "px";
  // ball.style.top =
  //   parseInt(ball.style.top) - ball.getBoundingClientRect().height / 1.1 + "px";

  checkIfNewHighScore();

  removeAllBalls();

  removeBricks();

  // layBricksDown();
  brickFactory(TOTAL_BRICKS);

  // console.log(bricksArr[2].x, bricksArr[2].y);
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

setInterval(gamePlay, 100);

function gamePlay() {
  // const edgeWidth = parseInt(gameScreen.style.borderWidth);

  const ballOneRect = ball.getBoundingClientRect();
  const gameScreenRect = gameScreen.getBoundingClientRect();

  const gameWdth = gameScreenRect.width - ballOneRect.width / 2;
  const gameWdthStart = gameScreenRect.x + ballOneRect.width / 2;

  const gameHeight = gameScreenRect.height - ballOneRect.height;
  const gameHeightStart = gameScreenRect.y + ballOneRect.height / 2;

  // ????
  if (ball.style.display === "none") {
    console.log("NONEEEEE");
    return;
  }

  moveBall();

  // change direction of ball when hits edge
  changeDirectionIfNeeded(gameWdth, gameWdthStart, gameHeight, gameHeightStart);

  // Detect collision between ball and user
  // detectCollision(ball, avatar, ballsArr);
  detectCollision(ballOneRect);
}

// Event Listener Callback Function to move avatar
function keyPressed() {
  const SPEED = 4;

  switch (event.code) {
    case "ArrowRight":
      // ball2.style.left = Number(ball2.style.left.slice(0, -2)) + 20 + "px";
      let posX = Number(avatar.style.left.slice(0, -1));
      if (posX) {
        if (posX < 90) {
          avatar.style.left = posX + SPEED + "%";
          console.log(avatar.style.left);
        }
      } else {
        console.log("EMPTY. Set to 50% + SPEED%");
        avatar.style.left = 50 + SPEED + "%";
      }

      break;

    case "ArrowLeft":
      // ball2.style.left = Number(ball2.style.left.slice(0, -2)) - 20 + "px";
      let possX = Number(avatar.style.left.slice(0, -1));
      if (possX) {
        if (possX > 5) {
          avatar.style.left = possX - 4 + "%";
          console.log(avatar.style.left);
        }
      } else {
        console.log("EMPTY. Set to 50% - SPEED%");
        avatar.style.left = 50 - SPEED + "%";
      }

      break;
  }
}

///////////////////////////////////////////////////////////////

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
