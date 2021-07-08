const Router = require('koa-router');

const authRouter = new Router();

const {
  login
} = require('../controller/authController');

const {
  verifyLogin
} = require('../middleware/authMiddleware');

authRouter.post('/login', verifyLogin, login);

module.exports = authRouter;