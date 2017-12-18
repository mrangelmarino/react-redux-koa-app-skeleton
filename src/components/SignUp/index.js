import { connect } from 'react-redux'
import * as action from './actions'
import SignUp from './component'

const mapStateToProps = state => {
  return {
    message: state.message,
    active: state.user.active
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postFormData: (data) => {
      dispatch(action.signup(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)
