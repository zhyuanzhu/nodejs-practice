const service = require('../service/labelService');

class LabelController {
  async create (ctx, next) {
    const { name } = ctx.request.body;
    const result = await service.create(name);
    ctx.body = result;
  }

  async list (ctx, next) {
    const { page, pageSize } = ctx.query;
    const result = await service.getLabels(page, pageSize);
    ctx.body = result;
  }
}

module.exports = new LabelController();