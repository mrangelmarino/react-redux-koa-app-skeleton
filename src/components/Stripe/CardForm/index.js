import { connect } from 'react-redux'
import { injectStripe } from 'react-stripe-elements'
import CardForm from './component'
import * as app from '../../App/actions'
import * as action from './action'

const mapStateToProps = state => {
  return {
    message: state.app.message
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    subscribe: () => {
      ownProps.stripe.createToken().then(payload => {
        dispatch(action.subscribe(payload))
      })
    },
    clearMessage: () => dispatch(app.clearMessage())
  }
}

export default injectStripe(connect(
  mapStateToProps,
  mapDispatchToProps
)(CardForm))
