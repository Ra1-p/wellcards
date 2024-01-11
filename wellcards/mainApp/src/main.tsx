import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.scss'
import { Provider } from "react-redux"
import {store} from "./redux/store"


createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
  ,
)
