import React from "react";
import { connect } from "react-redux";

import {
   updateInventory,
   deleteInventory,
   inventoryTextInputChange
} from "../../store/actions/inventory";

class InventoryForm extends React.Component {
   state = {
      formData: {
         artist: "",
         title: "",
         medium: "",
         type: ""
      }
   };

   handleChange = e => {
      this.props.inventoryTextInputChange(e, this.props.item.inventoryID);
   };

   handleSubmit = e => {
      e.preventDefault();
      this.props.updateInventory(this.props.item);
   };

   handleDeleteButton = () => {
      // this.props.closePanel();
      this.props.deleteInventory(this.props.item.inventoryID);
   };

   render() {
      const { inventoryID, price } = this.props.item;

      const fields = Object.keys(this.state.formData).map(el => (
         <div className="form-group" key={el}>
            <label htmlFor={el}>{el}</label>
            <input
               className="form-control"
               id={el}
               name={el}
               type="text"
               disabled={!this.props.item}
               value={this.props.item ? this.props.item[el] : ""}
               onChange={this.handleChange}
            />
         </div>
      ));

      return (
         <div className="card">
            <div className="card-header">
               Inventory Form
               <button
                  className="btn btn-danger float-right"
                  onClick={this.handleDeleteButton}
               >
                  Delete
               </button>
            </div>
            <div className="card-body">
               <form className="ui form" onSubmit={this.handleSubmit}>
               <div>Inventory ID: {inventoryID}</div>
                  {fields}
                  <div className="field">
                     <label>Price</label>
                     <input
                        id="price"
                        name="price"
                        type="Number"
                        disabled={!this.props.item}
                        value={price || ""}
                        onChange={this.handleChange}
                     />
                  </div>
                  <button className="btn btn-success">Save</button>
               </form>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state, ownProps) {
   const item = state.inventory.find(
      i => i.inventoryID === ownProps.selectedItemID
   );
   return { item: { ...item } };
}

export default connect(
   mapStateToProps,
   { updateInventory, deleteInventory, inventoryTextInputChange }
)(InventoryForm);
