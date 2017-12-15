import React from 'react'
import { CardElement } from 'react-stripe-elements'
import { Form, FormButton, FormMessage } from '../../Form'

import { jumbotron } from 'bootstrap-css-modules/css/jumbotron.css'
import { btn, btnPrimary } from 'bootstrap-css-modules/css/buttons.css'

class CardForm extends React.Component {
  render() {
    return(
      <div className={jumbotron}>
        <p className="lead">Enter Your Credit Card to Upgrade</p>
        <p>You can cancel at any time.</p>
        <Form message={this.props.message}>
          <CardElement />
          <FormButton
            className={`${btn} ${btnPrimary}`}
            value="Pay"
            submit={this.props.subscribe}
          />
          <FormMessage />
        </Form>
      </div>
    )
  }
}

export default CardForm
