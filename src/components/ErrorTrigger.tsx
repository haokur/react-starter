import React from "react"

interface IProps {
    count: number
}

class ErrorTrigger extends React.Component<IProps> {
    state = {
        arr: [],
        timeStamp: 0,
        lifeCycleError: false,
    }

    triggerRenderError = () => {
        this.setState({
            arr: null
        })
    }

    triggerLifecycleError = () => {
        this.setState({
            lifeCycleError: true
        })
    }

    // shouldComponentUpdate(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): boolean {
    //     console.log('子组件shouldComponentUpdate调用',"ErrorTrigger.tsx::28行");
    //     // @ts-ignore
    //     if (nextState.count === 10) {
    //         throw new Error('ErrorTrigger error')
    //     }
    //     return true
    // }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any): void {
        console.log('子组件componentDidUpdate调用', prevProps, prevState);
        if (prevProps.count === 9 || this.state.lifeCycleError) {
            throw new Error('ErrorTrigger error')
        }
    }

    render() {
        return <div style={{ "border": "1px solid #e1e1e1", "padding": "20px" }}>
            <h3>子组件:this is ErrorTrigger</h3>
            <div>{this.state.arr.map(item => item)}</div>
            <button onClick={this.triggerRenderError}>触发render错误</button>
            <button onClick={this.triggerLifecycleError} style={{ "marginLeft": "10px" }}>触发生命周期执行错误</button>
        </div>
    }
}
export default ErrorTrigger