const Router = require('koa-router');
const {
  create,
} = require('../controller/userController');

const {
  verifyNameAndPwd
} = require('../middleware/verifyNameAndPwd');

const {
  verifyUser,
  encryptPassword,
} = require('../middleware/userMiddleware');

const userRouter = new Router({prefix: '/user'});

userRouter.post('/create', verifyNameAndPwd, verifyUser, encryptPassword, create)

module.exports = userRouter;