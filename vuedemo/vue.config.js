
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
// 为路径设置别名只需要在根目录创建vue.config.js 代码
module.exports = {
  publicPath: './',
  assetsDir: './',
  outputDir: path.relative(__dirname, './dist'),
  // outputDir: 'dist',
  // 资源路径简写
  chainWebpack: config => {
    //添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@tab", resolve("src/assets/tab"))
      .set('@pages', resolve('src/pages'))
      .set('@utils', resolve('src/utils'))
      .set('@http', resolve('src/http'))
  },
  // less设置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        resolve("src/config/less/global.less")
      ]
    }
  },
  

}
