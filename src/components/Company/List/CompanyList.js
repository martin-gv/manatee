import React from "react";
import { connect } from "react-redux";
import "./CompanyList.css";

import { fetchCompany } from "../../../store/actions/companies";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import NewCompanyModal from "../NewCompanyModal";

class OrderList extends React.Component {
   state = {
      ready: false,
      newCompanyModal: false
   };

   componentDidMount() {
      const { fetchCompany } = this.props;
      fetchCompany().then(ready => (ready ? this.setState({ ready }) : null));
   }

   rowClick = id => {
      const { history } = this.props;
      history.push(`/companies/${id}`);
   };

   toggleModal = modal => {
      this.setState({ [modal]: !this.state[modal] });
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
                  <div className="ui grid">
                     <div className="five wide column">
                        <h2>Companies</h2>
                     </div>
                     <div
                        className="eleven wide column"
                        style={{ textAlign: "right" }}
                     >
                        <button
                           className="ui blue button"
                           onClick={() => this.toggleModal("newCompanyModal")}
                        >
                           New Company
                        </button>
                     </div>
                  </div>
                  <table className="hover clickable">
                     <TableHead />
                     <tbody>{ready ? tableRows : null}</tbody>
                  </table>
               </div>
            )}
            <NewCompanyModal
               open={this.state.newCompanyModal}
               toggle={() => this.toggleModal("newCompanyModal")}
            />
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
