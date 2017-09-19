import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchRestaurant } from '../../actions/RestaurantActions';
import RestaurantForm from '../../components/RestaurantForm/RestaurantForm';

require('./RestaurantNew.css');

class RestaurantNew extends Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    if (id)
      this.props.fetchRestaurant(id);
  }
  render() {
    if (this.props.isLogout) return (<Redirect to="/" />)
    if (!this.props.isAuthenticated) return (<Redirect to="/login" />)

    let path = this.props.location.pathname;
    if (path === '/new-restaurant')
      return (<RestaurantForm mode='CREATE' />)
    return (<RestaurantForm mode='UPDATE' id={this.props.match.params.id} />)
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    userName: state.auth.userName,
    role: state.auth.role,
    isLogout: state.auth.isLogout,
  }
}

export default connect(mapStateToProps, { fetchRestaurant })(RestaurantNew);
