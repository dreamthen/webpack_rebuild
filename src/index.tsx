// const {writeWebpack} = require('./module');
// const NODE_ENV = process.env.NODE_ENV;
// require('./index.less');
//
// let [a, b] = ['100', '666'];
// console.log(a, b);
//
// writeWebpack(`WEBPACK ME!!!SWEET!!!${NODE_ENV.toUpperCase()}~~~`);
import {StrictMode, useState, useEffect, useCallback, useRef} from 'react';
import * as ReactDOM from 'react-dom/client';
import cns from 'classnames';
import throttle from 'lodash.throttle';

import './index.less';

const {writeWebpack, count, add} = require('./module');
const NODE_ENV = process.env.NODE_ENV;
writeWebpack(`WEBPACK ME!!!SWEET!!!${NODE_ENV.toUpperCase()}~~~`);
console.log('count:', count);
add();
console.log('count:', count);

interface SelectedOprProps {
    id?: string;
    idx?: number;
}

enum SELECT_MODE {
    SHORTCUT = 'SHORTCUT',
    MOUSE = 'MOUSE',
}

enum KeyCode {
    Tab = 9,
    Enter = 13,
    Escape = 27,
    Left = 37,
    Up = 38,
    Right = 39,
    Down = 40,
    R = 82,
    O = 79,
    W = 87,
    F = 70,
    Plus = 187,
    Minus = 189,
}

const list = Array.from(Array.apply(null, {length: 100}), (item, index) => {
    return {
        id: `item${index}`,
        idx: index,
        value: `item${index}`
    }
});

const ListItem = ({config, selectedOprId, setSelected, selectMode, canMouseEnter, setCanMouseEnter}) => {
    const oprRef = useRef<HTMLDivElement>(null);

    /**
     * 鼠标移入
     */
    const mouseEnter = throttle(() => {
        if (canMouseEnter) {
            setSelected({...config});
        }
    }, 900);

    /**
     * 鼠标移出
     */
    const mouseLeave = throttle(() => {
        if (canMouseEnter) {
            setSelected({});
        }
    }, 900);

    /**
     * 鼠标滑动
     */
    const mouseMove = throttle(() => {
        if (!canMouseEnter) {
            setCanMouseEnter(true);
            setSelected({...config});
        }
    }, 900);

    useEffect(() => {
        if (!selectedOprId || selectMode === SELECT_MODE.MOUSE) return;
        if (config?.id === selectedOprId) {
            oprRef.current?.scrollIntoView({block: 'center', behavior: 'smooth'});
        }
    }, [selectedOprId, config?.id, selectMode]);

    return <div
        ref={oprRef}
        key={config.id}
        className={cns(
            `list-item-${config?.idx}`,
            {
                'list-item-selected': selectedOprId === config?.id
            }
        )}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onMouseMove={mouseMove}
    >
        {config.value}
    </div>;
};

// use hooks~
const App = (props) => {
    //设置选中的list列表项
    const [selectedOpr, setSelectedOpr] = useState<{ [propsName: string]: any }>({});
    //选中list列表项时的触发类型
    const [selectMode, setSelectMode] = useState<any>();
    //是否可以移入移出
    const [canMouseEnter, setCanMouseEnter] = useState(true);

    const selectedOprIdx = useRef<SelectedOprProps>({});

    /**
     * 选中选项
     */
    const setSelected = useCallback((config) => {
        selectedOprIdx.current = {
            id: config.id,
            idx: config.idx
        };
        setSelectMode(SELECT_MODE.MOUSE);
        setSelectedOpr(config);
    }, []);

    /** 向下选择 */
    const selectOprDownDir = useCallback(() => {
        let newIdx = (selectedOprIdx.current?.idx ?? -1) + 1;
        if (newIdx > list.length - 1) {
            newIdx = 0;
        }
        const selected = list[newIdx];
        selectedOprIdx.current = {
            id: selected.id,
            idx: newIdx
        };
        setSelectedOpr(selected);
        setCanMouseEnter(false);
    }, []);

    /** 向上选择 */
    const selectOprUpDir = useCallback(() => {
        let newIdx = (selectedOprIdx.current?.idx ?? 0) - 1;

        if (newIdx < 0) {
            newIdx = list.length - 1;
        }
        const selected = list[newIdx];
        selectedOprIdx.current = {
            id: selected.id,
            idx: newIdx
        };
        setSelectedOpr(selected);
        setCanMouseEnter(false);
    }, []);

    //监听上下按键
    useEffect(() => {
        const keydownHandler = (e: KeyboardEvent) => {
            setSelectMode(SELECT_MODE.SHORTCUT);
            if (e.keyCode === KeyCode.Down) {
                selectOprDownDir();
                e.preventDefault();
            } else if (e.keyCode === KeyCode.Up) {
                selectOprUpDir();
                e.preventDefault();
            }
        };

        window.addEventListener('keydown', keydownHandler);

        return () => {
            window.removeEventListener('keydown', keydownHandler);
        };
    }, [selectOprDownDir, selectOprUpDir,]);

    return <div className='container'>
        {
            list && list.length > 0 && list.map(item => {
                return <ListItem
                    key={item.id}
                    config={item}
                    selectedOprId={selectedOpr?.id}
                    setSelected={setSelected}
                    selectMode={selectMode}
                    canMouseEnter={canMouseEnter}
                    setCanMouseEnter={setCanMouseEnter}
                />
            })
        }
    </div>
    // return <div>
    /*{`WEBPACK ME!!!SWEET!!!${NODE_ENV.toUpperCase()}~~~`}*/
    // </div>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(root);
// const props = {
//     name: 'Gary',
//     age: 25
// };

root.render(<StrictMode>
    <App/>
</StrictMode>);