import { combineReducers } from 'redux'
import { LOGIN, LOGOUT, SIGNUP, CONFIRMATION } from './actionTypes'
import * as api from '../../api'

const localStore = api.localStorage.get('user')

const userInitialState = {
  id: localStore.id || null,
  nameFirst: localStore.nameFirst || '',
  nameLast: localStore.nameLast || '',
  active: localStore.active || ''
}

const login = (state = userInitialState, action) => {
  switch(action.type) {
    case LOGIN:
      return action.payload.auth === false ? state : {
        id: action.payload.id,
        nameFirst: action.payload.nameFirst,
        nameLast: action.payload.nameLast,
        active: action.payload.active
      }
    default:
      return state
  }
}

export default login