import React from 'react'
import { NavLink } from 'react-router-dom'

import { nav, navItem, navLink } from 'bootstrap-css-modules/css/nav.css'
import { navbar, navbarNav, navbarLight } from 'bootstrap-css-modules/css/navbar.css'
import { containerFluid } from 'bootstrap-css-modules/css/container.css'
import { bgFaded } from 'bootstrap-css-modules/css/background.css'
import { justifyContentEnd } from 'bootstrap-css-modules/css/justify.css'

const Header = (props) => {
  const auth = props.auth

  let headerLinks = auth ? (
    [<NavLink to="/account" className={navLink} activeClassName="active">Account</NavLink>,
    <NavLink to="/logout" className={navLink} >Log Out</NavLink>]
  ) : (
    [<NavLink exact to="/" className={navLink} activeClassName="active">Home</NavLink>,
    <NavLink to="/login" className={navLink} activeClassName="active">Log In</NavLink>,
    <NavLink to="/signup" className={navLink} activeClassName="active">Sign Up</NavLink>]
  )

  headerLinks = headerLinks.map((headerLink, index) => {
    return(
      <li className={navItem} key={index}>{headerLink}</li>
    )
  })


  return (
    <header>
      <nav className={`${navbar} ${navbarLight} ${bgFaded}`}>
        <ul className={`${nav} ${justifyContentEnd}`}>
          {headerLinks}
        </ul>
      </nav>
    </header>
  )
}

export default Header
