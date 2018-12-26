// common functions
function getCookiePropFromSocket(socket, key) {
  const cookieArr = socket.handshake.headers.cookie.split('; ');
  let keyVal = '';
  cookieArr.find(cookie => {
    [key, val] = cookie.split('=');
    if (key === key) {
      keyVal = val;
      return true;
    }
    return false;
  })
  return keyVal;
}

// Players
function Players() {
  this.players = {};
}

Players.prototype.addPlayer = function (socket) {
  const sessionId = getCookiePropFromSocket(socket, 'sessionId');
  this.players[sessionId] = this.players[sessionId] || new Player(sessionId);
  // this.players.push(newPlayer);
  console.log('after adding', this);
  socket.emit('user', this.players[sessionId]);
}
Players.prototype.isValidNewSessionId = function (id) {
  if (!this.players[id]) {
    // this.addPlayer(id);
    return true;
  }
  // let existing = this.players[id];
  // if (!existing) {
  //   this.addPlayer(id);
  // }
  return false;
  // return !existing;
}

Players.prototype.updatePlayer = function (socket, data) {
  const sessionId = getCookiePropFromSocket(socket, 'sessionId');
  let thisPlayer = this.players[sessionId];
  console.log(this, sessionId, data, thisPlayer);
  if (thisPlayer) {
    Object.keys(data).forEach(key => {
      thisPlayer.updateProp(key, data[key]);
    });
  }
  console.log(this);
  socket.emit('user', thisPlayer);
}

// Player
let pubId = 1;

function Player(sessionId) {
  this.sessionId = sessionId;
  this.nickname = 'change name';
  // this.socketId = '';
  this.curRoom = '';
  this.status = 'Lobby';
  this.pubId = ('0000' + pubId++).slice(-4) + (new Date().getTime().toString().slice(-10));
}

Player.prototype.updateNickname = function (newNickname) {
  this.nickname = newNickname;
}
Player.prototype.updateProp = function (field, data) {
  this[field] = data;
}
// const Player = {
//   isValidNewSessionId: function (id) {
//     return true;
//   },
//   isExist: function (sessionId) {
//     return true;
//   },
//   updateNickname: function (socket, newNickname) {

//   }
// };
const newPlayers = new Players();
module.exports = newPlayers;
