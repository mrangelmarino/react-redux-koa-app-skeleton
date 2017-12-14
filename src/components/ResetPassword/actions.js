import { RESET_PASSWORD } from './actionTypes'
import * as api from '../../api'

export const resetPasswordCode = email => {
  return async dispatch => {
    const resetPassword = await api.user.resetPasswordCode(email)

    dispatch({
      type: 'ADD_MESSAGE',
      payload: resetPassword.message
    })
  }
}

export const resetPassword = data => {
  return async dispatch => {
    const resetPassword = await api.user.resetPassword(data)

    dispatch({
      type: 'ADD_MESSAGE',
      payload: resetPassword.message
    })
  }
}
