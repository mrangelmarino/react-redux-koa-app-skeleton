// Controller class
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const STRIPE_PLAN = process.env.STRIPE_PLAN
const stripe = require('stripe')(STRIPE_SECRET_KEY)

class ApiPayments {

  static async subscribe(ctx, next) {
    const token = ctx.request.body.token
    const user = ctx.req.user
    const customer = await createCustomer(user, token)
    const subscription = await subscribeCustomer(user, customer)
    const subscribedUser = await updateUser(user, customer, subscription)

    await next()

    ctx.set('Content-Type', 'application/json');
    ctx.status = subscribedUser ? 200 : 500
    ctx.body = {
      message: subscribedUser ? 'Subscribed successfully!' : 'There was a problem processing your subscription.',
      ...subscribedUser && { plan: subscribedUser.customer_plan }
    }

    // functions

    async function createCustomer(usr, tok) {
      if (usr && tok) {
        const customerId = usr.customer_id

        return customerId ? (
          await stripe.customers.retrieve(customerId).catch(function(error) {
            console.log(error)
          })
        ) : (
          await stripe.customers.create({
            email: usr.email,
            source: tok.id
          }).catch(function(error){
            console.log(error)
          })
        )
      }
    }

    async function subscribeCustomer(usr, cust) {
      const subscription = usr.get('customer_subscription')

      if (cust && !subscription) {
        return await stripe.subscriptions.create({
          customer: cust.id,
          items: [
            {
              plan: STRIPE_PLAN
            }
          ]
        }).catch(function(error) {
          console.log(error)
        })
      }
    }

    async function updateUser(usr, cust, sub) {
      const update = {}

      if (cust && !usr.customer_id) { update.customer_id = cust.id }

      if (sub) {
        Object.assign(update, {
          'customer_subscription': sub.id,
          'customer_plan': sub.plan.id,
          'customer_expiration': new Date(sub.current_period_end*1000).toString()
        })
      }

      if (usr && Object.keys(update).length) {
        return await usr.update(update).catch(function(error) {
          console.log(errors)
        })
      }
    }

  }

}

module.exports = ApiPayments
