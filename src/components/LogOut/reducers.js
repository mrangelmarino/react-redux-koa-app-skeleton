import { LOGOUT } from './actionTypes'
import * as api from '../../api'

const logout = (state, action) => {
  switch(action.type) {
    case LOGOUT:
      return action.payload.user
    default:
      return state
  }
}

export default logout
