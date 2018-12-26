const io = require('socket.io');
const playerHandler = require('./player');

function Socket(server) {
  this.server = server;
  this.io = io.listen(server);
}

Socket.prototype.init = function () {
  this.io.on('connection', (socket) => {
    const newPlayerHandler = new playerHandler(socket, {
      req: {
        type: 'connect'
      }
    });

    // Log whenever a user connects
    console.log('user connected', socket.handshake.headers.cookie);

    // this.io.emit('message', {
    //   type: 'new-message'
    // });
    // Log whenever a client disconnects from our websocket server
    socket.on('disconnect', function () {
      console.log('user disconnected');
    });

    // When we receive a 'message' event from our client, print out
    // the contents of that message and then echo it back to our client
    // using `io.emit()`
    // socket.on('message', (message) => {
    //   console.log("Message Received: " + message);
    //   this.io.emit('message', {
    //     type: 'new-message',
    //     text: message
    //   });
    // });
    socket.on('user', data => {
      const newHandler = new playerHandler(socket, data);
    });
    // socket.on('updateUser', data => {
    //   console.log('updateUser', data);
    //   socket.emit('user', Object.assign({}, {
    //     where: 'here'
    //   }, data));
    // })
  });
}


module.exports = Socket;
