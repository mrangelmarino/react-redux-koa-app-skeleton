import React from 'react'
import { Redirect } from 'react-router-dom'

export default class Confirm extends React.Component {

  componentWillMount() {
    const match = this.props.match.params.confirmation
    if(match) {
      this.props.confirmEmail(match)
    }
  }

  render() {
    if(this.props.active === true || this.props.message.indexOf('Invalid') > -1) {
      return(
        <Redirect to="/login"/>
      )
    } else {
      return(
        <p>Please check your email to confirm your email address.</p>
      )
    }
  }
}