import { SIGNUP } from './actionTypes'
import * as api from '../../api'

export const signup = async (data) => {
  const signupStatus = await api.user.signup(data)
  if(signupStatus) {
    return {
      type: SIGNUP,
      payload: {
        message: signupStatus.message,
        active: signupStatus.active
      }
    }
  }
}