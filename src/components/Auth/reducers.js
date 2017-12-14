import { combineReducers } from 'redux'
import { LOGIN, LOGOUT } from './actionTypes'
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

export default auth
