import React from "react";
import Select from "react-select";
import Big from "big.js";
import "./RowDetail.css";

import InventoryItem from "./Detail/InventoryItem";
import AddItemModal from "./Detail/AddItemModal";

class OrderRowDetail extends React.Component {
   state = {
      form: [
         { name: "frame", label: "Frame" },
         { name: "mat", label: "Mats" },
         { name: "glass", label: "Glass" },
         { name: "mount", label: "Mount" },
         { name: "frameSupplier", label: "Frame Supplier" },
         { name: "specialInstructions", label: "Special Instructions" }
      ]
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
         isVoid,
         glassOptions,
         mountOptions
      } = this.props;
      const { price, itemPrice, framingRewards } = row;

      const id = row._id;
      const rowFound = Object.keys(row).length > 0;

      const rowTotal = Big(price || 0)
         .plus(Big(itemPrice || 0))
         .toString();

      const framingFields = this.state.form.map(el => (
         <div className="field" key={el.name}>
            <label>{el.label}</label>
            <input
               type="text"
               name={el.name}
               value={row[el.name] || ""}
               disabled={!rowFound || isVoid}
               onChange={e => onRowChange(id, e.target.name, e.target.value)}
            />
         </div>
      ));

      const glassObject = glassOptions.find(
         option => option.value === row.glass
      );
      let glassLabel;
      if (glassObject) glassLabel = glassObject.label;

      const mountObject = mountOptions.find(
         option => option.value === row.mount
      );
      let mountLabel;
      if (mountObject) mountLabel = mountObject.label;

      return (
         <div className="section RowDetail" style={{ marginTop: -10 }}>
            <div className="ui grid">
               <div className="sixteen wide column">
                  <h3>Row #{row.rowNum}</h3>
               </div>
               <div className="five wide column">
                  <form onSubmit={this.handleSubmit} className="ui form">
                     <div className="field">
                        <label>Quantity</label>
                        <input
                           name="quantity"
                           type="number"
                           min="1"
                           step="1"
                           // disabled={!rowFound || isVoid}
                           value={row.quantity || ""}
                           onChange={e =>
                              onRowChange(id, e.target.name, e.target.value)
                           }
                           disabled
                        />
                     </div>
                     <div className="field">
                        <label>Title</label>
                        <input
                           type="text"
                           name="title"
                           value={row.title || ""}
                           disabled={!rowFound || isVoid}
                           onChange={e =>
                              onRowChange(id, e.target.name, e.target.value)
                           }
                        />
                     </div>
                     <div className="two fields">
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
                     </div>
                  </form>
               </div>
               <div className="five wide column">
                  <form className="ui form">
                     {framingFields.slice(0, 2)}
                     <div className="field">
                        <label>Glass</label>

                        <Select
                           value={{ label: glassLabel, value: row.glass }}
                           onChange={e => {
                              onRowChange(
                                 id,
                                 "glass",
                                 e.value ? e.value : null
                              );
                           }}
                           options={this.props.glassOptions}
                           disabled={!rowFound || isVoid}
                           classNamePrefix="Select"
                        />
                     </div>
                  </form>
               </div>
               <div className="six wide column">
                  <form className="ui form">
                     <div className="field">
                        <label>Mount</label>
                        <Select
                           value={{ label: mountLabel, value: row.mount }}
                           onChange={e => {
                              onRowChange(
                                 id,
                                 "mount",
                                 e.value ? e.value : null
                              );
                           }}
                           options={this.props.mountOptions}
                           disabled={!rowFound || isVoid}
                           classNamePrefix="Select"
                        />
                     </div>
                     {framingFields.slice(4)}
                  </form>
               </div>
               <div className="ten wide column" style={{ paddingTop: 0 }}>
                  <InventoryItem
                     {...row.inventoryItem}
                     isVoid={isVoid}
                     toggle={() => this.props.toggleModal("item")}
                     removeItem={removeItem}
                  />
               </div>
               <div className="six wide column" style={{ paddingTop: 0 }}>
                  <form className="ui form">
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
                  </form>
               </div>
            </div>
            <hr
               style={{
                  borderTopColor: "#e3e3e3",
                  borderTopWidth: 2
               }}
            />
            <div className="Toolbar" style={{ height: 24 }}>
               <div style={{ fontSize: 16, display: "inline-block" }}>
                  Row Total: <span>${rowTotal}</span>
               </div>
               <div style={{ float: "right" }}>
                  <button
                     className="ui basic red button"
                     onClick={() => this.props.deleteRowButton(id)}
                     disabled={isVoid}
                  >
                     Delete Row
                  </button>
                  <button
                     className="ui green button"
                     onClick={() => this.props.saveRowButton(row)}
                     disabled={isVoid}
                  >
                     Save Row
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
