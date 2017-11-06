import React from 'react'
import { FormControls, Form } from '../Form'
import { Redirect } from 'react-router-dom'

const formControlData = [{
  name: 'firstName',
  type: 'text',
  placeholder: 'First Name',
  validate: 'required'
},{
  name: 'lastName',
  type: 'text',
  placeholder: 'Last Name',
  validate: 'required'
},{
  name: 'email',
  type: 'email',
  placeholder: 'Email',
  validate: 'email'
},{
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

export default class SignUp extends React.Component {

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
    const active = this.props.active

    if(active === null) {
      return(<Redirect to="/confirm"/>)
    } else {
      return(
        <div className="well">
          <p className="lead">Sign up.</p>
          <Form postFormData={(data) => this.props.postFormData(data)}>
            {formControls}
          </Form>
          {message}
        </div>
      )
    }

  }
}