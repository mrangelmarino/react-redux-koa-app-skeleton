import { CONFIRMATION } from './actionTypes'
import * as api from '../../api'

export const confirmation = confirmation => {
  return async dispatch => {
    const confirmationStatus = await api.user.confirmation(confirmation);

    if(confirmationStatus.active === true) {
      api.localStorage.set('user', {
        active: confirmationStatus.active
      })
    }

    dispatch({
      type: CONFIRMATION,
      payload: {
        active: confirmationStatus.active,
      }
    })

    if(confirmationStatus.message) {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: confirmationStatus.message
      })
    }
  }
}
