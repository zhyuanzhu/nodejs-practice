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
    const statement = `DELETE FROM COMMENT WHERE id = ?;`;
    const [result] = await connections.execute(statement, [commentId]);
    return result;
  }


}

module.exports = new CommentService();