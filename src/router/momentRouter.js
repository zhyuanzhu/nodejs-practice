const Router = require('koa-router');

const momentRouter = new Router({ prefix: '/moment' });

const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
} = require('../controller/momentController');

const {
  verifyAuth,
  verifyPermission,
} = require('../middleware/authMiddleware');

const {
  verifyLabelExists
} = require('../middleware/labelMiddleware');

momentRouter.post('/', verifyAuth, create);
momentRouter.get('/detail/:momentId', detail);
momentRouter.get('/list', list);
momentRouter.post('/update', verifyAuth, verifyPermission('moment'), update);
momentRouter.post('/delete', verifyAuth, verifyPermission('moment'), remove);

// 给动态添加标签
momentRouter.post('/addLabels', verifyAuth, verifyPermission('moment'), verifyLabelExists, addLabels);

module.exports = momentRouter;