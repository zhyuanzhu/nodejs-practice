const errorType = require('../constants/error-types');
const service = require('../service/labelService');

const verifyLabelExists = async (ctx, next) => {

  // 获取标签
  const { labels } = ctx.request.body;
  const newLabels = [];
  for (let name of labels) {
    // 判断传入的标签是否存在标签表中存在
    const labelResult = await service.getLabelByName(name);
    // 不存在，创建这个标签数据
    const label = {name};
    if (!labelResult) {
      const result = await service.create(name);
      label.id = result.insertId;
    } else {
      label.id = labelResult.id;
    }
    newLabels.push(label);
  }
  ctx.labels = newLabels;
  
  await next();

};


module.exports = {
  verifyLabelExists
}