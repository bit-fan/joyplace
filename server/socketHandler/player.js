const Player = require('../management/player');

function updateUser(socket, data) {
  // Player.updateNickname(socket, data.nickname);
  // Player.updatePlayer(player => {
  //   console.log('socket', socket);
  //   return player.sessionId === socket
  // }, {
  //   nickname: data.nickname
  // });
  Player.updatePlayer(socket, data);
}
//   console.log('updateUser', data);
//   socket.emit('user', Object.assign({}, {
//     where: 'here'
//   }, data));

const player = function (socket, data) {
  switch (data.req.type) {
    case 'updateUser':
      console.log(data);
      updateUser(socket, data.data);
      break;
    case 'connect':
      Player.addPlayer(socket);
      break;
  }
};
// {
//   receivedSocket: function (socket, data) {
//     console.log(socket, data);
//   }
// };

module.exports = player;
