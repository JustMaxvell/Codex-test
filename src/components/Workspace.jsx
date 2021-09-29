import React, { useEffect } from "react";

// ? Components
import { Line } from "../components/Line";
import { Rect } from "../components/Rect";

// ? Styles
import "./workspace.css";

export const Workspace = ({
  canvas, 
  lines, 
  rects, 
  data,
  clearCanvas,
}) => {

  useEffect(()=> {
  }, [data])

  return (
    <div className="workpace">
      {canvas ? 
        <div className={data ? "workspace__psevdo-canvas" : "workspace__canvas"} style={{width: `${canvas.width}px`, height: `${canvas.height}px`}}>
          <button className="clear-canvas" onClick={clearCanvas}>Clear</button>
          {lines && lines.map(line => <Line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />)}
          {rects && rects.map(rect => <Rect x1={rect.x1} y1={rect.y1} x2={rect.x2} y2={rect.y2} />)}
          {data && data.map(row => <div className="workspace__psevdo-canvas__row">
            {row.map(el => <div className="workspace__psevdo-canvas__row__box">{el === undefined ? "·" : el}</div>)}
            </div>)}
        </div> 
        : 
        "Nothing is here"}
    </div>
  )
}