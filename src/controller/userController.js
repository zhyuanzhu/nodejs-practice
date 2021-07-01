const {
  create
} = require('../service/userService');

class UserController {
  async create (ctx, next) {
    const user = ctx.request.body;
    const result = await create(user);
    ctx.body = result;
  }
}

module.exports = new UserController();