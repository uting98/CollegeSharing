import React from "react";
import { 
    Link,
    NavLink
  } from 'react-router-dom';
import cookie from "react-cookies";
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';


class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: cookie.load('token')
    }

    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    cookie.remove("token");
    cookie.remove("username");
    console.log(cookie.load('token'))
    window.location.reload()
  }

  render() {
    const isAuthenticated = cookie.load("token");
    // console.log("isAuth = " + isAuthenticated);
    return (
      <nav className="navbar navbar-expand-sm navbar-light shadow mb-3" style={{backgroundColor: '#9fe5ff'}}>
        
        <Link className="navbar-brand" to="/">
          <LocalLibraryOutlinedIcon style={{color:'#ff7e52'}}/>
          College Sharing
          <LocalLibraryOutlinedIcon style={{color:'#ff7e52'}}/>
        </Link>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/productSubmission">
              Add Product
            </NavLink>
          </li>
          <li className="nav-item">
          <NavLink className="nav-link" exact to="/accountPage">
            My Account
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/about" >
            About Us
          </NavLink>
        </li>
        </ul>
        {isAuthenticated ? (
          <>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  onClick={this.handleLogout}
                  exact
                  to="/"
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/signup">
                  Signup
                </NavLink>
              </li>
            </ul>
          </>
        )}
      </nav>
    );
  }
}

export default Navigation;
