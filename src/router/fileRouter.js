const Router = require('koa-router');

const {
  verifyAuth,
} = require('../middleware/authMiddleware');

const {
  avatarHandler
} = require('../middleware/fileMiddleware');


const fileRouter = new Router({prefix: '/upload'});

fileRouter.post('/avatar', verifyAuth, avatarHandler)


module.exports = fileRouter;