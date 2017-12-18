import { combineReducers } from 'redux'
import { LOGIN, LOGOUT } from './actionTypes'

const auth = (state = false, action) => {
  switch(action.type) {
    case LOGIN:
    case LOGOUT:
      return action.payload.message ? state : action.payload.auth
    default:
      return state
  }
}

export default auth
