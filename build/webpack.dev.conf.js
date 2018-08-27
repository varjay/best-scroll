/**
 * example的开发预览
 */
'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.conf.js')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const root = path.join(__dirname, '../')

module.exports = merge(webpackBaseConfig, {
  mode: 'development', // webpack4新增，也可写在CLI参数里，自动设置process.env.NODE_ENV=
  entry: path.join(root, 'example/main.js'),
  devtool: 'cheap-module-source-map',
  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true, // 404的页面会自动跳转到/页面
    inline: true, // 文件改变自动刷新页面
    progress: true, // 显示编译进度
    quiet: true,
    overlay: {
      errors: true // webpack出错直接贴到页面上
    },
    port: 3000, // 服务器端口
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        },
        'async-vendors': {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          name: 'async-vendors',
          chunks: 'async',
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热加载模块
    // 给index.html自动添加引用的JS文件，CSS文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../example/index.html'),
      inject: true
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:3000/'],
      },
    })
  ]
})
