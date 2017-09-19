import React, { Component } from 'react';
import OwnerNav from '../../components/OwnerNav/OwnerNav';
import { connect } from 'react-redux';
import { fetchOwnerRestaurants, deleteRestaurant } from '../../actions/RestaurantActions';

class OwnerRestaurants extends Component {
  componentDidMount() {
    this.props.fetchOwnerRestaurants(this.props.userName);
  }

  editRestaurant(e, id) {
    this.props.history.push('/update-restaurant/' + id);
  }

  deleteRestaurant=(id)=> {
    this.props.deleteRestaurant(id);
  }

  renderRestaurants() {
    let restaurants = this.props.ownerRestaurants;
    if (restaurants && restaurants.length) {
      return restaurants.map((restaurant)=>{
        return (
          <tr key={restaurant.id}>
            <td>{restaurant.id}</td>
            <td>{restaurant.name}</td>
            <td>{restaurant.avgRating} star{restaurant.avgRating>1 ? 's' : ''} ({restaurant.reviews.length} review{restaurant.reviews.length>1?'s':''})</td>
            <td>{restaurant.address}</td>
            <td>
              <button className="btn btn-default" onClick={(e)=>this.editRestaurant(e, restaurant.id)}>Edit</button>
              <button className="btn btn-default" onClick={()=>this.deleteRestaurant(restaurant.id)}>Delete</button>
            </td>
          </tr>
        )
      })
    }
  }

  render() {
    return (
      <div>
        <OwnerNav location={this.props.location} />
        <table className="table table-hover">
          <tbody>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Rating</th>
              <th>Address</th>
              <th></th>
            </tr>
            {this.renderRestaurants()}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userName: state.auth.userName,
    ownerRestaurants: state.restaurant.ownerRestaurants
  }
}

export default connect(mapStateToProps, { fetchOwnerRestaurants, deleteRestaurant })(OwnerRestaurants);
