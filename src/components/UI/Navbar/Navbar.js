import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../../../store/actions/auth";

import Logo from "../../../images/manatee.png";
import Search from "./Search";

class Navbar extends Component {
   render() {
      const { isAuthenticated } = this.props.users;
      return (
         <nav className="navbar navbar-expand">
            <div className="container-fluid">
               <div className="navbar-header">
                  <Link to="/" className="navbar-brand">
                     <img src={Logo} alt="Manatee Home" />
                  </Link>
                  <Link to="/clients">Clients</Link>
                  <Link to="/clients/new"> New</Link>
                  <Link to="/inventory"> Inventory</Link>
                  <Link to="/orders"> Orders</Link>
                  <Link to="/admin"> Admin</Link>
                  <Link to="/pricing"> Pricing Program</Link>
               </div>
               <Search />
               <ul className="nav navbar-nav navbar-right">
                  {!isAuthenticated ? (
                     <li>
                        <Link to="/login">Login</Link>
                     </li>
                  ) : (
                     <li>
                        <a onClick={this.props.logout}>Log out</a>
                     </li>
                  )}
               </ul>
            </div>
         </nav>
      );
   }
}

function mapStateToProps(state) {
   return {
      users: state.users
   };
}

export default connect(
   mapStateToProps,
   { logout }
)(Navbar);
