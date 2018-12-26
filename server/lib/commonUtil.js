const Util = {};
Util.generateSessionId = function (leng) {
  leng = leng || 20;
  var rNum = Math.random().toString();
  rNum = rNum.substring(2, rNum.length);
  return rNum.repeat(leng / rNum.length + 1).substring(leng);

}
module.exports = Util;
