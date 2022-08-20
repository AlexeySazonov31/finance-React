import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { Card, Grid, Paper } from "@mui/material";

function Сryptocurrency() {
  const [dataGlobal, setDataGlobal] = useState(null);
  const [dataCoins, setDataCoins] = useState(null);

  const [loading, setLoading] = useState(false);

  console.log(loading);
  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/global")
      .then((res) => res.json())
      .then((data) => {
        console.log(!data.error ? data : data.error);
        setDataGlobal(!data.error ? data.data : null);
      });

    fetch(
      "https://api.coinstats.app/public/v1/coins?skip=0&limit=100&currency=USD"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDataCoins(data.coins.length > 30 ? data.coins : null);
        setLoading(true);
      });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "1",
        minHeight: "93vh",
        border: "1px solid red",
      }}
    >
      {dataGlobal ? (
        <Grid
          container
          spacing={2}
          sx={{
            width: "2",
            border: "1px solid green",
            padding: 1,
          }}
        >
          <Grid item xs={2}>
            <Card
              width="fit-content"
              sx={{
                p: 0.7,
                px: 2,

                width: "fit-content",
                m: "auto",
              }}
            >
              Total coins: {dataGlobal.active_cryptocurrencies}
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card
              sx={{
                p: 0.7,
                px: 2,

                width: "fit-content",
                m: "auto",
              }}
            >
              capitalization (24h): {dataGlobal.market_cap_change_percentage_24h_usd.toFixed(2)}%
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card
              sx={{
                p: 0.7,
                px: 2,
                width: "fit-content",
                m: "auto",
              }}
            >
              Total markets: {dataGlobal.markets}
            </Card>
          </Grid>

          <Grid item xs={2}>
            <Card
              sx={{
                p: 0.7,
                px: 2,
                width: "fit-content",
                m: "auto",
              }}
            >
              btc: {dataGlobal.market_cap_percentage.btc.toFixed(3)}%
            </Card>
          </Grid>

          <Grid item xs={2}>
            <Card
              sx={{
                p: 0.7,
                px: 2,
                width: "fit-content",
                m: "auto",
              }}
            >
              eth: {dataGlobal.market_cap_percentage.eth.toFixed(3)}%
            </Card>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}

      {!loading ? (
        <Box
          sx={{
            width: "1",
            display: "flex",
            justifyContent: "center",
            my: "auto",
          }}
        >
          <CircularProgress size="5rem" />
        </Box>
      ) : (
        "h"
      )}
    </Box>
  );
}

export default Сryptocurrency;
