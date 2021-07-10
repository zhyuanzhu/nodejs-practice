const service = require('../service/labelService');

class LabelController {
  async create (ctx, next) {
    const { name } = ctx.request.body;
    const result = await service.create(name);
    ctx.body = result;
  }
}

module.exports = new LabelController();