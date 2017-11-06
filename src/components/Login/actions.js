import { LOGIN } from './actionTypes'
import * as api from '../../api'

export const login = async (data) => {
  const loginStatus = await api.user.login(data)
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