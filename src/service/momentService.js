const connections = require('../app/database');

class MomentService {
  async create (userId, content) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`;
    const result = await connections.execute(statement, [content, userId]);
    return result[0];
  }

  async queryMomentById (momentId) {
    // const statement = `SELECT * FROM moment WHERE id = ?;`;
    const statement = `SELECT m.id id, m.content content, m.createAt createAt, m.updateAt updateAt, JSON_OBJECT('user_name', u.name, 'id', u.id) users FROM moment m LEFT JOIN users u ON m.user_id = u.id WHERE m.id = ?;`
    const [result] = await connections.execute(statement, [momentId]);
    return result[0];
  }

  async queryMomentList (offset, size) {
    const statement = `SELECT m.id id, m.content content, m.createAt createAt, m.updateAt updateAt, JSON_OBJECT('user_name', u.name,'id', u.id) users FROM moment m LEFT JOIN users u ON m.user_id = u.id LIMIT ?,?;`;
    try {
      const result = await connections.execute(statement, [offset, size]);
      return result[0];
    } catch (error) {
      console.log(error.message)
    }
    
    // console.log(result)
    // return result;
  }
}

module.exports = new MomentService();