import { connect } from 'react-redux'
import * as action from './actions'
import Login from './component'

const mapStateToProps = state => {
  return {
    message: state.app.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postFormData: data => {
      dispatch(action.login(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
