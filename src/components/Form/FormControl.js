import React from 'react'
import classNames from 'classnames'

export const formControls = (formControlData)=> {
  return formControlData.map((formControl, index) => {
    return(
      <FormControl
        key={index}
        name={formControl.name}
        type={formControl.type}
        value={formControl.value}
        placeholder={formControl.placeholder}
        validate={formControl.validate}
      />
    )
  })
}

export class FormControl extends React.Component {

  componentDidMount() {
    if(this.props.type === 'hidden') {
      let event = {
        target: {
          value: this.props.value
        }
      }
      this.props.setValue(event, this.props.name)
    }
  }

  render() {
    const formData = this.props.data.formData

    const inputType = this.props.type
    const name = this.props.name
    const value = formData[name] && formData[name].value ? formData[name].value : ''

    const validate = this.props.validate
    const validationMessages = this.props.data.validationMessages
    const validationMessage = (valid) => {
      if(!validate || valid === null || valid === true) return
      return(
        <span className="help-block">{validationMessages[validate]}</span>
      )
    }
    const valid = formData[name] && formData[name].hasOwnProperty('valid') ? formData[name].valid : null
    const onBlur = {}
    if(validate) {
      onBlur.onBlur = ()=> this.props.validateFormControl(name, validate)
    }

    const inputClasses = classNames({
      'form-group': true,
      'has-success': valid,
      'has-error': valid === false,
      'required': validate === 'required'
    })

    switch(inputType) {
      case 'text':
      case 'email':
      case 'password':
        return(
          <div className={inputClasses}>
            <input
              type={inputType}
              value={value}
              name={name}
              placeholder={this.props.placeholder}
              className="form-control"
              onChange={(event) => this.props.setValue(event, this.props.name)}
              {...onBlur}
            />
            {validationMessage(valid)}
          </div>
        )
      case 'hidden':
        return(
          <div className={inputClasses}>
            <input
              type={inputType}
              name={name}
              className="form-control"
            />
          </div>
        )
    }

  }

}
