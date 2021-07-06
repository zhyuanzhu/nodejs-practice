const crypto = require('crypto');
function isDef (n) {
  return n !== undefined && n !== null;
}


const md5Password = (password) => {
  const md5 = crypto.createHash('md5');
  const result = md5.update(password).digest('hex');
  return result;
}

module.exports = {
  isDef,
  md5Password
}