import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/basic.scss'

// store状态管理相关
import { Provider } from 'react-redux'
import stores from './stores/stores'

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={stores}>
        <App />
      </Provider>
    </React.StrictMode>,
  )
} else {
  console.error("root element not found")
}