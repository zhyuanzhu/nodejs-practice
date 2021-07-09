const Router = require('koa-router');

const momentRouter = new Router({ prefix: '/moment' });

const {
  create,
} = require('../controller/momentController');

const {
  verifyAuth,
} = require('../middleware/authMiddleware');

momentRouter.post('/', verifyAuth, create);

module.exports = momentRouter;