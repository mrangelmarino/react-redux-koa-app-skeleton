import { SUBSCRIBE } from './actionTypes'
import * as api from '../../../api'

const planInitialState = api.localStorage.get('plan') || null

const plan = (state = planInitialState, action) => {
  switch(action.type) {
    case SUBSCRIBE:
      return action.payload
    default:
      return state
  }
}

export default plan
