import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Modal from "../UI/Shared/Modal";

import { createCompany } from "../../store/actions/companies";

class ClientNew extends Component {
   state = {
      name: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
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
      const res = await this.props.createCompany({
         name: this.state.name,
         address: this.state.address,
         city: this.state.city,
         province: this.state.province,
         postalCode: this.state.postalCode
      });
      this.props.history.push("/companies/" + res.companyID);
   };

   render() {
      return (
         <Modal open={this.props.open} close={this.props.toggle}>
            <h2 style={{ marginBottom: 20 }}>Add New Company</h2>
            <form className="ui form" onSubmit={this.handleSubmit}>
               <div className="field">
                  <label>Company Name</label>
                  <input
                     name="name"
                     value={this.state.name}
                     type="text"
                     onChange={this.handleChange}
                  />
               </div>
               <div className="field">
                  <label>Address</label>
                  <input
                     name="address"
                     value={this.state.address}
                     type="text"
                     onChange={this.handleChange}
                  />
               </div>
               <div className="field">
                  <label>City</label>
                  <input
                     name="city"
                     value={this.state.city}
                     type="text"
                     onChange={this.handleChange}
                  />
               </div>
               <div className="field">
                  <label>Province</label>
                  <input
                     name="province"
                     value={this.state.province}
                     type="text"
                     onChange={this.handleChange}
                  />
               </div>
               <div className="field">
                  <label>Postal Code</label>
                  <input
                     name="postalCode"
                     value={this.state.postalCode}
                     type="text"
                     onChange={this.handleChange}
                  />
               </div>
               <button
                  type="submit"
                  className={
                     "ui blue button" + (this.state.loading ? " loading" : "")
                  }
               >
                  Create New Company
               </button>
            </form>
         </Modal>
      );
   }
}

export default withRouter(
   connect(
      null,
      { createCompany }
   )(ClientNew)
);
