import React from "react";
import { connect } from "react-redux";

import { fetchCompany } from "../../../store/actions/companies";
import Loading from "../../UI/Loading";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

class OrderList extends React.Component {
   state = {
      ready: false
   };

   componentDidMount() {
      const { fetchCompany } = this.props;
      fetchCompany().then(ready => (ready ? this.setState({ ready }) : null));
   }

   rowClick = id => {
      const { history } = this.props;
      history.push(`/companies/${id}`);
   };

   render() {
      const { ready } = this.state;
      const { companies } = this.props;

      const tableRows = companies.map(el => (
         <TableRow key={el._id} {...el} rowClick={this.rowClick} />
      ));

      return (
         <table className="table table-hover clickable">
            <TableHeader />
            <tbody>{ready ? tableRows : <Loading colSpan={5} />}</tbody>
         </table>
      );
   }
}

function mapStateToProps(state) {
   return {
      companies: state.companies
   };
}

export default connect(
   mapStateToProps,
   { fetchCompany }
)(OrderList);
