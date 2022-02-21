function createRandomBall(ballsArr) {
  const gameScreenRect = gameScreen.getBoundingClientRect();
  const ballOneRect = ball.getBoundingClientRect();
  const gameWdth = gameScreenRect.width - ballOneRect.width / 2;
  const gameHeight = gameScreenRect.height - ballOneRect.height / 2;

  const myObj = {
    isGoingRight: true,
    color: _randomColor(),
    x: Math.floor(Math.random() * gameWdth),
    y: Math.floor(Math.random() * gameHeight),
  };

  _createBall(myObj.x, myObj.y, myObj.color, ballsArr);
}

// Physically put new ball on screen
function _createBall(x, y, color, ballsArr) {
  // set div attributes
  const div = document.createElement("div");
  // div.id = "ballN";
  div.style.zIndex = "1";
  div.style.position = "absolute";
  div.style.left = x + "px";
  div.style.top = y + "px";
  div.style.width = "50px";
  div.style.height = "50px";
  div.style.borderRadius = "50%";
  div.style.background = color;

  // Then append the whole thing onto the body
  document.getElementsByTagName("body")[0].appendChild(div);

  ballsArr.push(div);
  return div;
}

function _randomColor() {
  const r = Math.floor(255 * Math.random());
  const g = Math.floor(255 * Math.random());
  const b = Math.floor(255 * Math.random());
  const color = "rgb(" + r + ", " + g + ", " + b + ")";
  return color;
}

function moveBall() {
  // Move ball horizontally
  // if (isGoingRight) {
  //   positionX = positionX + velocity;
  //   ball.style.left = positionX + "px";
  // } else {
  //   positionX = positionX - velocity;
  //   ball.style.left = positionX + "px";
  // }

  // // Move ball vertically
  // if (isGoingDown) {
  //   positionY = positionY + velocity;
  //   ball.style.top = positionY + "px";
  // } else {
  //   positionY = positionY - velocity;
  //   ball.style.top = positionY + "px";
  // }

  positionX = positionX + velocityX;
  ball.style.left = positionX + "px";

  positionY = positionY + velocityY;
  ball.style.top = positionY + "px";
}

function changeDirectionIfNeeded(
  gameWdth,
  gameWdthStart,
  gameHeight,
  gameHeightStart
) {
  //   // Change x direction when x-boundary hit
  //   if (positionX >= gameWdth || positionX <= gameWdthStart)
  //     isGoingRight = !isGoingRight;

  //   // Change y direction when y-boundary hit
  //   if (positionY >= gameHeight || positionY <= gameHeightStart)
  //     isGoingDown = !isGoingDown;
  // }

  if (positionX >= gameWdth || positionX <= gameWdthStart)
    velocityX = -velocityX;
  if (positionY >= gameHeight || positionY <= gameHeightStart)
    velocityY = -velocityY;
}

//module.exports = { createRandomBall };
