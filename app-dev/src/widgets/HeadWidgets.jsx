import React from "react";
import { Grid, Card, Typography, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";

import Zoom from "@mui/material/Zoom";

function HeadWidgets() {
  const [dataGlobal, setDataGlobal] = useState(null);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/global")
      .then((res) => res.json())
      .then((data) => {
        setDataGlobal(!data.error ? data.data : null);
      });
  }, []);

  return (
    <>
      {dataGlobal ? (
        <Grid
          container
          spacing={2}
          sx={{
            width: "2",
            padding: 1,
            pt: 2,
            justifyContent: "center",
          }}
        >
          <Grid item>
            <Tooltip
              title="Number of active cryptocurrencies"
              TransitionComponent={Zoom}
              arrow
            >
              <Card
                width="fit-content"
                sx={{
                  p: 0.7,
                  px: 2,

                  width: "fit-content",
                  m: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
                color="text.secondary"
              >
                <Typography variant="body2" color="text.secondary">
                  Total coins:
                </Typography>
                <Typography variant="body2" marginLeft={1}>
                  {dataGlobal.active_cryptocurrencies}
                </Typography>
              </Card>
            </Tooltip>
          </Grid>

          <Grid
            item
            sx={{
              display: { xs: "none", md: "grid" },
            }}
          >
            <Tooltip
              title="Percentage change in the capitalization of the entire cryptocurrency market in US dollars in 24 hours"
              TransitionComponent={Zoom}
              arrow
            >
              <Card
                sx={{
                  p: 0.7,
                  px: 2,

                  width: "fit-content",
                  m: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Capitalization (24h):
                </Typography>
                <Typography variant="body2" marginLeft={1}>
                  {dataGlobal.market_cap_change_percentage_24h_usd.toFixed(2)}%
                </Typography>
              </Card>
            </Tooltip>
          </Grid>

          <Grid
            item
            sx={{
              display: { xs: "none", lg: "grid" },
            }}
          >
            <Tooltip
              title="Total number of cryptocurrency markets"
              TransitionComponent={Zoom}
              arrow
            >
              <Card
                sx={{
                  p: 0.7,
                  px: 2,

                  width: "fit-content",
                  m: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Total markets:
                </Typography>
                <Typography variant="body2" marginLeft={1}>
                  {dataGlobal.markets}
                </Typography>
              </Card>
            </Tooltip>
          </Grid>

          <Grid item>
            <Tooltip
              title="Bitcoin market capitalization percentage"
              TransitionComponent={Zoom}
              arrow
            >
              <Card
                sx={{
                  p: 0.7,
                  px: 2,

                  width: "fit-content",
                  m: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  BTC:
                </Typography>
                <Typography variant="body2" marginLeft={1}>
                  {dataGlobal.market_cap_percentage.btc.toFixed(3)}%
                </Typography>
              </Card>
            </Tooltip>
          </Grid>

          <Grid
            item
            sx={{
              display: { xs: "none", sm: "grid" },
            }}
          >
            <Tooltip
              title="Ethereum market capitalization percentage"
              TransitionComponent={Zoom}
              arrow
            >
              <Card
                sx={{
                  p: 0.7,
                  px: 2,

                  width: "fit-content",
                  m: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  ETH:
                </Typography>
                <Typography variant="body2" marginLeft={1}>
                  {dataGlobal.market_cap_percentage.eth.toFixed(3)}%
                </Typography>
              </Card>
            </Tooltip>
          </Grid>

          <Grid
            item
            sx={{
              display: { xs: "none", lg: "grid" },
            }}
          >
            <Tooltip
              title="Tether market capitalization percentage"
              TransitionComponent={Zoom}
              arrow
            >
              <Card
                sx={{
                  p: 0.7,
                  px: 2,

                  width: "fit-content",
                  m: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  USDT:
                </Typography>
                <Typography variant="body2" marginLeft={1}>
                  {dataGlobal.market_cap_percentage.usdt.toFixed(3)}%
                </Typography>
              </Card>
            </Tooltip>
          </Grid>

          <Grid
            item
            sx={{
              display: { xs: "none", xl: "grid" },
            }}
          >
            <Tooltip
              title="USD Coin market capitalization percentage"
              TransitionComponent={Zoom}
              arrow
            >
              <Card
                sx={{
                  p: 0.7,
                  px: 2,

                  width: "fit-content",
                  m: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  USDC:
                </Typography>
                <Typography variant="body2" marginLeft={1}>
                  {dataGlobal.market_cap_percentage.usdc.toFixed(3)}%
                </Typography>
              </Card>
            </Tooltip>
          </Grid>

          <Grid
            item
            sx={{
              display: { xs: "none", xl: "grid" },
            }}
          >
            <Tooltip
              title="BNB market capitalization percentage"
              TransitionComponent={Zoom}
              arrow
            >
              <Card
                sx={{
                  p: 0.7,
                  px: 2,

                  width: "fit-content",
                  m: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  BNB:
                </Typography>
                <Typography variant="body2" marginLeft={1}>
                  {dataGlobal.market_cap_percentage.bnb.toFixed(3)}%
                </Typography>
              </Card>
            </Tooltip>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
}

export default HeadWidgets;
