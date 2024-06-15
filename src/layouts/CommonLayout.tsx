import { Outlet, useLocation } from "react-router-dom";
import HeaderBar from "./HeaderBar"
import MainContent from "./MainContent"
import Sidebar from "./Sidebar"
import { UserInfo } from "../models/user.model";

const CommonLayout = () => {
    if (!UserInfo.data) return <Outlet />
    return <>
        <MainContent><Outlet /></MainContent>
        <HeaderBar />
        <Sidebar />
    </>
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