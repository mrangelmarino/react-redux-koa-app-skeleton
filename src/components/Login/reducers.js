import { combineReducers } from 'redux'
import { LOGIN, LOGOUT, SIGNUP, CONFIRMATION } from './actionTypes'
import * as api from '../../api'

const userInitialState = {
  id: null,
  nameFirst: '',
  nameLast: '',
  active: ''
}

const login = (state = userInitialState, action) => {
  switch(action.type) {
    case LOGIN:
      return {
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
