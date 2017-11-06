import React from 'react'
import { FormControls, Form } from '../Form'

const formControlDataEmail = [{
  name: 'email',
  type: 'email',
  placeholder: 'Email',
  validate: 'email'
}]

let formControlDataPassword = [{
  name: 'password',
  type: 'password',
  placeholder: 'Password',
  validate: 'password'
},{
  name: 'passwordConfirm',
  type: 'password',
  placeholder: 'Confirm Password',
  validate: 'passwordConfirm'
}]


export default class ResetPassword extends React.Component {

  componentWillUnmount() {
    this.props.clearMessage()
  }

  render() {
    const resetCode = this.props.match.params.resetCode
    const formControlsEmail = FormControls(formControlDataEmail)
    formControlDataPassword.push({
      name: 'resetCode',
      type: 'hidden',
      value: resetCode
    })
    const formControlsPassword = FormControls(formControlDataPassword)

    const message = this.props.message ? (
      <div className="alert alert-danger">
        {this.props.message}
      </div>
    ) : '';

    if(resetCode) {
      return (
        <div className="well">
          <p className="lead">Reset Password.</p>
          <p>Enter your new password below.</p>
          <Form postFormData={(data) => this.props.postFormDataPassword(data)}>
            {formControlsPassword}
          </Form>
          {message}
        </div>
      )
    } else {
      return (
        <div className="well">
          <p className="lead">Reset Password.</p>
          <p>Enter your email below and receive a link to reset your password.</p>
          <Form postFormData={(data) => this.props.postFormDataCode(data)}>
            {formControlsEmail}
          </Form>
          {message}
        </div>
      )
    }
  }

}