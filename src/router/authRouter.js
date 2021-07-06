const Router = require('koa-router');

const authRouter = new Router();

const {
  login
} = require('../controller/authController')

authRouter.post('/login', login);

module.exports = authRouter;