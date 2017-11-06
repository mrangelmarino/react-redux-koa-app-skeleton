import { CONFIRMATION } from './actionTypes'
import * as api from '../../api'

const localStore = api.localStorage.get('user')

const userInitialState = {
  id: localStore.id || null,
  nameFirst: localStore.nameFirst || '',
  nameLast: localStore.nameLast || '',
  active: localStore.active || ''
}

const confirmation = (state = userInitialState, action) => {
  switch(action.type) {
    case CONFIRMATION:
      return {
        active: action.payload.active
      }
    default:
      return state
  }
}

export default confirmation