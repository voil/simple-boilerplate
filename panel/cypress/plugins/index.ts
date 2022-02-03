const { startDevServer } = require('@cypress/webpack-dev-server')
const webpackConfig = require('@vue/cli-service/webpack.config.js')

module.exports = (on, config) => {
  on('dev-server:start', options => {
    return startDevServer({
      options,
      webpackConfig
    })
  });

  const mock = {
    user: 'test@app.com',
    pass: 'exampletest1A',
  };

  config = { ...config, mock };

  return config
}