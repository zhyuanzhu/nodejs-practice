const Router = require('koa-router');

const {
  verifyAuth,
  verifyPermission
} = require('../middleware/authMiddleware');

const {
  create,
  reply,
  update,
  remove,
  list,
} = require('../controller/commentController');


const commentRouter = new Router({prefix: '/comment'});

commentRouter.post('/create', verifyAuth, create);

// 回复评论
commentRouter.post('/reply', verifyAuth, reply);

// 修改评论
commentRouter.post('/update', verifyAuth, verifyPermission('comment'), update);
// 删除评论
commentRouter.post('/delete', verifyAuth, verifyPermission('comment'), remove);

// 获取评论列表
commentRouter.get('/list', list);

module.exports = commentRouter;