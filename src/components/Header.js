import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = (props) => {
  const auth = props.auth

  let headerLinks = auth ? (
    [<NavLink to="/bucket" activeClassName="active">Bucket</NavLink>,
    <NavLink to="/account" activeClassName="active">Account</NavLink>,
    <NavLink to="/logout">Log Out</NavLink>]
  ) : (
    [<NavLink exact to="/" activeClassName="active">Home</NavLink>,
    <NavLink to="/login" activeClassName="active">Log In</NavLink>,
    <NavLink to="/signup" activeClassName="active">Sign Up</NavLink>]
  )

  headerLinks = headerLinks.map((headerLink, index) => {
    return(
      <li key={index}>{headerLink}</li>
    )
  })


  return (
    <header>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <ul className="nav navbar-nav navbar-right">
            {headerLinks}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header