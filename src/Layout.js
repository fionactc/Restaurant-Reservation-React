import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Main from './Main';
import Restaurant from './pages/Restaurant/Restaurant';
import RestaurantNew from './pages/RestaurantNew/RestaurantNew';
import OwnerAccount from './pages/OwnerAccount/OwnerAccount';
import CustomerAccount from './pages/CustomerAccount/CustomerAccount';

require('./App.css');


export default class Layout extends Component {
  render() {
    return (
    <div className="layout">
      <Navbar />
      <div>
        <Route path="/" exact component={Main} />
        <Route path="/new-restaurant" exact component={RestaurantNew} />
        <Route path="/update-restaurant/:id" component={RestaurantNew} />
        <Route path="/restaurant/:id" exact component={Restaurant} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/owner" component={OwnerAccount} />
        <Route path="/customer" component={CustomerAccount} />
      </div>
    </div>
    )
  }
}
