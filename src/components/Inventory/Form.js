import React from "react";
import { connect } from "react-redux";
import { Motion, spring } from "react-motion";

import {
   updateInventory,
   deleteInventory,
   inventoryTextInputChange
} from "../../store/actions/inventory";

class InventoryForm extends React.Component {
   state = {
      formData: {
         artist: "Artist",
         title: "Title",
         medium: "Medium",
         type: "Type"
      },
      show: true
   };

   componentDidUpdate(prevProps) {
      const prev = prevProps.selectedItemID;
      const current = this.props.selectedItemID;
      if (prev !== null && current !== null && prev !== current) {
         this.setState({ show: false });
         setTimeout(() => {
            this.setState({ show: true });
         }, 175);
      }
   }

   handleChange = e => {
      this.props.inventoryTextInputChange(e, this.props.item.inventoryID);
   };

   handleSubmit = e => {
      e.preventDefault();
      this.props.updateInventory(this.props.item);
   };

   handleDeleteButton = async () => {
      await this.props.deleteInventory(this.props.item.inventoryID);
      this.props.closePanel();
   };

   render() {
      const { inventoryID, title, price } = this.props.item;
      const { formData } = this.state;

      const fields = Object.keys(formData).map(field => (
         <div className="field" key={field}>
            <label>{formData[field]}</label>
            <input
               name={field}
               type="text"
               disabled={!this.props.item}
               value={this.props.item[field] || ""}
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
            <Motion style={{ opacity: spring(this.state.show ? 1 : 0) }}>
               {style => (
                  <div style={{ opacity: style.opacity }}>
                     <i
                        className="material-icons"
                        onClick={this.props.closePanel}
                        style={{
                           color: "#d4d4d4",
                           fontSize: 26,
                           position: "absolute",
                           top: 7,
                           left: 232,
                           cursor: "pointer",
                           padding: 5
                        }}
                     >
                        close
                     </i>
                     <h3 style={{ marginTop: 20 }}>{title || ""}</h3>
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
                        <button style={{ display: "none" }} />
                     </form>
                     <div style={{ marginTop: 20 }}>
                        <button
                           className="ui red basic button"
                           onClick={this.handleDeleteButton}
                        >
                           <i className="material-icons">delete</i>
                           Delete
                        </button>
                        <button
                           className="ui green button"
                           onClick={this.handleSubmit}
                        >
                           <i className="material-icons">save</i>
                           Save
                        </button>
                     </div>
                  </div>
               )}
            </Motion>
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
