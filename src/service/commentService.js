const connections = require('../app/database');

class CommentService {
  async create(momentId, content, userId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES(?, ?, ?);`;
    const [result] = await connections.execute(statement, [content, momentId, userId]);
    return result;  
  }

  async reply (momentId, content, commentId, userId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES(?, ?, ?, ?);`;
    try {
      const [result] = await connections.execute(statement, [content, momentId, userId, commentId]);
      return result; 
    } catch (error) {
      console.log(error);
    }
  }

  async update (commentId, content) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`;
    const [result] = await connections.execute(statement, [content, commentId]);
    return result; 
  }

  async remove (commentId) {
    const statement = `DELETE FROM comment WHERE id = ?;`;
    const [result] = await connections.execute(statement, [commentId]);
    return result;
  }
  /**
   * 获取一条动态下面的所有评论信息，包含当前评论的用户信息
   *  SELECT
        m.id, m.content, m.comment_id commentId, m.createAt createTime,
        JSON_OBJECT('id', u.id, 'name', u.`name`) user
      FROM comment m
      LEFT JOIN users u ON u.id = m.user_id
      WHERE moment_id = 1; 
   * 
   */
  async getCommentsByMomentId (momentId) {
    const statement = `SELECT * FROM comment WHERE moment_id = ?;`;
    const [result] = await connections.execute(statement, [momentId]);
    return result;
  }


}

module.exports = new CommentService();