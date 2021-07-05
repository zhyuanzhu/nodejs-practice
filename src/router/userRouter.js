const Router = require('koa-router');
const {
  create,
} = require('../controller/userController');
const {
  verifyUser,
} = require('../middleware/userMiddleware');

const userRouter = new Router({prefix: '/user'});

userRouter.post('/create', verifyUser, create)

module.exports = userRouter;