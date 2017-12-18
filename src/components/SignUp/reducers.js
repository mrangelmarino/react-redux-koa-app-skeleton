import { SIGNUP } from './actionTypes'
import * as api from '../../api'

const signup = (state, action) => {
  switch(action.type) {
    case SIGNUP:
      return {
        ...state,
        active: action.payload.active
      }
    default:
      return state
  }
}

export default signup
