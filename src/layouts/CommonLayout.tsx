import { Outlet, useLocation } from "react-router-dom";
import HeaderBar from "./HeaderBar"
import MainContent from "./MainContent"
import Sidebar from "./Sidebar"
import { UserInfo } from "../models/user.model";
import { useContext } from "react";
import { AppContext } from "../contexts/app.context";

import './CommonLayout.scss'

const CommonLayout = () => {
    if (!UserInfo.data) return <Outlet />

    const { appConfig } = useContext(AppContext)
    return <div className={`layout ${appConfig.isSidebarOpen ? 'layout--open' : 'layout--close'}`}>
        <MainContent><Outlet /></MainContent>
        <HeaderBar />
        <Sidebar />
    </div>
}

export const FallbackPlaceHolder = (props: any) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const disabledLayout = props.excludes.includes(currentPath)

    return disabledLayout
        ? <></>
        : <CommonLayout></CommonLayout>
}

export default CommonLayout