async function isSubscribed(ctx, next) {
  const user = ctx.req.user
  const isSubscribed = user.get('customer_expiration')
}

