import React from "react";
import { Progress } from "@chakra-ui/react";
import "./ProgressBar.css";
import Bar from "./Bar";

const ProgressBar = ({ value }) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div className="elements-container">
        <div className="element">
          <p>1. Event Details</p>
        </div>
        <div className="element">
          <p>2. Venues Details</p>
        </div>
        <div className="element">
          <p>3. Hours</p>
        </div>
        <div className="element">
          <p>4. Review</p>
        </div>
      </div>

      <Bar value={value}></Bar>
    </div>
  );
};

export default ProgressBar;
