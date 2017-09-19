import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../../actions';
require('./Login.css');

class Login extends Component {
  handleSubmit = (e)=>{
    e.preventDefault();
    let creds = {
      username: this.refs.username.value,
      password: this.refs.password.value
    }
    this.props.loginUser(creds);
  }

  render() {
    if (this.props.isAuthenticated) {
      if (this.props.role === 'CUSTOMER') {
        return <Redirect to="/customer" />
      }
      return <Redirect to="/owner/restaurants" />
    }
    return (
      <div className="login">
        <h1 className="title">Login</h1>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="col-sm-2 control-label">Username</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" 
                id="username" placeholder="Username" ref="username"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" 
                id="password" placeholder="Password" ref="password"/>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default">Log in</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    role: state.auth.role
  }
}

export default connect(mapStateToProps, { loginUser })(Login);
