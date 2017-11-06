import { SIGNUP } from './actionTypes'
import * as api from '../../api'

const localStore = api.localStorage.get('user')

const userInitialState = {
  id: localStore.id || null,
  nameFirst: localStore.nameFirst || '',
  nameLast: localStore.nameLast || '',
  active: localStore.active || ''
}

const signup = (state = userInitialState, action) => {
  switch(action.type) {
    case SIGNUP:
      return {
        active: action.payload.active
      }
    default:
      return state
  }
}

export default signup