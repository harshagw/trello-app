import React from "react";
import { AiOutlineNotification, AiOutlineClose } from "react-icons/ai";

const Activity = () => {
  return (
    <div className="activity">
      <span className="name_avatar">HA</span>
      <div className="activity_body">
        <h6>
          <span>Harsh Agarwal</span> added a new card
        </h6>
        <p>May 16 at 5:14 PM</p>
      </div>
    </div>
  );
};

export const FewActivities = () => {
  return (
    <div className="sidebar_section activities">
      <div className="sidebar_section_header">
        <AiOutlineNotification />
        <h6>Activity</h6>
        <p>Show all</p>
      </div>
      <div className="sidebar_section_body">
        <Activity />
        <Activity />
        <Activity />
      </div>
    </div>
  );
};

const Activities = () => {
  return (
    <div className="activities">
      <Activity />
      <Activity />
      <Activity />
      <Activity />
      <Activity />
      <Activity />
      <Activity />
      <Activity />
      <Activity />
      <Activity />
      <Activity />
      <Activity />
      <Activity />
      <Activity />
      <Activity />
    </div>
  );
};

export default Activities;
