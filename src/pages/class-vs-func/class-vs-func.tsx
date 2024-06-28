
import { useState } from "react"
import ClassComponent from "../../components/ClassComponent"
import FuncComponent from "../../components/FuncComponent"


const ClassVsFunc = () => {
    const [classState] = useState({ name: "jack" })

    return <div>
        <ClassComponent name={classState.name}></ClassComponent>
        <FuncComponent name={classState.name}></FuncComponent>
    </div>
}
export default ClassVsFunc
