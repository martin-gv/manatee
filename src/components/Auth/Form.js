import React, { Component } from "react";
import { connect } from "react-redux";

import { authUser } from "../../store/actions/auth";

class AuthForm extends Component {
   state = {
      username: "",
      password: ""
   };

   handleChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      });
   };

   handleSubmit = e => {
      e.preventDefault();
      const { username, password } = this.state;
      this.props
         .authUser("login", { username, password })
         .then(() => {
            this.props.history.push("/clients");
         })
         .catch(() => {
            return;
         });
   };

   render() {
      const { username, password } = this.state;
      const { errors } = this.props;
      return (
         <div className="card">
            <h4 className="card-header">Login</h4>
            <div className="card-body">
               {errors.message && (
                  <div className="alert alert-danger">{errors.message}</div>
               )}
               <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                     <label htmlFor="username">Username</label>
                     <input
                        className="form-control"
                        id="username"
                        name="username"
                        value={username}
                        type="text"
                        onChange={this.handleChange}
                     />
                  </div>
                  <div className="form-group">
                     <label htmlFor="password">Password</label>
                     <input
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        type="password"
                        onChange={this.handleChange}
                     />
                  </div>
                  <button className="btn btn-primary btn-block" type="submit">
                     Submit
                  </button>
               </form>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      errors: state.errors
   };
}

export default connect(
   mapStateToProps,
   { authUser }
)(AuthForm);
