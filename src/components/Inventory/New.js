import React from "react";
import { connect } from "react-redux";

import { createInventoryItem } from "../../store/actions/inventory";

class InventoryNew extends React.Component {
   state = {
      data: {
         artist: "",
         title: "",
         medium: "",
         type: ""
      }
   };

   handleChange = e => {
      const data = {
         ...this.state.data,
         [e.target.name]: e.target.value
      };
      this.setState({ data });
   };

   handleSubmit = e => {
      e.preventDefault();
      this.props.createInventoryItem(this.state.data);

      const fields = Object.keys(this.state.data);
      let data = {};
      for (let f of fields) {
         data = { ...data, [f]: "" };
      }

      this.setState({ data });
   };

   render() {
      const fields = Object.keys(this.state.data).map(el => (
         <div className="form-group" key={el}>
            <label htmlFor={el}>{el}</label>
            <input
               className="form-control"
               id={el}
               name={el}
               value={this.state.data[el]}
               type="text"
               onChange={this.handleChange}
            />
         </div>
      ));

      return (
         <div className="card">
            <div className="card-header">Add to Inventory</div>
            <div className="card-body">
               <form onSubmit={this.handleSubmit}>
                  {fields}
                  <button className="btn btn-primary">Add to Inventory</button>
               </form>
            </div>
         </div>
      );
   }
}

export default connect(
   null,
   { createInventoryItem }
)(InventoryNew);
