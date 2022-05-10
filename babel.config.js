/**
 * babel编译配置
 * @type {{presets: [string,{useBuiltIns: boolean, modules: boolean}][], plugins: *[]}}
 */
const babelConfig = {
	presets: [
		[
			'@babel/preset-env',
			{
				useBuiltIns: false,
				//对于ESM模块不进行封装转换
				modules: false
			}
		]
	],
	plugins: []
};

module.exports = babelConfig;