const Router = require('koa-router');
const {
  create,
} = require('../controller/userController');
const {
  verifyUser,
  encryptPassword,
} = require('../middleware/userMiddleware');

const userRouter = new Router({prefix: '/user'});

userRouter.post('/create', verifyUser, encryptPassword, create)

module.exports = userRouter;