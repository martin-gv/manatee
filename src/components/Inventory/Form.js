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
         <div
            className="card"
            style={{
               width: 275,
               height: "100%",
               marginLeft: 20,
               ...this.props.style
            }}
         >
            <h3>{this.props.item.title || ""}</h3>
            <div>Inventory ID: {inventoryID}</div>
            <form
               className="ui form"
               onSubmit={this.handleSubmit}
               style={{ marginTop: 10 }}
            >
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
               <button
                  className="ui red basic button"
                  onClick={this.handleDeleteButton}
               >
                  <i className="material-icons">delete</i>
                  Delete
               </button>
               <button className="ui green button">
                  <i className="material-icons">save</i>
                  Save
               </button>
            </form>
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
