import { connect } from 'react-redux'
import Static from './component'

const mapStateToProps = (state) => {
  return {
    auth: state.app.auth
  }
}

export default connect(
  mapStateToProps,
  null
)(Static)