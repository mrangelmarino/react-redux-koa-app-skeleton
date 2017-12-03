import style from './style.scss'

import React from 'react'
import Control from './Control'
import Button from './Button'

export { Control as FormControl }
export { Button as FormButton }

export class Form extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      formData: this.buildFormData(this.props.children),
      message: ''
    }

    this.setFormData = this.setFormData.bind(this)
    this.validate = this.validate.bind(this)
    this.setValid = this.setValid.bind(this)
    this.isValid = this.isValid.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.renderFormControls = this.renderFormControls.bind(this)
  }

  buildFormData(children) {
    // build out base formData dynamically when component is constructed because children are variable
    return Object.values(children).reduce((formData, control) => {
      // only set values for members of Control class
      if(control.type == Control) {
        const controlName = control.props.name
        const controlValue = control.props.value ? control.props.value : ''
        // initialize form control values
        formData[controlName] = { value: controlValue }

        // handle attaching validation data if necessary
        if(control.props.validate) {
          formData[controlName].valid = null
        }
      }
      return formData
    }, {})
  }

  setFormData(event, controlName) {
    // each form control invokes this method which is attached by `renderFormControls`
    const formData = Object.assign({}, this.state.formData)
    formData[controlName].value = event.target.value
    this.setState({
      formData: formData
    })
  }

  validate(value, strategy) {
    switch(strategy) {
      case 'required':
        return value !== ''
      case 'email':
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return emailRegex.test(value)
      case 'password':
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
        return passwordRegex.test(value)
      case 'passwordConfirm':
        const formData = Object.assign({}, this.state.formData)
        return(formData.password.value === formData.passwordConfirm.value && formData.passwordConfirm.value !== '')
    }

  }

  setValid(controlName, value, strategy) {
    // pass `isValid` boolean return value from validation strategy set on Control component
    // up to form state
    const isValid = typeof strategy == 'string' ? this.validate(value, strategy) : strategy(value)
    const formData = Object.assign({}, this.state.formData)

    formData[controlName].valid = isValid

    this.setState({
      formData: formData
    })
  }

  isValid() {
    // check if form data values are all properly validated,
    // by filtering formData for all inputs that don't have a valid value of true
    // resulting array is unvalidated formControls
    // lenght of 0 means everything was validated
    return Object.values(this.state.formData).filter(control => {
      return (control.hasOwnProperty('valid') && control.valid !== true)
    }).length === 0
  }

  submitForm(action) {
    // clear old message since this is a new submission attempt
    this.setState({
      message: ''
    })

    // check if validated form data has passed validation
    // before attempting to submit
    if(this.isValid()) {
      // clean up data before submitting to action
      const formDataValueMap = Object.entries(this.state.formData).reduce((formData, entry) => {
        formData[entry[0]] = entry[1].value
        return formData
      }, {})

      // send data to action
      // this is the function passed from the button via the submit prop
      console.log(formDataValueMap)
      action(formDataValueMap)
    } else {
      // send custom form validation message
      this.setState({
        message: this.props.validateMessage
      })
    }
  }

  renderFormControls(formControls) {
    // renderFormControls helper loops throught all of the Form class' children
    // and adds necessary props to pass state between form controls and form
    // handle it here to abstract these methods out and make form building easier
    return React.Children.map(formControls, (child) => {

      // modify members of the Control class e.g. inputs, passwords, etc.
      if(child.type == Control) {
        const name = child.props.name
        return React.cloneElement(child, {
          data: this.state.formData[name],
          setValue: event => this.setFormData(event, name),
          setValid: (name, value, strategy) => this.setValid(name, value, strategy)
        })
      }

      // modify members of Button class
      if(child.type == Button) {
        return React.cloneElement(child, {
          submitForm: action => this.submitForm(action)
        })
      }

      // if formControl is inside presentational component,
      // traverse that, otherwise just return whatever's there
      if(child.props && child.props.children) {
        return React.cloneElement(child, child.props, this.renderFormControls(child.props.children))
      } else {
        return child
      }

    })
  }

  render() {
    // either flash default validation message or api response message passed through props
    let message = this.state.message ? this.state.message : this.props.message
    // pass in user supplied class names from component
    const userClasses = (this.props.className ? ' ' + this.props.className : '')

    return(
      <form className={userClasses} onSubmit={event => event.preventDefault()}>
        {this.renderFormControls(this.props.children)}
        <p className={style.formMessage + (message ? ' active' : '') + ' form-message'}>{message}</p>
      </form>
    )

  }
}
