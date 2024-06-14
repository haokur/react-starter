import HeaderBar from "./HeaderBar"
import MainContent from "./MainContent"
import Sidebar from "./Sidebar"

const CommonLayout = ({ children }: any) => {
    return <div>
        <MainContent>{children}</MainContent>
        <HeaderBar />
        <Sidebar />
    </div>
}
export default CommonLayout