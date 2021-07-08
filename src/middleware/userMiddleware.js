const errorType = require('../constants/error-types');
const service = require('../service/userService');
const { md5Password } = require('../utils/util');

const verifyUser = async (ctx, next) => {

  // 获取用户名和密码
  const { name, password } = ctx.request.body;

  // // 判断用户名和密码不能为空
  // if (!name || !password) {
  //   // 给统一定义一下错误的code和错误信息枚举
  //   const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
  //   return ctx.app.emit('error', error, ctx);
  // }

  // 判断用户名是否已经注册了
  const result = await service.queryUserByName(name);
  if (result.length) {
    const error = new Error(errorType.USER_NAME_ALREADY_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  await next();

};

const encryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5Password(password);
  await next();
}


module.exports = {
  verifyUser,
  encryptPassword
}