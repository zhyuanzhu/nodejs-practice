const Router = require('koa-router');
const {
  create,
  avatarInfo,
} = require('../controller/userController');

const {
  verifyNameAndPwd
} = require('../middleware/verifyNameAndPwd');

const {
  verifyAuth
} = require('../middleware/authMiddleware');

const {
  verifyUser,
  encryptPassword,
} = require('../middleware/userMiddleware');

const userRouter = new Router({prefix: '/user'});

userRouter.post('/create', verifyNameAndPwd, verifyUser, encryptPassword, create);

userRouter.get('/avatar', verifyAuth, avatarInfo)

module.exports = userRouter;