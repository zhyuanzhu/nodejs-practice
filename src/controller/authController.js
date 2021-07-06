class AuthController {
  async login (ctx, next) {
    const { name } = ctx.request.body;
    ctx.body = `欢迎您：${name}`;
  }
}


module.exports = new AuthController();