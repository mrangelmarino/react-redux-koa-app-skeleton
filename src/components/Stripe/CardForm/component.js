import React from 'react'
import { CardElement } from 'react-stripe-elements'
import { Form, FormButton } from '../../Form'

class CardForm extends React.Component {

  componentWillUnmount() {
    this.props.clearMessage()
  }

  render() {
    return(
      <div className="well">
        <p className="lead">Enter Your Credit Card to Upgrade</p>
        <p>You can cancel at any time.</p>
        <Form message={this.props.message}>
          <CardElement />
          <FormButton
            value="Pay"
            submit={this.props.subscribe}
          />
        </Form>
      </div>
    )
  }
}

export default CardForm
