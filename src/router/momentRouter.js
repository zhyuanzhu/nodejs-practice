const Router = require('koa-router');

const momentRouter = new Router({ prefix: '/moment' });

const {
  create,
  detail,
  list,
  update,
} = require('../controller/momentController');

const {
  verifyAuth,
  verifyPermission,
} = require('../middleware/authMiddleware');

momentRouter.post('/', verifyAuth, create);
momentRouter.get('/detail/:momentId', detail);
momentRouter.get('/list', list);
momentRouter.post('/update', verifyAuth, verifyPermission, update)

module.exports = momentRouter;