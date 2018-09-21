import React, { Component } from "react";
import { connect } from "react-redux";

import { logout } from "../../../store/actions/auth";

import Search from "./Search";

class Navbar extends Component {
   render() {
      const {
         isAuthenticated,
         currentUser: { username }
      } = this.props.users;
      return (
         <nav className="navbar navbar-expand">
            <div className="container-fluid">
               <Search />
               {isAuthenticated && (
                  <a className="logout" onClick={this.props.logout}>
                     Log out
                  </a>
               )}
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
