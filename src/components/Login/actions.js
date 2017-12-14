import { LOGIN } from './actionTypes'
import * as api from '../../api'

export const login = data => {
  return async dispatch => {
    const loginStatus = await api.user.login(data)

    if(loginStatus.auth) {
      api.localStorage.set('user', {
        id: loginStatus.id,
        nameFirst: loginStatus.nameFirst,
        nameLast: loginStatus.nameLast,
        active: loginStatus.active
      })

      dispatch({
        type: LOGIN,
        payload: loginStatus
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
