/**布局全局上下文 */
import { createContext } from "react";

export const AppInitialData = { isSidebarOpen: true }
export type IAppConfig = typeof AppInitialData

export const AppContext = createContext({
    appConfig: AppInitialData,
    updateAppConfig: (ev: React.SetStateAction<IAppConfig>) => { ev }
})
