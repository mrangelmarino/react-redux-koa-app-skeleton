import { SIGNUP } from './actionTypes'
import * as api from '../../api'

export const signup = data => {
  return async dispatch => {
    const signupStatus = await api.user.signup(data)

    if(signupStatus && !signupStatus.message) {
      dispatch({
        type: SIGNUP,
        payload: {
          active: signupStatus.active
        }
      })
    }

    if(signupStatus.message) {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: signupStatus.message
      })
    }
  }
}
