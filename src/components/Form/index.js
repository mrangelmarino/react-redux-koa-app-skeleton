import React from 'react'
import ReactDOM from 'react-dom'
import { formControls } from './FormControl'

export { formControls as FormControls }

export class Form extends React.Component {
  constructor(props) {
    super(props)

    const formData = {}
    const children = this.props.children

    for(var child in children) {
      const input = children[child]
      const inputName = input.props.name
      formData[inputName] = {
        value: ''
      }
      if(input.props.validate) {
        formData[inputName].valid = null
      }
    }

    this.state = {
      formData: formData,
      validationMessages: {
        required: 'This field is required.',
        email: 'A valid email address is required.',
        password: 'Password length must be at least 6 characters and must contain one capitalized letter and one number.',
        passwordConfirm: 'Passwords must match.'
      }
    }

    this.renderFormControls = this.renderFormControls.bind(this)
    this.setFormData = this.setFormData.bind(this)
    this.validate = this.validate.bind(this)
    this.validateFormControl = this.validateFormControl.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  setFormData(event, name) {
    const formData = Object.assign({}, this.state.formData)
    formData[name] = formData[name] ? formData[name] : {}
    formData[name].value = event.target.value
    this.setState({
      formData: formData
    })
  }

  validate(name, strategy) {
    const formData = this.state.formData
    const inputValue = formData[name].value

    switch(strategy) {
      case 'required':
        return inputValue !== ''
      case 'email':
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return emailRegex.test(inputValue)
      case 'password':
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
        return passwordRegex.test(inputValue)
      case 'passwordConfirm':
        return(formData.password.value === formData.passwordConfirm.value && formData.passwordConfirm.value !== '')
    }
  }

  validateFormControl(name, strategy) {
    const formData = Object.assign({}, this.state.formData)
    if(formData[name].hasOwnProperty('valid')) {
      formData[name].valid = this.validate(name, strategy)
    }
    this.setState({
      formData: formData
    })
  }

  renderFormControls(formControls) {
    return React.Children.map(formControls, formControl =>{
      const name = formControl.props.name
      return React.cloneElement(formControl, {
        data: this.state,
        setValue: (event) => this.setFormData(event, name),
        validateFormControl: (name, strategy) => this.validateFormControl(name, strategy)
      })
    })
  }

  submitForm(event) {
    event.preventDefault()

    const formData = Object.assign({}, this.state.formData)

    const validatingFields = this.props.children.filter((child, index)=>{
      return child.props.validate
    })

    for(var field in validatingFields) {
      const validatingField = validatingFields[field]
      this.validateFormControl(validatingField.props.name, validatingField.props.validate)
    }

    const formDataValid = (data) => {
      let valid = true
      for(var prop in data) {
        if(data[prop].valid === false || data[prop].valid === null) {
          valid = false
        }
      }
      return valid
    }

    if(formDataValid(formData)) {
      const formDataSubmitted = {}
      for(var prop in formData) {
        formDataSubmitted[prop] = formData[prop].value
      }
      this.props.postFormData(formDataSubmitted)
    }
  }

  render() {
    const formControls = this.props.children
    return(
      <form onSubmit={(event) => this.submitForm(event)} noValidate>
        {this.renderFormControls(formControls)}
        <button className="btn btn-primary">Submit</button>
      </form>
    )
  }
}