import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Search } from "semantic-ui-react";

import { fetchClient } from "../../../store/actions/clients";
import { fetchOrderByID } from "../../../store/actions/orders";
import { resetDataLoadedStatus } from "../../../store/actions/system";

class GlobalSearch extends React.Component {
   componentWillMount() {
      this.reset();
   }

   reset = () =>
      this.setState({
         loading: false,
         results: {},
         value: "",
         typingTimeout: 0
      });

   search = async (e, { value }) => {
      if (value < 1) return this.reset();
      clearTimeout(this.state.typingTimeout);
      this.setState({
         loading: true,
         value,
         typingTimeout: setTimeout(async () => {
            this.props.fetchClient(value).then(res => {
               const clients = res.map(this.formatResults);
               const clientResults = {};
               if (clients.length > 0) {
                  clientResults.clients = {
                     name: "Clients",
                     results: clients
                  };
               }
               // todo: show "no results found" if no results

               const id = Number(value);
               if (Number.isInteger(id)) {
                  this.props.fetchOrderByID(id).then(res => {
                     const orders = res.map(this.formatOrderResults);
                     const orderResults = {};
                     if (orders.length > 0) {
                        orderResults.orders = {
                           name: "Orders",
                           results: orders
                        };
                     }

                     const results = {
                        ...clientResults,
                        ...orderResults
                     };
                     this.setState({ loading: false, results });
                  });
               } else {
                  const results = {
                     ...clientResults
                  };
                  this.setState({ loading: false, results });
               }
            });
         }, 250)
      });
   };

   select = (e, { result }) => {
      const { type, id } = result;
      this.props.resetDataLoadedStatus("orderForm");
      this.props.resetDataLoadedStatus("orderRow");
      this.props.history.push("/" + type + "/" + id);
      this.reset();
   };

   formatResults = res => {
      return {
         type: "clients",
         id: res.clientID,
         title: res.firstName + " " + res.lastName,
         description: res.email + "," + res.phone + ", ID: " + res.clientID
      };
   };

   formatOrderResults = res => {
      return {
         type: "orders",
         id: res.orderID,
         title: res.orderID,
         description: res.createdAt + " " + res.total
      };
   };

   render() {
      const { loading, results, value } = this.state;
      return (
         <Search
            category
            placeholder="Search database..."
            loading={loading}
            results={results}
            value={value}
            onSearchChange={this.search}
            onResultSelect={this.select}
         />
      );
   }
}

export default withRouter(
   connect(
      null,
      { fetchClient, fetchOrderByID, resetDataLoadedStatus }
   )(GlobalSearch)
);
