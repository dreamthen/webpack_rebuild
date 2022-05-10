// 总结: 模块化 COMMONJS和ES6 import的缺点,是必须通过编译工具转换为ES5才能运行在大多数的浏览器环境下
//      COMMONJS能完全的运行在NODEJS环境下,npm上面大多数的第三方依赖都遵从COMMONJS规范
//      ES6 import是最终模块化方案,Nodejs和各大浏览器环境都遵从原生的ES6模块化规范方案
//      AMD的缺点,必须引入AMD环境的库才可以进行执行,也就是必须依赖于requireJS
//      AMD原生代码可在NODEJS和大多数的浏览器环境下运行,不需要任何编译工具编译
//      可异步进行加载
//      Gulp 基于流的一种构建工具,task 注册一个任务 run 执行任务 watch 监听文件的变化 src 读文件 desc 写文件
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const open = require('open');

const OUTPUT_PATH = path.resolve(__dirname, './dist');
const PUBLIC_PATH = '.';
const env = process.env.NODE_ENV || 'development';
const PORT = 9000;

const config = {
	//入口
	entry: {
		index: './src/index.ts'
	},
	//环境模式,融入tree-shaking webpack.DefinePlugin(将环境变量NODE_ENV: mode自动引入至构建后的代码中)以及terser-webpack-plugin
	mode: env,
	optimization: {
		minimizer: [
			new CssMinimizerWebpackPlugin()
		]
	},
	//出口
	output: {
		path: OUTPUT_PATH,
		filename: 'js/index.[chunkhash].js',
		library: {
			name: 'webpack_rebuild',
			//'umd'构建打包出来的项目代码无法进行tree-shaking
			type: 'umd'
		}
	},
	//模块
	module: {
		//规则转换
		rules: [{
			test: /\.js[x]?$/,
			use: [{
				loader: 'babel-loader'
			}],
			exclude: /node_modules/
		}, {
			test: /\.ts$/,
			use: [{
				loader: 'ts-loader'
			}]
		}, {
			test: /\.css$/,
			//css-loader在1.0之后不存在minimize压缩处理的属性
			use: [MiniCssExtractPlugin.loader, {loader: 'css-loader'}],
			exclude: /node_modules/
		}, {
			test: /\.less$/,
			use: [MiniCssExtractPlugin.loader,
				{loader: 'css-loader', options: {importLoaders: 2}},
				{loader: 'postcss-loader'},
				{loader: 'less-loader'}
			]
		}, {
			test: /\.(sass|scss)$/,
			use: [MiniCssExtractPlugin.loader,
				{loader: 'css-loader', options: {importLoaders: 2}},
				{loader: 'postcss-loader'},
				{loader: 'sass-loader'}
			]
		}]
	},
	resolve: {
		//导入模块时,省略后缀名
		extensions: ['.ts', '.js']
	},
	//控制台输出日志控制
	stats: 'errors-warnings',
	//插件
	plugins: [
		//清楚原打包后的固有资源
		new CleanWebpackPlugin(),
		//导出并进行初始化压缩css文件,
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:6].css'
		}),
		new HTMLWebpackPlugin({
			publicPath: PUBLIC_PATH,
			filename: 'index.html',
			template: path.join(__dirname, './src/index.html'),
			chunks: ['index'],
			inject: 'body',
			minify: true
		})
	],
	//webpack-dev-server
	//devServer的原理是webpack将打包之后的代码注入一段websocket远程客户端长连接,与远程客户端浏览器建立联系,然后通过webpack watch监听项目文件内容的变化.
	//当项目文件内容发生变化时,webpack监听并及时进行更新,并通过websocket远程长连接告知客户端浏览器进行刷新.
	//HMR热加载: 局部刷新原理,通过chunks新模块更换旧模块实现.在不进行整个页面刷新的情况下,提高了刷新效率,节省了时间.
	devServer: {
		host: 'localhost',
		client: {
			logging: 'info'
		},
		port: PORT,
		//热更新
		hot: true,
		//对于打开浏览器的配置
		open: {
			app: {
				name: open.apps.chrome
			}
		},
		//代理
		proxy: {}
	},
	devtool: 'cheap-source-map'
};

module.exports = config;