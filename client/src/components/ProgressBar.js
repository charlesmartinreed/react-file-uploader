import React, { Component } from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ percentage }) => {
  return (
    <div className="progress" style={{ height: 20 }}>
      <div
        className="progress-bar progress-bar-striped bg-warning"
        role="progressbar"
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default ProgressBar;
