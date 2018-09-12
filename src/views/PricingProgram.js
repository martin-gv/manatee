import React from "react";
import { connect } from "react-redux";
import Big from "big.js";
import Select from "react-select";
import Button from "@material-ui/core/Button";

import { setupOptions } from "../utility/utility";
import {
   fetchPricingColumn,
   fetchPricingRow,
   toggleModalV2
} from "../store/actions/system";
import { fetchOrderByID } from "../store/actions/orders";
import {
   createOrderRow,
   fetchOrderRow,
   updateOrderRow
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
      const id = item;
      const { columns, rows } = this.props;
      const filteredColumns = columns.filter(el => ui <= el.maxSize);
      if (filteredColumns.length > 0) {
         var colNum = filteredColumns.reduce(
            (acc, curr) => (acc.maxSize <= curr.maxSize ? acc : curr)
         ).colNum;
      } else {
         return;
      }
      const row = rows.find(el => el._id === id);
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

   addToOrder = (e, id, total) => {
      e.preventDefault();
      this.props.fetchOrderByID(id).then(res => {
         if (res && res.length) {
            this.props.fetchOrderRow(id).then(res => {
               if (res) {
                  const nextRowNum = Math.max(0, ...res.map(r => r.rowNum)) + 1;
                  this.props.createOrderRow(id, nextRowNum).then(res => {
                     if (res) {
                        const row = { ...res, ...this.state, price: total };
                        this.props.updateOrderRow(row).then(res => {
                           if (res) {
                              this.props.history.push(`/orders/${id}`);
                           } else {
                              this.props.toggleModalV2(
                                 true,
                                 "Error",
                                 "Row API error"
                              );
                           }
                        });
                     }
                  });
               } else {
                  this.props.toggleModalV2(true, "Error", "Row API error");
               }
            });
         } else {
            this.props.toggleModalV2(true, "Error", "No order found");
         }
      });
   };

   render() {
      const { glass, mount } = this.state;
      const { rows } = this.props;

      const ui = this.calculateUI();
      const glassCharge = this.calculateCharge(glass);
      const mountCharge = this.calculateCharge(mount);
      const total = this.calculateTotal([glassCharge, mountCharge]);

      return (
         <div className="card">
            <div className="card-body">
               <div className="row">
                  <div className="col-4">
                     <div className="form-group">
                        <label>Height</label>
                        <input
                           className="form-control"
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
                     <div className="form-group">
                        <label>Width</label>
                        <input
                           className="form-control"
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
                     <div className="form-group">
                        <label>Glass</label>
                        <Select
                           options={setupOptions(rows, "glass")}
                           onChange={glass =>
                              this.setState({ glass: glass && glass.value })
                           }
                           value={this.state.glass}
                        />
                     </div>
                     <div className="form-group">
                        <label>Mount</label>
                        <Select
                           options={setupOptions(rows, "mount")}
                           onChange={mount =>
                              this.setState({ mount: mount && mount.value })
                           }
                           value={this.state.mount}
                        />
                     </div>
                  </div>
                  <div className="col">
                     UI: {ui}
                     <br />
                     Glass: {glass && glass.label} - ${glassCharge}
                     <br />
                     Mount: {mount && mount.label} - ${mountCharge}
                     <br />
                     Total: ${total}
                     <br />
                     <Button
                        variant="contained"
                        color="primary"
                        onClick={this.toggleModal}
                     >
                        Add to Invoice
                     </Button>
                     <AddToInvoiceModal
                        isOpen={this.state.showModal}
                        toggle={this.toggleModal}
                        addToOrder={(e, id) => this.addToOrder(e, id, total)}
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
      fetchOrderByID,
      createOrderRow,
      fetchOrderRow,
      updateOrderRow
   }
)(PricingProgramView);
