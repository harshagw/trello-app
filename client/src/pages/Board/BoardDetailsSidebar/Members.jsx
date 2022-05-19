import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";

const Member = ({ showDelete }) => {
  return (
    <div className="member">
      <span className="name_avatar">HA</span>
      <div className="member_body">
        <h6>Harsh Agarwal</h6>
        <p>(Workspace admin)</p>
      </div>
      {showDelete && (
        <div className="member_action">
          <AiOutlineClose />
        </div>
      )}
    </div>
  );
};

export const FewMembers = () => {
  return (
    <div className="sidebar_section members">
      <div className="sidebar_section_header">
        <BsPeople />
        <h6>Members</h6>
        <p>Show all</p>
      </div>
      <div className="sidebar_section_body">
        <Member />
        <Member showDelete={true} />
        <Member showDelete={true} />
      </div>
    </div>
  );
};

const Members = () => {
  return (
    <div className="members">
      <Member />
      <Member showDelete={true} />
      <Member showDelete={true} />
      <Member showDelete={true} />
      <Member showDelete={true} />
    </div>
  );
};

export default Members;
