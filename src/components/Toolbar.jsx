import React, { useState } from "react";

// ? Styles
import "./toolbar.css";

export const Toolbar = ({
  canvas, 
  setCanvas, 
  setLine, 
  setRect, 
  clearCanvas, 
  isToolbarPsevdo, 
  toggleToolbar,
  data, 
  setData,
  togleFlag
}) => {

  // ? Graph canvas
  const [canvasWidth, setCanvasWidth] = useState('');
  const [canvasHeight, setCanvasHeight] = useState('');

  const [lineX1, setLineX1] = useState('');
  const [lineY1, setLineY1] = useState('');
  const [lineX2, setLineX2] = useState('');
  const [lineY2, setLineY2] = useState('');

  const [rectX1, setRectX1] = useState('');
  const [rectY1, setRectY1] = useState('');
  const [rectX2, setRectX2] = useState('');
  const [rectY2, setRectY2] = useState('');

  // ? Psevdograph canvas
  const [pCanvasWidth, setPCanvasWidth] = useState('');
  const [pCanvasHeight, setPCanvasHeight] = useState('');

  const [pLineX1, setPLineX1] = useState('');
  const [pLineY1, setPLineY1] = useState('');
  const [pLineX2, setPLineX2] = useState('');
  const [pLineY2, setPLineY2] = useState('');

  const [pRectX1, setPRectX1] = useState('');
  const [pRectY1, setPRectY1] = useState('');
  const [pRectX2, setPRectX2] = useState('');
  const [pRectY2, setPRectY2] = useState('');

  const [fillX, setFillX] = useState('');
  const [fillY, setFillY] = useState('');
  const [color, setColor] = useState('');

  // ? Control

  const canvasHandleChange = (value, callback, psevdograph = false) => {
    if (!psevdograph && value >= 0 && value <= 1000) {
      callback(value);
    } else if (psevdograph && value >= 0 && value <= 30) {
      callback(value);
    } else if (!psevdograph && value > 30) {
      alert("max value must be equel 1000")
    } else if (psevdograph && value > 30) {
      alert("max value must be equel 30")
    }
  }

  const handleChange = (value, callback, type, psevdograph = false) => {
    if ((!psevdograph && (type === "width" && value > canvas.width) || (type === "height" && value > canvas.height)) ||
    (psevdograph && (type === "width" && value > canvas.width/30) || (type === "height" && value > canvas.height/30))) {
      alert("Out of range");
    } else if (value >= 0) {
      callback(value);
    }
  }

  const onChangeLolor = (value) => {
    setColor(value);
  }

  // ? Canvas

  const setInitialData = () => {
    let data = [...Array(+pCanvasHeight)];
    let updatedData = data.map(row => [...Array(+pCanvasWidth)])
    setData(updatedData);
  }

  const createCanvas = (type) => {
    let newCanvas = {}
    if (canvas) {
      alert("Canvas already created")
    } else if (type === 'graph' && canvasWidth && canvasHeight) {
      newCanvas.width = canvasWidth;
      newCanvas.height = canvasHeight;
      setCanvas(newCanvas);
    } else if (type === 'psevdograph' && pCanvasWidth && pCanvasHeight) {
      newCanvas.width = pCanvasWidth*30;
      newCanvas.height = pCanvasHeight*30;
      setCanvas(newCanvas);
      setInitialData();
    } else {
      alert("Fill required fields")
    }
    clearCanvasData();
  }

  // ? Line

  const verticalPsevdo = (newData, x, y1, y2 ) => {
    const dataCopy = newData;
    dataCopy.map((row, index) => {
      if (index >= y1 - 1 && index <= y2 - 1) {
        let newRow = row;
        newRow[x-1] = "x";
        return newRow;
      } else {
        return row;
      }
    })
    return dataCopy;
  }

  const horizontalPsevdo = (newData, y, x1, x2, fill = "x") => {
    const dataCopy = newData;
    const nY = y>0 ? y : 1;
    let newLine = dataCopy[nY - 1].map((item,index) => (index >= x1 - 1 && index <= x2 - 1 ) ? fill : item);
    dataCopy[nY-1] = newLine;
    return dataCopy;
  }

  const drawLine = (type) => {
    let line = {};
    if (!canvas) {
      alert("Canvas isn't created")
    } else if (type === 'graph' && lineX1 && lineY1 && lineX2 && lineY2) {
      line.x1 = lineX1;
      line.y1 = lineY1;
      line.x2 = lineX2;
      line.y2 = lineY2;
      setLine(prev => {return [...prev, line]});
      clearLineData();
    } else if (type === 'psevdograph' && pLineX1 && pLineY1 && pLineX2 && pLineY2) {
      let newData = data;
        if (pLineY1 === pLineY2) {
          setData(horizontalPsevdo(newData, pLineY1, pLineX1, pLineX2))
        } else if (pLineX1 === pLineX2) {
          setData(verticalPsevdo(newData, pLineX1, pLineY1, pLineY2))
        } else {
          alert("Line must be horizontal or vertical only")
        }
      clearLineData();
      togleFlag([]);
    } else {
      alert("Fill required fields")
    }
  }

  // ? Rect

  const rectPsevdo = (newData, x1, y1, x2, y2) => {
    setData(horizontalPsevdo(newData, y1, x1, x2));
    setData(horizontalPsevdo(newData, y2, x1, x2));
    setData(verticalPsevdo(newData, x1, y1, y2));
    setData(verticalPsevdo(newData, x2, y1, y2));
  }

  const drawRect = (type) => {
    let rect = {};
    if (!canvas) {
      alert("Canvas isn't created")
    } else if (type === 'graph' && rectX1 && rectY1 && rectX2 && rectY2) {
      rect.x1 = rectX1;
      rect.y1 = rectY1;
      rect.x2 = rectX2;
      rect.y2 = rectY2;
      setRect(prev => {return [...prev, rect]});
      clearRectData();
    } else if (type === 'psevdograph' && pRectX1 && pRectY1 && pRectX2 && pRectY2) {
      let newData = data;
      rectPsevdo(newData, pRectX1, pRectY1, pRectX2, pRectY2);
      clearRectData();
      togleFlag([]);
    } else {
      alert("Fill required fields");
    }
  }

  // ? Fill

  //   const fill = (x, y) => {
  //     // Create empty set Q. Use set, b/c there will be a lot of duplicates in Array.
  //     let newData = data;
  //     let q = new Set();
  //     // If element color is not for replacing, return.
  //     if(newData[y][x] === "x") {
  //         alert('You chose already filled dot!');
  //         return;
  //     }
  //     // Put element into Q.
  //     q.add({x: x, y: y});
  //     // For each N from Q:
  //     q.forEach((dot) => {
  //       fillLine(dot, q, newData);
  //     });
  // };


  //     const fillLine = (dot, q, newData) => {
  //       debugger
  //     if (newData[dot.y][dot.x]) {
  //         return;
  //     }
  //     // If N color is for replacing:
  //     let w = dot.x, e = dot.x;
  //     // Go up to the west until w color is for replacing.
  //     while(w >= 0 && newData[w - 1] && newData[w - 1][dot.y] !== "x") { w--; }
  //     // Go up to the east until w color is for replacing.
  //     while(e < canvas.width && newData[e + 1] && newData[e + 1][dot.y] !== "x") { e++; }
  //     // Replace elements color between w and e.
  //     setData(horizontalPsevdo(newData, dot.y, w, e, "o"))
  //     // For each n between w and e:
  //     for(let x = w; x <= e; x++) {
  //         // If element color to the north from n is with color for replacing, put it into Q.
  //         [newData[x][dot.y + 1], newData[x][dot.y - 1]].forEach((tempDot) => { if (tempDot && tempDot !== "x") { q.add(tempDot); } })
  //     }
  //   };

  // const fill = (dot, oldCol, newCol) => {
  //   let newData = data;
  //   if (newData[dot.y][dot.x] !== oldCol) {
  //     return;
  //   }
  //   newData[dot.y][dot.x] = newCol;
  //   fill({x: dot.x - 1, y: dot.y}, undefined, "o");
  //   fill({x: dot.x + 1, y: dot.y}, undefined, "o");
  //   fill({x: dot.x, y: dot.y - 1}, undefined, "o");
  //   fill({x: dot.x, y: dot.y + 1}, undefined, "o");
  //   return newData;
  // }

  // const fillArea = (dot, oldCol, newCol) => {
  //   fill(dot, oldCol, newCol);
  //   togleFlag([]);
  //   clearFillData();
  // }


  // ? Clear data

  const deleteCanvas = () => {
    setCanvas(null);
    clearCanvasData();
    clearCanvas();
  }

  const clearCanvasData = () => {
    setCanvasWidth('');
    setCanvasHeight('');
    setPCanvasWidth('');
    setPCanvasHeight('');
  }

  const clearLineData = () => {
    setLineX1('');
    setLineY1('');
    setLineX2('');
    setLineY2('');
    setPLineX1('');
    setPLineY1('');
    setPLineX2('');
    setPLineY2('');
  }

  const clearRectData = () => {
    setRectX1('');
    setRectY1('');
    setRectX2('');
    setRectY2('');
    setPRectX1('');
    setPRectY1('');
    setPRectX2('');
    setPRectY2('');
  }

  const clearFillData = () => {
    setFillX('');
    setFillY('');  
  }


  const clearToolbar = () => {
    clearCanvasData();
    clearLineData();
    clearRectData();
    clearFillData();
  }

  return (
    <>
      <div className="toolbar">
        {isToolbarPsevdo ? 

          <div className="wrapper" style={{background : "#87ceeb"}}>
          <div className="toolbar__canvas">
            <input type="number" placeholder="width" value={canvasWidth} onChange={(e) => canvasHandleChange(e.target.value, setCanvasWidth)}/>
            <input type="number" placeholder="height" value={canvasHeight} onChange={(e) => canvasHandleChange(e.target.value, setCanvasHeight)}/>
            <button className="submit" onClick={() => createCanvas('graph')}>Create</button>
            <button className="delete" onClick={deleteCanvas}>Delete</button>
          </div>
          <div className="toolbar__line">
            <input type="number" placeholder="x1" value={lineX1} onChange={(e) => handleChange(e.target.value, setLineX1, "width")}/>
            <input type="number" placeholder="y1" value={lineY1} onChange={(e) => handleChange(e.target.value, setLineY1, "height")}/>
            <input type="number" placeholder="x2" value={lineX2} onChange={(e) => handleChange(e.target.value, setLineX2, "width")}/>
            <input type="number" placeholder="y2" value={lineY2} onChange={(e) => handleChange(e.target.value, setLineY2, "height")}/>
            <button onClick={() => drawLine("graph")}>Draw line</button>
          </div>
          <div className="toolbar__rect">
            <input type="number" placeholder="x1" value={rectX1} onChange={(e) => handleChange(e.target.value, setRectX1, "width")}/>
            <input type="number" placeholder="y1" value={rectY1} onChange={(e) => handleChange(e.target.value, setRectY1, "height")}/>
            <input type="number" placeholder="x2" value={rectX2} onChange={(e) => handleChange(e.target.value, setRectX2, "width")}/>
            <input type="number" placeholder="y2" value={rectY2} onChange={(e) => handleChange(e.target.value, setRectY2, "height")}/>
            <button onClick={() => drawRect('graph')}>Draw rect</button>
          </div>
          <button className="delete" onClick={clearToolbar}>Clear</button>
        </div>

        :

        <div className="wrapper" style={{background : "#e9e95e"}}>
          <div className="toolbar__canvas">
            <input type="number" placeholder="width" value={pCanvasWidth} onChange={(e) => canvasHandleChange(e.target.value, setPCanvasWidth, true)}/>
            <input type="number" placeholder="height" value={pCanvasHeight} onChange={(e) => canvasHandleChange(e.target.value, setPCanvasHeight, true)}/>
            <button className="submit" onClick={() => createCanvas('psevdograph')}>Create</button>
            <button className="delete" onClick={deleteCanvas}>Delete</button>
          </div>
          <div className="toolbar__line">
            <input type="number" placeholder="x1" value={pLineX1} onChange={(e) => handleChange(e.target.value, setPLineX1, "width", true)}/>
            <input type="number" placeholder="y1" value={pLineY1} onChange={(e) => handleChange(e.target.value, setPLineY1, "height", true)}/>
            <input type="number" placeholder="x2" value={pLineX2} onChange={(e) => handleChange(e.target.value, setPLineX2, "width", true)}/>
            <input type="number" placeholder="y2" value={pLineY2} onChange={(e) => handleChange(e.target.value, setPLineY2, "height", true)}/>
            <button onClick={() => drawLine("psevdograph")}>Draw line</button>
          </div>
          <div className="toolbar__rect">
            <input type="number" placeholder="x1" value={pRectX1} onChange={(e) => handleChange(e.target.value, setPRectX1, "width", true)}/>
            <input type="number" placeholder="y1" value={pRectY1} onChange={(e) => handleChange(e.target.value, setPRectY1, "height", true)}/>
            <input type="number" placeholder="x2" value={pRectX2} onChange={(e) => handleChange(e.target.value, setPRectX2, "width", true)}/>
            <input type="number" placeholder="y2" value={pRectY2} onChange={(e) => handleChange(e.target.value, setPRectY2, "height", true)}/>
            <button onClick={() => drawRect('psevdograph')}>Draw rect</button>
          </div>
          <div className="toolbar__fill">
            <input type="number" placeholder="x" value={fillX} onChange={(e) => handleChange(e.target.value, setFillX, "width", true)}/>
            <input type="number" placeholder="y" value={fillY} onChange={(e) => handleChange(e.target.value, setFillY, "height", true)}/>
            <select value={color} onChange={e => onChangeLolor(e.target.value)}>
              <option value="red">red</option>
              <option value="green">green</option>
              <option value="blue">blue</option>
            </select>
            <button onClick={() => alert("its working wrong")}>Fill area</button>
          </div>
          <button className="delete" onClick={clearToolbar}>Clear</button>
        </div>
        }
        
        <div className="toggle-toolbar-button" onClick={() => {toggleToolbar(prev => !prev); clearToolbar();}}>{`Change toolbar (${!isToolbarPsevdo ? "Psevdograph" : "Graph"})`}</div>
      </div>
    </>
  )
}