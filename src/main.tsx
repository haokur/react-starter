import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'
import './styles/basic.scss'

import { AppContext, AppInitialData } from './contexts/app.context'
import stores from './stores/stores'

const rootElement = document.getElementById('root')
const isStrictMode = true
if (rootElement) {

  const WithStoreApp = () => <Provider store={stores}><App /></Provider>

  const WithAppContextApp = () => {
    const [appConfig, updateAppConfig] = useState(AppInitialData)
    return (
      <AppContext.Provider value={{ appConfig, updateAppConfig }}>
        <WithStoreApp />
      </AppContext.Provider>
    )
  }

  const AppRender = isStrictMode
    ? (
      <React.StrictMode>
        <WithAppContextApp />
      </React.StrictMode>
    )
    : <WithAppContextApp />

  ReactDOM.createRoot(rootElement).render(AppRender)
} else {
  console.error("root element not found")
}