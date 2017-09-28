import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as action from '../actions'
import Confirm from '../components/Confirm'

const mapStateToProps = state => {
  return {
    active: state.user.active,
    message: state.app.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    confirmEmail: (confirmation) => {
      dispatch(action.user.confirmation(confirmation))
    }
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Confirm))