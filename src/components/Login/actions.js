import { LOGIN } from './actionTypes'
import * as api from '../../api'
import * as localStorage from '../../store/localStorage'

export const login = data => {
  return async dispatch => {
    const loginStatus = await api.user.login(data)

    console.log('loginStatus', loginStatus)
    if(loginStatus.auth) {

      dispatch({
        type: LOGIN,
        payload: loginStatus
      })

      localStorage.set({
        user: {
          id: loginStatus.id,
          nameFirst: loginStatus.nameFirst,
          nameLast: loginStatus.nameLast,
          active: loginStatus.active
        }
      })
    }

    if(loginStatus.message) {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: loginStatus.message
      })
    }
  }
}
