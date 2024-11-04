import React from "react";

const Cell = ({ color, onClick }) => {
  const cellStyle = {
    backgroundColor: color || "white",
  };

  return <div className="cell" style={cellStyle} onClick={onClick}></div>;
};

export default Cell;
