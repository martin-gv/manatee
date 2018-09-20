import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Motion, spring } from "react-motion";
import "./Login.css";

import { authUser } from "../../store/actions/auth";

class Login extends Component {
   state = {
      username: "",
      password: "",
      redirectTo: false,
      animate: false
   };

   componentDidMount() {
      this.setState({ animate: true });
   }

   onChange = e => this.setState({ [e.target.name]: e.target.value });

   onSubmit = e => {
      e.preventDefault();
      const { username, password } = this.state;
      this.props
         .authUser("login", { username, password })
         .then(() => {
            this.setState({ redirectTo: true });
         })
         .catch(() => {
            return;
         });
   };

   render() {
      const { username, password, redirectTo, animate } = this.state;
      const { errors } = this.props;

      const { from } = this.props.location.state || { from: { pathname: "/" } };

      if (redirectTo) return <Redirect to={from} />;

      return (
         <div className="Login">
            <Motion style={{ opacity: spring(animate ? 1 : 0) }}>
               {style => (
                  <div className="card" style={{ opacity: style.opacity }}>
                     <h2>Login</h2>
                     <form
                        className="ui form"
                        onSubmit={this.onSubmit}
                        style={{ marginTop: 20 }}
                     >
                        <div className="field">
                           <label>Username</label>
                           <input
                              name="username"
                              value={username}
                              type="text"
                              onChange={this.onChange}
                           />
                        </div>
                        <div className="field">
                           <label>Password</label>
                           <input
                              name="password"
                              value={password}
                              type="password"
                              onChange={this.onChange}
                           />
                        </div>
                        <button className="ui blue button">Submit</button>
                     </form>
                  </div>
               )}
            </Motion>
         </div>
      );
   }
}

export default connect(
   null,
   { authUser }
)(Login);
