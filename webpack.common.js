const path = require('path');//node的path模块
const HtmlWebpackPlugin= require('html-webpack-plugin');//自动生成html文件的插件
const ExtractTextPlugin= require('extract-text-webpack-plugin');//处理额外文本的插件，如css,sass
const CleanWebpackPlugin = require('clean-webpack-plugin');//每次编译代码前先清除上一次编译的代码
const webpack = require('webpack');//webpack对象，可以用来配置一些编译功能，如热编译等

module.exports = {
    entry:{
        'app.bundle': './src/app.js'//源代码路径
    },
    output: {//文件的导出路径
        path: path.resolve(__dirname,'dist'),
        filename: '[name].[chunkhash].js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),//编译前清除
        new HtmlWebpackPlugin({//生成入口html文件
            template: './src/index.html',
            filename: 'index.html',
            minify: false,
            hash: process.env.NODE_ENV === 'production'
        }),
        new ExtractTextPlugin({//生成css文件
            filename: '[name].[contenthash].css',
            disable: false
        })
    ],
    module: {
        rules: [
            //{//暂时不使用文件加载部分
			//	test: /\.(jpe?g|png|gif|svg)$/i,
			//	use: [
			//		{
			//			loader: 'file-loader',
			//			options: {
			//				name: '[name].[ext]',
			//				outputPath: 'images/'
			//			}
			//		}
			//	]
			//},
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?sourceMap','sass-loader?sourceMap']
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?sourceMap']
                })
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /nodel_modules/
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /nodel_modules/
            },
        ]
    }
}