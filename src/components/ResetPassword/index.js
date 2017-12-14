import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import ResetPassword from './component'
import * as action from './actions'

const mapStateToProps = state => {
  return {
    message: state.app.message
  }
}

const mapPropsToDispatch = dispatch => {
  return {
    postFormDataCode: (data) => dispatch(action.resetPasswordCode(data)),
    postFormDataPassword: (data) => dispatch(action.resetPassword(data))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapPropsToDispatch
)(ResetPassword))
