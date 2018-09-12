import React from "react";
import { connect } from "react-redux";
import Select from "react-select";

import { fetchClientTag } from "../../../store/actions/system";
import { addTagToClient } from "../../../store/actions/clients";

class ClientTags extends React.Component {
   state = {
      option: ""
   };

   componentDidMount = () => {
      this.props.fetchClientTag();
   };

   onAddTagButtonClick = () => {
      // prevent action if no option selected
      if (!this.state.option) {
         return;
      }

      // prevent adding duplicate tags
      const option = this.state.option.value;
      const tagIds = this.props.tags.map(el => el._id);
      if (tagIds.includes(option._id)) {
         return;
      }

      this.props.addTagToClient(this.props.clientId, option, "$push");
      this.setState({ option: "" });
   };

   onDeleteTagButtonClick = tag => {
      this.props.addTagToClient(this.props.clientId, tag, "$pull");
   };

   render() {
      const tags = this.props.tags.map(el => (
         <span className="badge badge-secondary mr-3 mb-3" key={el._id}>
            {el.category} -> {el.name}{" "}
            <button
               className="btn btn-secondary btn-sm"
               onClick={() => this.onDeleteTagButtonClick(el)}
            >
               x
            </button>
         </span>
      ));

      const tagIds = this.props.tags.map(el => el._id);
      const clientTagOptions = this.props.data
         .filter(el => !tagIds.includes(el._id))
         .map(el => ({
            label: `${el.category} -> ${el.name}`,
            value: el
         }));

      return (
         <div className="card mt-3">
            <div className="card-header">Tags</div>
            <div className="card-body">
               <div className="row">
                  <div className="col-8">
                     <Select
                        options={clientTagOptions}
                        onChange={option => this.setState({ option })}
                        value={this.state.option}
                        disabled={clientTagOptions.length === 0}
                     />
                  </div>
                  <div className="col">
                     <button
                        className="btn btn-primary btn-block"
                        onClick={this.onAddTagButtonClick}
                        disabled={!this.state.option}
                     >
                        Add Tag
                     </button>
                  </div>
               </div>
               <hr />
               <span style={{ fontSize: "18px" }}>{tags}</span>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      data: state.system.clientTagOptions
   };
}

export default connect(
   mapStateToProps,
   { fetchClientTag, addTagToClient }
)(ClientTags);
