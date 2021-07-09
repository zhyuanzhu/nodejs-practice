const Router = require('koa-router');

const momentRouter = new Router({ prefix: '/moment' });

const {
  create,
  detail,
} = require('../controller/momentController');

const {
  verifyAuth,
} = require('../middleware/authMiddleware');

momentRouter.post('/', verifyAuth, create);
momentRouter.get('/:momentId', detail);

module.exports = momentRouter;