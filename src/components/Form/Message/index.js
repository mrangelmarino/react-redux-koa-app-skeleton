import { connect } from 'react-redux'
import * as action from './actions'
import Message from './component'

const mapDispatchToProps = dispatch => {
  return {
    clearMessage: () => dispatch(action.clearMessage())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Message)
