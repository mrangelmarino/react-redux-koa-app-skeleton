import React from 'react'
import style from './style.scss'

export default class Message extends React.Component {
  componentWillUnmount() {
    if(this.props.message) {
      this.props.clearMessage()
    }
  }

  render() {
    const message = this.props.message
    return(
      <p className={style.formMessage + (message ? ' active' : '') + ' form-message'}>{message}</p>
    )
  }
}
