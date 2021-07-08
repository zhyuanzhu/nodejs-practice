const Router = require('koa-router');

const authRouter = new Router();

const {
  login
} = require('../controller/authController');

const {
  verifyNameAndPwd
} = require('../middleware/verifyNameAndPwd');

const {
  verifyLogin
} = require('../middleware/authMiddleware');

authRouter.post('/login', verifyNameAndPwd, verifyLogin, login);

module.exports = authRouter;