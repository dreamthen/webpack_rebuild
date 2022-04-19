var path = require('path');

var ENTRY_PATH = path.join(__dirname, 'index.js');
var OUTPUT_PATH = path.join(__dirname, 'dist');
var MODE = process.env.MODE;

var webpackConfig = {
	entry: ENTRY_PATH,
	output: {
		path: OUTPUT_PATH,
		filename: 'index.js'
	},
	mode: MODE,
	module: {
		rules: [{
			test: /\.css$/,
			use: [{loader: 'style-loader'}, {loader: 'css-loader'}]
		}]
	}
};

module.exports = webpackConfig;