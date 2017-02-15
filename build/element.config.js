/**
 *  打包element ui  
 */
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var path=require('path');

module.exports={
    entry: {
        index:'./src/element.import.js'
    },
    output:{
        path:path.resolve(__dirname, "../release/lib"),
        // publicPath:"",//TODO 填写生产环境静态文件路径
        // filename:'vue.min.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            {test: /\.less$/, loader: ExtractTextPlugin.extract('css-loader', 'less-loader')},
            {test: /\.js$/, exclude: /node_modules|vue\/src|vue-router\/|vue-loader\//, loader: 'babel' },
            {test: /\.(html|tpl)$/, loader: 'html-loader'},
            {test: /\.woff/, loader : 'url?prefix=font/&limit=10000&mimetype=application/font-woff' },
            {test   : /\.ttf/,loader : 'file?prefix=font/'}, 
            {test   : /\.eot/,loader : 'file?prefix=font/'}, 
            {test   : /\.svg/,loader : 'file?prefix=font/'}
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                drop_console: true,
                warnings: false
            }
        }),
        new ExtractTextPlugin("element.css", {
            allChunks: true,
        })
    ]
}