import 'bootstrap-css-modules/css/reboot.css'
import 'bootstrap-css-modules/css/type.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('app'))
