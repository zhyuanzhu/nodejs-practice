const service = require('../service/commentService');

class CommentController {
  // 创建评论
  // id 当前 状态的 id  moment_id
  async create (ctx, next) {
    const { id, content } = ctx.request.body;
    const { id: userId } = ctx.user;

    const result = await service.create(id, content, userId);
    
    ctx.body = result;
  }

  // 回复评论
  async reply (ctx, next) {
    const { id, content, commentId } = ctx.request.body;
    const { id: userId } = ctx.user;
    const result = await service.reply(id, content, commentId, userId);
    ctx.body = result;
  }

  // 修改
  async update (ctx, next) {
    // 需要修改的评论 id 和 修改内容
    const { id, content } = ctx.request.body;

    const result = await service.update(id, content);

    ctx.body = result;
  }

  async remove (ctx, next) {
    const { id } = ctx.request.body;
    const result = await service.remove(id);
    ctx.body = result;
  }
}


module.exports = new CommentController();