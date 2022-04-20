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
	//webpack-dev-server通过webpack打包之后的代码给浏览器注册一个客户端,通过与客户端建立websocket联系进行控制网页刷新,通过webpack --watch监听开发代码内容是否发生变化,一旦发生变化,就进行webpack重新打包,且通过websocket告知浏览器客户端,进行控制刷新页面
	//RollUp的可以对ES6源码TreeShaking以及ScopeHoisting,后来也被webpack实现
	//webpack-dev-server hot热更新,其实质就是在不刷新页面的情况下,只实现新老模块的替换,当老模块中的内容发生变化时,只对当前老模块进行替换,而不刷新页面,这种开发体验更好,效率更高
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