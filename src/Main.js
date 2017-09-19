import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRestaurants } from './actions/RestaurantActions';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [
        { img: '../1.jpg', title: 'Tim Ho Wan' },
        { img: '../2.jpg', title: 'Kam Wah Cafe' },
        { img: '../3.jpg', title: 'Woflgang Steakhouse' },
        { img: '../4.jpg', title: 'Ho Lee Fook' },
        { img: '../5.jpg', title: 'Jaspas' },
        { img: '../6.jpg', title: 'One Dim Sum' },
      ]
    }

  }

  componentDidMount() {
    this.props.fetchRestaurants();
  }

  selectRestaurant(e, id) {
    this.props.history.push('/restaurant/' + id)
  }

  renderRestaurants = ()=>{
    let restaurants = this.props.restaurants;
    if (!!restaurants && restaurants.length) {

      return restaurants.map((restaurant)=>{
        return (
          <tr className="restaurant-row" key={restaurant.id} onClick={(e)=>this.selectRestaurant(e, restaurant.id)}>
            <td>{restaurant.id}</td>
            <td>{restaurant.name}</td>
            <td>{restaurant.avgRating} star{restaurant.avgRating>1 ? 's' : ''} ({restaurant.reviews.length} review{restaurant.reviews.length>1?'s':''})</td>
            <td>{restaurant.address}</td>
          </tr>
        )
      })
    }
  }

  render() {
    return (
      <div className="main">
        <h3>Book a restaurant</h3>
        <table className="table table-hover">
          <tbody>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Rating</th>
              <th>Address</th>
            </tr>
            {this.renderRestaurants()}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let restaurants = state.restaurant.restaurants;
  return {
    restaurants,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, { fetchRestaurants })(Main);
// <form className="form-inline">
//   <div className="form-group">
//     <input type="text" className="form-control" id="search" placeholder="restaurant name, types" />
//   </div>
//   <div className="form-group">
//     <select className="form-control">
//       <option value="" disabled>Timeslot</option>
//       <option value="Lunch">Lunch</option>
//       <option value="Dinner">Dinner</option>
//     </select>
//   </div>
//   <button type="submit" className="btn btn-primary">Search</button>
// </form>
