const errorTypes = require('../constants/error-types');

function errorHandler (error, ctx) {
  let status, message;
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = '用户名或者密码不能为空'
      break;
    case errorTypes.USER_NAME_ALREADY_EXISTS:
      status = 200;  
      message = '该用户名已经注册了';
      break;
    default:
      status = 404;
      message = 'NOT FOUND ~'
      break;
  }
  ctx.status = status;
  ctx.body = message;
}

module.exports = errorHandler;