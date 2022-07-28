import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/Box";

function Сryptocurrency() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    fetch(  )
    .then( res => res.json() )
    .then( data => {
        console.log(data);
        setLoading( false )
    } )
  }, [] )

  return (

    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        width: "1",
        minHeight: "93vh",
      }}
    >
      <Box
        sx={{
          width: "1",
          display: "flex",
          justifyContent: "center",
          my: "auto",
        }}
      >
        {loading ? <CircularProgress size="5rem" /> : <h1>!!!</h1>}
      </Box>
    </Box>
  );
}

export default Сryptocurrency;
