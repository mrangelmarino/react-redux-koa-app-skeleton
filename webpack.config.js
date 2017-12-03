const path = require('path');
const dotEnv = require('dotenv').config();
const env = process.env.NODE_ENV;
const development = env === 'development';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: {
    'js/main': ['whatwg-fetch', 'babel-polyfill', './src/index.js']
  },
  devtool: 'source-map',
  watch: development,
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: path.resolve(__dirname, 'src'),
      exclude: /node_modules/
    },{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            minimize: !development,
            modules: true,
            localIdentName: '[path][name]__[local]--[hash:base64:5]'
          }
        },
        'postcss-loader']
      })
    },{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            modules: true,
            sourceMap: development,
            importLoaders: 2,
            camelCase: true,
            localIdentName: '[path][name]__[local]--[hash:base64:5]'
          }
        },
        'sass-loader']
      })
    },{
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader'
    },{
      test: /\.(woff|woff2)$/,
      loader: 'url-loader?prefix=font/&limit=5000'
    },{
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
    },{
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: getPath => getPath('css/[name].css').replace('css/js','css'),
      allChunks: true
    }),
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify(env)
        }
      }
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public')
  }
};

if(!development) config.plugins.push(new UglifyJSPlugin())

module.exports = config;
