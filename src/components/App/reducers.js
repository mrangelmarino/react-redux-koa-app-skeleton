import { combineReducers } from 'redux'
import { SUBSCRIBE } from './actionTypes'

const plan = (state = null, action) => {
  switch(action.type) {
    case SUBSCRIBE:
      return action.payload.plan
    default:
      return state
  }
}

export default plan
