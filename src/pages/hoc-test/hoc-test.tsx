import { useState } from "react"
import { withErrorBoundary } from "../../hoc/with-error-boundary"

const HocTest = () => {
    const component = () => {
        const [arr, setArr] = useState([1, 2])
        const handleClick = () => {
            // @ts-ignore
            setArr(null)
        }
        return <div>
            {arr.map((item) => {
                return <div key={item}>
                    <div>{item}</div>
                </div>
            })}
            <button onClick={handleClick}>修改arr数据为null触发组件渲染错误</button>
        </div>
    }
    const WithErrorComponent = withErrorBoundary(component)

    return <div>
        <WithErrorComponent></WithErrorComponent>
    </div>
}
export default HocTest