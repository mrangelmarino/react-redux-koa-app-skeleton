import React from 'react'
import { StripeProvider, Elements, injectStripe, CardElement } from 'react-stripe-elements'

class _CardForm extends React.Component {

  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.stripe.createToken().then(payload => console.log(payload))
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <CardElement />
        <button>Pay</button>
      </form>
    )
  }
}

const CardForm = injectStripe(_CardForm)

export default class Stripe extends React.Component {
  render() {
    return(
      <StripeProvider apiKey="pk_test_w2zeVQUNc2tFNiO4La5yWzEf">
          <Elements>
            <CardForm/>
          </Elements>
      </StripeProvider>
    )
  }
}