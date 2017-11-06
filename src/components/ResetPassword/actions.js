import { RESET_PASSWORD } from './actionTypes'
import * as api from '../../api'

export const resetPasswordCode = async (email) => {
  const resetPassword = await api.user.resetPasswordCode(email)
  return {
    type: RESET_PASSWORD,
    payload: {
      message: resetPassword.message
    }
  }
}

export const resetPassword = async (data) => {
  const resetPassword = await api.user.resetPassword(data)
  return {
    type: RESET_PASSWORD,
    payload: {
      message: resetPassword.message
    }
  }
}