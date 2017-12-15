import { LOGOUT } from './actionTypes'
import * as api from '../../api'

const logout = (state, action) => {
  switch(action.type) {
    case LOGOUT:
      return {
        id: null,
        nameFirst: '',
        nameLast: '',
        active: ''
      }
    default:
      return state
  }
}

export default logout
