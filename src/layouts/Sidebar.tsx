import React, { useCallback } from 'react'
import { RouteConfig } from '../routes/routes'
import './Sidebar.scss'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

    const navigate = useNavigate()
    const handleNavClick = useCallback((item: any) => {
        navigate(item.path)
    }, [])

    const SideMenuList = React.memo(() => {
        let _list = RouteConfig.filter(item => !item.meta.hide)
            .map(item => {
                return <li className='nav-item' onClick={() => handleNavClick(item)} key={item.path}>{item.meta.name}</li>
            })
        return _list
    })

    return <aside className='aside nav'>
        <h1 className='nav-title'>This is Title</h1>
        <ul className='nav-list'><SideMenuList /></ul>
    </aside>
}
export default Sidebar