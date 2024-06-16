import { useEffect, useState } from "react"
import ErrorTrigger from "./ErrorTrigger"

interface IMyProps {
    name: string,
}

interface IMyState {
    timestamp: number,
    count: number,
    hasError: boolean,
}

// 函数组件,模拟类组件各生命周期
const FuncComponent: React.FC<IMyProps> = (props) => {
    const [state, setState] = useState<IMyState>({
        count: 0,
        hasError: false,
        timestamp: Date.now(),
    })

    const getDerivedStateFromProps = useEffect(() => {
        console.log("getDerivedStateFromProps::", props, state)
    }, [state, props])

    const componentDidMount = useEffect(() => {
        console.log("componentDidMount::", props, state)

        const componentWillUnmount = () => {
            console.log("componentWillUnmount::", props, state)
        }
        return componentWillUnmount
    }, [])

    const componentDidUpdate = useEffect(() => {
        console.log("componentDidUpdate::", state)
    }, [state])

    const increment = () => {
        setState({
            ...state,
            count: state.count + 1,
            timestamp: Date.now(),
        })
    }

    // render
    return <div>
        <h3>函数组件:</h3>
        <h4>更新执行时间:{state.timestamp}</h4>
        <div>props-name:{props.name}</div>
        <div id="count">Count:{state.count}</div>
        <button onClick={increment}>增加count</button>
        <ErrorTrigger count={state.count}></ErrorTrigger>
    </div>
}
export default FuncComponent
