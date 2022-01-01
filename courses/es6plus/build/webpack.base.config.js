const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              'useBuiltIns': 'entry'
            }]
          ],
          plugins: ['@babel/plugin-transform-runtime']
        }
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/tpl/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public", to: "" },
      ],
    })
  ],
}
