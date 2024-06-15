import { AppBar, Toolbar, Typography } from "@mui/material";
import React, { forwardRef, useRef, useEffect, useState } from "react";

export const Navbar = forwardRef((props: any) => {
  const [height, setHeight] = useState(0);
  const refs = useRef(null);

  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{
            boxShadow: 3.5,
            WebkitBoxShadow: 3.5,
            backgroundColor: "#f7f7f7",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#f36d29", fontSize: 38 }}
          >
            <span style={{ fontWeight: "bold", fontStyle: "italic" }}>PRO</span>
            <span style={{ color: "black", fontWeight: "bold" }}>ject</span>
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
});
