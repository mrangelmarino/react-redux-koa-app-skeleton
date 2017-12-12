import thunk from 'redux-thunk'

const middlewares = [thunk]

if (process.env.NODE_ENV === 'development') {
  const { createLogger } =  require('redux-logger')
  const logger = createLogger({
    duration: true
  })
  middlewares.push(logger)
}

export default middlewares
