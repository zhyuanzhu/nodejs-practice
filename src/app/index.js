const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const useRoutes = require('../router/index');
const errorHandler = require('../app/errorHandle');

const app = new Koa();

app.useRoutes = useRoutes;

app.use(bodyParser());

app.useRoutes();

app.on('error', errorHandler);

module.exports = app;