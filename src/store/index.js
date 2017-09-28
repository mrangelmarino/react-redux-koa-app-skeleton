import { applyMiddleware, createStore } from 'redux'
import reduxMiddleware from './redux-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from '../reducers'

const store = composeWithDevTools(applyMiddleware(...reduxMiddleware))(createStore)(reducers)

export default store
