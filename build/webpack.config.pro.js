/**
 *  生产环境  
 */
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin = require('html-webpack-plugin');
let path=require('path');
import loadersConfig from './webpack.config.loaders.js'

module.exports={
    entry: {
        app:'./src/app.js'
    },
    output:{
        path:path.resolve(__dirname, "../release"),
        publicPath:"",//TODO 填写生产环境静态文件路径
        filename:'[name].[chunkhash:8].js'
    },
    externals: {
        'vue': 'Vue',
        'vue-router':'VueRouter'
    },
    resolve: {
        root: path.resolve('./'),
        extensions: ['', '.js', '.json', '.vue'],
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }
    },
    module: {
        loaders: loadersConfig
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                drop_console: true,
                warnings: false
            }
        }),
        new ExtractTextPlugin("[name].[contenthash:8].css", {
            allChunks: true,
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ],
    devtools:false
}