import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Modal from "../UI/Shared/Modal";

import { createClient } from "../../store/actions/clients";

class ClientNew extends Component {
   state = {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      loading: false
   };

   handleChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      });
   };

   handleSubmit = async e => {
      e.preventDefault();
      this.setState({ loading: true });
      const res = await this.props.createClient({
         firstName: this.state.firstName,
         lastName: this.state.lastName,
         phone: this.state.phone,
         email: this.state.email
      });
      this.props.history.push("/clients/" + res.clientID);
   };

   render() {
      const { firstName, lastName, phone, email } = this.state;
      return (
         <Modal open={this.props.open} close={this.props.toggle}>
            <h2 style={{ marginBottom: 20 }}>Add New Client</h2>
            <form className="ui form" onSubmit={this.handleSubmit}>
               <div className="two fields">
                  <div className="field">
                     <label>First Name</label>
                     <input
                        name="firstName"
                        value={firstName}
                        type="text"
                        onChange={this.handleChange}
                     />
                  </div>
                  <div className="field">
                     <label>Last Name</label>
                     <input
                        name="lastName"
                        value={lastName}
                        type="text"
                        onChange={this.handleChange}
                     />
                  </div>
               </div>
               <div className="field">
                  <label>Phone</label>
                  <input
                     name="phone"
                     value={phone}
                     type="number"
                     step="1"
                     min="0"
                     max="9999999999"
                     onChange={this.handleChange}
                  />
               </div>
               <div className="field">
                  <label>Email</label>
                  <input
                     name="email"
                     value={email}
                     type="email"
                     onChange={this.handleChange}
                  />
               </div>
               <button
                  type="submit"
                  className={
                     "ui blue button" + (this.state.loading ? " loading" : "")
                  }
               >
                  Create New Client
               </button>
            </form>
         </Modal>
      );
   }
}

export default withRouter(
   connect(
      null,
      { createClient }
   )(ClientNew)
);
