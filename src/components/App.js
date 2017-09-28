import React from 'react'
import HeaderContainer from '../containers/HeaderContainer'
import MainContainer from '../containers/MainContainer'

export default class App extends React.Component {

  render() {
    return (
      <div>
        <HeaderContainer />
        <MainContainer />
      </div>
    )
  }

}
