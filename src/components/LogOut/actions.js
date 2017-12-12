import { LOGOUT } from './actionTypes'
import * as api from '../../api'

export const logout = id => {
  return async dispatch => {
    const logoutStatus = await api.user.logout(id)

    if(logoutStatus && logoutStatus.auth === false) {
      api.localStorage.set('user', {})
    }

    dispatch({
      type: LOGOUT,
      payload: {
        auth: logoutStatus.auth,
        message: logoutStatus.message
      }
    })
  }
}
