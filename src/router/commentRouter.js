const Router = require('koa-router');

const {
  verifyAuth,
} = require('../middleware/authMiddleware');

const {
  create,
  reply,
} = require('../controller/commentController');


const commentRouter = new Router({prefix: '/comment'});

commentRouter.post('/create', verifyAuth, create);

// 回复评论
commentRouter.post('/reply', verifyAuth, reply);

module.exports = commentRouter;