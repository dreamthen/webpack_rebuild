/**
 * babel编译配置
 * @type {{presets: [string,{useBuiltIns: boolean, modules: boolean}][], plugins: *[]}}
 */
const babelConfig = {
	presets: [
		[
			'@babel/preset-env',
			{
				//不使用corejs polyfill来兼容旧版浏览器的语法,当需要时开发者会自己添加
				useBuiltIns: false,
				//对于ESM模块不进行封装转换
				modules: false
			}
		], [
			'@babel/preset-react',
			{
				//将runtime由classic改为automatic
				//automatic自动导入JSX转译的函数,无需import导入React,直接使用_jsx实现jsx语法生成
				runtime: 'automatic'
			}
		]
	],
	plugins: []
};

module.exports = babelConfig;