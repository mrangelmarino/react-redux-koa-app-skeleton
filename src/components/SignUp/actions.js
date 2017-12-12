import { SIGNUP } from './actionTypes'
import * as api from '../../api'

export const signup = data => {
  return async dispatch => {
    const signupStatus = await api.user.signup(data)
    if(signupStatus) {
      dispatch({
        type: SIGNUP,
        payload: {
          message: signupStatus.message,
          active: signupStatus.active
        }
      })
    }
  }
}
