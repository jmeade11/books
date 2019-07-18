import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.scss'
import './css/icofont.min.css'
import App from './App'
import { HashRouter } from 'react-router-dom'

const appJsx = (
  <HashRouter>
    <App />
  </HashRouter>
)

ReactDOM.render(appJsx, document.getElementById('root'))
