import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOwnerReservations } from '../../actions/ReservationActions';
import OwnerNav from '../../components/OwnerNav/OwnerNav';

class OwnerBookings extends Component {
  componentDidMount() {
    this.props.getOwnerReservations(this.props.userName);
  }

  renderBookings() {
    let reservations = this.props.ownerReservations;
    if (reservations && reservations.length) {
      return reservations.map((res)=>{
        return (
          <tr key={res.id}>
            <td>{res.timeslotOption.restaurant.name}</td>
            <td>{res.reserveDate}</td>
            <td>{res.timeslotOption.timeslot.time}</td>
            <td>{res.noOfPeople}</td>
            <td>{res.user.firstName} {res.user.lastName}</td>
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
              <th>Restaurant</th>
              <th>Date</th>
              <th>Timeslot</th>
              <th>No. of People</th>
              <th>Customer</th>
            </tr>
            {this.renderBookings()}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userName: state.auth.userName,
    ownerReservations: state.reservation.ownerReservations
  }
}

export default connect(mapStateToProps, { getOwnerReservations })(OwnerBookings);
