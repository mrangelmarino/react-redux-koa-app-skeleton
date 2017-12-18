import { LOGOUT } from './actionTypes'
import * as api from '../../api'
import * as localStorage from '../../store/localStorage'

export const logout = id => {
  return async dispatch => {
    const logoutStatus = await api.user.logout(id)

    if(logoutStatus && logoutStatus.auth === false) {
      const loggedOutUser = {
        id: null,
        nameFirst: '',
        nameLast: '',
        active: ''
      }

      dispatch({
        type: LOGOUT,
        payload: {
          user: loggedOutUser,
          auth: logoutStatus.auth,
        }
      })

      localStorage.clear()
    }

    if(logoutStatus.message) {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: logoutStatus.message
      })
    }
  }
}
