import { connect } from 'react-redux'
import Main from '../components/Main'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => {
  return {
    auth: state.app.auth
  }
}

const MainContainer = withRouter(connect(
  mapStateToProps,
  null
)(Main))

export default MainContainer