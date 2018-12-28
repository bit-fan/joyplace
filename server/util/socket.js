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

module.exports.getSessionId = function (socket) {
  return getCookiePropFromSocket(socket, 'sessionId');
}
