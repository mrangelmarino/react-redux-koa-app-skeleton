import { combineReducers } from 'redux'
import { LOGIN, LOGOUT, ADD_MESSAGE, CLEAR_MESSAGE } from './actionTypes'
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
    case ADD_MESSAGE:
      return action.payload
    case CLEAR_MESSAGE:
      return ''
    default:
      return state
  }
}

export default combineReducers({
  auth,
  message
})
