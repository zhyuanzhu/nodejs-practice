const Router = require('koa-router');

const authRouter = new Router();

const {
  login,
  success,
} = require('../controller/authController');

const {
  verifyNameAndPwd
} = require('../middleware/verifyNameAndPwd');

const {
  verifyLogin,
  verifyAuth
} = require('../middleware/authMiddleware');

authRouter.post('/login', verifyNameAndPwd, verifyLogin, login);

authRouter.get('/test', verifyAuth, success)

module.exports = authRouter;