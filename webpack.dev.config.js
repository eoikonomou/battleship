const baseWebpackConfig = require('./webpack.config');

module.exports = {
  ...baseWebpackConfig,
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0', // for public access
    port: 8080,
    static: [
      {
        directory: './src',
        staticOptions: {},
        watch: true
      }
    ],
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
  devtool: 'source-map'
};
