const errorType = require('../constants/error-types');

const verifyNameAndPwd = async (ctx, next) => {

  // 获取用户名和密码
  const { name, password } = ctx.request.body;

  // 判断用户名和密码不能为空
  if (!name || !password) {
    // 给统一定义一下错误的code和错误信息枚举
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }

  await next();

};


module.exports = {
  verifyNameAndPwd
}