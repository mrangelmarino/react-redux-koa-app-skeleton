import React from 'react'
import { Form, FormControl, FormButton } from '../Form'
import { Link } from 'react-router-dom'

import { formGroup, formControl } from 'bootstrap-css-modules/css/forms.css'
import { jumbotron } from 'bootstrap-css-modules/css/jumbotron.css'
import { btn, btnPrimary } from 'bootstrap-css-modules/css/buttons.css'

export default class Login extends React.Component {

  componentWillUnmount() {
    if(this.props.message) {
      this.props.clearMessage()
    }
  }

  render() {
    return(
      <div className={jumbotron}>
        <h1 className="display3">Log In.</h1>
        <Form
          validateMessage="Please use a valid email address and password before continuing."
          message={this.props.message}>
          <FormControl
            className={formGroup}
            inputClassName={formControl}
            type="email"
            placeholder="Email"
            name="email"
            validate="email"
            validateMessage="Must be a valid email address"
          />
          <FormControl
            className={formGroup}
            inputClassName={formControl}
            type="password"
            placeholder="Password"
            name="password"
            validate="password"
            validateMessage="Password must be at least six characters and contain one capital letter and one number"
          />
          <FormButton
            className={`${btn} ${btnPrimary}`}
            value="Log In"
            submit={this.props.postFormData}
          />
        </Form>
        <p><Link to="/reset">Reset your password.</Link></p>
      </div>
    )
  }
}
