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

  /**
   * 
   * @param {*} id 当前发布的动态的id，即 comment 表中的 moment_id
   * @param {*} content 需要更新的状态
   * @param {*} commentId 当前评论的 id，即 comment 表中的 id
   */
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