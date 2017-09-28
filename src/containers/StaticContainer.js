import { connect } from 'react-redux'
import Static from '../components/Static'

const mapStateToProps = (state) => {
  return {
    auth: state.app.auth
  }
}

const StaticContainer = connect(
  mapStateToProps,
  null
)(Static)

export default StaticContainer