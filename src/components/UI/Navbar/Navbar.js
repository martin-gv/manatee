import React, { Component } from "react";
import { connect } from "react-redux";
import "./Navbar.css";

import { logout } from "../../../store/actions/auth";

import Search from "./Search";

class Navbar extends Component {
   render() {
      const {
         isAuthenticated,
         currentUser: { username }
      } = this.props.users;
      return (
         <nav className="Navbar navbar navbar-expand">
            <div className="container-fluid">
               <Search />
               {isAuthenticated && (
                  <div>
                     <div className="user">
                        Logged in as{" "}
                        <span className="username">{username}</span>
                     </div>
                     <a className="logout" onClick={this.props.logout}>
                        Log out
                     </a>
                  </div>
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
