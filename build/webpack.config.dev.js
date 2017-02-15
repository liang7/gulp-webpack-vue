/**
 *  开发环境  
 */
var webpack = require('webpack');
var path=require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

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
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            {test: /\.less$/, loader: ExtractTextPlugin.extract('css-loader', 'less-loader')},
            {test: /\.(png|jpg|gif)$/, loader: 'url-loader?name=images/[hash].[ext]&limit=8192'},
            {test: /\.vue$/, loader: 'vue' },
            {test: /\.js$/, exclude: /node_modules|vue\/src|vue-router\/|vue-loader\//, loader: 'babel' },
            {test: /\.(html|tpl)$/, loader: 'html-loader'},
            {test: /\.woff/, loader : 'url?prefix=font/&limit=10000&mimetype=application/font-woff' },
            {test: /\.ttf/,loader : 'file?prefix=font/'}, 
            {test: /\.eot/,loader : 'file?prefix=font/'}, 
            {test: /\.svg/,loader : 'file?prefix=font/'}
        ]
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