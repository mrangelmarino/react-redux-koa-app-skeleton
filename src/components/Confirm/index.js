import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as user from './actions'
import Confirm from './component'

const mapStateToProps = state => {
  return {
    active: state.user.active,
    message: state.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    confirmEmail: (confirmation) => {
      dispatch(user.confirmation(confirmation))
    }
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Confirm))
