import { LOGIN, LOGOUT, SIGNUP, CONFIRMATION, RESET_PASSWORD } from './actionTypes'
import * as api from '../../api'

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
