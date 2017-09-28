import { combineReducers } from 'redux'
import { LOGIN, LOGOUT, SIGNUP, CONFIRMATION } from '../actions/actionTypes'
import * as api from '../api'

const localStore = api.localStorage.get('user')

const userInitialState = {
  id: localStore.id || null,
  nameFirst: localStore.nameFirst || '',
  nameLast: localStore.nameLast || '',
  active: localStore.active || ''
}

export const user = (state = userInitialState, action) => {
  switch(action.type) {
    case LOGIN:
      return action.payload.auth === false ? state : {
        id: action.payload.id,
        nameFirst: action.payload.nameFirst,
        nameLast: action.payload.nameLast,
        active: action.payload.active
      }
    case SIGNUP:
    case CONFIRMATION:
      return {
        active: action.payload.active
      }
    case LOGOUT:
      return {}
    default:
      return state
  }
}