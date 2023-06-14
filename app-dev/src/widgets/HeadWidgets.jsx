import React, { useMemo } from "react";
import { Grid, Card, Typography, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import Zoom from "@mui/material/Zoom";

export default function HeadWidgets() {

  const [dataGlobal, setDataGlobal] = useState(null);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/global")
      .then((res) => res.json())
      .then((data) => {
        setDataGlobal(!data.error ? data.data : null);
        console.log("API request HeadWidgets")
      });
  }, []);

  const resultElems = useMemo(() => {
    return CreateElems(dataGlobal);

  }, [dataGlobal])

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
          {resultElems}
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
}

// ----------------- additional items --------------------------------------

function CreateElems(dataGlobal) {
  if (dataGlobal) {
    return dataItem.map((obj, index) => {
      if ((obj.displayData(dataGlobal))) {
        return (
          <Grid key={index} item sx={obj.GridStyleObject} >
            <Tooltip
              title={obj.toolTipTitle}
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
              >
                <Typography variant="body2" color="text.secondary">
                  {obj.text}
                </Typography>
                <Typography variant="body2" marginLeft={1}>
                  {obj.displayData(dataGlobal)}{obj.endDataText}
                </Typography>
              </Card>
            </Tooltip>
          </Grid>
        )
      } else {
        return <></>
      }
    }
    )
  } else {
    return false;
  }
}

const dataItem = [
  {
    GridStyleObject: {},
    toolTipTitle: "Number of active cryptocurrencies",
    text: "Total coins: ",
    displayData(dataGlobal) {
      return dataGlobal.active_cryptocurrencies;
    },
    endDataText: "",
  },
  {
    GridStyleObject: {
      display: { xs: "none", md: "grid" },
    },
    toolTipTitle: "Percentage change in the capitalization of the entire cryptocurrency market in US dollars in 24 hours",
    text: "Capitalization (24h): ",
    displayData(dataGlobal) {
      return dataGlobal.market_cap_change_percentage_24h_usd.toFixed(2);
    },
    endDataText: "%",
  },
  {
    GridStyleObject: {
      display: { xs: "none", lg: "grid" },
    },
    toolTipTitle: "Total number of cryptocurrency markets",
    text: "Total markets: ",
    displayData(dataGlobal) {
      return dataGlobal.markets;
    },
    endDataText: "",
  },
  {
    GridStyleObject: {},
    toolTipTitle: "Bitcoin market capitalization percentage",
    text: "BTC: ",
    displayData(dataGlobal) {
      return dataGlobal.market_cap_percentage.btc.toFixed(3);
    },
    endDataText: "%",
  },
  {
    GridStyleObject: {
      display: { xs: "none", sm: "grid" },
    },
    toolTipTitle: "Ethereum market capitalization percentage",
    text: "ETC: ",
    displayData(dataGlobal) {
      return dataGlobal.market_cap_percentage.eth.toFixed(3);
    },
    endDataText: "%",
  },
  {
    GridStyleObject: {
      display: { xs: "none", lg: "grid" },
    },
    toolTipTitle: "Tether market capitalization percentage",
    text: "USDT:",
    displayData(dataGlobal) {
      return dataGlobal.market_cap_percentage.usdt.toFixed(3);
    },
    endDataText: "%",
  },
  {
    GridStyleObject: {
      display: { xs: "none", xl: "grid" },
    },
    toolTipTitle: "BNB market capitalization percentage",
    text: "BNB:",
    displayData(dataGlobal) {
      return dataGlobal.market_cap_percentage.bnb.toFixed(3);
    },
    endDataText: "%",
  },
]