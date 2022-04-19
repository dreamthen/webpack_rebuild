var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
var {CleanWebpackPlugin} = require("clean-webpack-plugin");

var ENTRY_PATH = path.join(__dirname, 'index.js');
var OUTPUT_PATH = path.join(__dirname, 'dist');
var MODE = process.env.MODE;

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
		})
	]
};

module.exports = webpackConfig;