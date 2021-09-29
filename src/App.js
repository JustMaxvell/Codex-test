import React, { useState, useEffect } from "react";

// ? Components
import { Toolbar } from "./components/Toolbar";
import { Workspace } from "./components/Workspace";

// ? Styles
import "./reset.css";
import "./app.css";

function App() {
  const [canvas, setCanvas] = useState(null);

  const [data, setData] = useState([]);
  const [isDataChanged, togleFlag] = useState([]);

  // ? Graph solution
  const [isToolbarPsevdo, toggleToolbar] = useState(false)
  const [lines, setLine] = useState([]);
  const [rects, setRect] = useState([]);

  const setInitialData = () => {
    let data = [...Array(+canvas.height/30)];
    let updatedData = data.map(row => [...Array(+canvas.width/30)])
    setData(updatedData);
  }

  const clearCanvas = () => {
    setLine([]);
    setRect([]);
    setInitialData();
  }

  useEffect(()=> {
  }, [isDataChanged])

  return (
    <div className="App">
      <Toolbar 
        canvas={canvas}  
        setCanvas={setCanvas} 
        setLine={setLine} 
        setRect={setRect} 
        clearCanvas={clearCanvas} 
        isToolbarPsevdo={isToolbarPsevdo} 
        toggleToolbar={toggleToolbar}
        data={data}
        setData={setData}
        togleFlag={togleFlag}
        />
      <Workspace 
        canvas={canvas} 
        lines={lines} 
        rects={rects} 
        data={data}
        clearCanvas={clearCanvas}
        />
    </div>
  );
}

export default App;
