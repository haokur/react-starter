import React, { useImperativeHandle } from "react"

export interface IExposeFunction {
    doSomething: () => void
}

const RefChild = React.forwardRef((props, ref) => {
    console.log(props, "RefChild.tsx::4行");

    const doSomething = () => {
        console.log("doSomething", "RefChild.tsx::5行");
    }

    useImperativeHandle(ref, () => ({
        doSomething
    }))

    return <div>this is RefChild</div>
})

export default RefChild