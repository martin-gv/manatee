import React from "react";
import { connect } from "react-redux";
import Big from "big.js";
import Select from "react-select";

import { setupOptions } from "../utility/utility";
import {
   fetchPricingColumn,
   fetchPricingRow,
   toggleModalV2,
   triggerOrderSave
} from "../store/actions/system";
import { fetchOrderByID, updateOrder } from "../store/actions/orders";
import {
   createOrderRow,
   fetchOrderRow,
   updateOrderRow,
   editRow
} from "../store/actions/orderRows";

import AddToInvoiceModal from "../components/PricingProgram/AddToInvoiceModal";

class PricingProgramView extends React.Component {
   state = {
      height: "",
      width: "",
      glass: "",
      mount: "",
      showModal: false
   };

   componentDidMount() {
      this.props.fetchPricingColumn();
      this.props.fetchPricingRow();
   }

   calculateCharge = item => {
      const ui = this.calculateUI();
      if (!ui || !item) {
         return;
      }
      const itemID = item.value;
      const { columns, rows } = this.props;
      const filteredColumns = columns.filter(el => ui <= el.maxSize);
      if (filteredColumns.length > 0) {
         var colNum = filteredColumns.reduce(
            (acc, curr) => (acc.maxSize <= curr.maxSize ? acc : curr)
         ).colNum;
      } else {
         return;
      }
      const row = rows.find(el => el._id === itemID);
      if (colNum === 0) {
         return row.minCharge;
      }
      const price = row.pricing.find(el => el.colNum === colNum).price;
      const charge = Big(ui).times(Big(price));
      return charge.toFixed(2);
   };

   calculateUI = () => {
      const { height, width } = this.state;
      return height > 0 && width > 0
         ? Big(height)
              .plus(Big(width))
              .toString()
         : null;
   };

   calculateTotal = arr => {
      return arr.reduce((acc, curr) => {
         const total = Big(acc).plus(Big(curr || 0));
         return total.toFixed(2);
      }, 0);
   };

   toggleModal = () => {
      this.setState({ showModal: !this.state.showModal });
   };

   addToOrder = async (orderID, total) => {
      const orderRes = await this.props.fetchOrderByID(orderID);
      if (orderRes && orderRes.length) {
         const rowRes = await this.props.fetchOrderRow(orderID);
         if (rowRes) {
            const nextRowNum =
               Math.max(0, ...rowRes.map(row => row.rowNum)) + 1;
            const newRow = await this.props.createOrderRow(orderID, nextRowNum);
            if (newRow) {
               const row = {
                  ...newRow,
                  height: this.state.height,
                  width: this.state.width,
                  glass: this.state.glass.value,
                  mount: this.state.mount.value,
                  price: total
               };
               const rowUpdate = await this.props.updateOrderRow(row);
               if (rowUpdate) {
                  const orderTotal = this.updateOrderTotal([
                     ...rowRes,
                     rowUpdate
                  ]);
                  const data = { orderID, total: orderTotal };
                  await this.props.updateOrder(data);
                  this.props.history.push("/orders/" + orderID);
                  // todo: save order to update order totals
                  // todo: message if successful
               } else {
                  this.props.toggleModalV2(true, "Error", "Row API error");
               }
            }
         } else {
            this.props.toggleModalV2(true, "Error", "Row API error");
         }
      } else {
         this.props.toggleModalV2(true, "Error", "No order found");
      }
   };

   updateOrderTotal = arr => {
      const total = arr.reduce((acc, curr) => {
         const sum = Big(acc).plus(
            Big(curr.price || 0).plus(Big(curr.itemPrice || 0))
         );
         return Number(sum);
      }, 0);
      return total;
   };

   render() {
      const { glass, mount } = this.state;
      const { rows } = this.props;

      const ui = this.calculateUI();
      const glassCharge = this.calculateCharge(glass);
      const mountCharge = this.calculateCharge(mount);
      const total = this.calculateTotal([glassCharge, mountCharge]);

      return (
         <div className="card full-height">
            <h2 style={{ marginBottom: 40 }}>Quote Calculator</h2>
            <div className="ui grid">
               <div className="five wide column">
                  <form className="ui form" style={{ marginBottom: 10 }}>
                     <div className="field">
                        <label>Height</label>
                        <input
                           name="height"
                           value={this.state.height}
                           type="number"
                           step="1"
                           placeholder="Height"
                           onChange={e =>
                              this.setState({ height: e.target.value })
                           }
                        />
                     </div>
                     <div className="field">
                        <label>Width</label>
                        <input
                           name="width"
                           value={this.state.width}
                           type="number"
                           step="1"
                           placeholder="Width"
                           onChange={e =>
                              this.setState({ width: e.target.value })
                           }
                        />
                     </div>
                  </form>
                  <div className="form-group">
                     <label>Glass</label>
                     <Select
                        value={this.state.glass}
                        // todo: fix when delete?
                        onChange={glass => this.setState({ glass })}
                        options={setupOptions(rows, "glass")}
                        classNamePrefix="Select"
                     />
                  </div>
                  <div className="form-group">
                     <label>Mount</label>
                     <Select
                        value={this.state.mount}
                        // todo: fix when delete?
                        onChange={mount => this.setState({ mount })}
                        options={setupOptions(rows, "mount")}
                        classNamePrefix="Select"
                     />
                  </div>
               </div>
               <div className="eight wide column">
                  <div className="section">
                     <h3 style={{ marginBottom: 20 }}>Quote Summary</h3>
                     <table className="small" style={{ marginBottom: 10 }}>
                        <tbody>
                           <tr>
                              <td style={{ width: 75 }}>UI:</td>
                              <td>{ui}</td>
                           </tr>
                           <tr>
                              <td>Glass:</td>
                              <td>{glass && glass.label}</td>
                           </tr>
                           <tr>
                              <td>Mount:</td>
                              <td>{mount && mount.label}</td>
                           </tr>
                        </tbody>
                     </table>
                     <div style={{ fontSize: 14 }}>
                        Total:
                        <span style={{ fontSize: 16, marginLeft: 12 }}>
                           ${total}
                        </span>
                     </div>
                     <button
                        className="ui blue basic button"
                        onClick={this.toggleModal}
                        style={{ marginTop: 10 }}
                     >
                        <i className="material-icons">add_shopping_cart</i>
                        Add to Invoice
                     </button>
                     <AddToInvoiceModal
                        isOpen={this.state.showModal}
                        toggle={this.toggleModal}
                        addToOrder={id => this.addToOrder(id, total)}
                     />
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      columns: state.system.pricingColumns,
      rows: state.system.pricingRows
   };
}

export default connect(
   mapStateToProps,
   {
      fetchPricingColumn,
      fetchPricingRow,
      toggleModalV2,
      triggerOrderSave,
      fetchOrderByID,
      updateOrder,
      createOrderRow,
      fetchOrderRow,
      updateOrderRow,
      editRow
   }
)(PricingProgramView);
