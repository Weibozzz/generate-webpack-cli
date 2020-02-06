const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
module.exports = function (env = {}) {
  const dev = env.dev
  return {
    mode: dev ? 'development' : 'production',
    devtool: 'source-map',
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: dev ? 'bundle.js' : 'bundle.min.js',
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    devServer: {
      port: 8080,
      open: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html'
      })
    ]
  };

}
