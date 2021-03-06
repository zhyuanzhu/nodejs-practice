const momentService = require('../service/momentService');

/**
 * CREATE TABLE IF NOT EXISTS `moment` (
	id INT PRIMARY KEY AUTO_INCREMENT,
	content VARCHAR(1000) NOT NULL,
	user_id INT NOT NULL,
	createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY(user_id) REFERENCES users(id)
);
 */

class MomentController {
  async create (ctx, next) {
    // 获取用户信息和数据
    const userId = ctx.user.id;
    const content = ctx.request.body.content;
    
    // 将数据插入数据库
    const result = await momentService.create(userId, content);
    ctx.body = result;
  }

  async detail (ctx, next) {
    // 获取 动态 id
    const momentId = ctx.params.momentId;

    // 数据库中查询
    const result = await momentService.queryMomentById(momentId);

    ctx.body = result;
  }

  async list (ctx, next) {
    // 数据分页查询
    const { page = 1, pageSize = 20 } = ctx.query;

    // 查询列表
    const result = await momentService.queryMomentList(page, pageSize);
    ctx.body = result;
  }

  async update (ctx, next) {
    // 获取当前 id
    const { content, id } = ctx.request.body;
    const result = await momentService.update(content, id);
    ctx.body = result;
  }

  async remove (ctx, next) {
    // 获取 momentId
    const { id } = ctx.request.body;

    // 删除内容
    const result = await momentService.removeById(id);
    ctx.body = result;
  }

  async addLabels (ctx, next) {
    const { id } = ctx.request.body;
    const labels = ctx.labels;
    let ret = '';
    for (let label of labels) {
      // 判断标签是否已经和动态有关系
      const isExist = await momentService.hasLabel(id, label.id);
      if (!isExist) {
        ret += `${label.name},`
        await momentService.addLabel(id, label.id);
      }
    }

    ctx.body = `给动态id: ${id} 添加 ${ret} 标签成功`;
  }
}

module.exports = new MomentController();