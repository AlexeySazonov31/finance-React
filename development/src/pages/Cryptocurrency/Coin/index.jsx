import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Box, Typography, CircularProgress } from '@mui/material';

function Coin({ id }) {

    const navigate = useNavigate();

    const [loading, setLoading] = useState( false );
    const [data, setData] = useState( null );

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`
    )
      .then( res => res.json() )
      .then( data => {
        data.hasOwnProperty('error') ? (navigate('/not-found-404')) : console.log(data);setLoading(true);setData(data);
      } )

  }, []);


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        minHeight: "93vh",
        width: "1",
        alignItems: loading ? "start" : "center",
        border: '1px solid green',
        px: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5},
      }}
    >
            {loading ? (
                data.description.en
            ) : (
                <></>
            )}

    </Box>
  );
};

export default Coin;
