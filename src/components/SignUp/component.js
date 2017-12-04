import React from 'react'
import { Form, FormControl, FormButton } from '../Form'
import { Redirect } from 'react-router-dom'

import { formGroup, formControl } from 'bootstrap-css-modules/css/forms.css'
import { jumbotron } from 'bootstrap-css-modules/css/jumbotron.css'
import { btn, btnPrimary } from 'bootstrap-css-modules/css/buttons.css'

export default class SignUp extends React.Component {

  componentWillUnmount() {
    this.props.clearMessage()
  }

  render() {
    const active = this.props.active

    if(active === null) {
      return(<Redirect to="/confirm"/>)
    } else {
      return(
        <div className={jumbotron}>
          <h1 className="display3">Sign up.</h1>

          <Form message={this.props.message} validateMessage="Please complete all fields before continuing">
            <FormControl
              className={formGroup}
              inputClassName={formControl}
              type="text"
              name="firstName"
              placeholder="First Name"
              validate="required"
              validateMessage="This field is required"
            />
            <FormControl
              className={formGroup}
              inputClassName={formControl}
              type="text"
              name="lastName"
              placeholder="Last Name"
              validate="required"
              validateMessage="This field is required"
            />
            <FormControl
              className={formGroup}
              inputClassName={formControl}
              type="email"
              name="email"
              placeholder="Email"
              validate="email"
              validateMessage="Must be a valid email address"
            />
            <FormControl
              className={formGroup}
              inputClassName={formControl}
              type="password"
              name="password"
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
            <FormButton
              className={`${btn} ${btnPrimary}`}
              value="Sign Up"
              submit={this.props.postFormData}
            />
          </Form>
        </div>
      )
    }

  }
}
