import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserInfo } from "../../models/user.model"

const HomePage = function () {
    const [count, setCount] = useState("Hello")

    const changeCount = () => {
        setCount(count + 1)
    }

    // 退出登录
    const navigate = useNavigate()
    const handleLogout = () => {
        UserInfo.data = null
        navigate("/login")
    }

    return (
        <div>
            <div>
                <button onClick={handleLogout}>退出登录</button>
            </div>
            <div>this is home- {count}</div>
            <button onClick={changeCount}>改变数据</button>
        </div>
    )
}

export default HomePage