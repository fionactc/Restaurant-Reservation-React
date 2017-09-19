import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';
import axios from 'axios';
require('./Signup.css');

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roleId: 1,
      error: ''
    }
  }

  handleSubmit = (e)=>{
    e.preventDefault();

    let data = {
      userName: this.refs.username.value,
      password: this.refs.password.value,
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      role: { id: this.state.roleId }
    }

    axios.post('http://localhost:8080/api-docs/register', data)
      .then((resp)=>{
        if (typeof resp.data === 'string')
          this.setState({ error: resp.data });
        else {
          this.props.loginUser({
            username: this.refs.username.value,
            password: this.refs.password.value
          })
        }
      })
      .catch((err)=>{
        console.log(err.response); 
      })
  }

  onRadioChange = (e)=>{
    this.setState({ roleId: e.target.value })
  }

  render() {
    if (this.props.isAuthenticated) 
      return <Redirect to="/" />
      
    return (
      <div className="signup">
        <h1 className="title">Signup</h1>
        <p className="error" style={{textAlign: 'center'}}>{this.state.error}</p>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="col-sm-3 control-label">Username</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="username" placeholder="Username" ref="username" />
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-3 control-label">Password</label>
            <div className="col-sm-9">
              <input type="password" className="form-control" id="password" placeholder="Password" ref="password" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">First name</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="first_name" placeholder="First name" ref="firstName" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">Last name</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="last_name" placeholder="Last name" ref="lastName" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">Type</label>
            <div className="radio col-sm-4">
              <label>
                <input 
                  type="radio" 
                  name="role" 
                  value="1" 
                  onChange={this.onRadioChange}/> Restaurant Owner
              </label>
            </div>
            <div className="col-sm-4 radio">
              <label>
                <input 
                  type="radio" 
                  name="role" 
                  value="2" 
                  onChange={this.onRadioChange}/> Customer
              </label>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-3 col-sm-9">
              <button type="submit" className="btn btn-default">Signup</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, { loginUser })(Signup);
