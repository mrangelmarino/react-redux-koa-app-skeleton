import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import LoginScene from '../../scenes/Login'
import SignupScene from '../../scenes/Signup'
import Static from '../Static'
import LogOut from '../LogOut'
import ConfirmScene from '../../scenes/Confirm'
import ResetPasswordScene from '../../scenes/ResetPassword'

const Main = (props) => {
  const auth = props.auth

  return(
    <main>
      <Switch>

        <Route exact path="/login" render={() => (
          !auth ? (
            <LoginScene />
          ) : (
            <Redirect to="/"/>
          )
        )}/>

        <Route exact path="/signup" render={() => (
          !auth ? (
            <SignupScene />
          ) : (
            <Redirect to="/"/>
          )
        )}/>

        <Route exact path="/logout" component={LogOut}/>

        <Route exact path="/confirm/:confirmation" component={ConfirmScene} />

        <Route exact path="/confirm" component={ConfirmScene} />

        <Route exact path="/reset/:resetCode" component={ResetPasswordScene} />

        <Route exact path="/reset" component={ResetPasswordScene} />

        <Route path="/(.*)/" component={Static} />

      </Switch>
    </main>
  )
}

export default Main