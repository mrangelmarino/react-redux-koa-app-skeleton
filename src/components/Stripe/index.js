import React from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'
import CardForm from './CardForm'

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
