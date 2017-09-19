import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchRestaurant, postRestaurant } from '../../actions/RestaurantActions';

const TIMESLOTS = [
  { id: '1', value: '12:00-13:00' },
  { id: '2', value: '13:00-14:00' },
  { id: '3', value: '19:00-20:00' },
  { id: '4', value: '20:00-21:00' }
]

class RestaurantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeslots: {
        '1': true,
        '2': false,
        '3': false,
        '4': false
      }
    }
  }

  componentDidMount() {
    if (this.props.mode==='UPDATE' && this.props.id) {
      this.props.fetchRestaurant(this.props.id);
    }
  }

  componentWillReceiveProps(props) {
    // if update
    let restaurant = this.props.restaurant;
    if (restaurant) {
      this.refs.name.value = restaurant.name;
      this.refs.address.value = restaurant.address;
      this.refs.capacity.value = restaurant.capacity;
    }
  }

  handleSubmit = (e)=>{
    e.preventDefault();
    let data = {
      name: this.refs.name.value,
      ownerName: this.props.userName,
      address: this.refs.address.value,
      capacity: this.refs.capacity.value
    }

    if (this.props.mode === 'CREATE') {
      let keys = Object.keys(this.state.timeslots);
      let timeslots = keys.filter((key)=> this.state.timeslots[key]);
      data.timeslots = timeslots;
    }

    if (this.props.mode === 'UPDATE') {
      data.id = this.props.restaurant.id;
      data.timeslots = this.props.restaurant.timeslots;
    } 
    this.props.postRestaurant(data);
  }

  handleCheckbox = (e, id)=>{
    let timeslots = {...this.state.timeslots};
    timeslots[id] = !timeslots[id];
    this.setState({timeslots})
  }

  renderCheckboxes = ()=>{
    return TIMESLOTS.map((timeslot)=>{
      const id = timeslot.id
      return (
        <div className={'checkbox col-sm-3 ' + (id==='3' ? 'col-sm-offset-2' : '')} key={id}>
          <label>
            <input type="checkbox" name="timeslot" 
              checked={this.state.timeslots[id]}
              onChange={  (e)=>this.handleCheckbox(e, id)} />
            {timeslot.value}
          </label>
        </div>
      )
    })
  }

  render() {
    const mode = this.props.mode;
    if (this.props.isFormSubmitted) {
      return <Redirect to ="/owner/restaurants" />
    }
    return (
      <div className="restaurant-new">
        <div className="row">
          <h3 className="title col-xs-12">{ mode === 'CREATE' ? 'New' : 'Update' } restaurant</h3>
        </div>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="col-sm-2 control-label">Name</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="restName" placeholder="Restaurant Name" ref="name" />
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">Address</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="restAddress" placeholder="Restaurant Address" ref="address" />
            </div>
          </div>


          { mode === 'CREATE' &&
              <div className="row timeslot-options">
                <label className="col-sm-2 control-label">Timeslots</label>
                {this.renderCheckboxes()}
              </div>
          }

          <div className="form-group">
            <label className="col-sm-2 control-label">Capacity</label>
            <div className="col-sm-10">
              <input type="number" className="form-control" id="capacity" placeholder="Number of person per timeslot" ref="capacity" />
            </div>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-default col-sm-offset-2">
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
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    userName: state.auth.userName,
    role: state.auth.role,
    isLogout: state.auth.isLogout,
    restaurant: state.restaurant.restaurant,
    isFormSubmitted: state.restaurant.isFormSubmitted
  }
}

export default connect(mapStateToProps, { fetchRestaurant, postRestaurant })(RestaurantForm);
