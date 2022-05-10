const {writeWebpack} = require('./module');
const NODE_ENV = process.env.NODE_ENV;
require('./index.css');

let [a, b] = ['100', '666'];
console.log(a, b);

writeWebpack(`WEBPACK ME!!!SWEET!!!${NODE_ENV.toUpperCase()}~~~`);