const CONST = require('../../const/room');
let roomId = 1;

function Room(game, owner) {
  this.roomId = roomId++;
  this.game = game;
  this.players = [];
  this.Kibitzers = [];
  this.maxNumPlayer = CONST.game[game].maxNumPlayer || 20;
  this.minNumPlayer = CONST.game[game].minNumPlayer || 1;
  this.status = 'ready';
  this.owner = owner;
  // todo: future add kitbizer

}

const fn = Room.prototype;

fn.addPlayer = function (playerId) {
  this.players.push(playerId);
}

fn.isReady = function () {
  if (this.players.length < this.minNumPlayer) {
    return false;
  }
  if (this.players.length > this.maxNumPlayer) {
    return false;
  }
  return;
}
