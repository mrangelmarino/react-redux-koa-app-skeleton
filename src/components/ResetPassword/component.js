import React from 'react'
import { Form, FormControl, FormButton } from '../Form'

export default class ResetPassword extends React.Component {

  componentWillUnmount() {
    this.props.clearMessage()
  }

  render() {

    const resetCode = this.props.match.params.resetCode
    console.log(resetCode)

    if(resetCode) {
      return (

        <div className="well">
          <p className="lead">Reset Password.</p>
          <p>Enter your new password below.</p>
          <Form message={this.props.message}>
            <FormControl
              name="password"
              type="password"
              placeholder="Password"
              validate="password"
              validateMessage="Password must be at least six characters and contain one capital letter and one number"
            />
            <FormControl
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password"
              validate="passwordConfirm"
              validateMessage="Passwords must match"
            />
            <FormControl
              type="hidden"
              name="resetCode"
              value={resetCode}
            />
            <FormButton
              value="Reset Password"
              submit={this.props.postFormDataPassword}
            />
          </Form>
        </div>

      )
    } else {
      return (

        <div className="well">
          <p className="lead">Reset Password.</p>
          <p>Enter your email below and receive a link to reset your password.</p>
          <Form message={this.props.message}>
            <FormControl
              name="email"
              type="email"
              placeholder="Email"
              validate="email"
              validateMessage="Must be a valid email address"
            />
            <FormButton
              value="Send Link"
              submit={this.props.postFormDataCode}
            />
          </Form>
        </div>

      )
    }
  }

}
