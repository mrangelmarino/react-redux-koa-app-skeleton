import { connect } from 'react-redux'
import * as action from './actions'
import * as app from '../App/actions'
import SignUp from './component'

const mapStateToProps = state => {
  return {
    message: state.app.message,
    active: state.user.active
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postFormData: (data) => {
      dispatch(action.signup(data))
    },
    clearMessage: () => dispatch(app.clearMessage())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)