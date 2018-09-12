import React from "react";
import { connect } from "react-redux";
import Big from "big.js";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import printJS from "print-js";

import {
   setupOptions,
   found,
   findByID,
   chunk,
   sum,
   max
} from "../../utility/utility";

import {
   fetchOrderByID,
   updateOrder,
   editOrder,
   loadOrders
} from "../../store/actions/orders";
import {
   createOrderRow,
   fetchOrderRow,
   updateOrderRow,
   deleteOrderRow,
   setSelectedOrderRow,
   editRow
} from "../../store/actions/orderRows";
import { fetchInventoryByID } from "../../store/actions/inventory";
import { fetchPayment, updatePayment } from "../../store/actions/payments";
import {
   fetchClientByID_v2,
   saveClient,
   loadClients
} from "../../store/actions/clients";
import {
   setDataLoadedStatus,
   resetDataLoadedStatus,
   fetchPricingRow
} from "../../store/actions/system";

import OrderRowDetail from "./Row/Detail";
import OrderRowList from "./Row/List/List";
import OrderPaymentList from "./Payment/List/List";

class OrderForm extends React.Component {
   state = {
      form: ["title", "description"],
      modal: {
         item: false
      }
   };

   componentDidMount() {
      const id = this.props.match.params.id;
      this.fetchData(id);
   }

   componentDidUpdate(prevProps) {
      const prev = prevProps.match.params.id;
      const current = this.props.match.params.id;
      if (prev !== current) {
         this.fetchData(current);
      }
   }

   componentWillUnmount() {
      this.props.resetDataLoadedStatus("orderForm");
      this.props.resetDataLoadedStatus("orderRow");
   }

   fetchData = id => {
      this.props.fetchOrderByID(id).then(res => {
         this.props.loadOrders(res);
         this.props.setDataLoadedStatus("orderForm");
         const order = findByID(res, "orderID", id);
         this.props.fetchClientByID_v2(order.clientID).then(res => {
            this.props.loadClients(res);
         });
      });
      this.props.fetchOrderRow(id).then(res => {
         if (found(res)) this.props.setSelectedOrderRow(res[0]._id);
      });
      this.props.fetchPayment(id);
      this.props.fetchPricingRow();
   };

   handleViewClientButton = () => {
      this.props.history.push("/clients/" + this.props.order.clientID);
   };

   handleChange = e => {
      const { orderID } = this.props.order;
      const { name, value } = e.target;
      this.props.editOrder(orderID, name, value);
   };

   handleSubmit = e => {
      e.preventDefault();
      this.props.updateOrder(this.props.order);
   };

   handleNewRowButton = () => {
      const orderID = this.props.order.orderID;
      const nextRowNum =
         Math.max(0, ...this.props.orderRows.map(r => r.rowNum)) + 1;
      this.props.createOrderRow(orderID, nextRowNum);
   };

   handleRowClick = id => {
      this.props.setSelectedOrderRow(id);
   };

   onRowChange = (id, field, value) => {
      this.props.editRow(id, field, value);
   };

   handleSaveRowButton = row => {
      const { orderID, total } = this.props.order;
      const orderData = { orderID, total };
      this.props.updateOrderRow(row);
      this.props.updateOrder(orderData);
   };

   handleDeleteRowButton = id => {
      this.props.deleteOrderRow(id);
   };

   updateTotal = () => {
      const { orderRows: rows } = this.props;
      const { orderID } = this.props.order;
      const total = rows.reduce((acc, curr) => {
         const sum = Big(acc).plus(
            Big(curr.price || 0).plus(Big(curr.itemPrice || 0))
         );
         return Number(sum);
      }, 0);
      this.props.editOrder(orderID, "total", total);
   };

   print = () => {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;

      const { orderRows, clients } = this.props;
      const { firstName, lastName, phone, email } = clients[0];

      const printContactInfo = [firstName, lastName, phone, email];
      const printRows = orderRows.map(el => {
         return {
            style: "tableExample",
            table: {
               body: [
                  ["Title", "Dimensions", "Glass", "Mount", "Price"],
                  [
                     el.title,
                     el.height + " x " + el.width,
                     el.glass || "",
                     el.mount,
                     el.price
                  ]
               ]
            }
         };
      });

      var doc = {
         content: [
            { text: "Picture This Gallery", bold: true, fontSize: 30 },
            printContactInfo,
            { text: "Order Rows", marginTop: 20, marginBottom: 10 },
            printRows
         ],
         styles: {
            tableExample: {
               margin: [0, 5, 0, 15]
            }
         }
      };

      // pdfMake.createPdf(doc).open();
      pdfMake.createPdf(doc).getBlob(blob => {
         const url = URL.createObjectURL(blob);
         printJS(url);
      });
   };

