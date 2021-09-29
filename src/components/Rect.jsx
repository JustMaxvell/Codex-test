import React from "react";

// ? Styles
import "./rect.css";

export const Rect = ({x1, y1, x2, y2}) => {

  const getWidth = (x1, x2) => {
    return x2-x1;
  }

  const getHeight = (y1, y2) => {
    return y2-y1;
  }

  return (
    <div className="rect" style={{top: `${y1}px`, left: `${x1}px`, width: `${getWidth(x1, x2)}px`, height: `${getHeight(y1, y2)}px`}}>
    </div>
  )
}