/**布局全局上下文 */
import { createContext } from "react";

export const AppInitialData = { isSidebarOpen: true }
type IUpdateParams = Partial<typeof AppInitialData>;

export const AppContext = createContext({
    appConfig: AppInitialData,
    updateAppConfig: (ev: IUpdateParams) => { ev }
})