   toggleModal = modal => {
      const m = this.state.modal;
      this.setState({ modal: { ...m, [modal]: !m[modal] } });
   };

   addItem = (e, inventoryID) => {
      e.preventDefault();
      const {
         selectedRowId,
         fetchInventoryByID,
         updateOrderRow,
         editRow
      } = this.props;
      fetchInventoryByID(inventoryID).then(res => {
         if (found(res, 1)) {
            const item = res[0];
            const data = {
               _id: selectedRowId,
               inventoryItem: item._id
            };
            updateOrderRow(data).then(res => {
               if (res) {
                  editRow(selectedRowId, "inventoryItem", item);
                  this.toggleModal("item");
               }
            });
         }
      });
   };

   removeItem = () => {
      const { selectedRowId, updateOrderRow, editRow } = this.props;
      const data = {
         _id: selectedRowId,
         inventoryItem: null
      };
      updateOrderRow(data).then(res => {
         if (res) editRow(selectedRowId, "inventoryItem", null);
      });
   };

   addRewards = async () => {
      // look at all order rows, check for framing reward check
      // and create array of points, or send full order rows to
      // an action creator, or to an API endpoint

      const { clients, orderRows } = this.props;
      const client = clients[0];

      const points = orderRows.filter(el => el.framingRewards).map(el => {
         return {
            orderID: el.orderID,
            // rowID: el._id,
            amount: el.price
         };
      });

      const currentCards = client.framingRewards;
      const index = currentCards.length - 1;

      let maxCardNum = max(currentCards, "cardNum");
      let cards = [...currentCards];

      if (
         currentCards.length === 0 ||
         currentCards[index].points.length === 7
      ) {
         // client has no rewards, or latest card is full
         const newCards = this.createNewRewardCards(points, maxCardNum);
         cards = [...cards, ...newCards];
      } else {
         // client has existing rewards
         // find latest card and continue
         let newestCard = currentCards[index];
         // find out how many points to put in the newest card
         let lastPoint = max(newestCard.points, "pointNum");
         const availableSpots = 7 - lastPoint;
         for (let i = 0; i < availableSpots; i++) {
            if (points[i]) {
               const newPoint = {
                  ...points[i],
                  pointNum: lastPoint + 1 + i
               };
               newestCard.points.push(newPoint);
            }
         }
         newestCard = this.checkIfCardFull(newestCard);
         cards[cards.length - 1] = newestCard;

         // check if any left over, chunk them, and create new cards
         if (points[availableSpots]) {
            const restPoints = points.slice(availableSpots);
            const newCards = this.createNewRewardCards(restPoints, maxCardNum);
            cards = [...cards, ...newCards];
         }
      }

      const clientData = { clientId: client.clientId, framingRewards: cards };
      await this.props.saveClient(clientData);
      console.log(cards);
   };

   createNewRewardCards = (pointsArr, maxCardNum) => {
      // split points (from rows) into groups of 7
      const pointGroups = chunk(pointsArr, 7);

      let cardNum = maxCardNum;
      let newCards = [];

      // for each group, number them, create a new card
      // and add them to the card
      pointGroups.forEach(el => {
         const numberedPoints = el.map((pointObj, i) => {
            return {
               pointNum: i + 1,
               ...pointObj
            };
         });

         // new card object
         const tempCard = {
            cardNum: (cardNum += 1),
            points: [...numberedPoints]
         };

         const newCard = this.checkIfCardFull(tempCard);

         // add card to cards array
         newCards.push(newCard);
      });

      return newCards;
   };

   checkIfCardFull = card => {
      const completed = {};
      if (card.points.length === 7) {
         const total = sum(card.points, "amount");
         const average = Big(total)
            .div(7)
            .round(2);
         completed.completed = true;
         completed.creditEarned = Number(average);
      }

      return {
         ...card,
         ...completed
      };
   };

