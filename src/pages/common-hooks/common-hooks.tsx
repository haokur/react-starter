import {
    useCallback, useContext,
    useEffect, useLayoutEffect,
    useMemo, useReducer,
    useRef, useState
} from "react"
import RefChild, { IExposeFunction } from "../../components/RefChild";

import './common-hooks.scss'

import testImg from '../../assets/pix.png'
import { AppContext } from "../../contexts/app.context";

interface ICountReducerState {
    count: number,
    name?: string,
}
interface ICountReducerAction {
    type: 'increment' | 'decrement',
    payload?: any
}
type ICountHandler = Record<string, (payload: ICountReducerAction["payload"]) => Partial<ICountReducerState>>

const reducer = (state: ICountReducerState, action: ICountReducerAction) => {
    let _actionMap: ICountHandler = {
        'increment': (payload) => { return { count: state.count + payload } },
        'decrement': (payload) => { return { count: state.count - payload } }
    }

    let _actionFunc = _actionMap[action.type]
    if (_actionFunc) return { ...state, ..._actionFunc(action.payload) }
    throw new Error(`action type is undefined`)
}

const CommonHooks = () => {
    console.log("函数组件重新执行----");

    const [count, setCount] = useState<number>(0)
    const [timestamp, setTimestamp] = useState<number>(Date.now())

    // 类似vue中的computed
    const doubleCount = useMemo(() => {
        console.log('重新计算doubleCount');
        return count * 2
    }, [count])

    useEffect(() => {
        // const timer = setInterval(() => {
        //     console.log("定时器执行---", "common-hooks.tsx::17行");
        // }, 1000)

        const timer2 = setTimeout(() => {
            console.log(count, "common-hooks.tsx::21行"); // 注意这里是0,为什么?
            setCount((count) => {
                console.log(count, "common-hooks.tsx::23行");
                return count + 1
            })
        }, 0);

        setCount(count + 1)

        return () => {
            console.log("页面卸载,移除定时器");
            // clearInterval(timer)
            clearTimeout(timer2)
        }
    }, [])


    // useEffect在渲染完之后执行,useLayoutEffect在渲染之前同步执行
    // 在useEffect改变宽度,可以看到过渡动画,而在useLayoutEffect看不到动画
    // 需要初始化时是正确的宽高,避免闪烁,可以使用useLayoutEffect
    const setImgWidth = () => {
        let el = document.getElementById("test-img")
        if (el) {
            el.style.width = '300px'
            el.style.height = '300px'
        }
    }
    useEffect(() => {
        console.log("useEffect执行");
        // setImgWidth()
    })

    useLayoutEffect(() => {
        console.log("useLayoutEffect执行");
        setImgWidth()
    })

    const testCallback = useCallback(() => {
        console.log(count); // 始终打印0
    }, [])

    const testCallback2 = useCallback(() => {
        console.log(timestamp); // 只有更新了count,才会打出最新的timeStamp值
    }, [count])


    const refChildElement = useRef<IExposeFunction>(null)
    const handleRefChildDo = () => {
        refChildElement.current?.doSomething()
    }

    const inputRef = useRef<HTMLInputElement>(null)
    const handleInputFocus = () => {
        inputRef.current?.focus()
    }

    let initialCount = 1
    const initRefCount = useRef(1)
    const incrementCount = () => {
        initialCount++

        // 虽然会保存递增的值,但是只有等props,state等导致重新渲染时,
        // 才会更新对应DOM里的值
        initRefCount.current++;
    }

    // useReducer,dispatch改变值时,会触发重新渲染
    const [reducerInfo, dispatch] = useReducer(reducer, { count: 0, name: 'jack' })
    const handleReducerAction = () => {
        dispatch({
            type: "increment",
            payload: 1
        })
    }
    const getReducerData = () => {
        console.log(reducerInfo, "common-hooks.tsx::134行");
    }

    // useContext
    const { appConfig, updateAppConfig } = useContext(AppContext)
    const handleUpdateAppConfig = () => {
        updateAppConfig({
            isSidebarOpen: !appConfig.isSidebarOpen
        })
    }

    return <div>
        <div>
            <label>时间:{timestamp}</label>
            <button onClick={() => setTimestamp(Date.now())}>更新时间</button>
        </div>
        <div>
            <h3>1.useState</h3>
            <label>useState-{count}</label>
            <button onClick={() => setCount(count + 1)}>设置count</button>
        </div>
        <div>
            <h3>2.useMemo</h3>
            <label>doubleCount:{doubleCount}</label>
        </div>
        <div>
            <h3>3.useCallback</h3>
            <button onClick={testCallback}>测试useCallback</button>
            <button onClick={testCallback2}>测试useCallback2</button>
        </div>
        <div>
            <h3>4.useRef</h3>
            <RefChild ref={refChildElement}></RefChild>
            <button onClick={handleRefChildDo}>执行RefChild的方法</button>
            <div>
                <input type="text" ref={inputRef} />
                <button onClick={handleInputFocus}>输入框聚焦</button>
            </div>
            <div>
                <div>函数里常规变量:{initialCount}</div>
                <div>ref定义的变量:{initRefCount.current}</div>
                <button onClick={incrementCount}>递增</button>
            </div>
        </div>
        <div>
            <h3>5.useEffectLayout Vs useEffect</h3>
            <div>
                <img src={testImg} id="test-img" />
            </div>
        </div>
        <div>
            <h3>6.useReducer</h3>
            <div>
                <div>reducerInfo-{reducerInfo.count}</div>
                <div>reducerInfo-{reducerInfo.name}</div>
                <button onClick={handleReducerAction}>触发reducer的dispatch</button>
                <button onClick={getReducerData}>查询reducer的状态</button>
            </div>
        </div>
        <div>
            <h3>7.useContext</h3>
            <div>
                <div>appConfig-{'' + appConfig.isSidebarOpen}</div>
                <button onClick={handleUpdateAppConfig}>触发reducer的dispatch</button>
            </div>
        </div>
    </div>
}
export default CommonHooks