import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers'

// auth
import auth from '../components/Auth/reducers'

// message
import message from '../components/Form/Message/reducers'

// user
import login from '../components/Login/reducers'
import signup from '../components/SignUp/reducers'
import confirmation from '../components/Confirm/reducers'
import logout from '../components/LogOut/reducers'

const user = reduceReducers(
  login,
  signup,
  confirmation,
  logout
)


export default combineReducers({
  app: combineReducers({
    auth,
    message
  }),
  user
})
