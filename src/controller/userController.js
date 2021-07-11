const fs = require('fs');
const userService = require('../service/userService');
const fileService = require('../service/fileService');
const { AVATAR_PATH } = require('../constants/file-path');

class UserController {
  async create (ctx, next) {
    const user = ctx.request.body;
    const result = await userService.create(user);
    ctx.body = result;
  }

  async avatarInfo (ctx, next) {
    const { id } = ctx.user;
    const avatarInfo = await fileService.getAvatarByUserId(id);
    // ctx.body = avatarInfo;
    // 图像信息
    ctx.response.set('content-type', avatarInfo.mimetype);
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
  }
}

module.exports = new UserController();