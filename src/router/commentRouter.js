const Router = require('koa-router');

const {
  verifyAuth,
} = require('../middleware/authMiddleware');

const {
  create,
} = require('../controller/commentController');


const commentRouter = new Router({prefix: '/comment'});

commentRouter.post('/create', verifyAuth, create)

module.exports = commentRouter;