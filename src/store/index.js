import { applyMiddleware, createStore } from 'redux'
import reduxMiddleware from './redux-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers'
import * as localStorage from './localStorage'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const persistedAuth = cookies.get('ppaLcl') === 'true'
const persistedStore = localStorage.get() || {}

persistedStore.auth = persistedAuth

const store = composeWithDevTools(applyMiddleware(...reduxMiddleware))(createStore)(reducers, persistedStore)

export default store
