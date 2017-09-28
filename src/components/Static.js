import React from 'react'
import { Redirect } from 'react-router'

import Home from '../scenes/Home'
import NotFound from '../scenes/NotFound'

const Static = (props) => {
  const auth = props.auth
  const matchedComponent = props.match.url

  switch(matchedComponent) {
    case '/':
      if(auth) {
        return(
          // TODO: update with authed screen
          <Redirect to="/dashboard" />
        )
      } else {
        return (
          <Home/>
        )
      }
    default:
      return (
        <NotFound/>
      )
  }

}

export default Static