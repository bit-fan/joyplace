let playerArr = [];
const Player = {};

Player.getNewSessionId = function () {
  var randomNumber = Math.random().toString();
  randomNumber = randomNumber.substring(2, randomNumber.length);
  if (!Player.playerObj[randomNumber]) {
    return randomNumber;
  } else {
    return Player.getNewSessionId();
  }
}
module.exports = Player;