   void = async () => {
      const { order, orderRows } = this.props;
      const voidUpdate = { void: true, voidDate: new Date() };

      const orderData = {
         orderID: order.orderID,
         ...voidUpdate
         // todo: add void reason
      };
      this.props.updateOrder(orderData);

      orderRows.forEach(row => {
         const rowData = {
            _id: row._id,
            ...voidUpdate
         };
         this.props.updateOrderRow(rowData);
      });

      const res = await this.props.fetchPayment(order.orderID);
      res.forEach(payment => {
         this.props.updatePayment(payment.paymentID, voidUpdate);
      });
   };

   render() {
      if (!this.props.isDataLoaded) {
         return <div className="alert alert-primary">Loading...</div>;
      }

      const { orderRows, selectedRowId, pricingRows } = this.props;
      const { orderID, total, paymentTotal, void: isVoid } = this.props.order;

      const form = this.state.form.map(el => (
         <div className="form-group" key={el}>
            <label htmlFor={el}>{el}</label>
            <input
               className="form-control"
               id={el}
               name={el}
               value={this.props.order[el] || ""}
               type="text"
               onChange={this.handleChange}
            />
         </div>
      ));

      const checkRow = { ...orderRows.find(r => r._id === selectedRowId) };

      return (
         <div className="ui grid">
            <div className="ten wide column">
               <div className="card">
                  <div className="card-header">
                     Order ID: {orderID} {isVoid && <strong>VOIDED</strong>}
                     <button
                        className="btn btn-outline-secondary float-right ml-3"
                        onClick={this.handleViewClientButton}
                     >
                        View Client
                     </button>
                     <button
                        className="btn btn-outline-secondary float-right ml-3"
                        onClick={this.print}
                        disabled={isVoid}
                     >
                        Print
                     </button>
                     <button
                        className="btn btn-outline-danger float-right"
                        disabled={isVoid}
                        onClick={this.void}
                     >
                        Void
                     </button>
                  </div>
                  <div className="card-body">
                     <form onSubmit={this.handleSubmit}>
                        {form}
                        <button
                           type="submit"
                           className="btn btn-success mb-3"
                           disabled={isVoid}
                        >
                           Save
                        </button>
                     </form>
                  </div>
               </div>
               {this.props.isOrderRowDataLoaded && (
                  <OrderRowDetail
                     checkRow={checkRow}
                     row={{
                        ...orderRows.find(r => r._id === selectedRowId)
                     }}
                     selectedRowId={selectedRowId}
                     onRowChange={this.onRowChange}
                     saveRowButton={this.handleSaveRowButton}
                     deleteRowButton={this.handleDeleteRowButton}
                     glassOptions={setupOptions(pricingRows, "glass")}
                     mountOptions={setupOptions(pricingRows, "mount")}
                     addItem={this.addItem}
                     removeItem={this.removeItem}
                     toggleModal={this.toggleModal}
                     modal={this.state.modal}
                     updateTotal={this.updateTotal}
                     isVoid={isVoid}
                  />
               )}
            </div>
            <div className="six wide column">
               {this.props.isOrderRowDataLoaded && (
                  <OrderRowList
                     rows={this.props.orderRows}
                     selectedRowId={this.props.selectedRowId}
                     newRowButton={this.handleNewRowButton}
                     handleRowClick={id => this.handleRowClick(id)}
                     total={total}
                     isVoid={isVoid}
                  />
               )}
               <OrderPaymentList
                  orderID={orderID}
                  orderTotal={total}
                  paymentTotal={paymentTotal}
                  addRewards={this.addRewards}
                  isVoid={isVoid}
               />
            </div>
         </div>
      );
   }
}

function mapStateToProps(state, ownProps) {
   const id = ownProps.match.params.id;
   const order = state.orders.find(o => o.orderID === +id);
   const orderRows = state.orderRows.filter(o => o.orderID === +id);

   return {
      order,
      orderRows,
      clients: state.clients,
      isDataLoaded: state.system.isDataLoaded.orderForm,
      isOrderRowDataLoaded: state.system.isDataLoaded.orderRow,
      selectedRowId: state.system.selectedRowId,
      pricingRows: state.system.pricingRows
   };
}

export default connect(
   mapStateToProps,
   {
      fetchOrderByID,
      updateOrder,
      editOrder,
      loadOrders,
      createOrderRow,
      fetchOrderRow,
      updateOrderRow,
      deleteOrderRow,
      editRow,
      fetchInventoryByID,
      fetchPayment,
      updatePayment,
      setSelectedOrderRow,
      setDataLoadedStatus,
      resetDataLoadedStatus,
      fetchPricingRow,
      fetchClientByID_v2,
      loadClients,
      saveClient
   }
)(OrderForm);
