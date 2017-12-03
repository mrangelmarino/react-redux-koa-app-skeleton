import React from 'react'
import { Form, FormControl, FormButton } from '../Form'
import { Redirect } from 'react-router-dom'

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
        <div className="well">
          <p className="lead">Sign up.</p>

          <Form message={this.props.message} validateMessage="Please complete all fields before continuing">
            <FormControl
              type="text"
              name="firstName"
              placeholder="First Name"
              validate="required"
              validateMessage="This field is required"
            />
            <FormControl
              type="text"
              name="lastName"
              placeholder="Last Name"
              validate="required"
              validateMessage="This field is required"
            />
            <FormControl
              type="email"
              name="email"
              placeholder="Email"
              validate="email"
              validateMessage="Must be a valid email address"
            />
            <FormControl
              type="password"
              name="password"
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
            <FormButton
              value="Sign Up"
              submit={this.props.postFormData}
            />
          </Form>
        </div>
      )
    }

  }
}
