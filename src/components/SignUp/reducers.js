import { SIGNUP } from './actionTypes'
import * as api from '../../api'

const localStore = api.localStorage.get('user')

const userInitialState = {
  active: localStore ? localStore.active : ''
}

const signup = (state = userInitialState, action) => {
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
