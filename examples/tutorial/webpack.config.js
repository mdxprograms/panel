var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var webpackConfig = {
  entry: './index.js',
  module: {
    loaders: [
      {
        test: /\.jade$/,
        exclude: /node_modules/,
        loader: 'virtual-jade',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!stylus-loader'),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('build/bundle.css'),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: 'index.template.html',
    }),
  ],
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  virtualJadeLoader: {
    vdom: 'snabbdom',
  },
};

module.exports = webpackConfig;
