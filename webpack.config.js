/*
 * @Author: zhaoye 
 * @Date: 2018-03-23 19:06:47 
 * @Last Modified by: zhaoye
 * @Last Modified time: 2018-03-23 22:22:56
 */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const path = require('path')
module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'stickto.js',
        library: 'stickto',
        libraryTarget: 'umd',
    },
    devtool: 'sourcemap',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
            },
        ]
    },
    plugins: [
        new UglifyJsPlugin({
            sourceMap: true,
        })
    ]
}