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
		], '@babel/preset-react'
	],
	plugins: []
};

module.exports = babelConfig;