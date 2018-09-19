import React from "react";
import Select from "react-select";
import Big from "big.js";

import InventoryItem from "./Detail/InventoryItem";
import AddItemModal from "./Detail/AddItemModal";

class OrderRowDetail extends React.Component {
   state = {
      form: ["title"]
   };

   componentDidUpdate(prevProps) {
      this.checkPriceUpdate(prevProps);
   }

   checkPriceUpdate = prevProps => {
      const prev = prevProps.row.price;
      const current = this.props.row.price;
      if (prev !== current) {
         this.props.updateTotal();
      }
   };

   handleSubmit = e => {
      // not working?
      // e.preventDefault;
   };

   render() {
      const {
         row,
         onRowChange,
         addItem,
         removeItem,
         modal,
         isVoid
      } = this.props;
      const { price, itemPrice, framingRewards } = row;

      const id = row._id;
      const rowFound = Object.keys(row).length > 0;

      const rowTotal = Big(price || 0)
         .plus(Big(itemPrice || 0))
         .toString();

      const fields = this.state.form.map(el => (
         <div className="form-group" key={el}>
            <label>{el}</label>
            <input
               className="form-control"
               name={el}
               type="text"
               disabled={!rowFound || isVoid}
               value={row[el] || ""}
               onChange={e => onRowChange(id, e.target.name, e.target.value)}
            />
         </div>
      ));

      return (
         <div className="section">
            <div className="ui grid">
               <div className="six wide column">
                  <form onSubmit={this.handleSubmit} className="ui form">
                     {fields}
                     <div className="field">
                        <label>Quantity</label>
                        <input
                           name="quantity"
                           type="number"
                           min="1"
                           step="1"
                           disabled={!rowFound || isVoid}
                           value={row.quantity || ""}
                           onChange={e =>
                              onRowChange(id, e.target.name, e.target.value)
                           }
                        />
                     </div>
                     <div className="field">
                        <label>Price</label>
                        <input
                           name="price"
                           type="number"
                           min="0"
                           step="0.01"
                           disabled={!rowFound || isVoid}
                           value={row.price || ""}
                           onChange={e =>
                              onRowChange(id, e.target.name, e.target.value)
                           }
                        />
                     </div>
                     <div className="field">
                        <label>Height</label>
                        <input
                           name="height"
                           type="number"
                           min="0"
                           disabled={!rowFound || isVoid}
                           value={row.height || ""}
                           onChange={e =>
                              onRowChange(id, e.target.name, e.target.value)
                           }
                        />
                     </div>
                     <div className="field">
                        <label>Width</label>
                        <input
                           name="width"
                           type="number"
                           min="0"
                           disabled={!rowFound || isVoid}
                           value={row.width || ""}
                           onChange={e =>
                              onRowChange(id, e.target.name, e.target.value)
                           }
                        />
                     </div>
                  </form>
               </div>
               <div className="five wide column">
                  <div className="form-group">
                     <label>Glass</label>
                     <Select
                        disabled={!rowFound || isVoid}
                        options={this.props.glassOptions}
                        onChange={e =>
                           onRowChange(id, "glass", e ? e.value : null)
                        }
                        value={row.glass}
                     />
                  </div>
                  <div className="form-group">
                     <label>Mount</label>
                     <Select
                        disabled={!rowFound || isVoid}
                        options={this.props.mountOptions}
                        onChange={e =>
                           onRowChange(id, "mount", e ? e.value : null)
                        }
                        value={row.mount}
                     />
                  </div>
                  <div className="ui checkbox">
                     <input
                        type="checkbox"
                        name="framingRewards"
                        checked={framingRewards || ""}
                        onChange={e =>
                           onRowChange(id, e.target.name, e.target.checked)
                        }
                        disabled={!rowFound || isVoid}
                     />
                     <label>Framing Rewards</label>
                  </div>
               </div>
               <div className="five wide column">
                  <InventoryItem {...row.inventoryItem} />
               </div>
            </div>
            <div style={{ marginTop: 30 }}>
               Row #{row && row.rowNum} <strong>Total: ${rowTotal}</strong>
               <div style={{ float: "right" }}>
                  <button
                     className="ui basic blue button"
                     onClick={() => this.props.toggleModal("item")}
                     disabled={row.inventoryItem || isVoid}
                  >
                     Add Item
                  </button>
                  <button
                     className="ui basic red button"
                     onClick={removeItem}
                     disabled={!row.inventoryItem || isVoid}
                  >
                     Remove Item
                  </button>
                  <button
                     className="ui basic green button"
                     onClick={() => this.props.saveRowButton(row)}
                     disabled={isVoid}
                  >
                     Save Row
                  </button>
                  <button
                     className="ui basic red button"
                     onClick={() => this.props.deleteRowButton(id)}
                     disabled={isVoid}
                  >
                     Delete
                  </button>
               </div>
            </div>
            <AddItemModal
               isOpen={modal.item}
               toggle={() => this.props.toggleModal("item")}
               submit={addItem}
            />
         </div>
      );
   }
}

export default OrderRowDetail;
