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
}

module.exports = new MomentController();