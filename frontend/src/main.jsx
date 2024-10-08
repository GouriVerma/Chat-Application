import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from "react-redux";
import {store} from "./Features/store.js";
import { SocketProvider } from './Context/SocketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </SocketProvider>
  </React.StrictMode>,
)
