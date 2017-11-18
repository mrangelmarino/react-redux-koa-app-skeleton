import React from 'react'
import { CardElement } from 'react-stripe-elements'

class CardForm extends React.Component {

  render() {
    return(
      <div className="well">
        <p className="lead">Enter Your Credit Card to Upgrade</p>
        <p>You can cancel at any time.</p>
        <form onSubmit={(event) => this.props.handleSubmit(event)}>
          <CardElement />
          <button>Pay</button>
        </form>
        {this.props.message}
      </div>
    )
  }
}

export default CardForm