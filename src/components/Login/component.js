import React from 'react'
import { Form, FormControl, FormButton } from '../Form'
import { Link } from 'react-router-dom'

export default class Login extends React.Component {

  componentWillUnmount() {
    this.props.clearMessage()
  }

  render() {
    return(
      <div className="well">
        <p className="lead">Log In.</p>
        <Form
          validateMessage="Please use a valid email address and password before continuing."
          message={this.props.message}>
          <FormControl
            type="email"
            placeholder="Email"
            name="email"
            validate="email"
            validateMessage="Must be a valid email address"
          />
          <FormControl
            type="password"
            placeholder="Password"
            name="password"
            validate="password"
            validateMessage="Password must be at least six characters and contain one capital letter and one number"
          />
          <FormButton
            value="Log In"
            submit={this.props.postFormData}
          />
        </Form>
        <p><Link to="/reset">Reset your password.</Link></p>
      </div>
    )
  }
}
