import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getReservations } from '../../actions/ReservationActions';

require('./CustomerAccount.css');

class CustomerAccount extends Component {
  componentDidMount() {
    this.props.getReservations(this.props.userName);
  }

  renderReservations() {
    let reservations = this.props.reservations;
    if (reservations && reservations.length) {
      return reservations.map((reservation)=>{
        return (
            <tr key={reservation.id}>
              <td>{reservation.timeslotOption.restaurant.name}</td>
              <td>{reservation.reserveDate}</td>
              <td>{reservation.timeslotOption.timeslot.time}</td>
              <td>{reservation.noOfPeople}</td>
            </tr>
        )
      })
    }
  }

  render() {
    return (
      <div className="customer-account">
        <h3 className="title col-xs-12">Your bookings</h3>
        <table className="table table-hover">
          <tbody>
            <tr>
              <th>Restaurant</th>
              <th>Date</th>
              <th>Time</th>
              <th>No. of People</th>
            </tr>
            {this.renderReservations()}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    reservations: state.reservation.reservations,
    userName: state.auth.userName
  }
}

export default connect(mapStateToProps, { getReservations })(CustomerAccount);
