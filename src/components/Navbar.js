import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { logoutUser } from '../actions/index';

class Navbar extends Component {

  handleLogout= (e)=>{
    e.preventDefault();
    this.props.logoutUser();
  }

  componentWillReceiveProps(props) {
    console.log('this is props', props);
  }

  render() {
    const { isAuthenticated, isFetching } = this.props;

    return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to="/">Restaurant Reservation</Link>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            { isAuthenticated && this.props.role === 'OWNER' && 
                <li>
                  <Link to="/new-restaurant">New Restaurant</Link>
                </li>
            }
            { isAuthenticated && this.props.role === 'OWNER' && 
                <li>
                  <Link to="/owner/restaurants">Account</Link>
                </li>
            }
            { isAuthenticated && this.props.role === 'CUSTOMER' && 
                <li>
                  <Link to="/customer">Account</Link>
                </li>
            }
            { !isAuthenticated && 
                <li>
                  <Link to="/login">Login</Link>
                </li>
            }
            { !isAuthenticated && 
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
            }
            { isAuthenticated &&
                <li>
                  <a href="#" onClick={this.handleLogout}> Logout </a>
                </li>
            }
          </ul>
        </div>
      </div>
    </nav>
    )
  }
}

function mapStateToProps(state) {
  const { isAuthenticated, isFetching } = state.auth;
  return { 
    isAuthenticated,
    isFetching,
    userName: state.auth.userName,
    role: state.auth.role
  }
}

export default connect(mapStateToProps, { logoutUser })(Navbar);
