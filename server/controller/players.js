const Player = require('../model/player');

const players = [];
const playersObj = {};

const fn = {
  isValidNewSessionId: function (sessionId) {
    return !playersObj[sessionId];
  },
  getAllPlayers: function () {
    return players;
  },
  login: function (sessionId) {
    console.log(sessionId);
    if (playersObj[sessionId]) {
      return playersObj[sessionId];
    } else {
      const newPlayer = new Player(sessionId);
      players.push(newPlayer);
      playersObj[sessionId] = newPlayer;
      return newPlayer;
    }
  },
  getPlayerBySessionId: function (sessionId) {
    return playersObj[sessionId];
  },
  getPlayerByPubId: function (pubId) {
    return players.find(player => {
      return player.pubId === pubId;
    })
  }

};
module.exports = fn;
