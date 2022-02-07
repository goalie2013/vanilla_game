function createRandomBall(ballsArr) {
  const myObj = {
    isGoingRight: true,
    color: _randomColor(),
    x: Math.floor(Math.random() * window.innerWidth),
    y: Math.floor(Math.random() * window.innerWidth),
  };
  _createBall(myObj.x, myObj.y, myObj.color, ballsArr);
}

function _createBall(x, y, color, ballsArr) {
  // set div attributes
  var div = document.createElement("div");
  div.id = "ballN";
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
  var r = Math.floor(255 * Math.random());
  var g = Math.floor(255 * Math.random());
  var b = Math.floor(255 * Math.random());
  var color = "rgb(" + r + ", " + g + ", " + b + ")";
  return color;
}

//module.exports = { createRandomBall };
