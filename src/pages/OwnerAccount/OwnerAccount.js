import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import OwnerRestaurants from './OwnerRestaurants';
import OwnerBookings from './OwnerBookings';

require('./OwnerAccount.css');

export default class OwnerAccount extends Component {
  render() {
    return (
      <div className="owner-account">
        <h3 className="title col-xs-12">Owner Account</h3>
        <Route path="/owner/bookings" component={OwnerBookings} />
        <Route path="/owner/restaurants" component={OwnerRestaurants} />
      </div>
    )
  }
}
