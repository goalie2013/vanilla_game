let timeOriginal = Date.now();

// function detectCollision(ball, avatar, ballsArr) {
function detectCollision(ballOneRect) {
  const avatarRect = avatar.getBoundingClientRect();
  const halfAvatarWdth = avatarRect.width / 2;

  console.log("avatarRect.top", avatarRect.top);

  const ballOneCenter = ballOneRect.left + ballOneRect.width / 2;
  const avatarCenter = avatarRect.left + halfAvatarWdth;

  // _checkIfCollision(
  //   // ball, instead of passing down, using global variable 'ball' from script1.js
  //   ballOneCenter,
  //   ballOneRect,
  //   avatarCenter,
  //   avatarRect,
  //   ballsArr
  // );

  avatarCollision(ballOneRect, avatarRect);

  brickCollision(ballOneRect);
}

function avatarCollision(ballOneRect, avatarRect) {
  if (ballOneRect.bottom >= avatarRect.top - ballOneRect.height / 2) {
    if (
      (ballOneRect.left >= avatarRect.left &&
        ballOneRect.left <= avatarRect.right) ||
      (ballOneRect.right <= avatarRect.right &&
        ballOneRect.right >= avatarRect.left)
    ) {
      console.log("COLLLIIISSSSIOOOONNNN");

      // Prevent bug of ball repetitively hitting avatar:
      const newTime = Date.now();
      console.log("time: ", newTime - timeOriginal);
      if (newTime - timeOriginal < 250) {
        console.log("TOO CLOSE IN TIME!");
        timeOriginal = Date.now();
        return;
      }

      timeOriginal = Date.now();

      // Change Direction of Ball
      // isGoingDown = !isGoingDown;
      velocityY = -velocityY;

      // Change Ball Color
      ball.style.background = _randomColor();

      // Create New Random Ball
      createRandomBall(ballsArr);

      // Add One to Current Score
      score.textContent++;
    }
  }
}

function brickCollision(ballOneRect) {
  for (let i = 0; i < bricksArr.length; i++) {
    const brickEl = document.querySelector(`.brick${bricksArr[i].brickId}`);
    const brickRect = brickEl.getBoundingClientRect();
    const brick = bricksArr[i];

    brick.x = brickRect.left;
    brick.y = brickRect.bottom;
    brick.width = brickRect.width;
    brick.height = brickRect.height;

    // if (ballOneRect.top <= brick.y + ballOneRect.height / 2) {
    //   if (
    //     (ballOneRect.left >= brick.x &&
    //       ballOneRect.left <= brick.x + brick.width) ||
    //     (ballOneRect.right <= brick.x + brick.width &&
    //       ballOneRect.right >= brick.x)
    //   ) {

    if (
      ballOneRect.top <= brick.y + ballOneRect.height / 2 &&
      ballOneRect.top >= brick.y - brick.height &&
      ballOneRect.left >= brick.x &&
      ballOneRect.left <= brick.x + brick.width
    ) {
      console.log("BRICK COLLISSION");

      // Prevent bug of ball repetitively hitting avatar:
      const newTime = Date.now();
      console.log("time: ", newTime - timeOriginal);
      if (newTime - timeOriginal < 250) {
        console.log("TOO CLOSE IN TIME!");
        timeOriginal = Date.now();
        return;
      }

      timeOriginal = Date.now();
      velocityY = -velocityY;

      console.log("brick", brickEl);

      // Remove brick from screen
      // brickArea.removeChild(brick);
      brickEl.style.visibility = "hidden";

      // Remove brick from array
      bricksArr.splice(i, 1);
    }
    //}
  }
}

// function xyz(ballOneRect, avatarRect) {
//   console.log("avatarRect.top", avatarRect.top);

//   if (
//     (ballOneRect.left >= avatarRect.left &&
//       ballOneRect.left <= avatarRect.right) ||
//     (ballOneRect.right <= avatarRect.right &&
//       ballOneRect.right >= avatarRect.left)
//   ) {
//     console.log("OVERLAP X");
//   }

//   // if (
//   //   (ballOneRect.top >= avatarRect.top && ballOneRect.top <= avatarRect.bottom) ||
//   //   (ballOneRect.bottom <= avatarRect.bottom && ballOneRect.bottom >= avatarRect.top)
//   // ) {
//   //   console.log("OVERLAP Y");
//   // }
//   if (ballOneRect.bottom >= avatarRect.top - ballOneRect.height / 2) {
//     console.log("OVERLAP Y");
//   }

//   if (
//     ((ballOneRect.left >= avatarRect.left &&
//       ballOneRect.left <= avatarRect.right) ||
//       (ballOneRect.right <= avatarRect.right &&
//         ballOneRect.right >= avatarRect.left)) &&
//     ((ballOneRect.top >= avatarRect.top &&
//       ballOneRect.top <= avatarRect.bottom) ||
//       (ballOneRect.bottom <= avatarRect.bottom &&
//         ballOneRect.bottom >= avatarRect.top))
//   ) {
//     console.log("COLLLIIISSSSIOOOONNNN");
//   }
// }

function _checkIfCollision(
  // ball,
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

    // Prevent bug of ball repetitively hitting avatar:
    const newTime = Date.now();
    console.log("time: ", newTime - timeOriginal);
    if (newTime - timeOriginal < 250) {
      console.log("TOO CLOSE IN TIME!");
      timeOriginal = Date.now();
      return;
    }

    timeOriginal = Date.now();

    // Change Direction of Ball
    // isGoingDown = !isGoingDown;
    velocityY = -velocityY;

    // Change Ball Color
    ball.style.background = _randomColor();

    // Create New Random Ball
    createRandomBall(ballsArr);

    // Add One to Current Score
    score.textContent++;
  }
}

//module.exports = { detectCollision };
