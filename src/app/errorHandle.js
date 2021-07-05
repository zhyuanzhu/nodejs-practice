function errorHandler (error, ctx) {
  ctx.status = 200;
  ctx.body = error.message;
}

module.exports = errorHandler;