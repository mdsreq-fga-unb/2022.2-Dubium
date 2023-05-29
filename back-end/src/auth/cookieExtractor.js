const { decrypt, encrypt } = require("../auth/crypto.js")
const cookieParser = require('cookie-parser');


module.exports = function(req) {
  var token = null;
  if (req && req.cookies)
  {
      token = req.cookies['jwt'];
  }
  return token;
};