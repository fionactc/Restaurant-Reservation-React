import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class OwnerNav extends Component {
  render() {
    return (
      <ul className="nav nav-tabs">
        <li role="presentation" className={this.props.location.pathname==='/owner/restaurants' ? 'active' : ''}>
          <Link to="/owner/restaurants">Restaurants</Link>
        </li>
        <li role="presentation" className={this.props.location.pathname==='/owner/bookings' ? 'active' : ''}>
          <Link to="/owner/bookings">Bookings</Link>
        </li>
      </ul>
    )
  }
}
