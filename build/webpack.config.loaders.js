
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports =  [
    {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
    {test: /\.less$/, loader: ExtractTextPlugin.extract('css-loader', 'less-loader')},
    {test: /\.js$/, exclude: /node_modules|vue\/src|vue-router\/|vue-loader\//, loader: 'babel' },
    {test: /\.vue$/, loader: 'vue' },
    {test: /\.(png|jpg|gif)$/, loader: 'url-loader?name=images/[hash].[ext]&limit=8192'},
    {test: /\.(html|tpl)$/, loader: 'html-loader'},
    {test: /\.woff/, loader : 'url?prefix=font/&limit=10000&mimetype=application/font-woff' },
    {test: /\.ttf/,loader : 'file?prefix=font/'}, 
    {test: /\.eot/,loader : 'file?prefix=font/'}, 
    {test: /\.svg/,loader : 'file?prefix=font/'}
]