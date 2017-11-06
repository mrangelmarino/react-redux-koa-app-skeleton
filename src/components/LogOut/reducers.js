import { LOGOUT } from './actionTypes'
import * as api from '../../api'

const localStore = api.localStorage.get('user')

const userInitialState = {
  id: localStore.id || null,
  nameFirst: localStore.nameFirst || '',
  nameLast: localStore.nameLast || '',
  active: localStore.active || ''
}

const logout = (state = userInitialState, action) => {
  switch(action.type) {
    case LOGOUT:
      return {}
    default:
      return state
  }
}

export default logout