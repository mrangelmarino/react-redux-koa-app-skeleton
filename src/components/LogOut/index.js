import React from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import * as action from './actions'

class LogoutContainer extends React.Component {

  componentWillMount() {
    const { dispatch, id, auth} = this.props
    if(auth) {
      dispatch(action.logout(id))
    }
  }

  render() {
    if(!this.props.auth) {
      return(<Redirect to="/login"/>)
    } else if(this.props.message) {
      return(<p>{this.props.message}</p>)
    } else {
      return(<p>Logging out...</p>)
    }
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    id: state.user.id,
    message: state.message
  }
}

export default withRouter(connect(
  mapStateToProps,
  null
)(LogoutContainer))
