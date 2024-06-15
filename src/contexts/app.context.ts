/**布局全局上下文 */
import { createContext } from "react";

export const AppContext = createContext({
    appConfig: {
        isSidebarOpen: false,
    },
    updateAppConfig: (ev: any) => { ev }
})

export const AppInitialData = { isSidebarOpen: true }