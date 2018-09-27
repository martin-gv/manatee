import React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import "./ClientTags.css";

import { fetchTag, loadTagData } from "../../../store/actions/system";
import { loadClients, updateClientTag } from "../../../store/actions/clients";
import { createTag } from "../../../store/actions/tags";
import NewTagModal from "./NewTagModal";

class ClientTags extends React.Component {
   state = {
      option: ""
   };

   componentDidMount = () => {
      this.props.fetchTag();
   };

   onAddTagButtonClick = async () => {
      const { option } = this.state;
      const { tags, clientID } = this.props;

      // prevent action if no option selected
      if (!option) {
         return;
      }

      // prevent adding duplicate tags
      const tagID = option.value;
      const tagIDs = tags.map(el => el._id);
      if (tagIDs.includes(tagID)) {
         return;
      }

      const res = await this.props.updateClientTag(clientID, tagID, "$push");
      this.props.loadClients([res]);
      this.setState({ option: "" });
   };

   onDeleteTagButtonClick = async tagID => {
      const { clientID } = this.props;
      const res = await this.props.updateClientTag(clientID, tagID, "$pull");
      this.props.loadClients([res]);
   };

   createNewTag = async data => {
      const res = await this.props.createTag(data);
      this.props.loadTagData(res);
      return true;
   };

   render() {
      const clientTags = this.props.tags.map(tag => (
         <span className="client-tag" key={tag._id}>
            <span className="category">{tag.category}</span>
            <span className="name">{tag.name}</span>
            <i
               className="x icon"
               onClick={() => this.onDeleteTagButtonClick(tag._id)}
            />
         </span>
      ));

      const tagIDs = this.props.tags.map(tag => tag._id);
      const tagOptions = this.props.data
         .filter(tag => !tagIDs.includes(tag._id))
         .map(tag => ({
            label: `${tag.category} - ${tag.name}`,
            value: tag._id
         }));

      return (
         <div className="section ClientTags">
            <h3 style={{ marginBottom: 15 }}>Tags</h3>
            <div className="ui grid">
               <div className="ten wide column">
                  <Select
                     value={this.state.option}
                     options={tagOptions}
                     onChange={option => this.setState({ option })}
                     disabled={tagOptions.length === 0}
                     noOptionsMessage={() => "No matching tag found"}
                     classNamePrefix="tag-select"
                     placeholder="Search tags..."
                  />
               </div>
               <div className="six wide column">
                  <button
                     className="ui basic blue button"
                     onClick={this.onAddTagButtonClick}
                     disabled={!this.state.option}
                  >
                     <i className="tag icon" />
                     Add Tag
                  </button>
               </div>
            </div>
            <div style={{ marginTop: 20 }}>{clientTags}</div>
            <hr />
            <div>
               <button
                  className="ui basic mini button"
                  onClick={() => this.props.toggle("newTag")}
               >
                  Create New Tag
               </button>
            </div>
            <NewTagModal
               open={this.props.open}
               toggle={this.props.toggle}
               createNewTag={this.createNewTag}
            />
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      data: state.system.tagData
   };
}

export default connect(
   mapStateToProps,
   { fetchTag, loadTagData, loadClients, updateClientTag, createTag }
)(ClientTags);
