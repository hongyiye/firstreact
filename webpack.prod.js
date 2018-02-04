const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common,{
    plugins: [
        new webpack.DefinePlugin({
            'process.nev': {
                'NODE_ENV': 'production'
            }
        }),
        new CopyWebpackPlugin([{//编译生产环境时把静态资源拷贝
            from: __dirname + '/static',
            to: __dirname + '/dist/static'
        }])
    ]
});