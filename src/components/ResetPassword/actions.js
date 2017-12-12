import { RESET_PASSWORD } from './actionTypes'
import * as api from '../../api'

export const resetPasswordCode = email => {
  return async dispatch => {
    const resetPassword = await api.user.resetPasswordCode(email)
    dispatch({
      type: RESET_PASSWORD,
      payload: {
        message: resetPassword.message
      }
    })
  }
}

export const resetPassword = data => {
  return async dispatch => {
    const resetPassword = await api.user.resetPassword(data)
    dispatch({
      type: RESET_PASSWORD,
      payload: {
        message: resetPassword.message
      }
    })
  }
}
