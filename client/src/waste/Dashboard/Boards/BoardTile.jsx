import React from "react";
import { Link } from "react-router-dom";

const BoardTile = ({ board }) => {
  const bgcolor = "gray";
  const by = "Harsh Agarwal";
  const at = "9:40PM";

  return (
    <div className="board_tile" style={{ backgroundColor: `var(--${bgcolor}-2)` }}>
      <Link to={`/dashboard/board/${board["_id"]}`}>
        <h5>{board["name"]}</h5>
      </Link>
      {/* <div className="shared">
        <a style={{ backgroundColor: `var(--${bgcolor}-9)` }}>H</a>
        <a style={{ backgroundColor: `var(--${bgcolor}-9)` }}>Y</a>
        <a style={{ backgroundColor: `var(--${bgcolor}-9)` }}>M</a>
        <a className="shared_plus" style={{ backgroundColor: `var(--${bgcolor}-9)` }}>
          +3
        </a>
      </div>
      <p style={{ color: `var(--${bgcolor}-9)` }}>
        Last edit by {by} at {at}
      </p> */}
    </div>
  );
};

export default BoardTile;
