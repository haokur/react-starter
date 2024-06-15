import React, { useCallback, useContext } from 'react'
import './Sidebar.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { RouteConfig } from '../routes/routes.config'
import { AppContext } from '../contexts/app.context'

const Sidebar = () => {
    const { appConfig } = useContext(AppContext)

    const navigate = useNavigate()
    const handleNavClick = useCallback((item: any) => {
        navigate(item.path)
    }, [])

    const { pathname } = useLocation()
    const SideMenuList = React.memo(() => {
        let _list = RouteConfig.filter(item => !item.meta.hide)
            .map(item => {
                let isActive = pathname === item.path
                return <li className={`nav-item ${isActive ? 'active' : ''}`} onClick={() => handleNavClick(item)} key={item.path}>
                    <span className='icon'><i className={`iconfont ${item.meta.icon || ""}`}></i></span>
                    <span className='text'>{item.meta.name}</span>
                </li>
            })
        return _list
    })

    return <aside className={`aside nav ${appConfig.isSidebarOpen ? 'aside--open' : 'aside--close'}`}>
        <h1 className='nav-title'>
            <span>{appConfig.isSidebarOpen ? 'This is' : ''}Title</span>
        </h1>
        <ul className='nav-list'><SideMenuList /></ul>
    </aside>
}
export default Sidebar