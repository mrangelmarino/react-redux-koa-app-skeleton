import { CONFIRMATION } from './actionTypes'
import * as api from '../../api'

const localStore = api.localStorage.get('user')

const userInitialState = {
  active: localStore ? localStore.active : ''
}

const confirmation = (state = userInitialState, action) => {
  switch(action.type) {
    case CONFIRMATION:
      return {
        ...state,
        active: action.payload.active
      }
    default:
      return state
  }
}

export default confirmation
