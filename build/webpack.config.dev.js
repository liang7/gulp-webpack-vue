/**
 *  开发环境  
 */
let webpack = require('webpack');
let path=require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
import loadersConfig from './webpack.config.loaders.js'

module.exports={
    //这里写成数组是为了dev server插入服务配置
    entry: {
        "app":['./src/app.js'],
    },
    output:{
        path:path.resolve(__dirname, "./release"),//__dirname+'/../release',
        publicPath: "/release/",//dev server 会从此路径去拿hot-update.json
        filename:'[name].js'
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
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new ExtractTextPlugin("[name].[contenthash:8].css", {
            allChunks: true,
        }),
    ],
    devtool: 'cheap-module-source-map',
}