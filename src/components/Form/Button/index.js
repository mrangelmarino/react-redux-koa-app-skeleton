import React from 'react'

export default class Button extends React.Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
  }

  submit() {
    // pass submit action up to Form component
    this.props.submitForm(this.props.submit)
  }

  render() {
    return(
      <button className={(this.props.className ? ' ' + this.props.className : '')} onClick={()=>this.submit()}>{this.props.value}</button>
    )
  }
}
