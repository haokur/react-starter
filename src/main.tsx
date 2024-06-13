import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { Provider } from 'react-redux'
import stores from './stores/stores'

const rootElement = document.getElementById('root')
const isStrictMode = true
if (rootElement) {
  const WithStoreApp = () => <Provider store={stores}><App /></Provider>
  const AppRender = isStrictMode
    ? (
      <React.StrictMode>
        <WithStoreApp />
      </React.StrictMode>
    )
    : <WithStoreApp />
  ReactDOM.createRoot(rootElement).render(AppRender)
} else {
  console.error("root element not found")
}