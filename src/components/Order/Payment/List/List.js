import React from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { max, sum, add } from "../../../../utility/utility";

import {
   createPayment,
   updatePayment,
   editPayment,
   addNewPayment
} from "../../../../store/actions/payments";
import { updateOrder, editOrder } from "../../../../store/actions/orders";

import Item from "./Item";
import InputMoney from "../../../UI/Shared/InputMoney";
import TableHead from "./TableHead";

class OrderPaymentList extends React.Component {
   state = {
      amount: "",
      date: null
   };

   onChange = (field, value) => {
      this.setState({ [field]: value });
   };

   newPayment = async e => {
      e.preventDefault();
      const { orderID, orderTotal, payments } = this.props;
      const { amount, date } = this.state;

      // Check that payments don't exceeed order total
      const paymentTotal = sum(payments, "amountPaid");
      const newTotal = add(amount, paymentTotal);
      // refactor comparison to use Big.js
      if (newTotal > orderTotal) {
         return;
      }

      const paymentData = {
         orderID,
         paymentNum: max(payments, "paymentNum") + 1,
         amountPaid: amount,
         datePaid: date
      };
      const paymentRes = await this.props.createPayment(paymentData);
      this.props.addNewPayment(paymentRes);
      this.setState({ amount: "", date: null });

      const orderData = { orderID, paymentTotal: newTotal };
      const orderRes = await this.props.updateOrder(orderData);
      this.props.editOrder(orderID, "paymentTotal", orderRes.paymentTotal);

      this.checkOrderPaymentStatus();
   };

   checkOrderPaymentStatus = () => {
      const { paymentTotal, orderTotal } = this.props;
      if (paymentTotal === orderTotal) {
         // todo: mark as paid, for locking invoice
         this.props.addRewards();
      }
   };

   schedulePayment = async e => {
      e.preventDefault();
      const { orderID, payments } = this.props;
      const { amount, date } = this.state;

      // todo: add validation

      const data = {
         orderID,
         paymentNum: max(payments, "paymentNum") + 1,
         amountRequired: amount,
         dateRequired: date
      };
      const paymentRes = await this.props.createPayment(data);
      this.props.addNewPayment(paymentRes);
      this.setState({ amount: "", date: null });
   };

   // paid = data => {
   //    const { updatePayment, editPayment } = this.props;
   //    const { paymentID, amountRequired } = data;
   //    const updateData = {
   //       amount: amountRequired,
   //       date: moment()
   //    };
   //    updatePayment(paymentID, updateData).then(res => {
   //       const { amount, date } = res;
   //       editPayment(paymentID, "amount", amount);
   //       editPayment(paymentID, "date", date);
   //    });
   // };

   render() {
      const { amount, date } = this.state;
      const { payments, paymentTotal, isVoid } = this.props;

      const tableRows = payments.map(el => (
         <Item key={el._id} {...el} paidButton={this.paid} />
      ));

      const total = sum(payments, "amountPaid");
      const js = payments
         .map(el => el.amountPaid || 0)
         .reduce((acc, current) => {
            return acc + current;
         }, 0);

      return (
         <div className="card">
            <div className="card-header">Payments</div>
            <div className="card-body">
               <table className="table">
                  <TableHead />
                  <tbody>{tableRows}</tbody>
               </table>
               <strong>Total: ${paymentTotal}</strong>
               <br />
               <strong>Total (Local): ${total}</strong>
               <br />
               <strong>JS: ${js}</strong>
            </div>
            {!isVoid && (
               <div className="card-footer">
                  <form onSubmit={this.newPayment}>
                     <div className="row mb-3">
                        <div className="col-6">
                           <InputMoney
                              value={amount}
                              onChange={val => this.onChange("amount", val)}
                           />
                        </div>
                        <div className="col">
                           <DatePicker
                              selected={date}
                              onChange={val => this.onChange("date", val)}
                              dateFormat="MMM Do YYYY"
                              className="form-control"
                              placeholderText="Date"
                              popperPlacement="top"
                           />
                        </div>
                     </div>
                     <button className="btn btn-outline-success btn-block">
                        Add New Payment
                     </button>
                     <button
                        className="btn btn-outline-warning btn-block"
                        onClick={this.schedulePayment}
                     >
                        <i className="clock icon" />
                        Schedule Payment
                     </button>
                  </form>
               </div>
            )}
         </div>
      );
   }
}

function mapStateToProps(state, ownProps) {
   const { orderID } = ownProps;
   const payments = state.payments.filter(el => el.orderID === orderID);
   return {
      payments,
      orderID
   };
}

export default connect(
   mapStateToProps,
   {
      createPayment,
      updatePayment,
      editPayment,
      addNewPayment,
      updateOrder,
      editOrder
   }
)(OrderPaymentList);
