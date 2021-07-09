const jwt = require('jsonwebtoken');

const {
  PRIVATE_KEY,
  PUBLICK_KEY,
} = require('../app/config');

// genrsa -out private.key 1024
// rsa -in private.key -pubout -out public.key

class AuthController {
  async login (ctx, next) {
    // const { name } = ctx.request.body;
    // 登录成功了，颁发登录态令牌

    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })

    ctx.body = {
      id,
      name,
      token,
    };
  }


  async success (ctx, next) {
    ctx.body = '授权成功';
  }
}


module.exports = new AuthController();