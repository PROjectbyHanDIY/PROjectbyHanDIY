import React, { RefAttributes, useEffect, useLayoutEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Board } from "./board";
import { Navbar } from "./components/main/navbar";

export const Main = () => {
  const navRef = React.createRef();
  const ref = useRef(null);
  const [height, setHeight]  = useState(0);

  useLayoutEffect(() => {
    // if(ref.current!== null){
    //   setHeight(ref.current?.offsetHeight + 1);
    // }
  }, []);

  return (
    <>
      <div ref={ref}>
        <Navbar ref={ref} setHeight={setHeight}></Navbar>
      </div>

      <Board upperBoundHeight={height}></Board>
    </>
  );
};
