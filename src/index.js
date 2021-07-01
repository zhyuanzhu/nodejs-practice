const app = require('./app');
const config = require('./app/config');

app.listen(config.APP_PORT, () => {
  console.log(`服务器启动成功，port: ${config.APP_PORT}`)
})