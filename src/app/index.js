const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const userRouter = require('../router/userRouter');
const errorHandler = require('../app/errorHandle');

const app = new Koa();

app.use(bodyParser());

// 请求路径和中间件映射关系
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.on('error', errorHandler);

module.exports = app;