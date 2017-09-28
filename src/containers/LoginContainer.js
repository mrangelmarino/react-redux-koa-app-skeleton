import { connect } from 'react-redux'
import * as action from '../actions'
import Login from '../components/Login'

const mapStateToProps = state => {
  return {
    message: state.app.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postFormData: data => {
      dispatch(action.user.login(data))
    },
    clearMessage: () => dispatch(action.app.clearMessage())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)