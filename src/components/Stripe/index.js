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
      <div className="well">
        <p className="lead">Enter Your Credit Card to Upgrade</p>
        <p>You can cancel at any time.</p>
        <form onSubmit={this.handleSubmit}>
          <CardElement />
          <button>Pay</button>
        </form>
      </div>
    )
  }
}

const CardForm = injectStripe(_CardForm)

export default class Stripe extends React.Component {
  render() {
    return(
      <StripeProvider apiKey={process.env.STRIPE_PUBLIC_KEY}>
          <Elements>
            <CardForm/>
          </Elements>
      </StripeProvider>
    )
  }
}