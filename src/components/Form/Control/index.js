import style from './style.scss'

import React from 'react'
import classNames from 'classnames'

export default class Control extends React.Component {
  constructor(){
    super()

    this.state = {
      focus: false
    }

    this.validate = this.validate.bind(this)
    this.setFocus = this.setFocus.bind(this)
  }

  validate() {
    // call validation strategy string name or custom validation strategy function
    // validation functions should just return boolean
    const validationStrategy = this.props.validate
    const value = this.props.data.value
    const name = this.props.name

    if(validationStrategy) {
      this.props.setValid(name, value, validationStrategy)
    }
  }

  setFocus() {
    // just to handle tooltip visibility
    const focus = this.state.focus
    this.setState({
      focus: !focus
    })
  }

  render() {
    // form data is passed down from form
    const formData = this.props.data
    const controlType = this.props.type
    const name = this.props.name
    const value = formData.value
    const valid = formData.valid

    const dynamicClasses = classNames({
      'has-tooltip': this.state.focus && !valid,
      'has-success': valid,
      'has-error': valid === false
    })

    // dynamically render correct input based on props
    // more inputs types would be created if this were fully fleshed out
    switch(controlType) {
      case 'text':
      case 'email':
      case 'password':
        return(
          <div className={dynamicClasses + (this.props.className ? ' ' + this.props.className : '')}>
            <input
              className={style.formControlInput}
              type={controlType}
              name={name}
              value={value}
              placeholder={this.props.placeholder}
              // pass input values up to form
              onChange={event => {
                this.props.setValue(event, name)
                this.validate()
              }}
              onFocus={() => this.setFocus()}
              onBlur={() => this.setFocus()}
            />
            <span>{this.props.validateMessage}</span>
          </div>
        )
      case 'hidden':
        return(
          <div className={(this.props.className ? ' ' + this.props.className : '')}>
            <input
              type={controlType}
              name={name}
              value={this.props.value}
            />
          </div>
        )
    }
  }
}
