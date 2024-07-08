import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import './index.scss'
import './firebase.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
