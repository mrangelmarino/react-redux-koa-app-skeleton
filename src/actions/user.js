import { LOGIN, LOGOUT, SIGNUP, CONFIRMATION, RESET_PASSWORD } from './actionTypes'
import * as api from '../api'

export const login = async (data) => {
  const loginStatus = await api.user.login(data)
  console.log(loginStatus)
  if(loginStatus.auth) {
    api.localStorage.set('user', {
      id: loginStatus.id,
      nameFirst: loginStatus.nameFirst,
      nameLast: loginStatus.nameLast,
      active: loginStatus.active
    })
  }
  return {
    type: LOGIN,
    payload: loginStatus
  }
}

export const logout = async (id) => {
  const logoutStatus = await api.user.logout(id)

  if(logoutStatus && logoutStatus.auth === false) {
    api.localStorage.set('user', {})
  }

  return {
    type: LOGOUT,
    payload: {
      auth: logoutStatus.auth,
      message: logoutStatus.message
    }
  }
}

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

export const confirmation = async (confirmation) => {
  const confirmationStatus = await api.user.confirmation(confirmation);
  if(confirmationStatus.active === true) {
    api.localStorage.set('user', {
      active: confirmationStatus.active
    })
  }
  return {
    type: CONFIRMATION,
    payload: {
      active: confirmationStatus.active,
      message: confirmationStatus.message
    }
  }
}

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
  console.log(data)
  const resetPassword = await api.user.resetPassword(data)
  return {
    type: RESET_PASSWORD,
    payload: {
      message: resetPassword.message
    }
  }
}