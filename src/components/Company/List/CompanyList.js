import React from "react";
import { connect } from "react-redux";
import "./CompanyList.css";

import { fetchCompany } from "../../../store/actions/companies";
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

      let loader = null;
      if (!ready) {
         loader = <div className="loader">Loading...</div>;
      }

      return (
         <div className="card full-height CompanyList">
            {loader}
            {ready && (
               <div>
                  <h2>Companies</h2>
                  <table className="hover clickable">
                     <TableHeader />
                     <tbody>{ready ? tableRows : null}</tbody>
                  </table>
               </div>
            )}
         </div>
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
