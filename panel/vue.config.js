const path = require('path');
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  chainWebpack: (config) => {
    const oneOfsMap = config.module.rule('sass').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [
            './src/assets/__colors.sass',
          ],
        })
        .end()
    })
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', 'png'],
      alias: {
        '@$': resolve('src'),
      },
    },
  },
};
