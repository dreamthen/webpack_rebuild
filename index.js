const writeWebpack = require('./module');
const NODE_ENV = process.env.NODE_ENV;
require('./index.css');

writeWebpack(`WEBPACK ME!!!SWEET!!!${NODE_ENV.toUpperCase()}~`);