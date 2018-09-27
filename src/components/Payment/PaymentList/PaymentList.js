import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import xlsx from "xlsx";
import "./PaymentList.css";

import {
   fetchPayment,
   searchPayments,
   loadPayments
} from "../../../store/actions/payments";

import Toolbar from "./Toolbar";
import Head from "./TableHead";
import Row from "./TableRow";
import DateRangePicker from "../../UI/Shared/DateRangePicker";

class PaymentList extends React.Component {
   state = {
      ready: false,
      searching: false,
      from: undefined,
      to: undefined,
      data: [
         ["id", "name", "value"],
         [1, "sheetjs", 7262],
         [2, "js-xlsx", 6969]
      ],
      cols: [
         { name: "A", key: 0 },
         { name: "B", key: 1 },
         { name: "C", key: 2 }
      ]
   };

   async componentDidMount() {
      await this.props.fetchPayment();
      this.setState({ ready: true });
   }

   rowClick = orderID => {
      console.log("clicked! go to order ", orderID);
   };

   onChange = (field, value) => {
      // if (field === "to") {
      // this.setState({ [field]: value }, this.showFromMonth);
      // } else {
      this.setState({ [field]: value });
      // }
   };

   // showFromMonth() {
   //    const { from, to } = this.state;
   //    if (!from) {
   //       return;
   //    }
   //    if (moment(to).diff(moment(from), "months") < 2) {
   //       this.to.getDayPicker().showMonth(from);
   //    }
   // }

   search = async () => {
      this.setState({ searching: true });
      let { from, to } = this.state;
      from = moment(from).startOf("day");
      to = moment(to).endOf("day");
      const res = await this.props.searchPayments({ from, to });
      this.props.loadPayments(res);
      this.setState({ searching: false });
   };

   download = () => {
      const data = this.props.payments.map(el => {
         if (el.datePaid) {
            return { ...el, datePaid: moment(el.datePaid).toDate() };
         }
         return el;
      });
      const ws = xlsx.utils.json_to_sheet(data, {
         header: ["orderID", "datePaid", "amountPaid"]
      });

      // todo: write function to do this based on supplied name of header
      const colNum = 2; // formats column as accounting style
      Object.keys(ws).forEach(el => {
         const cell = xlsx.utils.decode_cell(el);
         if (cell.c === colNum && cell.r !== 0)
            ws[el].z = '_-$* #,##0.00_-;-$* #,##0.00_-;_-$* "-"??_-;_-@_-';
      });

      // ws.E2.t = "z"; // deletes a cell
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
      xlsx.writeFile(wb, "Workbook.xlsb");
   };

   render() {
      const { ready, from, to } = this.state;
      const { payments } = this.props;

      const rows = payments.map(el => (
         <Row key={el._id} {...el} rowClick={this.rowClick} />
      ));

      const loader = <div className="loader">Loading...</div>;

      return (
         <div className="card full-height PaymentList">
            {!ready ? (
               loader
            ) : (
               <div>
                  <h2 style={{ marginBottom: 20 }}>Payments</h2>
                  <Toolbar />
                  <div className="toolbar">
                     <DateRangePicker
                        from={from}
                        to={to}
                        onChange={this.onChange}
                     />
                     <button
                        className="ui button"
                        onClick={this.search}
                        style={{ marginLeft: 10 }}
                     >
                        Search
                     </button>
                     <button className="ui button" onClick={this.download}>
                        Download
                     </button>
                  </div>
                  <table style={{ marginTop: 30 }}>
                     <Head />
                     <tbody>
                        {this.state.searching ? (
                           <tr>
                              <td colSpan="6">{loader}</td>
                           </tr>
                        ) : (
                           rows
                        )}
                     </tbody>
                  </table>
               </div>
            )}
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      payments: state.payments
   };
}

export default connect(
   mapStateToProps,
   { fetchPayment, searchPayments, loadPayments }
)(PaymentList);
