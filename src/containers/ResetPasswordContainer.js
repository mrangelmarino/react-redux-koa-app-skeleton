import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import ResetPassword from '../components/ResetPassword'
import * as action from '../actions'

const mapStateToProps = state => {
  return {
    message: state.app.message
  }
}

const mapPropsToDispatch = dispatch => {
  return {
    postFormDataCode: (data) => dispatch(action.user.resetPasswordCode(data)),
    postFormDataPassword: (data) => dispatch(action.user.resetPassword(data)),
    clearMessage: () => dispatch(action.app.clearMessage())
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapPropsToDispatch
)(ResetPassword))