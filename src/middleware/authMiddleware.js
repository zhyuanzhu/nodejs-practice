const jwt = require('jsonwebtoken');
const errorType = require('../constants/error-types');
const service = require('../service/userService');
const authService = require('../service/authService');
const { md5Password } = require('../utils/util');
const { PUBLICK_KEY } = require('../app/config');

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

  ctx.user = user;
  await next();

};

const verifyAuth = async (ctx, next) => {
  // 授权认证
  // 获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    return throwUnauthorized();
  }
  const token = authorization.replace('Bearer ', '');

  // 验证 token
  
  try {
    const result = jwt.verify(token, PUBLICK_KEY, {
      algorithms: ['RS256'],
    });
    ctx.user = result;
    await next();

  } catch (err) {
    return throwUnauthorized();
  }

  function throwUnauthorized () {
    const error = new Error(errorType.UNAUTHORIZED);
    return ctx.app.emit('error', error, ctx);
  }

};

const verifyPermission = async (ctx, next) => {
  // 获取文章 id 和用户 id
  const { id, content } = ctx.request.body;
  const { id: user_id } = ctx.user;

  // 查询是否具备权限
  const isPermisstion = await authService.checkMoment(id, user_id);
  if (!isPermisstion) {
    const error = new Error(errorType.UNPERMISSION);
    return ctx.app.emit('error', error, ctx);
  }

  await next();
}


module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
}