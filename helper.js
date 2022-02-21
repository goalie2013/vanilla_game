"use strict";

function checkIfNewHighScore() {
  if (score.textContent > highScore.textContent)
    highScore.textContent = score.textContent;
  score.textContent = 0;
}

function removeAllBalls() {
  for (let i = ballsArr.length - 1; i >= 0; i--) {
    ballsArr[i].remove();
    ballsArr.pop();
  }
}

function removeBricks() {
  while (brickArea.firstChild) {
    brickArea.removeChild(brickArea.firstChild);
  }
}

function brickFactory(num) {
  for (let i = 0; i < num; i++) {
    const brick = { i };
    brick.element = document.createElement("div");
    brick.element.classList.add("bbb");
    brick.element.classList.add(`brick${brick.i}`);
    console.log(brick.i);

    brickArea.appendChild(brick.element);
    bricksArr.push(brick);
  }
  console.log("bricksArr size: ", bricksArr.length);
}

function levelOneBricksLayout() {}

function layBricksDown() {
  const TOTAL_BRICKS = 20;

  for (let i = 0; i < TOTAL_BRICKS; i++) {
    const brick = { i };
    brick.element = document.createElement("div");
    brick.element.classList.add("bbb");
    brick.element.classList.add(`brick${brick.i}`);
    console.log(brick.i);

    brickArea.appendChild(brick.element);

    // Better to do this during setInterval() incase user switches dimensions of screen
    // brick.x = document.querySelector(`.brick${i}`).getBoundingClientRect().left;
    // brick.y = document.querySelector(`.brick${i}`).getBoundingClientRect().top;

    bricksArr.push(brick);
  }
  console.log("bricksArr size: ", bricksArr.length);
}
