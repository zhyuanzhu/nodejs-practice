const connections = require('../app/database');

class MomentService {
  async create (userId, content) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`;
    const result = await connections.execute(statement, [content, userId]);
    return result[0];
  }

    /**
     * 一个查询语句查询某一条动态下面的所有评论及信息
     * 
     * SELECT 
          m.id id, m.content content, m.createAt createAt, m.updateAt updateAt, 
          JSON_OBJECT('user_name', u.name) users, 
          JSON_ARRAYAGG(
            JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
              'user', JSON_OBJECT('id', cu.id, 'name', cu.`name`)
            )
          ) comments
      FROM moment m 
      LEFT JOIN users u ON m.user_id = u.id 
      LEFT JOIN comment c ON c.moment_id = m.id
      LEFT JOIN users cu ON c.user_id = cu.id
      WHERE m.id = 1;
   */

  async queryMomentById (momentId) {
    // const statement = `SELECT * FROM moment WHERE id = ?;`;
    const statement = `SELECT m.id id, m.content content, m.createAt createAt, m.updateAt updateAt, JSON_OBJECT('user_name', u.name, 'id', u.id) users FROM moment m LEFT JOIN users u ON m.user_id = u.id WHERE m.id = ?;`
    const [result] = await connections.execute(statement, [momentId]);
    return result[0];
  }

  async queryMomentList (offset, size) {
    const statement = `
      SELECT 
      m.id id, m.content content, m.createAt createAt, m.updateAt updateAt, 
      JSON_OBJECT('user_name', u.name, 'id', u.id) users,
      (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) mCount
      FROM moment m LEFT JOIN users u ON m.user_id = u.id LIMIT ?, ?;
    `;
    try {
      const result = await connections.execute(statement, [offset, size]);
      return result[0];
    } catch (error) {
      console.log(error.message)
    }
  }

  async update (content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
    const [result] = await connections.execute(statement, [content, momentId
    ]);
    return result;
  }

  async removeById (id) {
    const statement = `DELETE FROM moment WHERE id = ?;`;
    const [result] = await connections.execute(statement, [id]);
    return result;
  }
}

module.exports = new MomentService();