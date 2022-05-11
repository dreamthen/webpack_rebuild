// const {writeWebpack} = require('./module');
// const NODE_ENV = process.env.NODE_ENV;
// require('./index.less');
//
// let [a, b] = ['100', '666'];
// console.log(a, b);
//
// writeWebpack(`WEBPACK ME!!!SWEET!!!${NODE_ENV.toUpperCase()}~~~`);
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import './index.less';

const NODE_ENV = process.env.NODE_ENV;

// use hooks~
const App = () => {
    return <div>
        {`WEBPACK ME!!!SWEET!!!${NODE_ENV.toUpperCase()}~~~`}
    </div>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<React.StrictMode>
    <App />
</React.StrictMode>);