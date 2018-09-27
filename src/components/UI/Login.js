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
      const { from } = this.props.location.state || { from: { pathname: "/" } };

      if (redirectTo) return <Redirect to={from} />;

      return (
         <div className="Login">
            <Motion style={{ opacity: spring(animate ? 1 : 0) }}>
               {style => (
                  <div className="card" style={{ opacity: style.opacity }}>
                     <h2 style={{ marginBottom: 10 }}>Login</h2>
                     <form
                        className="ui form"
                        onSubmit={this.onSubmit}
                        style={{ marginTop: 10 }}
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
                     {this.props.message ? (
                        <div
                           style={{
                              padding: "10px 0",
                              color: "#c43f3f",
                              fontWeight: "bold"
                           }}
                        >
                           {this.props.message}
                        </div>
                     ) : null}
                  </div>
               )}
            </Motion>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      message: state.errors.message
   };
}

export default connect(
   mapStateToProps,
   { authUser }
)(Login);
