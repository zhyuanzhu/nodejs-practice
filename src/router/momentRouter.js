const Router = require('koa-router');

const momentRouter = new Router({ prefix: '/moment' });

const {
  create,
  detail,
  list,
} = require('../controller/momentController');

const {
  verifyAuth,
} = require('../middleware/authMiddleware');

momentRouter.post('/', verifyAuth, create);
momentRouter.get('/detail/:momentId', detail);
momentRouter.get('/list', list);

module.exports = momentRouter;