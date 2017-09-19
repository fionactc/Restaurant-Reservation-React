import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from 'rc-calendar';
import moment from 'moment';
import { postReservation } from '../../actions/ReservationActions';

require('./ReserveForm.css');

class ReserveForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newReservationDate: moment()
    }
  }

  disabledDate(current) {
    if (!current) {
      return false;
    }
    const date = moment();
    date.hour(0);
    date.minute(0);
    date.second(0);
    return current.valueOf() < date.valueOf();
  }

  onDateChange(value) {
    this.setState({newReservationDate: value})
  }

  handleReservation=(e)=>{
    e.preventDefault();
    let data = {
      timeslotOptionId: this.refs.timeslot.value,
      customerName: this.props.userName,
      date: this.state.newReservationDate.format("YYYY-MM-DD"),
      noOfPeople: Number(this.refs.noOfPeople.value)
    }
    this.props.postReservation(data);
  }

  renderTimeslotOptions() {
    let options = this.props.timeslotOptions;
    if (options && options.length) {
      return options.map((option)=>{
        return <option value={option.id} key={option.id}>{option.timeslot.time}</option>
      })
    }
  }

  render() {
    return (
      <div className="row book">
        <div className="row">
          <span className="col-xs-12 book-title">Reserve now:</span>
        </div>
        <form className="form-horizontal" onSubmit={this.handleReservation}>
          <div className="form-group">
            <label className="col-sm-2 control-label reserve-label">Timeslot</label>
            <select className="form-control col-sm-5" ref="timeslot">
              {this.renderTimeslotOptions()}
            </select>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label reserve-label">Date</label>
            <div className="col-sm-3">
              <Calendar 
                disabledDate={this.disabledDate}
                onChange={this.onDateChange.bind(this)}
                defaultValue={moment()}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label reserve-label">Persons</label>
            <select className="form-control col-sm-5" ref="noOfPeople">
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-default">
              Submit
            </button>
          </div>
        </form>
      </div>
    )

  }
}

function mapStateToProps(state) {
  return {
    userName: state.auth.userName,
    role: state.auth.role,
  }
}

export default connect(mapStateToProps, { postReservation })(ReserveForm);
