import React from 'react'
import Stripe from '../components/Stripe'

import { container } from 'bootstrap-css-modules/css/container.css'
import { row } from 'bootstrap-css-modules/css/row.css'
import { colSm } from 'bootstrap-css-modules/css/columns.css'

const UpgradeScene = () => {
  return(
    <div className={`${container}`}>
      <h1>Upgrade Your Account</h1>
      <div className={`${row}`}>
        <div className={`${colSm}`}>
          <h3>Benefit 1</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac elit elementum, interdum erat in, iaculis orci. Nam feugiat ante a nibh pulvinar, a accumsan elit cursus. Fusce consectetur et tortor ac pharetra. Sed egestas sem quis mattis sodales. Aliquam hendrerit ornare dolor nec lobortis.</p>
        </div>
        <div className={`${colSm}`}>
          <h3>Benefit 2</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac elit elementum, interdum erat in, iaculis orci. Nam feugiat ante a nibh pulvinar, a accumsan elit cursus. Fusce consectetur et tortor ac pharetra. Sed egestas sem quis mattis sodales. Aliquam hendrerit ornare dolor nec lobortis.</p>
        </div>
        <div className={`${colSm}`}>
          <h3>Benefit 3</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac elit elementum, interdum erat in, iaculis orci. Nam feugiat ante a nibh pulvinar, a accumsan elit cursus. Fusce consectetur et tortor ac pharetra. Sed egestas sem quis mattis sodales. Aliquam hendrerit ornare dolor nec lobortis.</p>
        </div>
      </div>
      <Stripe/>
    </div>
  )
}

export default UpgradeScene
