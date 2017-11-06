import { connect } from 'react-redux'
import Header from './component';

const mapStateToProps = (state) => {
  return {
    auth: state.app.auth
  }
}

const HeaderContainer = connect(
  mapStateToProps,
  null
)(Header)

export default HeaderContainer