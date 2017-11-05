import { connect } from 'react-redux'
import * as action from '../actions'
import Signup from '../components/Signup'

const mapStateToProps = state => {
  return {
    message: state.app.message,
    active: state.user.active
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postFormData: (data) => {
      dispatch(action.user.signup(data))
    },
    clearMessage: () => dispatch(action.app.clearMessage())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup)