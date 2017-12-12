import React from 'react'
import { Form, FormControl, FormButton } from '../Form'

import { formGroup, formControl } from 'bootstrap-css-modules/css/forms.css'
import { jumbotron } from 'bootstrap-css-modules/css/jumbotron.css'
import { btn, btnPrimary } from 'bootstrap-css-modules/css/buttons.css'

export default class ResetPassword extends React.Component {

  componentWillUnmount() {
    if(this.props.message) {
      this.props.clearMessage()
    }
  }

  render() {

    const resetCode = this.props.match.params.resetCode

    if(resetCode) {
      return (

        <div className={jumbotron}>
          <h1 className="display3">Reset Password.</h1>
          <p>Enter your new password below.</p>
          <Form message={this.props.message}>
            <FormControl
              className={formGroup}
              inputClassName={formControl}
              name="password"
              type="password"
              placeholder="Password"
              validate="password"
              validateMessage="Password must be at least six characters and contain one capital letter and one number"
            />
            <FormControl
              className={formGroup}
              inputClassName={formControl}
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password"
              validate="passwordConfirm"
              validateMessage="Passwords must match"
            />
            <FormControl
              className={formGroup}
              inputClassName={formControl}
              type="hidden"
              name="resetCode"
              value={resetCode}
            />
            <FormButton
              className={`${btn} ${btnPrimary}`}
              value="Reset Password"
              submit={this.props.postFormDataPassword}
            />
          </Form>
        </div>

      )
    } else {
      return (

        <div className={jumbotron}>
          <h1 className="display3">Reset Password.</h1>
          <p>Enter your email below and receive a link to reset your password.</p>
          <Form message={this.props.message}>
            <FormControl
              className={formGroup}
              inputClassName={formControl}
              name="email"
              type="email"
              placeholder="Email"
              validate="email"
              validateMessage="Must be a valid email address"
            />
            <FormButton
              className={`${btn} ${btnPrimary}`}
              value="Send Link"
              submit={this.props.postFormDataCode}
            />
          </Form>
        </div>

      )
    }
  }

}
