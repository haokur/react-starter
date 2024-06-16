/**布局全局上下文 */
import { createContext } from "react";

export const AppInitialData = { isSidebarOpen: true }

export const AppContext = createContext({
    appConfig: AppInitialData,
    updateAppConfig: (ev: any) => { ev }
})
