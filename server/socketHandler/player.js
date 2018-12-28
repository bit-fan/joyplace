const PlayerCtrl = require('../controller/players');
const socketUtil = require('../util/socket');

function updateUser(socket, data) {
  // Player.updatePlayer(socket, data);

  const sessionId = socketUtil.getSessionId(socket);

  let thisPlayer = PlayerCtrl.getPlayerBySessionId(sessionId);
  if (thisPlayer) {
    Object.keys(data).forEach(key => {
      thisPlayer.updateProp(key, data[key]);
    });
  }
  socket.emit('user', thisPlayer);
}

const player = function (socket, data) {
  switch (data.req.type) {
    case 'updateUser':
      updateUser(socket, data.data);
      break;
    case 'connect':
      const sessionId = socketUtil.getSessionId(socket);
      const player = PlayerCtrl.login(sessionId);
      socket.emit('user', player);
      break;
  }
};

module.exports = player;
