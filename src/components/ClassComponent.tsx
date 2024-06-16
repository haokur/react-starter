import React from "react";
import ErrorTrigger from "./ErrorTrigger";

interface IMyProps {
    name: string,
}

interface IMyState {
    timestamp: number,
    count: number,
    hasError: boolean,
}

class ClassComponent extends React.Component<IMyProps, IMyState> {
    constructor(props: IMyProps) {
        super(props)
        this.state = {
            count: 0,
            hasError: false,
            timestamp: Date.now(),
        }
    }

    // 替代componentWillReceiveProps
    // 返回null 或者要合并更改state的值
    static getDerivedStateFromProps(props: IMyProps, state: IMyState) {
        console.log("getDerivedStateFromProps::", props, state)
        return {
            timestamp: Date.now(),
        }
        // return null
    }

    componentDidMount(): void {
        console.log("componentDidMount::", this.props, this.state)
    }

    // 返回true则更新,false不更新DOM,但不会阻止state的更新,也不会回退state的状态
    shouldComponentUpdate(nextProps: Readonly<IMyProps>, nextState: Readonly<IMyState>, nextContext: any): boolean {
        console.log("shouldComponentUpdate::", nextProps, nextState, nextContext);
        return true
    }

    // 此时的DOM并未更新
    // 可以缓存变更前的状态,作为回撤动作?
    getSnapshotBeforeUpdate(prevProps: Readonly<IMyProps>, prevState: Readonly<IMyState>): any {
        console.log("getSnapshotBeforeUpdate::", prevProps, prevState)
        return 'componentDidUpdate第三个参数,来自getSnapshotBeforeUpdate周期的返回值'
    }

    componentDidUpdate(prevProps: Readonly<IMyProps>, prevState: Readonly<IMyState>, snapshot?: any): void {
        console.log("componentDidUpdate::", prevProps, prevState, snapshot)
    }

    // 返回的数据和state合并
    // 当子组件错误触发时
    // 1.状态的变化导致子组件的渲染错误时:
    // 先是错误=>getDerivedStateFromError=>getDerivedStateFromProps=>shouldComponentUpdate=>render
    // 再是错误=>getDerivedStateFromError=>shouldComponentUpdate=>render=>getSnapshotBeforeUpdate=>componentDidUpdate=>componentDidCatch
    // 2.纯粹子组件生命周期错误时:
    // 错误=>getDerivedStateFromError=>getDerivedStateFromProps=>shouldComponentUpdate=>render=>getSnapshotBeforeUpdate=>componentDidUpdate=>componentDidCatch
    static getDerivedStateFromError(error: any) {
        console.log("getDerivedStateFromError::", error)
        return {
            hasError: true
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log("componentDidCatch::", error, errorInfo)
    }

    componentWillUnmount(): void {
        console.log("componentWillUnmount::", this.props, this.state)
    }

    increment = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        console.log("render::", this.props, this.state)
        if (this.state.hasError) {
            return <div>Error occurred!</div>
        }
        return (
            <div>
                <h3>类组件:</h3>
                <h4>更新执行时间:{this.state.timestamp}</h4>
                <div>props-name:{this.props.name}</div>
                <div id="count">Count:{this.state.count}</div>
                <button onClick={this.increment}>增加count</button>
                <ErrorTrigger count={this.state.count}></ErrorTrigger>
            </div>
        )
    }
}

export default ClassComponent