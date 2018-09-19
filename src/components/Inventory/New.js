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
         <div
            className="card"
            style={{
               width: 225,
               marginRight: 20,
               ...this.props.style
            }}
         >
            <h3>Add to Inventory</h3>
            <form onSubmit={this.handleSubmit} style={{ marginTop: 10 }}>
               {fields}
               <button className="ui blue button">Add to Inventory</button>
            </form>
         </div>
      );
   }
}

export default connect(
   null,
   { createInventoryItem }
)(InventoryNew);
