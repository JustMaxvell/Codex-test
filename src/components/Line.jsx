import React from "react";

// ? Styles
import "./line.css";

export const Line = ({x1, y1, x2, y2}) => {

  const getWidth = (x1, x2) => {
    return x2-x1;
  }

  const getHeight = (y1, y2) => {
    return y2-y1;
  }

  const getLineStreight = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(getWidth(x1, x2), 2) + Math.pow(getHeight(y1, y2), 2));
  }

  const getDeg = (x1, y1, x2, y2) => {
    return (Math.atan(getHeight(y1, y2)/getWidth(x1, x2))*180)/Math.PI;
  }

  return (
    <div className="line-wrapper" style={{top: `${y1}px`, left: `${x1}px`, width: `${getWidth(x1, x2)}px`, height: `${getHeight(y1, y2)}px`}}>
      <div className="line" style={{width: `${getLineStreight(x1, y1, x2, y2)}px`, transform: `rotate(${getDeg(x1, y1, x2, y2)}deg)` }}></div>
    </div>
  )
}