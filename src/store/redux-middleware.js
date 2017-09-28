import promiseMiddleware from 'redux-promise'

const middlewares = [promiseMiddleware]

if (ENV === 'development') {
  const { createLogger } =  require('redux-logger')
  const logger = createLogger({
    duration: true
  })
  middlewares.push(logger)
}

export default middlewares