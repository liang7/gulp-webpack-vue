/**
 *  生产环境  
 */
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path=require('path');
var os = require('os');
var UglifyJsParallelPlugin = require('webpack-uglify-parallel');

module.exports={
    entry: {
        index:'./src/app.js'
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
        new UglifyJsParallelPlugin({
            workers: os.cpus().length,
            mangle: true,
            compressor: {
                warnings: false,
                drop_console: true,
                drop_debugger: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
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