class UserService {
  async create (user) {
    // 将数组存储到数据库中
    return `用户 ${user.name} 创建用户成功了，密码是 ${user.password}`;
  }
}

module.exports = new UserService();