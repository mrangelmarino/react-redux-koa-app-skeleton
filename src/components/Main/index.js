import { connect } from 'react-redux'
import Main from './component'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const MainContainer = withRouter(connect(
  mapStateToProps,
  null
)(Main))

export default MainContainer
