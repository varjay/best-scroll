'use strict'
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  resolve: {
    // 自动解析确定扩展，在引入模块的时候可以不加后缀
    extensions: ['.js', '.vue', '.json'],
    alias: { // 创建引入模块时使用的别名
      /**
      * 如 import Vue from 'vue'
      * 等价于 import Vue from 'vue/dist/vue.esm.js'
      * ‘@’ 指向根目录下的lib文件夹
      */
      'vue$': 'vue/dist/vue.runtime.js',
      '@': resolve('lib'),
      'components': resolve('lib/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   exclude: resolve('node_modules')
      // },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('./', 'image/[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          publicPath: '../',
          name: path.posix.join('./', './css/fonts/[name].[hash:7].[ext]'),
          limit: 10000,
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(), // webpack 4 vue-loader需要这样使用
  ],
  // 该选项是用来polyfill Node中的某些全局变量或者模块，让最初为Node.js环境写的代码可以在其他环境运行
  node: {
    // 防止webpack注入setImmediate的ployfill，因为vue原本就包含了它
    setImmediate: false,
    // 防止webpack注入到Nodejs的node_modules里，以下模块/变量在客户端不起作用
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
