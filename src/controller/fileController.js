const service = require('../service/fileService');

class FileController {
  async saveAvatarInfo (ctx, next) {
    // 获取图像的相关信息
    const { filename, mimetype, size } = ctx.req.file;
    const { id } = ctx.user;
    // 将信息保存到数据库中
    const result = await service.createAvatar(filename, mimetype, size, id);
    ctx.body = result;
    
  }
}

module.exports = new FileController();