import { SUBSCRIBE } from './actionTypes'
import * as api from '../../../api'

export const subscribe = data => {
  return async dispatch => {

    if(data.error) {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: data.error.message
      })
    } else if (data.token) {
      // send to payments endpoint on server
      const subscription = await api.payments.subscribe(data.token)
      console.log('subscription', subscription)

      if(subscription.plan) {
        dispatch({
          type: SUBSCRIBE,
          payload: subscription.plan
        })
      }

      if(subscription.message) {
        dispatch({
          type: 'ADD_MESSAGE',
          payload: subscription.message
        })
      }
    }
  }
}
