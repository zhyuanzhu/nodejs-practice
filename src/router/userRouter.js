const Router = require('koa-router');
const {
  create,
} = require('../controller/userController');

const userRouter = new Router({prefix: '/user'});

userRouter.post('/create', create)

module.exports = userRouter;