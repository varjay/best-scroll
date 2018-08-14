/**
 * 打包生成min.js
 *(css内嵌在了js里面，没有分离出来)
 */
'use strict'
const PKG = require('../package.json')
const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  entry: {
    main: './lib/index.js'
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
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: PKG.shortname + '.min.js',
    library: {
      root: PKG.root,
      // commonjs: PKG.shortname + '-public-components',
    },
    libraryTarget: 'umd'
  },
  // 我们的library打包时不将vue和iview打包进去，由引用library者提供，
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    },
    iview: {
      root: 'iView',
      commonjs: 'iview',
      commonjs2: 'iview',
      amd: 'iview'
    }
  },
  plugins: [
    new OptimizeCSSPlugin({}),  // 压缩CSS
    new CleanWebpackPlugin(
      ['dist/'+ PKG.shortname +'.min.js'],
      {
        root: path.join(__dirname, '../'),
        verbose: true,
        dry: false
      }
    ),
  ]
})

module.exports = webpackConfig
