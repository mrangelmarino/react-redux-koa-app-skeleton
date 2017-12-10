// Controller class
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const STRIPE_PLAN = process.env.STRIPE_PLAN
const stripe = require('stripe')(STRIPE_SECRET_KEY)

class ApiPayments {

  static async subscribe(ctx, next) {
    const userId = ctx.session.passport.user
    const token = ctx.request.body.token

    const user = await getUser(userId)
    const customer = await createCustomer(user, token)
    const subscription = await subscribeCustomer(user, customer)
    const subscribedUser = await updateUser(user, customer, subscription)

    // then return data so subscribed state can be saved in client

    await next()

    ctx.set('Content-Type', 'application/json');
    ctx.body = JSON.stringify({})


    // functions

    async function getUser(id) {
      try {
        return await ctx.db.user.findOne({
          where: { id: id },
          attributes: ['id', 'email', 'customer_id', 'customer_subscription']
        })
      } catch(error) {
        console.log(error)
      }
    }

    async function createCustomer(usr, tok) {
      if (usr && tok) {
        try {
          const customerId = usr.get('customer_id')

          return await customerId ? (
            stripe.customers.retrieve(customerId)
          ) : (
            stripe.customers.create({
              email: usr.get('email'),
              source: tok.id
            })
          )
        } catch (error) {
          console.log(error)
        }

      }
    }

    async function subscribeCustomer(usr, cust) {
      const subscription = usr.get('customer_subscription')

      if (cust && !subscription) {
        try {

          return await stripe.subscriptions.create({
            customer: cust.id,
            items: [
              {
                plan: STRIPE_PLAN
              }
            ]
          })
        } catch(error) {
          console.log(error)
        }
      }
    }

    async function updateUser(usr, cust, sub) {
      const update = {}

      if (cust) { update.customer_id = cust.id }

      if (sub) {
        Object.assign(update, {
          'customer_subscription': sub.id,
          'customer_plan': sub.plan.id,
          'customer_expiration': new Date(sub.current_period_end*1000).toString()
        })
      }

      if (usr && update) {
        try {
          return await usr.update(update)
        } catch(error) {
          console.log(error)
        }
      }
    }

  }

}

module.exports = ApiPayments
