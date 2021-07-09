const connections = require('../app/database');

class MomentService {
  async create (userId, content) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`;
    const result = await connections.execute(statement, [content, userId]);
    return result[0];
  }

  async queryMomentById (momentId) {
    const statement = `SELECT * FROM moment WHERE id = ?;`;
    const [result] = await connections.execute(statement, [momentId]);
    return result[0];
  }
}

module.exports = new MomentService();