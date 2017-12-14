import { ADD_MESSAGE, CLEAR_MESSAGE } from './actionTypes'

const message = (state = '', action) => {
  switch(action.type) {
    case ADD_MESSAGE:
      return action.payload
    case CLEAR_MESSAGE:
      return ''
    default:
      return state
  }
}

export default message
