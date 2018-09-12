import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import {
   fetchOrder,
   searchOrders,
   loadOrders
} from "../../store/actions/orders";
import { setDataReadyStatus } from "../../store/actions/system";
import { sum } from "../../utility/utility";

import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate, parseDate } from "react-day-picker/moment";
import TableHead from "./OrderListHeader";
import Item from "./OrderListItem";

class OrderList extends React.Component {
   state = {
      selectedDay: undefined,
      hello: "test",
      from: undefined,
      to: undefined
   };

   componentDidMount() {
      this.props.fetchOrder();
   }

   componentWillUnmount() {
      this.props.setDataReadyStatus("orderList", false);
   }

   viewOrder = orderID => {
      this.props.history.push("/orders/" + orderID);
   };

   handleFromChange = from => {
      this.setState({ from });
   };
   handleToChange = to => {
      this.setState({ to }, this.showFromMonth);
   };

   showFromMonth() {
      const { from, to } = this.state;
      if (!from) {
         return;
      }
      if (moment(to).diff(moment(from), "months") < 2) {
         this.to.getDayPicker().showMonth(from);
      }
   }

   search = async () => {
      const { from, to } = this.state;

      const fromTo = moment(from)
         .startOf("day")
         .toDate();
      const queryTo = moment(to)
         .endOf("day")
         .toDate();

      const res = await this.props.searchOrders(fromTo, queryTo);
      this.props.loadOrders(res);
   };

   total = () => {
      const orders = this.props.orders.filter(order => order.void !== true);
      return sum(orders, "total");
   };

   render() {
      const { orders, ready } = this.props;

      const { from, to } = this.state;
      const modifiers = { start: from, end: to };

      const tableRows =
         ready &&
         orders.map(el => (
            <Item key={el._id} {...el} onClick={this.viewOrder} />
         ));

      return (
         <div>
            <div className="toolbar" style={{ marginBottom: "10px" }}>
               <div className="InputFromTo">
                  <DayPickerInput
                     value={from}
                     placeholder="From"
                     format="LL"
                     formatDate={formatDate}
                     parseDate={parseDate}
                     hideOnDayClick={false}
                     dayPickerProps={{
                        selectedDays: [from, { from, to }],
                        disabledDays: { after: to },
                        toMonth: to,
                        modifiers,
                        numberOfMonths: 2,
                        onDayClick: () => this.to.getInput().focus()
                     }}
                     onDayChange={this.handleFromChange}
                  />{" "}
                  —{" "}
                  <span className="InputFromTo-to">
                     <DayPickerInput
                        ref={el => (this.to = el)}
                        value={to}
                        placeholder="To"
                        format="LL"
                        formatDate={formatDate}
                        parseDate={parseDate}
                        hideOnDayClick={false}
                        dayPickerProps={{
                           selectedDays: [from, { from, to }],
                           disabledDays: { before: from },
                           modifiers,
                           month: from,
                           fromMonth: from,
                           numberOfMonths: 2
                        }}
                        onDayChange={this.handleToChange}
                     />
                  </span>{" "}
                  <button className="ui button" onClick={this.search}>
                     Search
                  </button>{" "}
                  Total: ${this.total()}
               </div>
            </div>
            <table className="table table-hover clickable">
               <TableHead />
               <tbody>{tableRows}</tbody>
            </table>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      orders: state.orders,
      ready: state.system.isDataLoaded.orderList
   };
}

export default connect(
   mapStateToProps,
   { fetchOrder, searchOrders, loadOrders, setDataReadyStatus }
)(OrderList);
