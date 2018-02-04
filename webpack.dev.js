const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common,{
    devtool: 'inline-source-map',//热加载模式
    devServer: {
        contentBase: './',
        inline: true,
        port: 9000,
        open: true
    }
});