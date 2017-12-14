const SUBSCRIBE = 'SUBSCRIBE'
import * as api from '../../../api'

export const subscribe = data => {
  return async dispatch => {
    console.log(data)
    if(data.error) {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: data.error.message
      })
    } else if (data.token) {
      // send to payments endpoint on server
      const subscription = await api.payments.subscribe(data.token)
      console.log('subscription', subscription)
      const plan = subscription.plan
      dispatch({
        type: 'ADD_MESSAGE',
        payload: subscription.message
      })
    }
  }
}
