const service = require('../service/commentService');

class CommentController {
  // 创建评论
  async create (ctx, next) {
    const { id, content } = ctx.request.body;
    const { id: userId } = ctx.user;

    const result = await service.create(id, content, userId);
    
    ctx.body = result;
  }
}


module.exports = new CommentController();