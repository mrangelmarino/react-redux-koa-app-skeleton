const SUBSCRIBE = 'SUBSCRIBE'
import * as api from '../../../api'

export const subscribe = async (data) => {
  console.log(data)
  if(data.error) {
    return {
      type: SUBSCRIBE,
      payload: {
        message: data.error.message
      }
    }
  } else if (data.token) {
    // send to payments endpoint on server
    const subscription = await api.payments.subscribe(data.token)
    console.log('subscription', subscription)
    // return {
    //
    // }
  }
}