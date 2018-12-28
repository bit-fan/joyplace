// Player
let playerCount = 1;

function generateNewPubId() {
  return ('0000' + playerCount++).slice(-4) + (new Date().getTime().toString().slice(-10))
}

function Player(sessionId) {
  this.sessionId = sessionId;
  this.nickname = 'change name';
  // this.socketId = '';
  this.curRoom = '';
  this.status = 'Lobby';
  this.pubId = generateNewPubId();
  this.lastActivetime = new Date();
}

Player.prototype.updateProp = function (field, data) {
  this[field] = data;
}
module.exports = Player;
