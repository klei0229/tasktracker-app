import React from "react";
import { GoArrowUp, GoArrowDown } from "react-icons/go";

const SortArrowContainer = (props) => {
  const { name, up, down, sortingMode } = props;
  console.log(up);
  console.log(sortingMode);
  return (
    <div className="header-container">
      <span>{name}</span>
      <div className="arrow-container">
        <GoArrowUp
          className={sortingMode === up ? "arrow-active" : ""}
        ></GoArrowUp>
        <GoArrowDown
          className={sortingMode === down ? "arrow-active" : ""}
        ></GoArrowDown>
      </div>
    </div>
  );
};

export default SortArrowContainer;
