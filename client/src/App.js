import Main from "./components/main";
import { BrowserRouter } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

function App() {

 
  useEffect(() => {}, []);
  return (
    <BrowserRouter>
      <Main/>
    </BrowserRouter>
  );
}

export default App;
