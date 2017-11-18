// Controller class
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const STRIPE_PLAN = process.env.STRIPE_PLAN
const stripe = require('stripe')(STRIPE_SECRET_KEY)

class ApiPayments {

  static async subscribe(ctx, next) {

    const userId = ctx.session.passport.user
    const token = ctx.request.body

    const user = await getUser(userId)
    const customer = await createCustomer(user, token)
    const subscription = await subscribeCustomer(customer)
    const subscribedUser = await updateUser(user, customer, subscription)

    // Now add validation e.g. make sure user isn't already a customer before subscribing,
    // make sure user isn't already subscribed
    // then return data so subscribed state can be saved in client


    console.log(subscribedUser)

    await next()

    ctx.set('Content-Type', 'application/json');
    ctx.body = JSON.stringify({})


    // functions

    async function getUser(id) {
      try {
        return await ctx.db.user.findOne({
          where: { id: id }
        })
      } catch(error) {
        console.log(error)
      }
    }

    async function createCustomer(usr, tok) {
      if(usr) {
        try {
          return await stripe.customers.create({
            email: usr.get('email'),
            source: tok.id
          })
        } catch(error) {
          console.log(error)
        }
      }
    }

    async function subscribeCustomer(cust) {
      if(cust) {
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
      if(usr && cust && sub) {
        try {
          return await usr.update({
            'customer_id': cust.id,
            'customer_plan': sub.plan.id,
            'customer_expiration': new Date(sub.current_period_end*1000).toString()
          })
        } catch(error) {
          console.log(error)
        }
      }
    }

  }

}

module.exports = ApiPayments