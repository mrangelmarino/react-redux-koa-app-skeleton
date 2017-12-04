import { connect } from 'react-redux'
import * as user from './actions'
import * as app from '../App/actions'
import Login from './component'

const mapStateToProps = state => {
  return {
    message: state.app.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postFormData: data => {
      dispatch(user.login(data))
    },
    clearMessage: () => dispatch(app.clearMessage())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
