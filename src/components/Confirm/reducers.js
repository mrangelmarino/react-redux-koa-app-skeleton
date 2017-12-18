import { CONFIRMATION } from './actionTypes'
import * as api from '../../api'

const confirmation = (state, action) => {
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
