const connection = require('../app/database')

class AuthService {
  async checkMoment (momentId, userId) {

    const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?;`;
    const [result] = await connection.execute(statement, [momentId, userId]);
    return result.length !== 0;
  }

}

module.exports = new AuthService();