import React from 'react'
import { FormControls, Form } from '../Form'
import { Link } from 'react-router-dom'

const formControlData = [{
  name: 'email',
  type: 'email',
  placeholder: 'Email',
  validate: 'required'
},{
  name: 'password',
  type: 'password',
  placeholder: 'Password',
  validate: 'required'
}]

export default class Login extends React.Component {

  componentWillUnmount() {
    this.props.clearMessage()
  }

  render() {
    const formControls = FormControls(formControlData)
    const message = this.props.message ? (
      <div className="alert alert-danger">
        {this.props.message}
      </div>
    ) : '';

    return(
      <div className="well">
        <p className="lead">Log In.</p>
        <Form postFormData={(data) => this.props.postFormData(data)}>
          {formControls}
        </Form>
        <p><Link to="/reset">Reset your password.</Link></p>
        {message}
      </div>
    )
  }
}