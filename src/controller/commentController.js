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

  // 恢复评论
  async reply (ctx, next) {
    const { id, content, commentId } = ctx.request.body;
    const { id: userId } = ctx.user;
    const result = await service.reply(id, content, commentId, userId);
    ctx.body = result;
  }
}


module.exports = new CommentController();