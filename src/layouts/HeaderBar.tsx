import { useCallback, useContext } from "react"
import { UserInfo } from "../models/user.model"
import './HeaderBar.scss'
import { useNavigate } from "react-router-dom"
import { AppContext } from "../contexts/app.context"

const HeaderBar = () => {
    const userData = UserInfo.data

    const navigate = useNavigate()

    const logout = useCallback(() => {
        UserInfo.data = null
        navigate("/login")
    }, [])

    const { appConfig, updateAppConfig } = useContext(AppContext)
    const toggleSidebarOpen = () => {
        updateAppConfig({
            isSidebarOpen: !appConfig.isSidebarOpen
        })
    }

    return <div className="header">
        <div className="header-block left">
            <div className="header-expand" title="点击展示/收起" onClick={toggleSidebarOpen}>
                <i className="iconfont icon-liebiao"></i>
            </div>
            <div className="header-title">this is HeaderBar</div>
        </div>
        <div className="header-user">
            <label>登录用户：</label>
            <span>{userData?.name}</span>
            <button className="header-user_logout" onClick={logout}>退出登录</button>
        </div>
    </div>
}
export default HeaderBar