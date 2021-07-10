// 标签路由

const Router = require('koa-router');
const {
  verifyAuth,
} = require('../middleware/authMiddleware');

const {
  create,
} = require('../controller/labelController');

const labelRouter = new Router({prefix: '/label'});

labelRouter.post('/create', verifyAuth, create);

module.exports = labelRouter;