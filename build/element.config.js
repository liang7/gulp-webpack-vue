/**
 *  打包element ui  
 */
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let path = require('path');
import loadersConfig from './webpack.config.loaders.js'

module.exports={
    entry: {
        index:'./src/element.import.js'
    },
    output:{
        path:path.resolve(__dirname, "../release/lib")
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
        new ExtractTextPlugin("element.css", {
            allChunks: true,
        })
    ]
}