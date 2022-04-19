var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var {CleanWebpackPlugin} = require('clean-webpack-plugin');

var ENTRY_PATH = path.join(__dirname, 'index.js');
var OUTPUT_PATH = path.join(__dirname, 'dist');
var PUBLIC_PATH = '.';
var TEMPLATE_PATH = path.join(__dirname, 'index.html');
var MODE = process.env.MODE;
var PORT = 7777;

var webpackConfig = {
	entry: {
		index: ENTRY_PATH
	},
	output: {
		path: OUTPUT_PATH,
		filename: '[name].[fullhash].js'
	},
	mode: MODE,
	optimization: {
		minimize: true,
		minimizer: [
			new CSSMinimizerWebpackPlugin()
		]
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [MiniCssExtractPlugin.loader, {loader: 'css-loader'}]
		}]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash:6].css'
		}),
		new HtmlWebpackPlugin({
			publicPath: PUBLIC_PATH,
			filename: 'index.html',
			template: TEMPLATE_PATH,
			inject: 'body',
			chunks: ['index'],
			minify: true
		})
	],
	//webpack-dev-server的原理:
	//webpack-dev-server通过给浏览器注入一个客户端,与浏览器建立websocket联系,通过自动触发webpack --watch监听项目文件内容是否发生变化,一旦发生变化就直接通过websocket告知浏览器中的客户端控制页面刷新,达到更新的效果.
	//Rollup比webpack更易用,但其Treeshaking以及Scope Hoisting的亮点在之后也被webpack实现
	//webpack hot属性实现网页热更新
	devServer: {
		host: 'localhost',
		port: PORT,
		hot: true,
		//建立webpack-dev-server代理
		proxy: {
		}
	}
};

module.exports = webpackConfig;