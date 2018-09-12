import React, { Component } from "react";
import { connect } from "react-redux";

import { createClient } from "../../store/actions/clients";

class ClientNew extends Component {
   state = {
      clientId: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: ""
   };

   handleChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      });
   };

   handleSubmit = e => {
      e.preventDefault();
      this.props
         .createClient({
            ...this.state
         })
         .then(() => {
            this.props.history.push("/clients");
         })
         .catch(() => {
            return;
         });
   };

   render() {
      const { clientId, firstName, lastName, phone, email } = this.state;
      return (
         <form onSubmit={this.handleSubmit}>
            <div className="form-group">
               <label htmlFor="clientId">clientId</label>
               <input
                  className="form-control"
                  id="clientId"
                  name="clientId"
                  value={clientId}
                  type="text"
                  onChange={this.handleChange}
               />
            </div>
            <div className="form-group">
               <label htmlFor="firstName">firstName</label>
               <input
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  type="text"
                  onChange={this.handleChange}
               />
            </div>
            <div className="form-group">
               <label htmlFor="lastName">lastName</label>
               <input
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  type="text"
                  onChange={this.handleChange}
               />
            </div>
            <div className="form-group">
               <label htmlFor="phone">phone</label>
               <input
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={phone}
                  type="number"
                  step="1"
                  min="0"
                  max="9999999999"
                  onChange={this.handleChange}
               />
            </div>
            <div className="form-group">
               <label htmlFor="email">email</label>
               <input
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  type="email"
                  onChange={this.handleChange}
               />
            </div>
            <button type="submit" className="btn btn-primary">
               Submit
            </button>
         </form>
      );
   }
}

export default connect(
   null,
   { createClient }
)(ClientNew);
