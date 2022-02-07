function detectCollision(ball, avatar, ballsArr) {
  const ballWdthStr = ball.style.width;
  const halfBallWdth = Number(ballWdthStr.slice(0, -2)) / 2;
  const avatarWdthStr = avatar.style.width;
  const halfAvatarWdth = Number(avatarWdthStr.slice(0, -2)) / 2;

  const ballOnePos = ball.getBoundingClientRect();
  //const ballTwoPos = ball2.getBoundingClientRect();
  const avatarPos = avatar.getBoundingClientRect();
  const ballOneCenter = ballOnePos.left + halfBallWdth;
  // const ballTwoCenter = ballTwoPos.left + halfBallWdth;
  const avatarCenter = avatarPos.left + halfAvatarWdth;

  _checkIfCollision(
    ball,
    ballOneCenter,
    ballOnePos,
    avatarCenter,
    avatarPos,
    ballsArr
  );
}

function _checkIfCollision(
  ball,
  el1Center,
  el1Pos,
  el2Center,
  el2Pos,
  ballsArr
) {
  if (
    el1Center < el2Center + el2Pos.width &&
    el1Center + el1Pos.width > el2Center &&
    el1Pos.top < el2Pos.top + el2Pos.height &&
    el1Pos.top + el1Pos.height > el2Pos.top
  ) {
    console.log("COLLISION!");

    ball.style.background = _randomColor();
    // ball.style.display = "none";
    //isGoingRight = !isGoingRight;
    isGoingDown = !isGoingDown;

    createRandomBall(ballsArr);
  }
}

function _randomColor() {
  var r = Math.floor(255 * Math.random());
  var g = Math.floor(255 * Math.random());
  var b = Math.floor(255 * Math.random());
  var color = "rgb(" + r + ", " + g + ", " + b + ")";
  return color;
}

//module.exports = { detectCollision };