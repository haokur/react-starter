import { useCallback } from "react"
import { UserInfo } from "../models/user.model"
import './HeaderBar.scss'
import { useNavigate } from "react-router-dom"

const HeaderBar = () => {
    const userData = UserInfo.data

    const navigate = useNavigate()

    const logout = useCallback(() => {
        UserInfo.data = null
        navigate("/login")
    }, [])

    return <div className="header">
        <div className="header-title">this is HeaderBar</div>
        <div className="header-user">
            <label>登录用户：</label>
            <span>{userData?.name}</span>
            <button className="header-user_logout" onClick={logout}>退出登录</button>
        </div>
    </div>
}
export default HeaderBar