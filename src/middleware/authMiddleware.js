const errorType = require('../constants/error-types');
const service = require('../service/userService');
const { md5Password } = require('../utils/util');

const verifyLogin = async (ctx, next) => {

  // 获取用户名和密码
  const { name, password } = ctx.request.body;

  // 判断用户名和密码不能为空
  if (!name || !password) {
    // 给统一定义一下错误的code和错误信息枚举
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }

  // 判断用户名是否存在
  const result = await service.queryUserByName(name);
  const user = result[0];
  if (!user) {
    const error = new Error(errorType.USER_DOES_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  // 判断密码是否正确
  const pwd = md5Password(password);
  if (pwd !== user.password) {
    const error = new Error(errorType.USER_NAME_OR_PASSWORD_ERROR);
    return ctx.app.emit('error', error, ctx);
  }

  await next();

};

module.exports = {
  verifyLogin,
}