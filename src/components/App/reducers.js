import { combineReducers } from 'redux'
import { LOGIN, LOGOUT, SIGNUP, CLEAR_MESSAGE, CONFIRMATION, RESET_PASSWORD, SUBSCRIBE } from './actionTypes'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

const authInitialState = () => cookies.get('ppaLcl') === 'true'

const auth = (state = authInitialState(), action) => {
  switch(action.type) {
    case LOGIN:
    case LOGOUT:
      return action.payload.message ? state : action.payload.auth
    default:
      return state
  }
}

const message = (state = '', action) => {
  switch(action.type) {
    case LOGIN:
    case LOGOUT:
    case SIGNUP:
    case CONFIRMATION:
    case RESET_PASSWORD:
    case SUBSCRIBE:
        return action.payload.message || state
    case CLEAR_MESSAGE:
    default:
      return ''
  }
}

export default combineReducers({
  auth,
  message
})