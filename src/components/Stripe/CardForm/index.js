import { connect } from 'react-redux'
import { injectStripe } from 'react-stripe-elements'
import CardForm from './component'
import * as action from './action'

const mapStateToProps = state => {
  return {
    message: state.app.message
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit: event => {
      event.preventDefault()
      ownProps.stripe.createToken().then(payload => {
        dispatch(action.subscribe(payload))
      })
    }
  }
}

export default injectStripe(connect(
  mapStateToProps,
  mapDispatchToProps
)(CardForm))